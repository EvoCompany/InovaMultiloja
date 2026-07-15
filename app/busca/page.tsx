import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { BuscaClient } from "./_client";
import { getDbAllProdutos } from "@/lib/products-db";

export const revalidate = 0;

export default async function BuscaPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  const allProducts = await getDbAllProdutos();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <BuscaClient initialQuery={q} allProducts={allProducts} />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
