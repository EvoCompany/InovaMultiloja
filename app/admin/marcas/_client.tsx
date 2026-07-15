"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Plus, Pencil, Trash2, Check, X, Award } from "lucide-react";

interface Marca {
  id: string;
  nome: string;
  slug: string;
  logo_url: string | null;
  ativo: boolean;
}

interface FormState {
  nome: string;
  slug: string;
  logo_url: string;
  ativo: boolean;
}

const emptyForm = (): FormState => ({ nome: "", slug: "", logo_url: "", ativo: true });

function toSlug(nome: string) {
  return nome
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function MarcasClient({ marcas: initial }: { marcas: Marca[] }) {
  const router = useRouter();
  const [marcas, setMarcas] = useState(initial);
  const [form, setForm] = useState<FormState>(emptyForm());
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [slugManual, setSlugManual] = useState(false);

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setForm((prev) => ({ ...prev, [k]: v }));

  const handleNomeChange = (nome: string) => {
    set("nome", nome);
    if (!slugManual) set("slug", toSlug(nome));
  };

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyForm());
    setSlugManual(false);
    setError("");
    setShowForm(true);
  };

  const openEdit = (m: Marca) => {
    setEditingId(m.id);
    setForm({ nome: m.nome, slug: m.slug, logo_url: m.logo_url ?? "", ativo: m.ativo });
    setSlugManual(true);
    setError("");
    setShowForm(true);
  };

  const cancel = () => {
    setShowForm(false);
    setEditingId(null);
    setError("");
  };

  const handleSave = async () => {
    if (!form.nome.trim()) { setError("Nome é obrigatório."); return; }
    if (!form.slug.trim()) { setError("Slug é obrigatório."); return; }
    setSaving(true);
    setError("");
    const supabase = createClient();

    const payload = {
      nome: form.nome.trim(),
      slug: form.slug.trim(),
      logo_url: form.logo_url.trim() || null,
      ativo: form.ativo,
    };

    if (editingId) {
      const { error: err } = await supabase.from("marcas").update(payload).eq("id", editingId);
      if (err) { setError(err.message); setSaving(false); return; }
      setMarcas((prev) => prev.map((m) => m.id === editingId ? { ...m, ...payload, id: editingId } : m));
    } else {
      const { data, error: err } = await supabase.from("marcas").insert(payload).select().single();
      if (err) { setError(err.message); setSaving(false); return; }
      if (data) setMarcas((prev) => [...prev, data].sort((a, b) => a.nome.localeCompare(b.nome)));
    }

    await fetch("/api/revalidate", { method: "POST" });
    router.refresh();
    cancel();
    setSaving(false);
  };

  const handleDelete = async (id: string, nome: string) => {
    if (!confirm(`Excluir marca "${nome}"? Os produtos desta marca ficarão sem marca.`)) return;
    setDeletingId(id);
    const supabase = createClient();
    await supabase.from("marcas").delete().eq("id", id);
    await fetch("/api/revalidate", { method: "POST" });
    setMarcas((prev) => prev.filter((m) => m.id !== id));
    router.refresh();
    setDeletingId(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button
          onClick={openCreate}
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-secondary to-primary text-primary-foreground px-4 py-2.5 text-sm font-semibold shadow-sm"
        >
          <Plus className="h-4 w-4" />Nova Marca
        </button>
      </div>

      {showForm && (
        <div className="rounded-xl border border-primary/30 bg-card p-6 shadow-sm space-y-4">
          <h3 className="font-semibold text-foreground">{editingId ? "Editar Marca" : "Nova Marca"}</h3>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground block mb-1.5">Nome *</label>
              <input
                type="text"
                value={form.nome}
                onChange={(e) => handleNomeChange(e.target.value)}
                placeholder="Ex: Apple"
                className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground block mb-1.5">Slug (URL) *</label>
              <input
                type="text"
                value={form.slug}
                onChange={(e) => { setSlugManual(true); set("slug", e.target.value); }}
                placeholder="apple"
                className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground block mb-1.5">URL do Logo</label>
            <input
              type="url"
              value={form.logo_url}
              onChange={(e) => set("logo_url", e.target.value)}
              placeholder="https://..."
              className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={form.ativo}
              onChange={(e) => set("ativo", e.target.checked)}
              className="h-4 w-4 rounded border-border accent-primary"
            />
            <span className="text-sm text-foreground">Marca <strong>ativa</strong></span>
          </label>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <div className="flex gap-3">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 rounded-xl bg-primary text-primary-foreground px-5 py-2 text-sm font-semibold disabled:opacity-60"
            >
              <Check className="h-4 w-4" />{saving ? "Salvando..." : "Salvar"}
            </button>
            <button
              onClick={cancel}
              className="flex items-center gap-2 rounded-xl border border-border px-5 py-2 text-sm font-medium text-foreground hover:bg-muted"
            >
              <X className="h-4 w-4" />Cancelar
            </button>
          </div>
        </div>
      )}

      {marcas.length === 0 ? (
        <div className="rounded-xl border border-border bg-card p-16 text-center">
          <Award className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground text-sm">Nenhuma marca cadastrada ainda.</p>
        </div>
      ) : (
        <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Nome</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden sm:table-cell">Slug</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden md:table-cell">Logo</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Status</th>
                <th className="text-right px-4 py-3 font-medium text-muted-foreground">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {marcas.map((m) => (
                <tr key={m.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {m.logo_url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={m.logo_url} alt={m.nome} className="h-8 w-8 object-contain rounded" />
                      ) : (
                        <div className="h-8 w-8 rounded bg-muted flex items-center justify-center">
                          <Award className="h-4 w-4 text-muted-foreground" />
                        </div>
                      )}
                      <span className="font-medium text-foreground">{m.nome}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground font-mono text-xs hidden sm:table-cell">{m.slug}</td>
                  <td className="px-4 py-3 text-muted-foreground text-xs hidden md:table-cell">
                    {m.logo_url ? (
                      <span className="text-green-600">Configurado</span>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${m.ativo ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
                      {m.ativo ? "Ativa" : "Inativa"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEdit(m)}
                        className="flex items-center gap-1 rounded-lg border border-border px-2.5 py-1.5 text-xs font-medium text-foreground hover:bg-muted transition-colors"
                      >
                        <Pencil className="h-3 w-3" />Editar
                      </button>
                      <button
                        onClick={() => handleDelete(m.id, m.nome)}
                        disabled={deletingId === m.id}
                        className="flex items-center gap-1 rounded-lg border border-red-200 px-2.5 py-1.5 text-xs font-medium text-red-500 hover:bg-red-50 transition-colors disabled:opacity-50"
                      >
                        <Trash2 className="h-3 w-3" />
                        {deletingId === m.id ? "..." : "Excluir"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="px-4 py-3 border-t border-border bg-muted/20 text-xs text-muted-foreground">
            {marcas.length} marca(s)
          </div>
        </div>
      )}
    </div>
  );
}
