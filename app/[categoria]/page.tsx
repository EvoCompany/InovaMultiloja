"use client";

import { use } from "react";
import { useState, useMemo } from "react";
import { ChevronRight, SlidersHorizontal, X } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { getProductsByCategory, categoryMeta } from "@/lib/products";

export default function CategoryPage({
  params,
}: {
  params: Promise<{ categoria: string }>;
}) {
  const { categoria } = use(params);
  const meta = categoryMeta[categoria];

  if (!meta) notFound();

  const allCategoryProducts = getProductsByCategory(categoria);

  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<string>("todos");
  const [sortBy, setSortBy] = useState<string>("relevancia");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = [...allCategoryProducts];

    if (selectedBrands.length > 0) {
      result = result.filter((p) => selectedBrands.includes(p.category));
    }

    if (priceRange !== "todos") {
      result = result.filter((p) => {
        if (priceRange === "ate500") return p.price <= 500;
        if (priceRange === "500-2000") return p.price > 500 && p.price <= 2000;
        if (priceRange === "2000-5000") return p.price > 2000 && p.price <= 5000;
        if (priceRange === "acima5000") return p.price > 5000;
        return true;
      });
    }

    if (sortBy === "menor-preco") result.sort((a, b) => a.price - b.price);
    else if (sortBy === "maior-preco") result.sort((a, b) => b.price - a.price);
    else if (sortBy === "novidades")
      result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));

    return result;
  }, [allCategoryProducts, selectedBrands, priceRange, sortBy]);

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const priceRangeLabel = (value: string) => {
    if (value === "ate500") return "Até R$ 500";
    if (value === "500-2000") return "R$ 500 – R$ 2.000";
    if (value === "2000-5000") return "R$ 2.000 – R$ 5.000";
    if (value === "acima5000") return "Acima de R$ 5.000";
    return "";
  };

  const FiltersPanel = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold text-foreground mb-3 uppercase text-sm tracking-wide">
          Subcategoria
        </h3>
        <div className="space-y-2">
          {meta.brands.map((brand) => (
            <label
              key={brand}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={selectedBrands.includes(brand)}
                onChange={() => toggleBrand(brand)}
                className="h-4 w-4 rounded border-border text-primary accent-primary"
              />
              <span className="text-sm text-foreground group-hover:text-primary transition-colors">
                {brand}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-foreground mb-3 uppercase text-sm tracking-wide">
          Faixa de Preço
        </h3>
        <div className="space-y-2">
          {[
            { value: "todos", label: "Todos" },
            { value: "ate500", label: "Até R$ 500" },
            { value: "500-2000", label: "R$ 500 – R$ 2.000" },
            { value: "2000-5000", label: "R$ 2.000 – R$ 5.000" },
            { value: "acima5000", label: "Acima de R$ 5.000" },
          ].map((opt) => (
            <label
              key={opt.value}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <input
                type="radio"
                name="priceRange"
                value={opt.value}
                checked={priceRange === opt.value}
                onChange={() => setPriceRange(opt.value)}
                className="h-4 w-4 border-border text-primary accent-primary"
              />
              <span className="text-sm text-foreground group-hover:text-primary transition-colors">
                {opt.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {(selectedBrands.length > 0 || priceRange !== "todos") && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setSelectedBrands([]);
            setPriceRange("todos");
          }}
          className="w-full border-secondary text-secondary hover:bg-secondary/10"
        >
          <X className="h-4 w-4 mr-1" />
          Limpar Filtros
        </Button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Category Banner */}
        <div className="bg-gradient-to-r from-secondary/15 via-primary/10 to-primary/20 border-b border-border">
          <div className="container mx-auto px-4 py-8">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-1.5 text-sm text-muted-foreground mb-4">
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground font-medium">{meta.label}</span>
            </nav>

            <div className="flex items-center gap-4">
              <div className="h-12 w-1.5 rounded-full bg-secondary flex-shrink-0" />
              <div>
                <h1 className="font-serif text-3xl font-bold text-foreground md:text-4xl uppercase">
                  {meta.label}
                </h1>
                <p className="text-muted-foreground mt-1">{meta.description}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="flex gap-8">
            {/* Sidebar Desktop */}
            <aside className="hidden lg:block w-56 flex-shrink-0">
              <div className="sticky top-24 rounded-xl border border-border bg-card p-5 shadow-sm">
                <div className="flex items-center gap-2 mb-5 pb-3 border-b border-border">
                  <SlidersHorizontal className="h-4 w-4 text-primary" />
                  <h2 className="font-semibold text-foreground">Filtrar por</h2>
                </div>
                <FiltersPanel />
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              {/* Sort Bar */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-border">
                <div className="flex items-center gap-3">
                  {/* Mobile Filter Button */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setMobileFiltersOpen(true)}
                    className="lg:hidden flex items-center gap-2"
                  >
                    <SlidersHorizontal className="h-4 w-4" />
                    Filtros
                    {(selectedBrands.length > 0 || priceRange !== "todos") && (
                      <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground font-bold">
                        {selectedBrands.length + (priceRange !== "todos" ? 1 : 0)}
                      </span>
                    )}
                  </Button>
                  <p className="text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">
                      {filteredProducts.length}
                    </span>{" "}
                    produtos encontrados
                  </p>
                </div>

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

              {/* Active Filters Pills */}
              {(selectedBrands.length > 0 || priceRange !== "todos") && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedBrands.map((brand) => (
                    <button
                      key={brand}
                      onClick={() => toggleBrand(brand)}
                      className="flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary hover:bg-primary/20 transition-colors"
                    >
                      {brand}
                      <X className="h-3 w-3" />
                    </button>
                  ))}
                  {priceRange !== "todos" && (
                    <button
                      onClick={() => setPriceRange("todos")}
                      className="flex items-center gap-1.5 rounded-full bg-secondary/10 px-3 py-1 text-xs font-medium text-secondary hover:bg-secondary/20 transition-colors"
                    >
                      {priceRangeLabel(priceRange)}
                      <X className="h-3 w-3" />
                    </button>
                  )}
                </div>
              )}

              {/* Products Grid */}
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
                  <h3 className="font-semibold text-lg text-foreground mb-1">
                    Nenhum produto encontrado
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Tente remover alguns filtros
                  </p>
                  <Button
                    onClick={() => {
                      setSelectedBrands([]);
                      setPriceRange("todos");
                    }}
                    variant="outline"
                  >
                    Limpar filtros
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Filters Overlay */}
        {mobileFiltersOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setMobileFiltersOpen(false)}
            />
            <div className="absolute right-0 top-0 bottom-0 w-80 bg-card overflow-y-auto p-6 shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-semibold text-lg text-foreground">
                  Filtrar por
                </h2>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <FiltersPanel />
              <Button
                onClick={() => setMobileFiltersOpen(false)}
                className="w-full mt-6 bg-primary text-primary-foreground"
              >
                Ver {filteredProducts.length} produtos
              </Button>
            </div>
          </div>
        )}
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
