"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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

  const isNew =
    new Date(product.createdAt) >
    new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

  const categoriaNome = product.categoria?.nome ?? product.marca?.nome ?? "";
  const imagemSrc = product.imagemUrl || "/placeholder.svg";

  const whatsappMsg = encodeURIComponent(
    `Olá! Tenho interesse no produto: ${product.nome} - R$ ${precoEfetivo.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`
  );
  const whatsappLink = `https://api.whatsapp.com/send?phone=555596859071&text=${whatsappMsg}`;

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl bg-card shadow-sm transition-all hover:shadow-lg">
      {/* Badges */}
      <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
        {isNew && (
          <Badge className="bg-gradient-to-r from-secondary to-primary text-primary-foreground">
            Novo
          </Badge>
        )}
        {desconto && (
          <Badge variant="destructive" className="bg-secondary">
            -{desconto}%
          </Badge>
        )}
      </div>

      <button
        className="absolute top-2 right-2 z-10 rounded-full bg-card/80 p-2 text-muted-foreground transition-all hover:bg-card hover:text-secondary"
        aria-label="Adicionar aos favoritos"
      >
        <Heart className="h-4 w-4" />
      </button>

      <Link
        href={`/produto/${product.slug}`}
        className="relative aspect-square overflow-hidden bg-muted"
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

      <div className="flex flex-1 flex-col p-4">
        <span className="mb-1 text-xs font-medium text-primary">{categoriaNome}</span>
        <Link href={`/produto/${product.slug}`}>
          <h3 className="mb-2 line-clamp-2 text-sm font-medium text-foreground transition-colors hover:text-primary">
            {product.nome}
          </h3>
        </Link>

        <div className="flex items-center gap-1 mb-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <svg key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
          <span className="text-xs text-muted-foreground ml-1">(0)</span>
        </div>

        <div className="mt-auto space-y-1 border-t border-border/50 pt-3">
          {precoOriginal && (
            <p className="text-xs text-muted-foreground line-through">
              De: R$ {precoOriginal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </p>
          )}
          <p className="text-lg font-bold text-foreground leading-tight">
            R$ {precoEfetivo.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
          </p>
          <div className="flex items-center gap-1.5 rounded-md bg-green-50 px-2 py-1">
            <svg className="h-3.5 w-3.5 text-green-600 shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
            </svg>
            <p className="text-xs text-green-700 font-semibold">
              R$ {pixPrice.toLocaleString("pt-BR", { minimumFractionDigits: 2 })} no Pix (7% OFF)
            </p>
          </div>
          <p className="text-xs text-muted-foreground">
            ou <span className="font-medium">12x de R$ {installmentPrice.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span> sem juros
          </p>
        </div>

        <div className="mt-3 flex flex-col gap-2">
          <Button
            onClick={() => addItem(product)}
            className="w-full bg-gradient-to-r from-secondary to-primary text-primary-foreground hover:opacity-90 font-semibold"
            size="sm"
          >
            <ShoppingCart className="mr-1.5 h-4 w-4" />
            Comprar Agora
          </Button>
          <Button variant="outline" size="sm" className="w-full border-green-500 text-green-600 hover:bg-green-50 bg-transparent" asChild>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              <svg className="mr-1.5 h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
