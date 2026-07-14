"use client";

import { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ChevronRight,
  Star,
  Truck,
  Shield,
  RefreshCw,
  Minus,
  Plus,
  Heart,
  ShoppingCart,
  CheckCircle,
} from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  getProductById,
  getRelatedProducts,
  getProductSpecs,
  getProductDescription,
  categoryMeta,
} from "@/lib/products";
import { useCart } from "@/context/cart-context";

const TABS = [
  { id: "descricao", label: "Descrição" },
  { id: "especificacoes", label: "Especificações" },
  { id: "garantia", label: "Garantia" },
  { id: "pagamento", label: "Formas de Pagamento" },
];

export default function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const product = getProductById(Number(id));

  if (!product) notFound();

  const { addItem } = useCart();

  const pixPrice = product.price * 0.93;
  const installmentPrice = product.price / 12;
  const related = getRelatedProducts(product.id, product.categorySlug, 4);
  const specs = getProductSpecs(product);
  const description = getProductDescription(product);
  const categoryLabel = categoryMeta[product.categorySlug]?.label ?? product.categorySlug;

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("descricao");
  const [activeImage, setActiveImage] = useState(0);
  const [wishlisted, setWishlisted] = useState(false);

  // Simulate multiple angles with Unsplash crop variations
  const images = [
    product.image,
    product.image.replace("fit=crop", "fit=crop&crop=entropy"),
    product.image.replace("w=400&h=400", "w=400&h=400&q=85"),
    product.image.replace("w=400&h=400", "w=400&h=400&q=75"),
  ];

  const whatsappMessage = encodeURIComponent(
    `Olá! Gostaria de comprar:\n• ${product.name}\n• Quantidade: ${quantity}\n• Valor: R$ ${(product.price * quantity).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`
  );
  const whatsappLink = `https://api.whatsapp.com/send?phone=555596859071&text=${whatsappMessage}`;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Breadcrumb */}
        <div className="border-b border-border bg-card">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex items-center gap-1.5 text-sm text-muted-foreground flex-wrap">
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
              <ChevronRight className="h-3.5 w-3.5 flex-shrink-0" />
              <Link
                href={`/${product.categorySlug}`}
                className="hover:text-primary transition-colors"
              >
                {categoryLabel}
              </Link>
              <ChevronRight className="h-3.5 w-3.5 flex-shrink-0" />
              <span className="text-foreground font-medium line-clamp-1">
                {product.name}
              </span>
            </nav>
          </div>
        </div>

        {/* Product Section */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 xl:gap-12">
            {/* ── LEFT: Image Gallery ── */}
            <div className="flex flex-col gap-3">
              {/* Main image */}
              <div className="relative aspect-square overflow-hidden rounded-2xl border border-border bg-muted">
                <Image
                  src={images[activeImage]}
                  alt={product.name}
                  fill
                  className="object-contain p-8 transition-all duration-300"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                {product.isNew && (
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-gradient-to-r from-secondary to-primary text-primary-foreground text-xs px-2 py-1">
                      Novidade
                    </Badge>
                  </div>
                )}
                {product.discount && (
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-secondary text-primary-foreground text-xs px-2 py-1">
                      -{product.discount}%
                    </Badge>
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              <div className="flex gap-2">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl border-2 bg-muted transition-all ${
                      activeImage === i
                        ? "border-primary shadow-md"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} - imagem ${i + 1}`}
                      fill
                      className="object-contain p-2"
                      sizes="80px"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* ── RIGHT: Product Info ── */}
            <div className="flex flex-col gap-5">
              {/* Category + Badges */}
              <div className="flex items-center gap-2 flex-wrap">
                <Link
                  href={`/${product.categorySlug}`}
                  className="text-xs font-semibold uppercase tracking-wider text-primary hover:underline"
                >
                  {categoryLabel}
                </Link>
                <span className="text-muted-foreground">·</span>
                <span className="text-xs text-muted-foreground">
                  Ref: #{product.id.toString().padStart(6, "0")}
                </span>
              </div>

              {/* Product Name */}
              <h1 className="font-serif text-2xl font-bold text-foreground leading-snug md:text-3xl">
                {product.name}
              </h1>

              {/* Stars + Availability */}
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                  <span className="ml-1.5 text-sm text-muted-foreground">
                    (0 avaliações)
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-sm text-green-600">
                  <CheckCircle className="h-4 w-4" />
                  <span className="font-medium">Em estoque</span>
                </div>
              </div>

              <div className="h-px bg-border" />

              {/* Pricing */}
              <div className="space-y-2">
                {product.originalPrice && (
                  <p className="text-sm text-muted-foreground line-through">
                    De: R${" "}
                    {product.originalPrice.toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                    })}
                  </p>
                )}
                <p className="text-3xl font-bold text-foreground">
                  R${" "}
                  {product.price.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                  })}
                </p>
                <div className="inline-flex items-center gap-2 rounded-xl bg-green-50 border border-green-200 px-4 py-2.5">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-green-100">
                    <span className="text-xs font-bold text-green-700">
                      PIX
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-green-700">
                      R${" "}
                      {pixPrice.toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                      })}{" "}
                      no Pix
                    </p>
                    <p className="text-xs text-green-600">
                      7% de desconto à vista
                    </p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  ou{" "}
                  <span className="font-semibold text-foreground">
                    12x de R${" "}
                    {installmentPrice.toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                    })}
                  </span>{" "}
                  sem juros no cartão
                </p>
              </div>

              <div className="h-px bg-border" />

              {/* Quantity + Actions */}
              <div className="space-y-3">
                {/* Quantity selector */}
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-foreground">
                    Quantidade:
                  </span>
                  <div className="flex items-center gap-0 rounded-xl border border-border overflow-hidden">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="flex h-10 w-10 items-center justify-center text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="flex h-10 w-12 items-center justify-center border-x border-border text-sm font-semibold text-foreground">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="flex h-10 w-10 items-center justify-center text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Buttons */}
                <Button
                  onClick={handleAddToCart}
                  className="w-full h-12 bg-gradient-to-r from-secondary to-primary text-primary-foreground hover:opacity-90 font-semibold text-base"
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Adicionar ao Carrinho
                </Button>

                <Button
                  asChild
                  className="w-full h-12 bg-green-500 hover:bg-green-600 text-white font-semibold text-base"
                >
                  <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                    <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Comprar pelo WhatsApp
                  </a>
                </Button>

                <button
                  onClick={() => setWishlisted((w) => !w)}
                  className={`flex w-full items-center justify-center gap-2 rounded-xl border py-2.5 text-sm font-medium transition-colors ${
                    wishlisted
                      ? "border-secondary bg-secondary/10 text-secondary"
                      : "border-border text-muted-foreground hover:border-secondary hover:text-secondary"
                  }`}
                >
                  <Heart
                    className={`h-4 w-4 ${wishlisted ? "fill-secondary" : ""}`}
                  />
                  {wishlisted ? "Salvo nos favoritos" : "Salvar nos favoritos"}
                </button>
              </div>

              {/* Trust badges */}
              <div className="grid grid-cols-3 gap-3 rounded-xl border border-border bg-muted/40 p-4">
                <div className="flex flex-col items-center gap-1.5 text-center">
                  <Truck className="h-5 w-5 text-primary" />
                  <span className="text-xs font-medium text-foreground">
                    Frete Grátis
                  </span>
                </div>
                <div className="flex flex-col items-center gap-1.5 text-center">
                  <Shield className="h-5 w-5 text-primary" />
                  <span className="text-xs font-medium text-foreground">
                    Compra Segura
                  </span>
                </div>
                <div className="flex flex-col items-center gap-1.5 text-center">
                  <RefreshCw className="h-5 w-5 text-primary" />
                  <span className="text-xs font-medium text-foreground">
                    Troca Fácil
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ── Info Tabs ── */}
          <div className="mt-12">
            {/* Tab headers */}
            <div className="flex gap-0 border-b border-border overflow-x-auto">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`whitespace-nowrap px-6 py-3 text-sm font-medium transition-colors border-b-2 -mb-px ${
                    activeTab === tab.id
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <div className="rounded-b-xl border border-t-0 border-border bg-card p-6 md:p-8">
              {activeTab === "descricao" && (
                <p className="text-sm text-foreground leading-relaxed max-w-3xl">
                  {description}
                </p>
              )}

              {activeTab === "especificacoes" && (
                <div className="max-w-lg">
                  <table className="w-full text-sm">
                    <tbody>
                      {Object.entries(specs).map(([key, value], i) => (
                        <tr
                          key={key}
                          className={i % 2 === 0 ? "bg-muted/50" : ""}
                        >
                          <td className="px-4 py-2.5 font-medium text-foreground w-2/5 rounded-l">
                            {key}
                          </td>
                          <td className="px-4 py-2.5 text-muted-foreground rounded-r">
                            {value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {activeTab === "garantia" && (
                <div className="space-y-4 max-w-2xl text-sm text-foreground leading-relaxed">
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold mb-1">Garantia do Fabricante</p>
                      <p className="text-muted-foreground">
                        Este produto possui <strong>12 meses de garantia</strong> contra
                        defeitos de fabricação. A garantia cobre falhas de funcionamento
                        decorrentes de problemas na fabricação, não incluindo danos físicos,
                        líquidos ou uso inadequado.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <RefreshCw className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold mb-1">Política de Trocas</p>
                      <p className="text-muted-foreground">
                        Aceitamos trocas e devoluções em até <strong>7 dias corridos</strong> após
                        o recebimento do produto, conforme o Código de Defesa do Consumidor.
                        O produto deve estar em perfeitas condições, na embalagem original e
                        com todos os acessórios.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "pagamento" && (
                <div className="space-y-5 max-w-lg text-sm">
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 flex-shrink-0">
                      <span className="text-xs font-bold text-green-700">PIX</span>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Pix — 7% de desconto</p>
                      <p className="text-muted-foreground">
                        R${" "}
                        {pixPrice.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 flex-shrink-0">
                      <span className="text-[10px] font-bold text-primary">12X</span>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">
                        Cartão de Crédito — até 12x sem juros
                      </p>
                      <p className="text-muted-foreground">
                        12x de R${" "}
                        {installmentPrice.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}{" "}
                        (Visa, Mastercard, Elo, Amex)
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 flex-shrink-0">
                      <span className="text-[10px] font-bold text-primary">BOL</span>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Boleto Bancário</p>
                      <p className="text-muted-foreground">
                        R${" "}
                        {product.price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}{" "}
                        — compensação em até 3 dias úteis
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ── Related Products ── */}
          {related.length > 0 && (
            <div className="mt-14">
              <div className="mb-6 flex items-center gap-3">
                <div className="h-8 w-1 rounded-full bg-secondary" />
                <h2 className="font-serif text-2xl font-bold text-foreground uppercase">
                  Produtos Relacionados
                </h2>
              </div>
              <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
                {related.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
