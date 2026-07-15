import { createClient } from "@/lib/supabase/server";
import { AdminSidebar } from "@/components/admin-sidebar";
import { Tag } from "lucide-react";
import { CategoriasClient } from "./_client";

export default async function AdminCategoriasPage() {
  const supabase = await createClient();
  const { data: categorias } = await supabase
    .from("categorias")
    .select("id, nome, slug, parent_id, imagem_url, ordem, ativo")
    .order("ordem")
    .order("nome");

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />

      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground font-serif flex items-center gap-2">
            <Tag className="h-6 w-6 text-primary" />
            Categorias
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Gerencie as categorias de produtos da loja.
          </p>
        </div>

        <CategoriasClient categorias={categorias ?? []} />
      </main>
    </div>
  );
}
