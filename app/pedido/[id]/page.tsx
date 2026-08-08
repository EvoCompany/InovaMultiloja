import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

interface Props {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ status?: string }>;
}

export default async function PedidoPage({ params, searchParams }: Props) {
  const { id } = await params;
  const { status } = await searchParams;

  const { data: pedido } = await supabase
    .from('pedidos')
    .select('*, pedido_items(*)')
    .eq('id', id)
    .single();

  const aprovado = status === 'aprovado' || pedido?.status === 'aprovado';
  const falhou = status === 'falhou' || pedido?.status === 'cancelado';

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-16">
      <div className="bg-white rounded-2xl shadow-sm max-w-lg w-full p-8 text-center space-y-6">

        {aprovado && (
          <>
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Pagamento confirmado!</h1>
            <p className="text-gray-500 text-sm">
              Obrigado, <strong>{pedido?.nome}</strong>! Seu pedido foi recebido e está sendo processado.
              Você receberá um e-mail em <strong>{pedido?.email}</strong>.
            </p>
          </>
        )}

        {falhou && (
          <>
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
              <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Pagamento não aprovado</h1>
            <p className="text-gray-500 text-sm">
              Houve um problema com o pagamento. Tente novamente ou escolha outra forma de pagamento.
            </p>
          </>
        )}

        {!aprovado && !falhou && (
          <>
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto">
              <svg className="w-8 h-8 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Pagamento em análise</h1>
            <p className="text-gray-500 text-sm">
              Seu pagamento está sendo processado. Você será notificado por e-mail assim que for confirmado.
            </p>
          </>
        )}

        {pedido && (
          <div className="bg-gray-50 rounded-xl p-4 text-left space-y-2">
            <p className="text-xs text-gray-400 uppercase font-semibold tracking-wide">Número do pedido</p>
            <p className="font-mono text-sm text-gray-700 break-all">{pedido.id}</p>
            <p className="text-xs text-gray-400 uppercase font-semibold tracking-wide mt-3">Total</p>
            <p className="text-lg font-bold text-gray-900">
              R$ {Number(pedido.total).toFixed(2).replace('.', ',')}
            </p>
          </div>
        )}

        <div className="flex gap-3 justify-center flex-wrap">
          <Link
            href="/"
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition"
          >
            Continuar comprando
          </Link>
          {falhou && (
            <Link
              href="/checkout"
              className="px-5 py-2.5 border border-gray-300 hover:bg-gray-50 text-sm font-semibold rounded-xl transition"
            >
              Tentar novamente
            </Link>
          )}
        </div>
      </div>
    </main>
  );
}
