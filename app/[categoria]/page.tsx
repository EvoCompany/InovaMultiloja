import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { CategoryClient } from "./_client";
import { getDbAllCategorias, getDbProdutosByCategoria } from "@/lib/products-db";
import { categoryMeta } from "@/lib/products";

export const revalidate = 0;

export async function generateStaticParams() {
  const categorias = await getDbAllCategorias();
  return categorias.map((c) => ({ categoria: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ categoria: string }> }) {
  const { categoria } = await params;
  const meta = categoryMeta[categoria];
  if (!meta) return {};
  return { title: `${meta.label} | Inova Multiloja`, description: meta.description };
}

export default async function CategoriaPage({ params }: { params: Promise<{ categoria: string }> }) {
  const { categoria } = await params;
  const meta = categoryMeta[categoria];
  if (!meta) notFound();

  const products = await getDbProdutosByCategoria(categoria);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <div className="bg-gradient-to-r from-secondary/15 via-primary/10 to-primary/20 border-b border-border">
          <div className="container mx-auto px-4 py-8">
            <nav className="flex items-center gap-1.5 text-sm text-muted-foreground mb-3">
              <Link href="/" className="hover:text-primary transition-colors">Home</Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground font-medium">{meta.label}</span>
            </nav>
            <div className="flex items-center gap-4">
              <div className="h-12 w-1.5 rounded-full bg-secondary flex-shrink-0" />
              <div>
                <h1 className="font-serif text-2xl font-bold text-foreground md:text-3xl">{meta.label}</h1>
                <p className="text-muted-foreground mt-1 text-sm">{meta.description}</p>
              </div>
            </div>
          </div>
        </div>
        <CategoryClient meta={meta} products={products} />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
