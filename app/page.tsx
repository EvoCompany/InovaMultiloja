import { Header } from "@/components/header";
import { HeroBanner } from "@/components/hero-banner";
import { CategoryGrid } from "@/components/category-grid";
import { ProductGrid } from "@/components/product-grid";
import { Footer } from "@/components/footer";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import type { Product } from "@/components/product-card";

const WHATSAPP_LINK = "https://api.whatsapp.com/send?phone=555596859071";

// Produtos de demonstração (serão substituídos pelo WooCommerce quando configurado)
const featuredProducts: Product[] = [
  {
    id: 1,
    name: "iPhone 16 Pro Max 256GB 5G - Tela Super Retina XDR 6.9\" - Titânio Preto",
    price: 9999.00,
    originalPrice: 11499.00,
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=400&fit=crop",
    category: "iPhone",
    isNew: true,
    discount: 13,
  },
  {
    id: 2,
    name: "MacBook Air M4 13.6\" 16GB RAM 512GB SSD - Estelar",
    price: 8499.00,
    originalPrice: 9299.00,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop",
    category: "MacBook",
    isNew: true,
    discount: 9,
  },
  {
    id: 3,
    name: "Apple Watch Ultra 2 49mm GPS + Celular - Pulseira Ocean",
    price: 6499.00,
    originalPrice: 7199.00,
    image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400&h=400&fit=crop",
    category: "Apple Watch",
    isNew: true,
    discount: 10,
  },
  {
    id: 4,
    name: "iPad Pro M4 11\" WiFi 256GB - Cinza Espacial",
    price: 8299.00,
    originalPrice: 8999.00,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop",
    category: "iPad",
    isNew: true,
    discount: 8,
  },
  {
    id: 5,
    name: "AirPods Pro 2 com Estojo de Recarga MagSafe USB-C",
    price: 1799.00,
    originalPrice: 2099.00,
    image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=400&h=400&fit=crop",
    category: "Áudio",
    discount: 14,
  },
];

const smartphones: Product[] = [
  {
    id: 6,
    name: "iPhone 15 128GB 5G - Preto",
    price: 4999.00,
    originalPrice: 5499.00,
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop",
    category: "iPhone",
    discount: 9,
  },
  {
    id: 7,
    name: "Samsung Galaxy S24 Ultra 512GB - Titanium Gray",
    price: 7499.00,
    originalPrice: 8299.00,
    image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=400&fit=crop",
    category: "Samsung",
    isNew: true,
    discount: 10,
  },
  {
    id: 8,
    name: "Xiaomi 14 Ultra 512GB - Preto",
    price: 5999.00,
    originalPrice: 6999.00,
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&h=400&fit=crop",
    category: "Xiaomi",
    isNew: true,
    discount: 14,
  },
  {
    id: 9,
    name: "iPhone 14 Pro 256GB - Roxo Profundo",
    price: 5299.00,
    originalPrice: 5999.00,
    image: "https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?w=400&h=400&fit=crop",
    category: "iPhone",
    discount: 12,
  },
  {
    id: 10,
    name: "Motorola Edge 50 Pro 512GB - Preto",
    price: 3499.00,
    originalPrice: 3999.00,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop",
    category: "Motorola",
    discount: 13,
  },
];

const notebooks: Product[] = [
  {
    id: 11,
    name: "MacBook Pro M4 14\" 18GB RAM 512GB SSD - Space Black",
    price: 14999.00,
    originalPrice: 16499.00,
    image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=400&h=400&fit=crop",
    category: "MacBook",
    isNew: true,
    discount: 9,
  },
  {
    id: 12,
    name: "Dell XPS 15 Intel Core i9 32GB RAM 1TB SSD",
    price: 12499.00,
    originalPrice: 13999.00,
    image: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400&h=400&fit=crop",
    category: "Dell",
    discount: 11,
  },
  {
    id: 13,
    name: "ASUS ROG Strix G16 RTX 5070 32GB RAM 1TB SSD",
    price: 15999.00,
    originalPrice: 17999.00,
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&h=400&fit=crop",
    category: "ASUS",
    isNew: true,
    discount: 11,
  },
  {
    id: 14,
    name: "Lenovo ThinkPad X1 Carbon Gen 12 16GB RAM 512GB",
    price: 10999.00,
    originalPrice: 12499.00,
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&h=400&fit=crop",
    category: "Lenovo",
    discount: 12,
  },
  {
    id: 15,
    name: "HP Spectre x360 14\" Intel Evo 16GB RAM 1TB SSD",
    price: 9499.00,
    originalPrice: 10499.00,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop",
    category: "HP",
    discount: 10,
  },
];

const accessories: Product[] = [
  {
    id: 16,
    name: "Apple Magic Keyboard com Touch ID - Branco",
    price: 1499.00,
    originalPrice: 1699.00,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=400&fit=crop",
    category: "Acessórios",
    discount: 12,
  },
  {
    id: 17,
    name: "Carregador MagSafe 15W Original Apple",
    price: 399.00,
    originalPrice: 449.00,
    image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&h=400&fit=crop",
    category: "Carregadores",
    discount: 11,
  },
  {
    id: 18,
    name: "Capa de Silicone iPhone 16 Pro Max - Azul",
    price: 399.00,
    originalPrice: 449.00,
    image: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400&h=400&fit=crop",
    category: "Capas",
    isNew: true,
    discount: 11,
  },
  {
    id: 19,
    name: "Pulseira Sport Apple Watch 45mm - Verde",
    price: 349.00,
    originalPrice: 399.00,
    image: "https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=400&h=400&fit=crop",
    category: "Pulseiras",
    discount: 13,
  },
  {
    id: 20,
    name: "Hub USB-C 7 em 1 - HDMI 4K, USB 3.0, SD Card",
    price: 299.00,
    originalPrice: 349.00,
    image: "https://images.unsplash.com/photo-1625723044792-44de16ccb4e9?w=400&h=400&fit=crop",
    category: "Hubs",
    discount: 14,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroBanner />
        <CategoryGrid />
        <ProductGrid title="Destaques" products={featuredProducts} />

        {/* Trust Banner */}
        <div className="bg-primary">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 text-primary-foreground text-sm">
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span className="font-semibold">Compra 100% Segura</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
                <span className="font-semibold">Frete Grátis</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                <span className="font-semibold">12x Sem Juros</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span className="font-semibold">Troca Fácil</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-muted/50">
          <ProductGrid title="Smartphones" products={smartphones} />
        </div>
        <ProductGrid title="Notebooks & Computadores" products={notebooks} />
        <div className="bg-muted/50">
          <ProductGrid title="Acessórios" products={accessories} />
        </div>

        {/* Newsletter Section */}
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
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Chamar no WhatsApp
            </a>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
