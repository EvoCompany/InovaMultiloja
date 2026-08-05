import { Header } from "@/components/header";
import { HeroBanner } from "@/components/hero-banner";
import { CategoryGrid } from "@/components/category-grid";
import { ProductGrid } from "@/components/product-grid";
import { Footer } from "@/components/footer";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { getDbFeaturedProdutos, getDbProdutosByCategoria } from "@/lib/products-db";

export const revalidate = 0;

const WHATSAPP_LINK = "https://api.whatsapp.com/send?phone=555596859071";

export default async function Home() {
  const [featuredProducts, smartphones, notebooks, accessories] = await Promise.all([
    getDbFeaturedProdutos(),
    getDbProdutosByCategoria("smartphones"),
    getDbProdutosByCategoria("notebooks"),
    getDbProdutosByCategoria("acessorios"),
  ]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroBanner />
        <CategoryGrid />
        <ProductGrid title="Destaques" products={featuredProducts} />

        <div className="bg-muted/50">
          <ProductGrid title="Smartphones" products={smartphones} categorySlug="smartphones" />
        </div>
        <ProductGrid title="Notebooks & Computadores" products={notebooks} categorySlug="notebooks" />
        <div className="bg-muted/50">
          <ProductGrid title="Acessórios" products={accessories} categorySlug="acessorios" />
        </div>

        <section className="bg-gradient-to-r from-secondary via-primary to-primary py-12 md:py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="mb-3 font-serif text-2xl font-bold text-primary-foreground md:text-3xl text-balance">
              Fale Conosco pelo WhatsApp
            </h2>
            <p className="mb-6 text-primary-foreground/90">
              Atendimento personalizado para encontrar o produto ideal para você!
            </p>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-green-500 px-8 py-4 font-semibold text-white transition-colors hover:bg-green-600"
            >
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Chamar no WhatsApp
            </a>
          </div>
        </section>

        <div className="bg-primary">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 text-primary-foreground text-sm">
              {[
                { label: "Compra 100% Segura", path: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
                { label: "Frete Grátis", path: "M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" },
                { label: "12x Sem Juros", path: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" },
                { label: "Troca Fácil", path: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" },
              ].map(({ label, path }) => (
                <div key={label} className="flex items-center gap-2">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={path} />
                  </svg>
                  <span className="font-semibold">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
