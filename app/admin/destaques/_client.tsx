"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Star, StarOff, Package, Search, X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface Product {
  id: string;
  nome: string;
  preco: number;
  preco_promocional: number | null;
  imagem_url: string | null;
  categorias: { slug: string } | null;
  destaque: boolean;
}

const MAX_FEATURED = 10;

export function DestaquesClient({ products }: { products: Product[] }) {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const filtered = query.trim()
    ? products.filter((p) => p.nome.toLowerCase().includes(query.toLowerCase()))
    : products;

  const featured = filtered.filter((p) => p.destaque);
  const others = filtered.filter((p) => !p.destaque);
  const atLimit = featured.length >= MAX_FEATURED;

  const toggle = async (id: string, currentFeatured: boolean) => {
    if (!currentFeatured && atLimit) return;
    setLoading(id);
    const supabase = createClient();
    await supabase.from("produtos").update({ destaque: !currentFeatured }).eq("id", id);
    await fetch("/api/revalidate", { method: "POST" });
    router.refresh();
    setLoading(null);
  };

  const ProductRow = ({ p, isFeatured }: { p: Product; isFeatured: boolean }) => {
    const preco = p.preco_promocional ?? p.preco;
    return (
      <tr className={`transition-colors ${!isFeatured && atLimit ? "opacity-50" : "hover:bg-muted/30"}`}>
        <td className="px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-muted overflow-hidden flex-shrink-0">
              {p.imagem_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={p.imagem_url} alt={p.nome} className="h-full w-full object-cover" />
              ) : (
                <Package className="h-5 w-5 text-muted-foreground m-2.5" />
              )}
            </div>
            <div>
              <p className="font-medium text-foreground line-clamp-1">{p.nome}</p>
              {p.categorias?.slug && (
                <p className="text-xs text-muted-foreground">{p.categorias.slug}</p>
              )}
            </div>
          </div>
        </td>
        <td className="px-4 py-3 text-sm text-muted-foreground hidden sm:table-cell">
          R$ {Number(preco).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
        </td>
        <td className="px-4 py-3 text-right">
          {isFeatured ? (
            <button
              onClick={() => toggle(p.id, true)}
              disabled={loading === p.id}
              className="flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-500 hover:bg-red-50 transition-colors disabled:opacity-50 ml-auto"
            >
              <StarOff className="h-3.5 w-3.5" />
              {loading === p.id ? "..." : "Remover"}
            </button>
          ) : (
            <button
              onClick={() => toggle(p.id, false)}
              disabled={loading === p.id || atLimit}
              title={atLimit ? "Limite de 10 destaques atingido" : undefined}
              className="flex items-center gap-1.5 rounded-lg border border-secondary/40 px-3 py-1.5 text-xs font-medium text-secondary hover:bg-secondary/10 transition-colors disabled:opacity-40 disabled:cursor-not-allowed ml-auto"
            >
              <Star className="h-3.5 w-3.5" />
              {loading === p.id ? "..." : "Adicionar"}
            </button>
          )}
        </td>
      </tr>
    );
  };

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar por nome..."
          className="w-full rounded-xl border border-border bg-card pl-10 pr-10 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
        {query && (
          <button onClick={() => setQuery("")} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      <div className="space-y-10">
      <section>
        <div className="flex items-center gap-3 mb-4">
          <h2 className="font-semibold text-foreground">Em Destaque</h2>
          <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
            atLimit ? "bg-orange-100 text-orange-700" : "bg-primary/10 text-primary"
          }`}>
            {featured.length}/{MAX_FEATURED}
          </span>
          {atLimit && (
            <span className="text-xs text-orange-600 font-medium">Limite atingido</span>
          )}
        </div>

        {featured.length === 0 ? (
          <div className="rounded-xl border border-border bg-card p-10 text-center">
            <Star className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-muted-foreground text-sm">Nenhum produto em destaque ainda.</p>
          </div>
        ) : (
          <div className="rounded-xl border border-border bg-card overflow-hidden shadow-sm">
            <table className="w-full text-sm">
              <tbody className="divide-y divide-border">
                {featured.map((p) => <ProductRow key={p.id} p={p} isFeatured={true} />)}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section>
        <div className="flex items-center gap-3 mb-4">
          <h2 className="font-semibold text-foreground">Outros Produtos</h2>
          <span className="text-xs text-muted-foreground">
            {atLimit
              ? "Remova um destaque para liberar vaga"
              : `${MAX_FEATURED - featured.length} vaga${MAX_FEATURED - featured.length !== 1 ? "s" : ""} disponível${MAX_FEATURED - featured.length !== 1 ? "is" : ""}`}
          </span>
        </div>

        {others.length === 0 ? (
          <p className="text-muted-foreground text-sm">Todos os produtos estão em destaque.</p>
        ) : (
          <div className="rounded-xl border border-border bg-card overflow-hidden shadow-sm">
            <table className="w-full text-sm">
              <tbody className="divide-y divide-border">
                {others.map((p) => <ProductRow key={p.id} p={p} isFeatured={false} />)}
              </tbody>
            </table>
          </div>
        )}
      </section>
      </div>
    </div>
  );
}
