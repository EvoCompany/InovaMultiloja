"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import type { Produto } from "@/lib/types";
import { useCart } from "@/context/cart-context";

interface ProductCardProps {
  product: Produto;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  const precoEfetivo = product.precoPromocional ?? product.preco;
  const precoOriginal = product.precoPromocional ? product.preco : undefined;
  const desconto = precoOriginal
    ? Math.round((1 - precoEfetivo / precoOriginal) * 100)
    : undefined;
  const pixPrice = precoEfetivo * 0.93;
  const installmentPrice = precoEfetivo / 12;

  const imagemSrc = product.imagemUrl || "/placeholder.svg";

  const whatsappMsg = encodeURIComponent(
    `Olá! Tenho interesse no produto: ${product.nome} - R$ ${precoEfetivo.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`
  );
  const whatsappLink = `https://api.whatsapp.com/send?phone=555596859071&text=${whatsappMsg}`;

  return (
    <div className="group relative flex flex-col bg-card border border-border hover:border-primary hover:shadow-lg transition-all duration-200">
      {/* Badge de desconto — vermelho, chamativo */}
      {desconto && (
        <div className="absolute top-0 left-0 z-10 bg-destructive text-destructive-foreground text-xs font-black px-2 py-1 uppercase tracking-wide">
          -{desconto}%
        </div>
      )}

      {/* Imagem */}
      <Link
        href={`/produto/${product.slug}`}
        className="relative aspect-square overflow-hidden bg-white border-b border-border"
      >
        <Image
          src={imagemSrc}
          alt={product.nome}
          fill
          className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) calc(50vw - 1.5rem), (max-width: 768px) calc(33vw - 1.5rem), 280px"
          loading="lazy"
        />
      </Link>

      {/* Conteúdo */}
      <div className="flex flex-1 flex-col p-3">
        {/* Nome */}
        <Link href={`/produto/${product.slug}`}>
          <h3 className="mb-3 line-clamp-2 text-sm font-medium text-foreground hover:text-primary transition-colors leading-snug">
            {product.nome}
          </h3>
        </Link>

        {/* Preços */}
        <div className="mt-auto space-y-1">
          {precoOriginal && (
            <p className="text-xs text-muted-foreground line-through">
              De R$ {precoOriginal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </p>
          )}

          {/* Preço principal — grande e azul */}
          <p className="text-2xl font-serif font-bold text-primary leading-none">
            R$ {precoEfetivo.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
          </p>

          {/* Parcelamento */}
          <p className="text-xs text-muted-foreground">
            ou{" "}
            <span className="font-semibold text-foreground">
              12x de R$ {installmentPrice.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </span>{" "}
            sem juros
          </p>

          {/* Pix */}
          <div className="flex items-center gap-1.5 bg-green-50 border border-green-200 px-2 py-1">
            <span className="text-[10px] font-black text-green-700 uppercase tracking-wide">PIX</span>
            <span className="text-xs text-green-700 font-semibold">
              R$ {pixPrice.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </span>
            <span className="text-[10px] text-green-600 ml-auto">7% OFF</span>
          </div>
        </div>

        {/* Botões */}
        <div className="mt-3 flex flex-col gap-2">
          {/* Comprar — amarelo, estilo Casas Bahia */}
          <button
            onClick={() => addItem(product)}
            className="w-full flex items-center justify-center gap-2 bg-secondary hover:bg-secondary/90 text-secondary-foreground font-serif font-bold text-sm py-2.5 uppercase tracking-wide transition-colors border border-secondary/0 hover:border-secondary"
          >
            <ShoppingCart className="h-4 w-4" />
            COMPRAR
          </button>

          {/* WhatsApp */}
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 border-2 border-green-500 text-green-600 hover:bg-green-500 hover:text-white font-semibold text-xs py-2 transition-colors"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
