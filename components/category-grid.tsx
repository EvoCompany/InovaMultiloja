import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    name: "Smartphones",
    href: "/smartphones",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "Notebooks",
    href: "/notebooks",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "Tablets",
    href: "/tablets",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "Smartwatches",
    href: "/smartwatches",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "Áudio",
    href: "/audio",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "Câmeras",
    href: "/cameras",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "Games",
    href: "/games",
    image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "Acessórios",
    href: "/acessorios",
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=300&q=80",
  },
];

export function CategoryGrid() {
  return (
    <section className="py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex items-center justify-center gap-3">
          <div className="h-0.5 w-12 bg-secondary" />
          <h2 className="font-serif text-2xl font-bold text-foreground md:text-3xl uppercase tracking-wide">
            Compre por Categoria
          </h2>
          <div className="h-0.5 w-12 bg-secondary" />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
          {categories.map((category, index) => (
            <Link
              key={category.name}
              href={category.href}
              className="group relative w-24 h-24 md:w-32 md:h-32 rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl hover:shadow-primary/15 hover:-translate-y-1.5 animate-[fade-up_0.5s_ease_both]"
              style={{ animationDelay: `${index * 60}ms` }}
            >
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 96px, 128px"
                loading={index < 4 ? "eager" : "lazy"}
              />
              {/* Bottom gradient for text legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
              {/* Hover color tint */}
              <div className="absolute inset-0 bg-primary/0 transition-colors duration-300 group-hover:bg-primary/25" />
              {/* Name */}
              <span className="absolute bottom-2 left-0 right-0 text-center text-[10px] md:text-xs font-bold text-white uppercase tracking-wide drop-shadow-sm">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
