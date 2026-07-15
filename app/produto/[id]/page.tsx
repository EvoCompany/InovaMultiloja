import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { ProductClient } from "./_client";
import {
  getDbProdutoBySlug,
  getDbRelatedProdutos,
  getDbAllProdutoSlugs,
} from "@/lib/products-db";
import { categoryMeta } from "@/lib/products";

export const revalidate = 0;

export async function generateStaticParams() {
  const slugs = await getDbAllProdutoSlugs();
  return slugs.map((slug) => ({ id: slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id: slug } = await params;
  const produto = await getDbProdutoBySlug(slug);
  if (!produto) return {};
  return {
    title: produto.seoTitle ?? `${produto.nome} | Inova Multiloja`,
    description: produto.seoDescription ?? produto.descricaoCurta ?? `Compre ${produto.nome} com o melhor preço.`,
  };
}

export default async function ProdutoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: slug } = await params;
  const produto = await getDbProdutoBySlug(slug);
  if (!produto) notFound();

  const related = produto.categoriaId
    ? await getDbRelatedProdutos(produto.id, produto.categoriaId, 4)
    : [];

  const categoryLabel = produto.categoria
    ? (categoryMeta[produto.categoria.slug]?.label ?? produto.categoria.nome)
    : "";

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <div className="bg-gradient-to-r from-secondary/15 via-primary/10 to-primary/20 border-b border-border">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex items-center gap-1.5 text-sm text-muted-foreground flex-wrap">
              <Link href="/" className="hover:text-primary transition-colors">Home</Link>
              <ChevronRight className="h-4 w-4" />
              {produto.categoria && (
                <>
                  <Link href={`/${produto.categoria.slug}`} className="hover:text-primary transition-colors">
                    {categoryLabel}
                  </Link>
                  <ChevronRight className="h-4 w-4" />
                </>
              )}
              <span className="text-foreground font-medium line-clamp-1">{produto.nome}</span>
            </nav>
          </div>
        </div>

        <ProductClient produto={produto} related={related} categoryLabel={categoryLabel} />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
