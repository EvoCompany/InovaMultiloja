"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, Truck, Shield, RefreshCw, Minus, Plus, Heart, ShoppingCart, CheckCircle } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Produto } from "@/lib/types";
import { useCart } from "@/context/cart-context";

const TABS = [
  { id: "descricao", label: "Descrição" },
  { id: "especificacoes", label: "Especificações" },
  { id: "garantia", label: "Garantia" },
  { id: "pagamento", label: "Formas de Pagamento" },
];

interface Props {
  produto: Produto;
  related: Produto[];
  categoryLabel: string;
}

export function ProductClient({ produto, related, categoryLabel }: Props) {
  const { addItem } = useCart();

  const precoEfetivo = produto.precoPromocional ?? produto.preco;
  const precoOriginal = produto.precoPromocional ? produto.preco : undefined;
  const desconto = precoOriginal
    ? Math.round((1 - precoEfetivo / precoOriginal) * 100)
    : undefined;
  const pixPrice = precoEfetivo * 0.93;
  const installmentPrice = precoEfetivo / 12;

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("descricao");
  const [activeImage, setActiveImage] = useState(0);
  const [wishlisted, setWishlisted] = useState(false);

  const mainImage = produto.imagemUrl || "/placeholder.svg";
  const images = [mainImage, ...produto.imagensExtras].slice(0, 5);
  if (images.length < 2) images.push(mainImage);

  const whatsappMsg = encodeURIComponent(
    `Olá! Gostaria de comprar:\n• ${produto.nome}\n• Quantidade: ${quantity}\n• Valor: R$ ${(precoEfetivo * quantity).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`
  );
  const whatsappLink = `https://api.whatsapp.com/send?phone=555596859071&text=${whatsappMsg}`;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) addItem(produto);
  };

  const descricao = produto.descricaoLonga ?? produto.descricaoCurta ??
    `${produto.nome} — produto de qualidade premium com garantia e entrega rápida.`;

  const specs = Object.entries(produto.especificacoes ?? {});

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 xl:gap-12">
          {/* Gallery */}
          <div className="flex flex-col gap-3">
            <div className="relative aspect-square overflow-hidden rounded-2xl border border-border bg-muted">
              <Image
                src={images[activeImage]}
                alt={produto.nome}
                fill
                className="object-contain p-8 transition-all duration-300"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
                unoptimized
              />
              {desconto && (
                <div className="absolute top-4 right-4">
                  <Badge className="bg-secondary text-primary-foreground text-xs px-2 py-1">
                    -{desconto}%
                  </Badge>
                </div>
              )}
            </div>
            <div className="flex gap-2">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl border-2 bg-muted transition-all ${
                    activeImage === i ? "border-primary shadow-md" : "border-border hover:border-primary/50"
                  }`}
                >
                  <Image src={img} alt={`${produto.nome} ${i + 1}`} fill className="object-contain p-2" sizes="80px" unoptimized />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-2 flex-wrap">
              {produto.categoria && (
                <Link href={`/${produto.categoria.slug}`} className="text-xs font-semibold uppercase tracking-wider text-primary hover:underline">
                  {categoryLabel}
                </Link>
              )}
              {produto.sku && (
                <>
                  <span className="text-muted-foreground">·</span>
                  <span className="text-xs text-muted-foreground">SKU: {produto.sku}</span>
                </>
              )}
            </div>

            <h1 className="font-serif text-2xl font-bold text-foreground leading-snug md:text-3xl">
              {produto.nome}
            </h1>

            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-1">
                {[1,2,3,4,5].map((i) => <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />)}
                <span className="ml-1.5 text-sm text-muted-foreground">(0 avaliações)</span>
              </div>
              <div className="flex items-center gap-1.5 text-sm text-green-600">
                <CheckCircle className="h-4 w-4" />
                <span className="font-medium">{produto.estoque > 0 ? "Em estoque" : "Sob consulta"}</span>
              </div>
            </div>

            <div className="h-px bg-border" />

            {/* Pricing */}
            <div className="space-y-2">
              {precoOriginal && (
                <p className="text-sm text-muted-foreground line-through">
                  De: R$ {precoOriginal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </p>
              )}
              <p className="text-3xl font-bold text-foreground">
                R$ {precoEfetivo.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </p>
              <div className="inline-flex items-center gap-2 rounded-xl bg-green-50 border border-green-200 px-4 py-2.5">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-green-100">
                  <span className="text-xs font-bold text-green-700">PIX</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-green-700">
                    R$ {pixPrice.toLocaleString("pt-BR", { minimumFractionDigits: 2 })} no Pix
                  </p>
                  <p className="text-xs text-green-600">7% de desconto à vista</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                ou <span className="font-semibold text-foreground">12x de R$ {installmentPrice.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span> sem juros no cartão
              </p>
            </div>

            <div className="h-px bg-border" />

            {/* Actions */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-foreground">Quantidade:</span>
                <div className="flex items-center gap-0 rounded-xl border border-border overflow-hidden">
                  <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="flex h-10 w-10 items-center justify-center text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="flex h-10 w-12 items-center justify-center border-x border-border text-sm font-semibold text-foreground">{quantity}</span>
                  <button onClick={() => setQuantity((q) => q + 1)} className="flex h-10 w-10 items-center justify-center text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <Button onClick={handleAddToCart} className="w-full h-12 bg-gradient-to-r from-secondary to-primary text-primary-foreground hover:opacity-90 font-semibold text-base">
                <ShoppingCart className="mr-2 h-5 w-5" />Adicionar ao Carrinho
              </Button>

              <Button asChild className="w-full h-12 bg-green-500 hover:bg-green-600 text-white font-semibold text-base">
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                  <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Comprar pelo WhatsApp
                </a>
              </Button>

              <button onClick={() => setWishlisted((w) => !w)} className={`flex w-full items-center justify-center gap-2 rounded-xl border py-2.5 text-sm font-medium transition-colors ${wishlisted ? "border-secondary bg-secondary/10 text-secondary" : "border-border text-muted-foreground hover:border-secondary hover:text-secondary"}`}>
                <Heart className={`h-4 w-4 ${wishlisted ? "fill-secondary" : ""}`} />
                {wishlisted ? "Salvo nos favoritos" : "Salvar nos favoritos"}
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3 rounded-xl border border-border bg-muted/40 p-4">
              {[{ icon: Truck, label: "Frete Grátis" }, { icon: Shield, label: "Compra Segura" }, { icon: RefreshCw, label: "Troca Fácil" }].map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-1.5 text-center">
                  <Icon className="h-5 w-5 text-primary" />
                  <span className="text-xs font-medium text-foreground">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-12">
          <div className="flex gap-0 border-b border-border overflow-x-auto">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`whitespace-nowrap px-6 py-3 text-sm font-medium transition-colors border-b-2 -mb-px ${
                  activeTab === tab.id ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="rounded-b-xl border border-t-0 border-border bg-card p-6 md:p-8">
            {activeTab === "descricao" && (
              <p className="text-sm text-foreground leading-relaxed max-w-3xl whitespace-pre-line">{descricao}</p>
            )}
            {activeTab === "especificacoes" && (
              specs.length > 0 ? (
                <div className="max-w-lg">
                  <table className="w-full text-sm">
                    <tbody>
                      {specs.map(([key, value], i) => (
                        <tr key={key} className={i % 2 === 0 ? "bg-muted/50" : ""}>
                          <td className="px-4 py-2.5 font-medium text-foreground w-2/5 rounded-l">{key}</td>
                          <td className="px-4 py-2.5 text-muted-foreground rounded-r">{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">Especificações não disponíveis.</p>
              )
            )}
            {activeTab === "garantia" && (
              <div className="space-y-4 max-w-2xl text-sm text-foreground leading-relaxed">
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold mb-1">Garantia do Fabricante</p>
                    <p className="text-muted-foreground">Este produto possui <strong>12 meses de garantia</strong> contra defeitos de fabricação.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <RefreshCw className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold mb-1">Política de Trocas</p>
                    <p className="text-muted-foreground">Aceitamos trocas e devoluções em até <strong>7 dias corridos</strong> após o recebimento.</p>
                  </div>
                </div>
              </div>
            )}
            {activeTab === "pagamento" && (
              <div className="space-y-5 max-w-lg text-sm">
                {[
                  { label: "Pix — 7% de desconto", sublabel: `R$ ${pixPrice.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`, badge: "PIX", bg: "bg-green-100", text: "text-green-700" },
                  { label: "Cartão de Crédito — até 12x sem juros", sublabel: `12x de R$ ${installmentPrice.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`, badge: "12X", bg: "bg-primary/10", text: "text-primary" },
                  { label: "Boleto Bancário", sublabel: `R$ ${precoEfetivo.toLocaleString("pt-BR", { minimumFractionDigits: 2 })} — até 3 dias úteis`, badge: "BOL", bg: "bg-primary/10", text: "text-primary" },
                ].map(({ label, sublabel, badge, bg, text }) => (
                  <div key={badge} className="flex items-start gap-3">
                    <div className={`flex h-8 w-8 items-center justify-center rounded-full ${bg} flex-shrink-0`}>
                      <span className={`text-[10px] font-bold ${text}`}>{badge}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{label}</p>
                      <p className="text-muted-foreground">{sublabel}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-14">
            <div className="mb-6 flex items-center gap-3">
              <div className="h-8 w-1 rounded-full bg-secondary" />
              <h2 className="font-serif text-2xl font-bold text-foreground uppercase">Produtos Relacionados</h2>
            </div>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
              {related.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
