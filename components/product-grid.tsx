import { ProductCard, type Product } from "./product-card";

interface ProductGridProps {
  title: string;
  products: Product[];
  showViewAll?: boolean;
}

export function ProductGrid({ title, products, showViewAll = true }: ProductGridProps) {
  return (
    <section className="py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-1 rounded-full bg-secondary" />
            <h2 className="font-serif text-2xl font-bold text-foreground md:text-3xl uppercase">
              {title}
            </h2>
          </div>
          {showViewAll && (
            <a
              href="#"
              className="flex items-center gap-1 rounded-lg border border-primary px-4 py-2 text-sm font-medium text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              Ver todos →
            </a>
          )}
        </div>
        <div className="flex flex-wrap items-stretch justify-center gap-3 md:gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="w-[calc(50%-0.375rem)] sm:w-[calc(33.333%-0.5rem)] md:w-[calc(25%-0.75rem)] lg:w-[calc(20%-0.8rem)] max-w-[280px]"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
