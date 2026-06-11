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
          <h2 className="font-serif text-2xl font-bold text-foreground md:text-3xl">
            {title}
          </h2>
          {showViewAll && (
            <a
              href="#"
              className="text-sm font-medium text-primary hover:underline"
            >
              Ver todos
            </a>
          )}
        </div>
        <div className="flex flex-wrap items-stretch justify-center gap-3 md:gap-4">
          {products.map((product) => (
            <div key={product.id} className="w-[calc(50%-0.375rem)] sm:w-[calc(33.333%-0.5rem)] md:w-[calc(25%-0.75rem)] lg:w-[calc(20%-0.8rem)] max-w-[280px]">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
