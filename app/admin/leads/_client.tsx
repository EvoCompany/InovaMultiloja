"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { User, Phone, Mail, MessageSquare, Trash2, ChevronDown } from "lucide-react";

type LeadStatus = "novo" | "em_contato" | "fechado" | "perdido";

interface Lead {
  id: string;
  nome: string | null;
  email: string | null;
  telefone: string | null;
  mensagem: string | null;
  produto_id: string | null;
  status: LeadStatus;
  created_at: string;
}

const COLUMNS: { id: LeadStatus; label: string; color: string; bg: string }[] = [
  { id: "novo", label: "Novo", color: "text-blue-700", bg: "bg-blue-50 border-blue-200" },
  { id: "em_contato", label: "Em Contato", color: "text-yellow-700", bg: "bg-yellow-50 border-yellow-200" },
  { id: "fechado", label: "Fechado", color: "text-green-700", bg: "bg-green-50 border-green-200" },
  { id: "perdido", label: "Perdido", color: "text-red-700", bg: "bg-red-50 border-red-200" },
];

export function LeadsClient({ leads: initial }: { leads: Lead[] }) {
  const router = useRouter();
  const [leads, setLeads] = useState(initial);
  const [movingId, setMovingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const moveStatus = async (id: string, status: LeadStatus) => {
    setMovingId(id);
    const supabase = createClient();
    await supabase.from("leads").update({ status }).eq("id", id);
    setLeads((prev) => prev.map((l) => l.id === id ? { ...l, status } : l));
    router.refresh();
    setMovingId(null);
  };

  const deleteLead = async (id: string) => {
    if (!confirm("Excluir este lead? Esta ação não pode ser desfeita.")) return;
    setDeletingId(id);
    const supabase = createClient();
    await supabase.from("leads").delete().eq("id", id);
    setLeads((prev) => prev.filter((l) => l.id !== id));
    router.refresh();
    setDeletingId(null);
  };

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" });

  const LeadCard = ({ lead }: { lead: Lead }) => {
    const expanded = expandedId === lead.id;
    const otherStatuses = COLUMNS.filter((c) => c.id !== lead.status);

    return (
      <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
        <div
          className="p-4 cursor-pointer hover:bg-muted/30 transition-colors"
          onClick={() => setExpandedId(expanded ? null : lead.id)}
        >
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <User className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
                <p className="font-medium text-foreground text-sm truncate">{lead.nome ?? "Sem nome"}</p>
              </div>
              {lead.telefone && (
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Phone className="h-3 w-3 flex-shrink-0" />
                  <span>{lead.telefone}</span>
                </div>
              )}
              {lead.email && (
                <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                  <Mail className="h-3 w-3 flex-shrink-0" />
                  <span className="truncate">{lead.email}</span>
                </div>
              )}
            </div>
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <span className="text-[10px] text-muted-foreground">{formatDate(lead.created_at)}</span>
              <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${expanded ? "rotate-180" : ""}`} />
            </div>
          </div>

          {lead.mensagem && !expanded && (
            <p className="mt-2 text-xs text-muted-foreground line-clamp-2 flex items-start gap-1.5">
              <MessageSquare className="h-3 w-3 mt-0.5 flex-shrink-0" />
              {lead.mensagem}
            </p>
          )}
        </div>

        {expanded && (
          <div className="border-t border-border bg-muted/20 p-4 space-y-3">
            {lead.mensagem && (
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-1">Mensagem</p>
                <p className="text-sm text-foreground">{lead.mensagem}</p>
              </div>
            )}
            {lead.produto_id && (
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-1">Produto ID</p>
                <p className="text-xs font-mono text-foreground">{lead.produto_id}</p>
              </div>
            )}

            <div>
              <p className="text-xs font-medium text-muted-foreground mb-2">Mover para</p>
              <div className="flex flex-wrap gap-2">
                {otherStatuses.map((col) => (
                  <button
                    key={col.id}
                    onClick={() => moveStatus(lead.id, col.id)}
                    disabled={movingId === lead.id}
                    className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors disabled:opacity-50 ${col.bg} ${col.color}`}
                  >
                    {movingId === lead.id ? "..." : col.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-end pt-1">
              <button
                onClick={() => deleteLead(lead.id)}
                disabled={deletingId === lead.id}
                className="flex items-center gap-1 rounded-lg border border-red-200 px-2.5 py-1.5 text-xs font-medium text-red-500 hover:bg-red-50 transition-colors disabled:opacity-50"
              >
                <Trash2 className="h-3 w-3" />
                {deletingId === lead.id ? "..." : "Excluir"}
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  const total = leads.length;

  if (total === 0) {
    return (
      <div className="rounded-xl border border-border bg-card p-16 text-center">
        <User className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
        <p className="text-muted-foreground text-sm">Nenhum lead recebido ainda.</p>
        <p className="text-xs text-muted-foreground mt-1">Os contatos da loja aparecerão aqui.</p>
      </div>
    );
  }

  return (
    <div>
      <p className="text-sm text-muted-foreground mb-6">
        <span className="font-semibold text-foreground">{total}</span> lead{total !== 1 ? "s" : ""} no total
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {COLUMNS.map((col) => {
          const colLeads = leads.filter((l) => l.status === col.id);
          return (
            <div key={col.id}>
              <div className={`flex items-center gap-2 mb-3 rounded-xl border px-3 py-2 ${col.bg}`}>
                <span className={`font-semibold text-sm ${col.color}`}>{col.label}</span>
                <span className={`ml-auto rounded-full px-2 py-0.5 text-xs font-bold ${col.color} bg-white/60`}>
                  {colLeads.length}
                </span>
              </div>
              <div className="space-y-3">
                {colLeads.length === 0 ? (
                  <div className="rounded-xl border border-dashed border-border p-6 text-center">
                    <p className="text-xs text-muted-foreground">Vazio</p>
                  </div>
                ) : (
                  colLeads.map((lead) => <LeadCard key={lead.id} lead={lead} />)
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
