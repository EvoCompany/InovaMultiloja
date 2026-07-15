"use client";

import { useState, useMemo } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import type { Produto } from "@/lib/types";

interface Meta {
  label: string;
  description: string;
  brands: string[];
}

interface Props {
  meta: Meta;
  products: Produto[];
}

export function CategoryClient({ meta, products }: Props) {
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<string>("todos");
  const [sortBy, setSortBy] = useState<string>("relevancia");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (selectedBrands.length > 0) {
      result = result.filter((p) =>
        selectedBrands.includes(p.marca?.nome ?? p.categoria?.nome ?? "")
      );
    }

    if (priceRange !== "todos") {
      result = result.filter((p) => {
        const price = p.precoPromocional ?? p.preco;
        if (priceRange === "ate500") return price <= 500;
        if (priceRange === "500-2000") return price > 500 && price <= 2000;
        if (priceRange === "2000-5000") return price > 2000 && price <= 5000;
        if (priceRange === "acima5000") return price > 5000;
        return true;
      });
    }

    if (sortBy === "menor-preco")
      result.sort((a, b) => (a.precoPromocional ?? a.preco) - (b.precoPromocional ?? b.preco));
    else if (sortBy === "maior-preco")
      result.sort((a, b) => (b.precoPromocional ?? b.preco) - (a.precoPromocional ?? a.preco));
    else if (sortBy === "novidades")
      result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return result;
  }, [products, selectedBrands, priceRange, sortBy]);

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const priceRangeLabel = (v: string) => {
    if (v === "ate500") return "Até R$ 500";
    if (v === "500-2000") return "R$ 500 – R$ 2.000";
    if (v === "2000-5000") return "R$ 2.000 – R$ 5.000";
    if (v === "acima5000") return "Acima de R$ 5.000";
    return "";
  };

  const FiltersPanel = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold text-foreground mb-3 uppercase text-sm tracking-wide">Subcategoria</h3>
        <div className="space-y-2">
          {meta.brands.map((brand) => (
            <label key={brand} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedBrands.includes(brand)}
                onChange={() => toggleBrand(brand)}
                className="h-4 w-4 rounded border-border text-primary accent-primary"
              />
              <span className="text-sm text-foreground group-hover:text-primary transition-colors">{brand}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-foreground mb-3 uppercase text-sm tracking-wide">Faixa de Preço</h3>
        <div className="space-y-2">
          {[
            { value: "todos", label: "Todos" },
            { value: "ate500", label: "Até R$ 500" },
            { value: "500-2000", label: "R$ 500 – R$ 2.000" },
            { value: "2000-5000", label: "R$ 2.000 – R$ 5.000" },
            { value: "acima5000", label: "Acima de R$ 5.000" },
          ].map((opt) => (
            <label key={opt.value} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="radio"
                name="priceRange"
                value={opt.value}
                checked={priceRange === opt.value}
                onChange={() => setPriceRange(opt.value)}
                className="h-4 w-4 border-border text-primary accent-primary"
              />
              <span className="text-sm text-foreground group-hover:text-primary transition-colors">{opt.label}</span>
            </label>
          ))}
        </div>
      </div>

      {(selectedBrands.length > 0 || priceRange !== "todos") && (
        <Button variant="outline" size="sm" onClick={() => { setSelectedBrands([]); setPriceRange("todos"); }} className="w-full border-secondary text-secondary hover:bg-secondary/10">
          <X className="h-4 w-4 mr-1" /> Limpar Filtros
        </Button>
      )}
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex gap-8">
        <aside className="hidden lg:block w-56 flex-shrink-0">
          <div className="sticky top-24 rounded-xl border border-border bg-card p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-5 pb-3 border-b border-border">
              <SlidersHorizontal className="h-4 w-4 text-primary" />
              <h2 className="font-semibold text-foreground">Filtrar por</h2>
            </div>
            <FiltersPanel />
          </div>
        </aside>

        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-border">
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" onClick={() => setMobileFiltersOpen(true)} className="lg:hidden flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4" />
                Filtros
                {(selectedBrands.length > 0 || priceRange !== "todos") && (
                  <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground font-bold">
                    {selectedBrands.length + (priceRange !== "todos" ? 1 : 0)}
                  </span>
                )}
              </Button>
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">{filteredProducts.length}</span> produtos encontrados
              </p>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm text-muted-foreground whitespace-nowrap">Ordenar por:</label>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="rounded-lg border border-border bg-card px-3 py-1.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30">
                <option value="relevancia">Relevância</option>
                <option value="menor-preco">Menor Preço</option>
                <option value="maior-preco">Maior Preço</option>
                <option value="novidades">Novidades</option>
              </select>
            </div>
          </div>

          {(selectedBrands.length > 0 || priceRange !== "todos") && (
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedBrands.map((brand) => (
                <button key={brand} onClick={() => toggleBrand(brand)} className="flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary hover:bg-primary/20 transition-colors">
                  {brand}<X className="h-3 w-3" />
                </button>
              ))}
              {priceRange !== "todos" && (
                <button onClick={() => setPriceRange("todos")} className="flex items-center gap-1.5 rounded-full bg-secondary/10 px-3 py-1 text-xs font-medium text-secondary hover:bg-secondary/20 transition-colors">
                  {priceRangeLabel(priceRange)}<X className="h-3 w-3" />
                </button>
              )}
            </div>
          )}

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4 md:gap-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="rounded-full bg-muted p-6 mb-4">
                <SlidersHorizontal className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="font-semibold text-lg text-foreground mb-1">Nenhum produto encontrado</h3>
              <p className="text-muted-foreground text-sm mb-4">Tente remover alguns filtros</p>
              <Button onClick={() => { setSelectedBrands([]); setPriceRange("todos"); }} variant="outline">Limpar filtros</Button>
            </div>
          )}
        </div>
      </div>

      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileFiltersOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-80 bg-card overflow-y-auto p-6 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-semibold text-lg text-foreground">Filtrar por</h2>
              <button onClick={() => setMobileFiltersOpen(false)} className="text-muted-foreground hover:text-foreground"><X className="h-5 w-5" /></button>
            </div>
            <FiltersPanel />
            <Button onClick={() => setMobileFiltersOpen(false)} className="w-full mt-6 bg-primary text-primary-foreground">
              Ver {filteredProducts.length} produtos
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
