import { createClient } from "@/lib/supabase/server";
import { AdminSidebar } from "@/components/admin-sidebar";
import { Star } from "lucide-react";
import { DestaquesClient } from "./_client";

export default async function AdminDestaquesPage() {
  const supabase = await createClient();
  const { data: products } = await supabase
    .from("produtos")
    .select("id, nome, preco, preco_promocional, imagem_url, categorias(slug), destaque")
    .eq("ativo", true)
    .order("destaque", { ascending: false })
    .order("nome");

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />

      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground font-serif flex items-center gap-2">
            <Star className="h-6 w-6 text-primary" />
            Destaques
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Gerencie os produtos exibidos em destaque na página inicial. Limite de 10.
          </p>
        </div>

        <DestaquesClient products={products ?? []} />
      </main>
    </div>
  );
}
