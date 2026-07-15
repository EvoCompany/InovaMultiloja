import { createClient } from "@/lib/supabase/server";
import { AdminSidebar } from "@/components/admin-sidebar";
import Link from "next/link";
import { ProductsTable } from "./_products-table";
import { Package, Plus } from "lucide-react";

export default async function AdminProdutosPage() {
  const supabase = await createClient();
  const { data: products, error } = await supabase
    .from("produtos")
    .select("id, nome, preco, preco_promocional, imagem_url, categorias(nome, slug), destaque, disponivel, ativo")
    .order("created_at", { ascending: false });

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      <main className="flex-1 p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-foreground font-serif">Produtos</h1>
            <p className="text-muted-foreground text-sm mt-1">{products?.length ?? 0} produto(s) cadastrado(s)</p>
          </div>
          <Link href="/admin/produtos/novo" className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-secondary to-primary text-primary-foreground px-4 py-2.5 text-sm font-semibold shadow-sm">
            <Plus className="h-4 w-4" />Novo Produto
          </Link>
        </div>

        {error && <p className="text-sm text-red-500 mb-4">Erro ao carregar produtos.</p>}

        {!error && (!products || products.length === 0) && (
          <div className="rounded-xl border border-border bg-card p-16 text-center">
            <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Nenhum produto ainda.</p>
            <Link href="/admin/produtos/novo" className="mt-4 inline-flex items-center gap-2 rounded-xl bg-primary text-primary-foreground px-4 py-2 text-sm font-medium">
              <Plus className="h-4 w-4" />Adicionar produto
            </Link>
          </div>
        )}

        {!error && products && products.length > 0 && <ProductsTable products={products} />}
      </main>
    </div>
  );
}
