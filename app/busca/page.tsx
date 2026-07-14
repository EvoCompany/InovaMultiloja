"use client";

import { use, useMemo, useState } from "react";
import { ChevronRight, SearchX, SlidersHorizontal, X } from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { allProducts, categoryMeta } from "@/lib/products";

export default function BuscaPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = use(searchParams);
  const query = q.trim().toLowerCase();

  const [sortBy, setSortBy] = useState("relevancia");
  const [selectedCategory, setSelectedCategory] = useState<string>("todas");

  const results = useMemo(() => {
    if (!query) return [];

    let filtered = allProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query) ||
        p.categorySlug.toLowerCase().includes(query)
    );

    if (selectedCategory !== "todas") {
      filtered = filtered.filter((p) => p.categorySlug === selectedCategory);
    }

    if (sortBy === "menor-preco") filtered.sort((a, b) => a.price - b.price);
    else if (sortBy === "maior-preco") filtered.sort((a, b) => b.price - a.price);
    else if (sortBy === "novidades")
      filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));

    return filtered;
  }, [query, sortBy, selectedCategory]);

  // Categorias que apareceram nos resultados (antes do filtro de categoria)
  const categoriesInResults = useMemo(() => {
    if (!query) return [];
    const slugs = new Set(
      allProducts
        .filter(
          (p) =>
            p.name.toLowerCase().includes(query) ||
            p.category.toLowerCase().includes(query) ||
            p.categorySlug.toLowerCase().includes(query)
        )
        .map((p) => p.categorySlug)
    );
    return Array.from(slugs);
  }, [query]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Banner */}
        <div className="bg-gradient-to-r from-secondary/15 via-primary/10 to-primary/20 border-b border-border">
          <div className="container mx-auto px-4 py-8">
            <nav className="flex items-center gap-1.5 text-sm text-muted-foreground mb-3">
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground font-medium">Busca</span>
            </nav>
            <div className="flex items-center gap-4">
              <div className="h-12 w-1.5 rounded-full bg-secondary flex-shrink-0" />
              <div>
                <h1 className="font-serif text-2xl font-bold text-foreground md:text-3xl">
                  Resultados para{" "}
                  <span className="text-primary">&ldquo;{q}&rdquo;</span>
                </h1>
                <p className="text-muted-foreground mt-1 text-sm">
                  {results.length > 0
                    ? `${results.length} produto${results.length !== 1 ? "s" : ""} encontrado${results.length !== 1 ? "s" : ""}`
                    : "Nenhum produto encontrado"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {query === "" ? (
            <div className="flex flex-col items-center justify-center py-24 text-center gap-4">
              <div className="rounded-full bg-muted p-6">
                <SearchX className="h-10 w-10 text-muted-foreground" />
              </div>
              <p className="font-semibold text-foreground text-lg">
                Digite algo para buscar
              </p>
              <p className="text-muted-foreground text-sm">
                Use a barra de busca no topo da página
              </p>
            </div>
          ) : results.length === 0 && selectedCategory === "todas" ? (
            <div className="flex flex-col items-center justify-center py-24 text-center gap-4">
              <div className="rounded-full bg-muted p-6">
                <SearchX className="h-10 w-10 text-muted-foreground" />
              </div>
              <p className="font-semibold text-foreground text-lg">
                Nenhum resultado para &ldquo;{q}&rdquo;
              </p>
              <p className="text-muted-foreground text-sm">
                Tente palavras diferentes ou navegue pelas categorias
              </p>
              <div className="flex flex-wrap justify-center gap-2 mt-2">
                {Object.entries(categoryMeta).map(([slug, meta]) => (
                  <Link
                    key={slug}
                    href={`/${slug}`}
                    className="rounded-full border border-border px-4 py-1.5 text-sm text-foreground hover:border-primary hover:text-primary transition-colors"
                  >
                    {meta.label}
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex gap-8">
              {/* Sidebar filtro por categoria */}
              {categoriesInResults.length > 1 && (
                <aside className="hidden lg:block w-52 flex-shrink-0">
                  <div className="sticky top-24 rounded-xl border border-border bg-card p-5 shadow-sm">
                    <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border">
                      <SlidersHorizontal className="h-4 w-4 text-primary" />
                      <h2 className="font-semibold text-foreground text-sm">
                        Categoria
                      </h2>
                    </div>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 cursor-pointer group">
                        <input
                          type="radio"
                          name="cat"
                          value="todas"
                          checked={selectedCategory === "todas"}
                          onChange={() => setSelectedCategory("todas")}
                          className="accent-primary"
                        />
                        <span className="text-sm text-foreground group-hover:text-primary transition-colors">
                          Todas
                        </span>
                      </label>
                      {categoriesInResults.map((slug) => (
                        <label
                          key={slug}
                          className="flex items-center gap-2 cursor-pointer group"
                        >
                          <input
                            type="radio"
                            name="cat"
                            value={slug}
                            checked={selectedCategory === slug}
                            onChange={() => setSelectedCategory(slug)}
                            className="accent-primary"
                          />
                          <span className="text-sm text-foreground group-hover:text-primary transition-colors">
                            {categoryMeta[slug]?.label ?? slug}
                          </span>
                        </label>
                      ))}
                    </div>
                    {selectedCategory !== "todas" && (
                      <button
                        onClick={() => setSelectedCategory("todas")}
                        className="mt-4 flex items-center gap-1 text-xs text-secondary hover:underline"
                      >
                        <X className="h-3 w-3" /> Limpar filtro
                      </button>
                    )}
                  </div>
                </aside>
              )}

              {/* Resultados */}
              <div className="flex-1 min-w-0">
                {/* Barra de ordenação */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-border">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">
                      {results.length}
                    </span>{" "}
                    produto{results.length !== 1 ? "s" : ""} encontrado
                    {results.length !== 1 ? "s" : ""}
                  </p>
                  <div className="flex items-center gap-2">
                    <label className="text-sm text-muted-foreground whitespace-nowrap">
                      Ordenar por:
                    </label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="rounded-lg border border-border bg-card px-3 py-1.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                    >
                      <option value="relevancia">Relevância</option>
                      <option value="menor-preco">Menor Preço</option>
                      <option value="maior-preco">Maior Preço</option>
                      <option value="novidades">Novidades</option>
                    </select>
                  </div>
                </div>

                {results.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center gap-3">
                    <p className="text-muted-foreground text-sm">
                      Nenhum produto nesta categoria para &ldquo;{q}&rdquo;
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedCategory("todas")}
                    >
                      Ver todos os resultados
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4 md:gap-4">
                    {results.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
