"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Search, Menu, ShoppingCart, ChevronDown } from "lucide-react";
import { useCart } from "@/context/cart-context";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";

const navCategories = [
  {
    name: "Smartphones",
    href: "/smartphones",
    subcategories: ["iPhone", "Samsung", "Xiaomi", "Motorola"],
    slug: "smartphones",
  },
  {
    name: "Notebooks",
    href: "/notebooks",
    subcategories: ["MacBook", "Dell", "ASUS", "Lenovo", "HP"],
    slug: "notebooks",
  },
  {
    name: "Tablets",
    href: "/tablets",
    subcategories: ["iPad", "Samsung Tab", "Xiaomi Pad"],
    slug: "tablets",
  },
  {
    name: "Smartwatches",
    href: "/smartwatches",
    subcategories: ["Apple Watch", "Samsung Galaxy Watch"],
    slug: "smartwatches",
  },
  {
    name: "Acessórios",
    href: "/acessorios",
    subcategories: ["Capas", "Carregadores", "Fones", "Hubs"],
    slug: "acessorios",
  },
  {
    name: "Áudio",
    href: "/audio",
    subcategories: ["AirPods", "Fones Bluetooth", "Caixas de Som"],
    slug: "audio",
  },
  {
    name: "Câmeras",
    href: "/cameras",
    subcategories: ["Canon", "Nikon", "GoPro", "DJI"],
    slug: "cameras",
  },
  {
    name: "Games",
    href: "/games",
    subcategories: ["PlayStation", "Xbox", "Nintendo", "PC Gamer"],
    slug: "games",
  },
];

export function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const { count, openCart } = useCart();
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchQuery.trim();
    if (q) router.push(`/busca?q=${encodeURIComponent(q)}`);
  };

  return (
    /* Header inteiro = uma peça só com gradiente laranja→rosa→roxo */
    <header
      className="sticky top-0 z-50 w-full shadow-lg"
      style={{ background: "linear-gradient(to right, var(--color-primary), #cc2200, var(--color-secondary))" }}
    >
      {/* Faixa de promoções */}
      <div>
        <div className="container mx-auto px-4 py-1.5">
          <div className="flex items-center justify-center text-xs text-white gap-3">
            <span className="opacity-90">Frete Grátis em todo o site</span>
            <span className="hidden sm:inline opacity-40">•</span>
            <span className="hidden sm:inline font-semibold">7% OFF no Pix</span>
            <span className="hidden lg:inline opacity-40">•</span>
            <span className="hidden lg:inline opacity-90">Parcelamos em até 12x</span>
          </div>
        </div>
        <div className="container mx-auto px-4"><div className="border-b border-white/20 mx-[110px]" /></div>
      </div>

      {/* Logo + Busca + Carrinho */}
      <div>
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-4">

            {/* Menu mobile */}
            <Sheet>
              <SheetTrigger asChild>
                <button className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg bg-white/15 hover:bg-white/25 text-white transition-colors">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Menu</span>
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <SheetTitle className="sr-only">Menu de navegação</SheetTitle>
                <div className="flex flex-col gap-6 pt-6">
                  <Link href="/" className="flex items-center justify-center">
                    <Image
                      src="/logo.png"
                      alt="Inova Multiloja"
                      width={120}
                      height={120}
                      className="h-16 w-16 rounded-full object-cover shadow-md"
                    />
                  </Link>
                  <nav className="flex flex-col gap-1">
                    <p className="mb-2 font-serif text-sm font-semibold text-muted-foreground px-3">
                      Categorias
                    </p>
                    {navCategories.map((category) => (
                      <div key={category.name}>
                        <Link
                          href={category.href}
                          className="rounded-lg px-3 py-2 text-foreground transition-colors hover:bg-muted flex items-center justify-between font-medium"
                        >
                          {category.name}
                        </Link>
                        <div className="pl-5 flex flex-col gap-0.5">
                          {category.subcategories.map((sub) => (
                            <Link
                              key={sub}
                              href={`/${category.slug}#${sub.toLowerCase().replace(/\s+/g, "-")}`}
                              className="rounded-lg px-3 py-1 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                            >
                              {sub}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>

            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/logo.png"
                alt="Inova Multiloja"
                width={140}
                height={140}
                className="h-12 w-12 rounded-full object-cover shadow-md ring-2 ring-white/30 md:h-14 md:w-14"
                priority
              />
            </Link>

            {/* Barra de busca */}
            <form onSubmit={handleSearch} className="flex-1">
              <div className="relative w-full max-w-2xl mx-auto">
                <input
                  type="search"
                  placeholder="O que você está procurando?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-11 rounded-lg pl-4 pr-12 text-sm bg-white/95 text-foreground placeholder:text-muted-foreground border-0 outline-none focus:ring-2 focus:ring-white/60 shadow-inner"
                />
                <button
                  type="submit"
                  className="absolute top-1/2 right-1 h-9 w-9 -translate-y-1/2 flex items-center justify-center rounded-md bg-white/20 hover:bg-white/35 text-white transition-colors"
                >
                  <Search className="h-4 w-4" />
                  <span className="sr-only">Buscar</span>
                </button>
              </div>
            </form>

            {/* Carrinho */}
            <button
              onClick={openCart}
              className="flex-shrink-0 flex flex-col items-center gap-0.5 text-white hover:text-white/80 transition-colors relative"
              aria-label="Carrinho de compras"
            >
              <div className="relative">
                <ShoppingCart className="h-6 w-6" />
                <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-white text-[10px] font-bold text-primary">
                  {count}
                </span>
              </div>
              <span className="hidden text-xs font-medium md:block opacity-90">Carrinho</span>
            </button>
          </div>
        </div>
        <div className="container mx-auto px-4"><div className="border-b border-white/20 mx-[110px]" /></div>
      </div>

      {/* Nav de categorias */}
      <nav className="hidden md:block">
        <div className="container mx-auto px-4">
          <ul className="flex items-center justify-center gap-0">
            {navCategories.map((category) => (
              <li key={category.name} className="group relative">
                <Link
                  href={category.href}
                  className="flex items-center gap-1 whitespace-nowrap px-4 py-2.5 text-sm font-medium text-white/90 hover:text-white hover:bg-white/15 transition-colors"
                >
                  {category.name}
                  <ChevronDown className="h-3.5 w-3.5 opacity-60" />
                </Link>

                {/* Dropdown */}
                <div className="absolute top-full left-0 z-50 min-w-[160px] rounded-b-lg border border-border bg-card shadow-xl pointer-events-none opacity-0 -translate-y-1 invisible transition-all duration-200 ease-out group-hover:pointer-events-auto group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible">
                  <ul className="py-2">
                    {category.subcategories.map((sub) => (
                      <li key={sub}>
                        <Link
                          href={`/${category.slug}#${sub.toLowerCase().replace(/\s+/g, "-")}`}
                          className="block px-4 py-2 text-sm text-foreground transition-colors hover:bg-muted hover:text-primary"
                        >
                          {sub}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}
