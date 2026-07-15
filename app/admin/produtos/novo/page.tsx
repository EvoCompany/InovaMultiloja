import { createClient } from "@/lib/supabase/server";
import { AdminSidebar } from "@/components/admin-sidebar";
import { ProductForm } from "@/components/product-form";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default async function NovoProdutoPage() {
  const supabase = await createClient();

  const [
    { data: categorias },
    { data: marcas },
    { count: featuredCount },
  ] = await Promise.all([
    supabase.from("categorias").select("id, nome, slug, parent_id, imagem_url, ordem, ativo").eq("ativo", true).order("ordem"),
    supabase.from("marcas").select("id, nome, slug, logo_url, ativo").eq("ativo", true).order("nome"),
    supabase.from("produtos").select("id", { count: "exact", head: true }).eq("destaque", true),
  ]);

  const categoriasFormatted = (categorias ?? []).map((c) => ({
    id: c.id,
    nome: c.nome,
    slug: c.slug,
    parentId: c.parent_id ?? undefined,
    imagemUrl: c.imagem_url ?? undefined,
    ordem: c.ordem ?? 0,
    ativo: c.ativo ?? true,
  }));

  const marcasFormatted = (marcas ?? []).map((m) => ({
    id: m.id,
    nome: m.nome,
    slug: m.slug,
    logoUrl: m.logo_url ?? undefined,
    ativo: m.ativo ?? true,
  }));

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />

      <main className="flex-1 p-8">
        <nav className="flex items-center gap-1.5 text-sm text-muted-foreground mb-6">
          <Link href="/admin/produtos" className="hover:text-primary transition-colors">Produtos</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground font-medium">Novo Produto</span>
        </nav>

        <h1 className="text-2xl font-bold text-foreground font-serif mb-8">Adicionar Produto</h1>

        <ProductForm
          mode="create"
          categorias={categoriasFormatted}
          marcas={marcasFormatted}
          featuredCount={featuredCount ?? 0}
        />
      </main>
    </div>
  );
}
