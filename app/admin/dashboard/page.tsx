import { createClient } from "@/lib/supabase/server";
import { AdminSidebar } from "@/components/admin-sidebar";
import Link from "next/link";
import { Package, Plus, Star, Users, TrendingUp } from "lucide-react";

export default async function DashboardPage() {
  const supabase = await createClient();

  const [
    { count: totalProdutos },
    { count: emDestaque },
    { count: disponiveis },
    { count: totalLeads },
    { data: recentes },
  ] = await Promise.all([
    supabase.from("produtos").select("id", { count: "exact", head: true }),
    supabase.from("produtos").select("id", { count: "exact", head: true }).eq("destaque", true),
    supabase.from("produtos").select("id", { count: "exact", head: true }).eq("disponivel", true).eq("ativo", true),
    supabase.from("leads").select("id", { count: "exact", head: true }),
    supabase.from("produtos").select("id, nome, preco, preco_promocional, imagem_url, categorias(slug)").order("created_at", { ascending: false }).limit(8),
  ]);

  const stats = [
    { label: "Total de Produtos", value: totalProdutos ?? 0, icon: Package, color: "text-primary" },
    { label: "Em Destaque", value: emDestaque ?? 0, icon: Star, color: "text-secondary" },
    { label: "Disponíveis", value: disponiveis ?? 0, icon: TrendingUp, color: "text-green-600" },
    { label: "Leads", value: totalLeads ?? 0, icon: Users, color: "text-purple-600" },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground font-serif">Dashboard</h1>
          <p className="text-muted-foreground text-sm mt-1">Visão geral da loja</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {stats.map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="rounded-xl border border-border bg-card p-5 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-muted-foreground">{label}</span>
                <Icon className={`h-5 w-5 ${color}`} />
              </div>
              <p className="text-3xl font-bold text-foreground">{value}</p>
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-border bg-card shadow-sm">
          <div className="flex items-center justify-between p-5 border-b border-border">
            <h2 className="font-semibold text-foreground">Produtos Recentes</h2>
            <Link href="/admin/produtos" className="text-sm text-primary hover:underline">Ver todos</Link>
          </div>

          {(!recentes || recentes.length === 0) ? (
            <div className="p-10 text-center">
              <Package className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground text-sm">Nenhum produto cadastrado ainda.</p>
              <Link href="/admin/produtos/novo" className="mt-4 inline-flex items-center gap-2 rounded-xl bg-primary text-primary-foreground px-4 py-2 text-sm font-medium">
                <Plus className="h-4 w-4" />Adicionar primeiro produto
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {recentes.map((p) => (
                <div key={p.id} className="flex items-center gap-4 p-4 hover:bg-muted/40 transition-colors">
                  <div className="h-12 w-12 rounded-lg bg-muted overflow-hidden flex-shrink-0">
                    {p.imagem_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={p.imagem_url} alt={p.nome} className="h-full w-full object-cover" />
                    ) : (
                      <Package className="h-6 w-6 text-muted-foreground m-3" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{p.nome}</p>
                  </div>
                  <p className="text-sm font-semibold text-foreground flex-shrink-0">
                    R$ {Number(p.preco_promocional ?? p.preco).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </p>
                  <Link href={`/admin/produtos/${p.id}/editar`} className="text-xs text-primary hover:underline flex-shrink-0">
                    Editar
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
