"use client";

import { useState } from "react";
import Link from "next/link";
import { DeleteProductButton } from "./_delete-button";
import { Package, Pencil, Search, X } from "lucide-react";

interface Product {
  id: string;
  nome: string;
  preco: number;
  preco_promocional: number | null;
  imagem_url: string | null;
  categorias: { nome: string; slug: string } | null;
  destaque: boolean;
  disponivel: boolean;
  ativo: boolean;
}

export function ProductsTable({ products }: { products: Product[] }) {
  const [query, setQuery] = useState("");

  const filtered = query.trim()
    ? products.filter(
        (p) =>
          p.nome.toLowerCase().includes(query.toLowerCase()) ||
          (p.categorias?.nome ?? "").toLowerCase().includes(query.toLowerCase())
      )
    : products;

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar por nome ou categoria..."
          className="w-full rounded-xl border border-border bg-card pl-10 pr-10 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
        {query && (
          <button onClick={() => setQuery("")} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {query && (
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">{filtered.length}</span> resultado(s) para &quot;{query}&quot;
        </p>
      )}

      {filtered.length === 0 ? (
        <div className="rounded-xl border border-border bg-card p-12 text-center">
          <Search className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground text-sm">Nenhum produto encontrado para &quot;{query}&quot;</p>
          <button onClick={() => setQuery("")} className="mt-3 text-sm text-primary hover:underline">Limpar busca</button>
        </div>
      ) : (
        <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Produto</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden md:table-cell">Categoria</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Preço</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden sm:table-cell">Status</th>
                <th className="text-right px-4 py-3 font-medium text-muted-foreground">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((p) => {
                const precoEfetivo = p.preco_promocional ?? p.preco;
                return (
                  <tr key={p.id} className="hover:bg-muted/30 transition-colors">
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
                        <span className="font-medium text-foreground line-clamp-1">{p.nome}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{p.categorias?.nome ?? "—"}</td>
                    <td className="px-4 py-3 font-semibold text-foreground">
                      R$ {Number(precoEfetivo).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell">
                      <div className="flex gap-1.5 flex-wrap">
                        {p.destaque && <span className="rounded-full bg-secondary/10 text-secondary text-[10px] font-semibold px-2 py-0.5">Destaque</span>}
                        {!p.disponivel && <span className="rounded-full bg-red-100 text-red-600 text-[10px] font-semibold px-2 py-0.5">Indisponível</span>}
                        {p.disponivel && !p.destaque && <span className="text-muted-foreground text-xs">—</span>}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/admin/produtos/${p.id}/editar`} className="flex items-center gap-1 rounded-lg border border-border px-2.5 py-1.5 text-xs font-medium text-foreground hover:bg-muted transition-colors">
                          <Pencil className="h-3 w-3" />Editar
                        </Link>
                        <DeleteProductButton id={p.id} name={p.nome} />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
