import { NextRequest, NextResponse } from 'next/server';
import { mpPreference } from '@/lib/mercadopago';
import { createClient } from '@supabase/supabase-js';

export async function POST(req: NextRequest) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
  try {
    const { items, cliente } = await req.json();

    if (!items?.length || !cliente?.email) {
      return NextResponse.json({ error: 'Dados inválidos' }, { status: 400 });
    }

    const total = items.reduce(
      (acc: number, item: { preco: number; quantidade: number }) =>
        acc + item.preco * item.quantidade,
      0
    );

    // Salva pedido no Supabase
    const { data: pedido, error: pedidoError } = await supabase
      .from('pedidos')
      .insert({
        nome: cliente.nome,
        email: cliente.email,
        telefone: cliente.telefone,
        cpf: cliente.cpf ?? null,
        total,
        status: 'pendente',
      })
      .select()
      .single();

    if (pedidoError || !pedido) throw pedidoError;

    // Salva itens
    await supabase.from('pedido_items').insert(
      items.map((item: { id: string; nome: string; preco: number; quantidade: number; imagem_url?: string }) => ({
        pedido_id: pedido.id,
        produto_id: item.id,
        nome: item.nome,
        preco: item.preco,
        quantidade: item.quantidade,
        imagem_url: item.imagem_url ?? null,
      }))
    );

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://inova-multiloja.vercel.app';

    // Cria preferência no Mercado Pago
    const preference = await mpPreference.create({
      body: {
        external_reference: pedido.id,
        items: items.map((item: { nome: string; preco: number; quantidade: number; imagem_url?: string }) => ({
          title: item.nome,
          unit_price: Number(item.preco),
          quantity: item.quantidade,
          picture_url: item.imagem_url,
        })),
        payer: {
          name: cliente.nome,
          email: cliente.email,
          phone: { number: cliente.telefone },
          identification: cliente.cpf ? { type: 'CPF', number: cliente.cpf } : undefined,
        },
        payment_methods: {
          installments: 12,
        },
        back_urls: {
          success: `${baseUrl}/pedido/${pedido.id}?status=aprovado`,
          failure: `${baseUrl}/pedido/${pedido.id}?status=falhou`,
          pending: `${baseUrl}/pedido/${pedido.id}?status=pendente`,
        },
        auto_return: 'approved',
        notification_url: `${baseUrl}/api/webhook/mercadopago`,
      },
    });

    // Salva preference_id no pedido
    await supabase
      .from('pedidos')
      .update({ mp_preference_id: preference.id })
      .eq('id', pedido.id);

    return NextResponse.json({
      pedidoId: pedido.id,
      preferenceId: preference.id,
      initPoint: preference.init_point,
    });
  } catch (err) {
    console.error('[checkout/create]', err);
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}
