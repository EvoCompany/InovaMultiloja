'use client';

import { useEffect, useRef, useState } from 'react';
import { useCart } from '@/context/cart-context';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

declare global {
  interface Window {
    MercadoPago: new (key: string, opts: { locale: string }) => {
      bricks: () => {
        create: (type: string, id: string, config: unknown) => Promise<unknown>;
      };
    };
  }
}

export default function CheckoutPage() {
  const { items, total } = useCart();
  const router = useRouter();
  const bricksLoaded = useRef(false);

  const [cliente, setCliente] = useState({
    nome: '',
    email: '',
    telefone: '',
    cpf: '',
  });
  const [step, setStep] = useState<'dados' | 'pagamento'>('dados');
  const [loading, setLoading] = useState(false);
  const [preferenceId, setPreferenceId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (items.length === 0) router.replace('/');
  }, [items, router]);

  // Carrega SDK do Mercado Pago
  useEffect(() => {
    if (step !== 'pagamento' || bricksLoaded.current || !preferenceId) return;

    const script = document.createElement('script');
    script.src = 'https://sdk.mercadopago.com/js/v2';
    script.onload = () => initBricks();
    document.body.appendChild(script);
    bricksLoaded.current = true;
  }, [step, preferenceId]);

  async function initBricks() {
    const mp = new window.MercadoPago(process.env.NEXT_PUBLIC_MP_PUBLIC_KEY!, {
      locale: 'pt-BR',
    });

    const bricksBuilder = mp.bricks();
    await bricksBuilder.create('payment', 'mp-payment-brick', {
      initialization: {
        amount: total,
        preferenceId,
      },
      customization: {
        paymentMethods: {
          creditCard: 'all',
          debitCard: 'all',
          ticket: 'all',
          bankTransfer: 'all',
          atm: 'all',
        },
      },
      callbacks: {
        onReady: () => {},
        onError: (err: unknown) => {
          console.error(err);
          setError('Erro ao carregar pagamento. Tente novamente.');
        },
      },
    });
  }

  async function handleDadosSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/checkout/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cliente,
          items: items.map((i) => ({
            id: i.id,
            nome: i.nome,
            preco: i.precoPromocional ?? i.preco,
            quantidade: i.quantity,
            imagem_url: i.imagemUrl ?? null,
          })),
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setPreferenceId(data.preferenceId);
      setStep('pagamento');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Erro ao criar pedido');
    } finally {
      setLoading(false);
    }
  }

  const subtotal = total;
  const pixTotal = subtotal * 0.93;

  return (
    <main className="min-h-screen bg-gray-50 pb-16">
      <div className="max-w-5xl mx-auto px-4 pt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Formulário / Bricks */}
        <div className="lg:col-span-2">
          <h1 className="text-2xl font-bold mb-6">Finalizar Compra</h1>

          {step === 'dados' && (
            <form onSubmit={handleDadosSubmit} className="bg-white rounded-xl shadow-sm p-6 space-y-4">
              <h2 className="text-lg font-semibold mb-2">Seus dados</h2>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome completo *</label>
                <input
                  required
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={cliente.nome}
                  onChange={(e) => setCliente({ ...cliente, nome: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">E-mail *</label>
                <input
                  required
                  type="email"
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={cliente.email}
                  onChange={(e) => setCliente({ ...cliente, email: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Telefone *</label>
                  <input
                    required
                    type="tel"
                    placeholder="(55) 99999-9999"
                    className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={cliente.telefone}
                    onChange={(e) => setCliente({ ...cliente, telefone: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">CPF</label>
                  <input
                    placeholder="000.000.000-00"
                    className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={cliente.cpf}
                    onChange={(e) => setCliente({ ...cliente, cpf: e.target.value })}
                  />
                </div>
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition disabled:opacity-60"
              >
                {loading ? 'Processando...' : 'Ir para pagamento →'}
              </button>
            </form>
          )}

          {step === 'pagamento' && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Escolha a forma de pagamento</h2>
              {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
              <div id="mp-payment-brick" />
            </div>
          )}
        </div>

        {/* Resumo */}
        <div className="bg-white rounded-xl shadow-sm p-6 h-fit space-y-4">
          <h2 className="text-lg font-semibold">Resumo do pedido</h2>

          <div className="space-y-3 max-h-64 overflow-y-auto">
            {items.map((item) => {
              const preco = item.precoPromocional ?? item.preco;
              return (
                <div key={item.id} className="flex gap-3 items-center">
                  {item.imagemUrl && (
                    <Image
                      src={item.imagemUrl}
                      alt={item.nome}
                      width={48}
                      height={48}
                      className="rounded-lg object-cover w-12 h-12"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{item.nome}</p>
                    <p className="text-xs text-gray-500">Qtd: {item.quantity}</p>
                  </div>
                  <p className="text-sm font-semibold whitespace-nowrap">
                    R$ {(preco * item.quantity).toFixed(2).replace('.', ',')}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="border-t pt-3 space-y-1 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>R$ {subtotal.toFixed(2).replace('.', ',')}</span>
            </div>
            <div className="flex justify-between text-green-600 font-medium">
              <span>PIX (7% OFF)</span>
              <span>R$ {pixTotal.toFixed(2).replace('.', ',')}</span>
            </div>
            <div className="flex justify-between font-bold text-base text-gray-900 pt-2 border-t">
              <span>Total</span>
              <span>R$ {subtotal.toFixed(2).replace('.', ',')}</span>
            </div>
          </div>

          <p className="text-xs text-gray-400 text-center">
            Pagamento seguro via Mercado Pago
          </p>
        </div>
      </div>
    </main>
  );
}
