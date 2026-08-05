import Link from "next/link";
import { MARCAS } from "@/lib/vehicles-data";

const MARCA_COLORS: Record<string, string> = {
  toyota: "hover:border-red-500/50",
  volkswagen: "hover:border-blue-500/50",
  fiat: "hover:border-red-600/50",
  chevrolet: "hover:border-yellow-500/50",
  honda: "hover:border-red-500/50",
  hyundai: "hover:border-blue-600/50",
  ford: "hover:border-blue-700/50",
  renault: "hover:border-yellow-400/50",
  nissan: "hover:border-red-600/50",
  jeep: "hover:border-green-600/50",
};

export function BrandGrid() {
  return (
    <section className="py-10 md:py-14 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-1">
            <div className="h-0.5 w-10 bg-primary" />
            <h2 className="font-serif text-2xl font-bold text-foreground md:text-3xl uppercase tracking-wide">
              Buscar por Marca
            </h2>
            <div className="h-0.5 w-10 bg-primary" />
          </div>
          <p className="text-muted-foreground text-sm mt-2">Selecione a fabricante do seu interesse</p>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
          {MARCAS.map((marca) => (
            <Link
              key={marca.slug}
              href={`/marca/${marca.slug}`}
              className={`group flex flex-col items-center justify-center gap-2 rounded-xl bg-card p-5 shadow-sm border-2 border-border transition-all hover:shadow-md hover:-translate-y-0.5 ${MARCA_COLORS[marca.slug] ?? "hover:border-primary/50"}`}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#111] text-white text-xs font-bold">
                {marca.nome.slice(0, 2).toUpperCase()}
              </div>
              <div className="text-center">
                <p className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
                  {marca.nome}
                </p>
                <p className="text-xs text-muted-foreground">{marca.pais}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
