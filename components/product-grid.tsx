import Link from "next/link";
import { ProductCard } from "./product-card";
import type { Produto } from "@/lib/types";

interface ProductGridProps {
  title: string;
  products: Produto[];
  showViewAll?: boolean;
  categorySlug?: string;
  highlight?: boolean;
}

export function ProductGrid({
  title,
  products,
  showViewAll = true,
  categorySlug,
  highlight = false,
}: ProductGridProps) {
  return (
    <section className="py-6 md:py-8">
      <div className="container mx-auto px-4">
        {/* Cabeçalho estilo varejo */}
        <div
          className={`flex items-center justify-between mb-4 border-b-2 pb-2 ${
            highlight ? "border-destructive" : "border-primary"
          }`}
        >
          <div className="flex items-center gap-0">
            {/* Bloco colorido à esquerda do título */}
            <div
              className={`flex items-center px-3 py-1.5 ${
                highlight ? "bg-destructive text-destructive-foreground" : "bg-primary text-primary-foreground"
              }`}
            >
              <h2 className="font-serif font-bold text-base md:text-lg uppercase tracking-wide leading-none">
                {title}
              </h2>
            </div>
          </div>

          {showViewAll && (
            <Link
              href={categorySlug ? `/${categorySlug}` : "#"}
              className="text-xs font-bold text-primary hover:text-accent uppercase tracking-wide transition-colors flex items-center gap-1 whitespace-nowrap"
            >
              Ver todos →
            </Link>
          )}
        </div>

        {/* Grid de produtos */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
