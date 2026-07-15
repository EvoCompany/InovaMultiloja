import { createClient } from "@/lib/supabase/server";
import { AdminSidebar } from "@/components/admin-sidebar";
import { Users } from "lucide-react";
import { LeadsClient } from "./_client";

export default async function AdminLeadsPage() {
  const supabase = await createClient();
  const { data: leads } = await supabase
    .from("leads")
    .select("id, nome, email, telefone, mensagem, produto_id, status, created_at")
    .order("created_at", { ascending: false });

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />

      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground font-serif flex items-center gap-2">
            <Users className="h-6 w-6 text-primary" />
            Leads
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Acompanhe e gerencie os contatos recebidos da loja.
          </p>
        </div>

        <LeadsClient leads={leads ?? []} />
      </main>
    </div>
  );
}
