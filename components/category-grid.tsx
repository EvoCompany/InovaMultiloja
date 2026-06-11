import Link from "next/link";
import { Smartphone, Laptop, Tablet, Watch, Headphones, Camera, Gamepad2, Cable } from "lucide-react";

const categories = [
  { name: "Smartphones", icon: Smartphone, href: "#smartphones" },
  { name: "Notebooks", icon: Laptop, href: "#notebooks" },
  { name: "Tablets", icon: Tablet, href: "#tablets" },
  { name: "Smartwatches", icon: Watch, href: "#smartwatches" },
  { name: "Áudio", icon: Headphones, href: "#audio" },
  { name: "Câmeras", icon: Camera, href: "#cameras" },
  { name: "Games", icon: Gamepad2, href: "#games" },
  { name: "Acessórios", icon: Cable, href: "#acessorios" },
];

export function CategoryGrid() {
  return (
    <section className="py-8 md:py-12">
      <div className="container mx-auto px-4">
        <h2 className="mb-6 text-center font-serif text-2xl font-bold text-foreground md:text-3xl">
          Compre por Categoria
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className="group flex w-20 flex-col items-center gap-2 rounded-xl bg-card p-4 shadow-sm transition-all hover:shadow-md hover:-translate-y-1 md:w-28"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-secondary/20 to-primary/20 transition-all group-hover:from-secondary/30 group-hover:to-primary/30 md:h-16 md:w-16">
                <category.icon className="h-6 w-6 text-primary md:h-8 md:w-8" />
              </div>
              <span className="text-center text-xs font-medium text-foreground md:text-sm">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
