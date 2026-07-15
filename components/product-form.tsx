"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Upload, X, ImageIcon, Plus, Trash2 } from "lucide-react";
import type { Categoria, Marca } from "@/lib/types";

interface FormData {
  id?: string;
  nome: string;
  slug: string;
  sku: string;
  descricaoCurta: string;
  descricaoLonga: string;
  categoriaId: string;
  marcaId: string;
  preco: number;
  precoPromocional: number | null;
  estoque: number;
  imagemUrl: string;
  imagensExtras: string[];
  especificacoes: { key: string; value: string }[];
  seoTitle: string;
  seoDescription: string;
  destaque: boolean;
  disponivel: boolean;
}

interface Props {
  initial?: Partial<FormData>;
  mode: "create" | "edit";
  categorias: Categoria[];
  marcas: Marca[];
  featuredCount: number;
}

type Tab = "dados" | "imagens" | "specs" | "seo";

export function ProductForm({ initial, mode, categorias, marcas, featuredCount }: Props) {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const extraFileRef = useRef<HTMLInputElement>(null);
  const [activeTab, setActiveTab] = useState<Tab>("dados");
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(mode === "edit");

  const [form, setForm] = useState<FormData>({
    nome: "",
    slug: "",
    sku: "",
    descricaoCurta: "",
    descricaoLonga: "",
    categoriaId: categorias[0]?.id ?? "",
    marcaId: "",
    preco: 0,
    precoPromocional: null,
    estoque: 0,
    imagemUrl: "",
    imagensExtras: [],
    especificacoes: [],
    seoTitle: "",
    seoDescription: "",
    destaque: false,
    disponivel: true,
    ...initial,
    especificacoes: initial?.especificacoes ?? [],
  });

  const [uploading, setUploading] = useState(false);
  const [uploadingExtra, setUploadingExtra] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [previewUrl, setPreviewUrl] = useState(initial?.imagemUrl ?? "");

  const set = <K extends keyof FormData>(key: K, value: FormData[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  useEffect(() => {
    if (!slugManuallyEdited && form.nome) {
      const slug = form.nome
        .toLowerCase()
        .normalize("NFD")
        .replace(/[̀-ͯ]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
      set("slug", slug);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.nome, slugManuallyEdited]);

  const desconto =
    form.precoPromocional && form.preco > 0 && form.preco > form.precoPromocional
      ? Math.round((1 - form.precoPromocional / form.preco) * 100)
      : null;

  const featuredDisabled =
    featuredCount >= 10 && !form.destaque;

  const uploadImage = async (file: File): Promise<string | null> => {
    const supabase = createClient();
    const ext = file.name.split(".").pop();
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const { error: err } = await supabase.storage.from("product-images").upload(filename, file, { upsert: true });
    if (err) return null;
    const { data } = supabase.storage.from("product-images").getPublicUrl(filename);
    return data.publicUrl;
  };

  const handleFileUpload = async (file: File) => {
    setUploading(true);
    setError("");
    const url = await uploadImage(file);
    if (!url) { setError("Erro ao fazer upload."); setUploading(false); return; }
    set("imagemUrl", url);
    setPreviewUrl(url);
    setUploading(false);
  };

  const handleExtraUpload = async (file: File) => {
    setUploadingExtra(true);
    const url = await uploadImage(file);
    if (url) set("imagensExtras", [...form.imagensExtras, url]);
    setUploadingExtra(false);
  };

  const removeExtra = (i: number) => {
    set("imagensExtras", form.imagensExtras.filter((_, idx) => idx !== i));
  };

  const addSpec = () => set("especificacoes", [...form.especificacoes, { key: "", value: "" }]);
  const removeSpec = (i: number) => set("especificacoes", form.especificacoes.filter((_, idx) => idx !== i));
  const updateSpec = (i: number, field: "key" | "value", value: string) => {
    const updated = [...form.especificacoes];
    updated[i] = { ...updated[i], [field]: value };
    set("especificacoes", updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nome.trim()) { setError("Nome é obrigatório."); setActiveTab("dados"); return; }
    if (!form.preco || form.preco <= 0) { setError("Preço inválido."); setActiveTab("dados"); return; }

    setSaving(true);
    setError("");
    const supabase = createClient();

    const especificacoesObj = Object.fromEntries(
      form.especificacoes.filter((s) => s.key.trim()).map((s) => [s.key.trim(), s.value])
    );

    const payload = {
      nome: form.nome.trim(),
      slug: form.slug.trim() || form.nome.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      sku: form.sku.trim() || null,
      descricao_curta: form.descricaoCurta.trim() || null,
      descricao_longa: form.descricaoLonga.trim() || null,
      categoria_id: form.categoriaId || null,
      marca_id: form.marcaId || null,
      preco: form.preco,
      preco_promocional: form.precoPromocional || null,
      estoque: form.estoque,
      imagem_url: form.imagemUrl || null,
      imagens_extras: form.imagensExtras,
      especificacoes: especificacoesObj,
      seo_title: form.seoTitle.trim() || null,
      seo_description: form.seoDescription.trim() || null,
      destaque: form.destaque,
      disponivel: form.disponivel,
    };

    let err;
    if (mode === "create") {
      ({ error: err } = await supabase.from("produtos").insert(payload));
    } else {
      ({ error: err } = await supabase.from("produtos").update(payload).eq("id", initial!.id));
    }

    if (err) {
      setError(err.message || "Erro ao salvar produto. Tente novamente.");
      setSaving(false);
      return;
    }

    await fetch("/api/revalidate", { method: "POST" });
    router.push("/admin/produtos");
    router.refresh();
  };

  const tabs: { id: Tab; label: string }[] = [
    { id: "dados", label: "Dados" },
    { id: "imagens", label: "Imagens" },
    { id: "specs", label: "Specs" },
    { id: "seo", label: "SEO" },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      {/* Tabs */}
      <div className="flex border-b border-border">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setActiveTab(t.id)}
            className={`px-5 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors ${
              activeTab === t.id
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* ── Tab: DADOS ── */}
      {activeTab === "dados" && (
        <div className="space-y-5">
          <div className="rounded-xl border border-border bg-card p-6 space-y-4">
            <h3 className="font-semibold text-foreground">Identificação</h3>
            <div>
              <label className="text-sm font-medium text-foreground block mb-1.5">Nome do Produto *</label>
              <input type="text" required value={form.nome} onChange={(e) => set("nome", e.target.value)} placeholder="Ex: iPhone 16 Pro 256GB Preto" className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground block mb-1.5">Slug (URL)</label>
                <input
                  type="text"
                  value={form.slug}
                  onChange={(e) => { setSlugManuallyEdited(true); set("slug", e.target.value); }}
                  placeholder="gerado-automaticamente"
                  className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-1.5">SKU</label>
                <input type="text" value={form.sku} onChange={(e) => set("sku", e.target.value)} placeholder="Ex: APL-IP16-BLK" className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground block mb-1.5">Descrição Curta</label>
              <textarea rows={2} value={form.descricaoCurta} onChange={(e) => set("descricaoCurta", e.target.value)} placeholder="Resumo em 1-2 linhas para listagens" className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none" />
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-6 space-y-4">
            <h3 className="font-semibold text-foreground">Categoria & Marca</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground block mb-1.5">Categoria</label>
                <select value={form.categoriaId} onChange={(e) => set("categoriaId", e.target.value)} className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30">
                  <option value="">— Sem categoria —</option>
                  {categorias.map((c) => <option key={c.id} value={c.id}>{c.nome}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-1.5">Marca</label>
                <select value={form.marcaId} onChange={(e) => set("marcaId", e.target.value)} className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30">
                  <option value="">— Sem marca —</option>
                  {marcas.map((m) => <option key={m.id} value={m.id}>{m.nome}</option>)}
                </select>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-6 space-y-4">
            <h3 className="font-semibold text-foreground">Preços & Estoque</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground block mb-1.5">Preço (R$) *</label>
                <input type="number" required min="0" step="0.01" value={form.preco || ""} onChange={(e) => set("preco", parseFloat(e.target.value) || 0)} placeholder="0,00" className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-1.5">
                  Preço Promocional <span className="text-xs text-muted-foreground font-normal">(venda)</span>
                </label>
                <input type="number" min="0" step="0.01" value={form.precoPromocional ?? ""} onChange={(e) => set("precoPromocional", e.target.value ? parseFloat(e.target.value) : null)} placeholder="Opcional" className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-1.5">
                  Desconto
                  {desconto !== null && <span className="ml-1.5 text-xs font-normal text-green-600">auto</span>}
                </label>
                <div className={`w-full rounded-xl border px-4 py-2.5 text-sm flex items-center gap-2 ${desconto !== null ? "border-green-300 bg-green-50 text-green-700 font-semibold" : "border-border bg-muted/50 text-muted-foreground"}`}>
                  {desconto !== null ? <><span className="text-lg">{desconto}%</span><span className="text-xs font-normal text-green-600">OFF</span></> : <span className="text-xs">Preencha os preços</span>}
                </div>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground block mb-1.5">Estoque</label>
              <input type="number" min="0" value={form.estoque} onChange={(e) => set("estoque", parseInt(e.target.value) || 0)} className="w-40 rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-6 space-y-3">
            <h3 className="font-semibold text-foreground">Configurações</h3>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={form.disponivel} onChange={(e) => set("disponivel", e.target.checked)} className="h-4 w-4 rounded border-border accent-primary" />
              <span className="text-sm text-foreground">Produto <strong>disponível</strong> para venda</span>
            </label>
            <label className={`flex items-start gap-3 ${featuredDisabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"}`}>
              <input type="checkbox" checked={form.destaque} onChange={(e) => set("destaque", e.target.checked)} disabled={featuredDisabled} className="h-4 w-4 rounded border-border accent-primary mt-0.5" />
              <div>
                <span className="text-sm text-foreground">Exibir em <strong>Destaque</strong> na home</span>
                {featuredDisabled && (
                  <p className="text-xs text-orange-600 mt-0.5">Limite de 10 destaques atingido. Remova um para adicionar.</p>
                )}
              </div>
            </label>
          </div>
        </div>
      )}

      {/* ── Tab: IMAGENS ── */}
      {activeTab === "imagens" && (
        <div className="space-y-5">
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="font-semibold text-foreground mb-4">Imagem Principal</h3>
            {previewUrl ? (
              <div className="relative mb-4 h-48 w-48 rounded-xl overflow-hidden border border-border bg-muted">
                <Image src={previewUrl} alt="Preview" fill className="object-contain p-2" unoptimized />
                <button type="button" onClick={() => { set("imagemUrl", ""); setPreviewUrl(""); }} className="absolute top-2 right-2 rounded-full bg-card/90 p-1 text-muted-foreground hover:text-red-500">
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <button type="button" onClick={() => fileRef.current?.click()} className="mb-4 flex h-48 w-48 flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border bg-muted/40 text-muted-foreground hover:border-primary hover:text-primary transition-colors">
                <ImageIcon className="h-8 w-8" />
                <span className="text-xs text-center px-2">Clique para enviar</span>
              </button>
            )}
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])} />
            <div className="flex gap-3 flex-wrap">
              <Button type="button" variant="outline" size="sm" onClick={() => fileRef.current?.click()} disabled={uploading} className="flex items-center gap-2">
                <Upload className="h-4 w-4" />{uploading ? "Enviando..." : "Enviar do computador"}
              </Button>
            </div>
            <div className="mt-4">
              <label className="text-xs text-muted-foreground block mb-1">Ou cole a URL:</label>
              <input type="url" value={form.imagemUrl.startsWith("http") && !form.imagemUrl.includes("supabase") ? form.imagemUrl : ""} onChange={(e) => { set("imagemUrl", e.target.value); setPreviewUrl(e.target.value); }} placeholder="https://..." className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="font-semibold text-foreground mb-4">Imagens Extras (galeria)</h3>
            <div className="flex flex-wrap gap-3 mb-4">
              {form.imagensExtras.map((url, i) => (
                <div key={i} className="relative h-24 w-24 rounded-xl overflow-hidden border border-border bg-muted">
                  <Image src={url} alt={`Extra ${i + 1}`} fill className="object-contain p-1" unoptimized />
                  <button type="button" onClick={() => removeExtra(i)} className="absolute top-1 right-1 rounded-full bg-card/90 p-0.5 text-muted-foreground hover:text-red-500">
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
            <input ref={extraFileRef} type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleExtraUpload(e.target.files[0])} />
            <Button type="button" variant="outline" size="sm" onClick={() => extraFileRef.current?.click()} disabled={uploadingExtra} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />{uploadingExtra ? "Enviando..." : "Adicionar imagem"}
            </Button>
          </div>
        </div>
      )}

      {/* ── Tab: SPECS ── */}
      {activeTab === "specs" && (
        <div className="space-y-5">
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="font-semibold text-foreground mb-4">Descrição Longa</h3>
            <textarea rows={8} value={form.descricaoLonga} onChange={(e) => set("descricaoLonga", e.target.value)} placeholder="Descrição completa do produto..." className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none" />
          </div>

          <div className="rounded-xl border border-border bg-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground">Especificações Técnicas</h3>
              <Button type="button" variant="outline" size="sm" onClick={addSpec} className="flex items-center gap-1">
                <Plus className="h-3.5 w-3.5" />Adicionar
              </Button>
            </div>
            {form.especificacoes.length === 0 ? (
              <p className="text-sm text-muted-foreground">Nenhuma especificação. Clique em &quot;Adicionar&quot; para incluir.</p>
            ) : (
              <div className="space-y-2">
                {form.especificacoes.map((spec, i) => (
                  <div key={i} className="flex gap-2 items-center">
                    <input type="text" value={spec.key} onChange={(e) => updateSpec(i, "key", e.target.value)} placeholder="Propriedade (ex: RAM)" className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
                    <input type="text" value={spec.value} onChange={(e) => updateSpec(i, "value", e.target.value)} placeholder="Valor (ex: 16GB)" className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
                    <button type="button" onClick={() => removeSpec(i)} className="text-muted-foreground hover:text-red-500 flex-shrink-0">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Tab: SEO ── */}
      {activeTab === "seo" && (
        <div className="rounded-xl border border-border bg-card p-6 space-y-4">
          <h3 className="font-semibold text-foreground">SEO</h3>
          <div>
            <label className="text-sm font-medium text-foreground block mb-1.5">
              Título SEO <span className="text-xs text-muted-foreground font-normal">({form.seoTitle.length}/60)</span>
            </label>
            <input type="text" maxLength={60} value={form.seoTitle} onChange={(e) => set("seoTitle", e.target.value)} placeholder={form.nome || "Título para o Google"} className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground block mb-1.5">
              Descrição SEO <span className="text-xs text-muted-foreground font-normal">({form.seoDescription.length}/160)</span>
            </label>
            <textarea rows={3} maxLength={160} value={form.seoDescription} onChange={(e) => set("seoDescription", e.target.value)} placeholder="Descrição para o Google (até 160 caracteres)" className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none" />
          </div>

          {(form.seoTitle || form.seoDescription) && (
            <div className="rounded-xl border border-border bg-muted/30 p-4">
              <p className="text-xs text-muted-foreground mb-2 font-medium">Preview Google</p>
              <p className="text-primary text-sm font-medium line-clamp-1">{form.seoTitle || form.nome}</p>
              <p className="text-green-700 text-xs mt-0.5">inova-multiloja.vercel.app › produto › {form.slug}</p>
              <p className="text-muted-foreground text-xs mt-1 line-clamp-2">{form.seoDescription || form.descricaoCurta}</p>
            </div>
          )}
        </div>
      )}

      {error && <p className="text-sm text-red-500 bg-red-50 rounded-xl px-4 py-3">{error}</p>}

      <div className="flex gap-3">
        <Button type="submit" disabled={saving || uploading} className="bg-gradient-to-r from-secondary to-primary text-primary-foreground font-semibold px-8">
          {saving ? "Salvando..." : mode === "create" ? "Adicionar Produto" : "Salvar Alterações"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.push("/admin/produtos")}>Cancelar</Button>
      </div>
    </form>
  );
}
