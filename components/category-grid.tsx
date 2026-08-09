import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    name: "Smartphones",
    href: "/smartphones",
    emoji: "📱",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "Notebooks",
    href: "/notebooks",
    emoji: "💻",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "Tablets",
    href: "/tablets",
    emoji: "📋",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "Smartwatches",
    href: "/smartwatches",
    emoji: "⌚",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "Áudio",
    href: "/audio",
    emoji: "🎧",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "Câmeras",
    href: "/cameras",
    emoji: "📷",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "Games",
    href: "/games",
    emoji: "🎮",
    image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "Acessórios",
    href: "/acessorios",
    emoji: "🔌",
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=300&q=80",
  },
];

export function CategoryGrid() {
  return (
    <section className="bg-white border-b border-border py-5">
      <div className="container mx-auto px-4">
        {/* Título estilo varejo */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1 h-6 bg-secondary" />
          <h2 className="font-serif font-bold text-lg uppercase tracking-wide text-foreground">
            Compre por Departamento
          </h2>
        </div>

        {/* Grade de categorias — estilo departamento */}
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={cat.href}
              className="group flex flex-col items-center gap-1.5 p-2 hover:bg-muted transition-colors"
            >
              {/* Imagem circular com borda azul no hover */}
              <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-border group-hover:border-primary transition-colors flex-shrink-0">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                  sizes="64px"
                  loading="lazy"
                />
              </div>
              {/* Nome */}
              <span className="text-center text-[10px] sm:text-xs font-semibold text-foreground group-hover:text-primary transition-colors leading-tight">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
