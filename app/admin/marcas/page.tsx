import { createClient } from "@/lib/supabase/server";
import { AdminSidebar } from "@/components/admin-sidebar";
import { Award } from "lucide-react";
import { MarcasClient } from "./_client";

export default async function AdminMarcasPage() {
  const supabase = await createClient();
  const { data: marcas } = await supabase
    .from("marcas")
    .select("id, nome, slug, logo_url, ativo")
    .order("nome");

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />

      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground font-serif flex items-center gap-2">
            <Award className="h-6 w-6 text-primary" />
            Marcas
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Gerencie as marcas dos produtos da loja.
          </p>
        </div>

        <MarcasClient marcas={marcas ?? []} />
      </main>
    </div>
  );
}
