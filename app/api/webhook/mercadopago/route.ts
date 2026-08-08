import { NextRequest, NextResponse } from 'next/server';
import { mpPayment } from '@/lib/mercadopago';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const STATUS_MAP: Record<string, string> = {
  approved: 'aprovado',
  pending: 'pendente',
  in_process: 'pendente',
  rejected: 'cancelado',
  cancelled: 'cancelado',
  refunded: 'reembolsado',
  charged_back: 'reembolsado',
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, data } = body;

    if (type !== 'payment' || !data?.id) {
      return NextResponse.json({ ok: true });
    }

    const payment = await mpPayment.get({ id: data.id });

    if (!payment?.external_reference) {
      return NextResponse.json({ ok: true });
    }

    const status = STATUS_MAP[payment.status ?? ''] ?? 'pendente';

    // Atualiza status do pedido
    await supabase
      .from('pedidos')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', payment.external_reference);

    // Registra pagamento
    await supabase.from('pagamentos').upsert({
      pedido_id: payment.external_reference,
      mp_payment_id: String(data.id),
      status,
      metodo: payment.payment_type_id ?? null,
      valor: payment.transaction_amount ?? null,
      raw: payment as unknown as Record<string, unknown>,
    }, { onConflict: 'mp_payment_id' });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[webhook/mercadopago]', err);
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}
