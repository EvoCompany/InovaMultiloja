"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Plus, Pencil, Trash2, Check, X, Tag } from "lucide-react";

interface Categoria {
  id: string;
  nome: string;
  slug: string;
  parent_id: string | null;
  imagem_url: string | null;
  ordem: number;
  ativo: boolean;
}

interface FormState {
  nome: string;
  slug: string;
  parent_id: string;
  imagem_url: string;
  ordem: number;
  ativo: boolean;
}

const emptyForm = (): FormState => ({
  nome: "",
  slug: "",
  parent_id: "",
  imagem_url: "",
  ordem: 0,
  ativo: true,
});

function toSlug(nome: string) {
  return nome
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function CategoriasClient({ categorias: initial }: { categorias: Categoria[] }) {
  const router = useRouter();
  const [categorias, setCategorias] = useState(initial);
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

  const openEdit = (c: Categoria) => {
    setEditingId(c.id);
    setForm({
      nome: c.nome,
      slug: c.slug,
      parent_id: c.parent_id ?? "",
      imagem_url: c.imagem_url ?? "",
      ordem: c.ordem,
      ativo: c.ativo,
    });
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
      parent_id: form.parent_id || null,
      imagem_url: form.imagem_url.trim() || null,
      ordem: form.ordem,
      ativo: form.ativo,
    };

    if (editingId) {
      const { error: err } = await supabase.from("categorias").update(payload).eq("id", editingId);
      if (err) { setError(err.message); setSaving(false); return; }
      setCategorias((prev) => prev.map((c) => c.id === editingId ? { ...c, ...payload, id: editingId } : c));
    } else {
      const { data, error: err } = await supabase.from("categorias").insert(payload).select().single();
      if (err) { setError(err.message); setSaving(false); return; }
      if (data) setCategorias((prev) => [...prev, data]);
    }

    await fetch("/api/revalidate", { method: "POST" });
    router.refresh();
    cancel();
    setSaving(false);
  };

  const handleDelete = async (id: string, nome: string) => {
    if (!confirm(`Excluir categoria "${nome}"? Os produtos desta categoria ficarão sem categoria.`)) return;
    setDeletingId(id);
    const supabase = createClient();
    await supabase.from("categorias").delete().eq("id", id);
    await fetch("/api/revalidate", { method: "POST" });
    setCategorias((prev) => prev.filter((c) => c.id !== id));
    router.refresh();
    setDeletingId(null);
  };

  const rootCategorias = categorias.filter((c) => !c.parent_id);
  const subCategorias = categorias.filter((c) => !!c.parent_id);

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button
          onClick={openCreate}
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-secondary to-primary text-primary-foreground px-4 py-2.5 text-sm font-semibold shadow-sm"
        >
          <Plus className="h-4 w-4" />Nova Categoria
        </button>
      </div>

      {showForm && (
        <div className="rounded-xl border border-primary/30 bg-card p-6 shadow-sm space-y-4">
          <h3 className="font-semibold text-foreground">{editingId ? "Editar Categoria" : "Nova Categoria"}</h3>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground block mb-1.5">Nome *</label>
              <input
                type="text"
                value={form.nome}
                onChange={(e) => handleNomeChange(e.target.value)}
                placeholder="Ex: Eletrônicos"
                className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground block mb-1.5">Slug (URL) *</label>
              <input
                type="text"
                value={form.slug}
                onChange={(e) => { setSlugManual(true); set("slug", e.target.value); }}
                placeholder="eletronicos"
                className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground block mb-1.5">Categoria Pai</label>
              <select
                value={form.parent_id}
                onChange={(e) => set("parent_id", e.target.value)}
                className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              >
                <option value="">— Nenhuma (raiz) —</option>
                {rootCategorias
                  .filter((c) => c.id !== editingId)
                  .map((c) => (
                    <option key={c.id} value={c.id}>{c.nome}</option>
                  ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground block mb-1.5">Ordem</label>
              <input
                type="number"
                min="0"
                value={form.ordem}
                onChange={(e) => set("ordem", parseInt(e.target.value) || 0)}
                className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground block mb-1.5">URL da Imagem</label>
            <input
              type="url"
              value={form.imagem_url}
              onChange={(e) => set("imagem_url", e.target.value)}
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
            <span className="text-sm text-foreground">Categoria <strong>ativa</strong></span>
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

      {categorias.length === 0 ? (
        <div className="rounded-xl border border-border bg-card p-16 text-center">
          <Tag className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground text-sm">Nenhuma categoria cadastrada ainda.</p>
        </div>
      ) : (
        <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Nome</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden sm:table-cell">Slug</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden md:table-cell">Pai</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden sm:table-cell">Ordem</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Status</th>
                <th className="text-right px-4 py-3 font-medium text-muted-foreground">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {categorias.map((c) => {
                const pai = categorias.find((x) => x.id === c.parent_id);
                return (
                  <tr key={c.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3 font-medium text-foreground">
                      {c.parent_id && <span className="mr-2 text-muted-foreground">└</span>}
                      {c.nome}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground font-mono text-xs hidden sm:table-cell">{c.slug}</td>
                    <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{pai?.nome ?? "—"}</td>
                    <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">{c.ordem}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${c.ativo ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
                        {c.ativo ? "Ativa" : "Inativa"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEdit(c)}
                          className="flex items-center gap-1 rounded-lg border border-border px-2.5 py-1.5 text-xs font-medium text-foreground hover:bg-muted transition-colors"
                        >
                          <Pencil className="h-3 w-3" />Editar
                        </button>
                        <button
                          onClick={() => handleDelete(c.id, c.nome)}
                          disabled={deletingId === c.id}
                          className="flex items-center gap-1 rounded-lg border border-red-200 px-2.5 py-1.5 text-xs font-medium text-red-500 hover:bg-red-50 transition-colors disabled:opacity-50"
                        >
                          <Trash2 className="h-3 w-3" />
                          {deletingId === c.id ? "..." : "Excluir"}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="px-4 py-3 border-t border-border bg-muted/20 text-xs text-muted-foreground">
            {categorias.length} categoria(s) · {subCategorias.length} subcategoria(s)
          </div>
        </div>
      )}
    </div>
  );
}
