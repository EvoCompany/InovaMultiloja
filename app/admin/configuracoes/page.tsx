import { createClient } from "@/lib/supabase/server";
import { AdminSidebar } from "@/components/admin-sidebar";
import { Settings } from "lucide-react";
import { ConfiguracoesClient } from "./_client";

export default async function AdminConfiguracoesPage() {
  const supabase = await createClient();
  const { data: configs } = await supabase
    .from("configuracoes")
    .select("key, value");

  const map: Record<string, string> = {};
  for (const c of configs ?? []) map[c.key] = c.value;

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />

      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground font-serif flex items-center gap-2">
            <Settings className="h-6 w-6 text-primary" />
            Configurações
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Ajustes gerais da loja.
          </p>
        </div>

        <ConfiguracoesClient
          whatsappNumero={map["whatsapp_numero"] ?? ""}
          facebookPixelId={map["facebook_pixel_id"] ?? ""}
          nomeLojaDisplay={map["nome_loja"] ?? ""}
        />
      </main>
    </div>
  );
}
