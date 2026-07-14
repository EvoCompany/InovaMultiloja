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
        <div className="mb-8 flex flex-col items-center">
          <div className="flex items-center gap-3 mb-1">
            <div className="h-0.5 w-12 bg-secondary" />
            <h2 className="font-serif text-2xl font-bold text-foreground md:text-3xl uppercase tracking-wide">
              Compre por Categoria
            </h2>
            <div className="h-0.5 w-12 bg-secondary" />
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className="group flex w-24 flex-col items-center gap-2 rounded-xl bg-card p-4 shadow-sm transition-all hover:shadow-md hover:-translate-y-1 border border-border hover:border-primary/30 md:w-32"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-secondary/15 to-primary/15 transition-all group-hover:from-secondary/30 group-hover:to-primary/30 md:h-[4.5rem] md:w-[4.5rem]">
                <category.icon className="h-7 w-7 text-primary md:h-9 md:w-9" />
              </div>
              <span className="text-center text-xs font-semibold text-foreground uppercase tracking-wide md:text-sm">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
