import Link from "next/link";

const bodyTypes = [
  {
    nome: "Hatch",
    slug: "hatch",
    emoji: "🚗",
    desc: "Compacto e econômico",
  },
  {
    nome: "Sedan",
    slug: "sedan",
    emoji: "🚙",
    desc: "Conforto e espaço",
  },
  {
    nome: "SUV",
    slug: "suv",
    emoji: "🚐",
    desc: "Força e versatilidade",
  },
  {
    nome: "Picape",
    slug: "picape",
    emoji: "🛻",
    desc: "Trabalho e aventura",
  },
  {
    nome: "Minivan",
    slug: "minivan",
    emoji: "🚌",
    desc: "Família em primeiro lugar",
  },
  {
    nome: "Conversível",
    slug: "conversivel",
    emoji: "🏎️",
    desc: "Estilo e emoção",
  },
];

export function CategoryGrid() {
  return (
    <section className="py-10 md:py-14 bg-background">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-1">
            <div className="h-0.5 w-10 bg-secondary" />
            <h2 className="font-serif text-2xl font-bold text-foreground md:text-3xl uppercase tracking-wide">
              Buscar por Categoria
            </h2>
            <div className="h-0.5 w-10 bg-secondary" />
          </div>
          <p className="text-muted-foreground text-sm mt-2">Encontre o modelo perfeito para o seu estilo de vida</p>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
          {bodyTypes.map((type) => (
            <Link
              key={type.slug}
              href={`/categoria/${type.slug}`}
              className="group flex flex-col items-center gap-3 rounded-xl bg-card p-5 shadow-sm border border-border transition-all hover:shadow-md hover:-translate-y-1 hover:border-primary/50"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 text-3xl transition-all group-hover:from-primary/25 group-hover:to-secondary/25">
                {type.emoji}
              </div>
              <div className="text-center">
                <p className="text-sm font-bold text-foreground">{type.nome}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{type.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
