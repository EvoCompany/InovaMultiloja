"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Search, Menu, ShoppingCart, ChevronDown, User, Phone, Tag } from "lucide-react";
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
    <header className="sticky top-0 z-50 w-full">
      {/* Topo amarelo — promoções */}
      <div className="bg-secondary text-secondary-foreground">
        <div className="container mx-auto px-4 py-1.5">
          <div className="flex items-center justify-between text-xs font-bold">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <Tag className="h-3 w-3" />
                FRETE GRÁTIS em todo o site
              </span>
              <span className="hidden sm:inline">💳 Parcele em até 12x sem juros</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="hidden md:flex items-center gap-1">
                <span className="bg-destructive text-white text-[10px] font-black px-1.5 py-0.5 rounded-sm">7% OFF</span>
                <span>no Pix</span>
              </span>
              <span className="hidden lg:flex items-center gap-1 text-foreground/70">
                <Phone className="h-3 w-3" /> (55) 9 5596-8590
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Header principal — branco */}
      <div className="bg-white border-b-4 border-secondary shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-3 md:gap-5">
            {/* Menu mobile */}
            <Sheet>
              <SheetTrigger asChild>
                <button className="md:hidden flex items-center justify-center w-10 h-10 text-primary hover:bg-muted rounded transition-colors">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Menu</span>
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 p-0">
                <SheetTitle className="sr-only">Menu de navegação</SheetTitle>
                <div className="bg-primary text-primary-foreground px-4 py-5">
                  <Link href="/" className="flex items-center gap-3">
                    <Image
                      src="/logo.png"
                      alt="Inova Multiloja"
                      width={48}
                      height={48}
                      className="h-12 w-12 rounded-full object-cover border-2 border-secondary"
                    />
                    <span className="font-serif font-bold text-lg">INOVA MULTILOJA</span>
                  </Link>
                </div>
                <nav className="flex flex-col divide-y divide-border">
                  {navCategories.map((cat) => (
                    <div key={cat.name}>
                      <Link
                        href={cat.href}
                        className="flex items-center justify-between px-4 py-3 text-sm font-semibold text-foreground hover:bg-muted hover:text-primary transition-colors"
                      >
                        {cat.name}
                        <ChevronDown className="h-4 w-4 opacity-50" />
                      </Link>
                      <div className="bg-muted/40 px-6 pb-1">
                        {cat.subcategories.map((sub) => (
                          <Link
                            key={sub}
                            href={`/${cat.slug}#${sub.toLowerCase().replace(/\s+/g, "-")}`}
                            className="block py-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
                          >
                            {sub}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>

            {/* Logo */}
            <Link href="/" className="flex-shrink-0 flex items-center gap-2">
              <Image
                src="/logo.png"
                alt="Inova Multiloja"
                width={140}
                height={140}
                className="h-12 w-12 md:h-14 md:w-14 rounded-full object-cover border-2 border-secondary"
                priority
              />
              <span className="hidden lg:block font-serif font-bold text-primary text-xl leading-tight uppercase tracking-wide">
                Inova<br />Multiloja
              </span>
            </Link>

            {/* Busca — grande e central */}
            <form onSubmit={handleSearch} className="flex-1">
              <div className="flex h-11 max-w-3xl mx-auto">
                <input
                  type="search"
                  placeholder="Busque por produto, marca ou categoria..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 border-2 border-primary rounded-l-sm px-4 text-sm outline-none focus:border-primary bg-white text-foreground placeholder:text-muted-foreground"
                />
                <button
                  type="submit"
                  className="bg-primary hover:bg-accent text-primary-foreground px-5 rounded-r-sm flex items-center gap-2 font-bold text-sm transition-colors whitespace-nowrap"
                >
                  <Search className="h-5 w-5" />
                  <span className="hidden sm:inline">BUSCAR</span>
                </button>
              </div>
            </form>

            {/* Conta + Carrinho */}
            <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
              <button className="hidden md:flex flex-col items-center gap-0.5 text-foreground hover:text-primary transition-colors cursor-default">
                <User className="h-6 w-6" />
                <span className="text-[11px] font-semibold whitespace-nowrap">Minha Conta</span>
              </button>
              <button
                onClick={openCart}
                className="flex flex-col items-center gap-0.5 text-foreground hover:text-primary transition-colors relative"
                aria-label="Carrinho de compras"
              >
                <div className="relative">
                  <ShoppingCart className="h-6 w-6" />
                  <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-[10px] font-black text-white leading-none">
                    {count}
                  </span>
                </div>
                <span className="text-[11px] font-semibold">Carrinho</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Nav azul — departamentos */}
      <nav className="hidden md:block bg-primary text-primary-foreground shadow-md">
        <div className="container mx-auto px-4">
          <ul className="flex items-stretch">
            {/* Todos os departamentos */}
            <li className="flex-shrink-0 border-r border-white/20">
              <button className="flex items-center gap-2 px-4 py-3 font-serif font-bold text-sm bg-accent hover:bg-accent/80 h-full transition-colors whitespace-nowrap uppercase tracking-wide">
                <Menu className="h-4 w-4" />
                Todos os Departamentos
              </button>
            </li>

            {navCategories.map((cat) => (
              <li key={cat.name} className="group relative">
                <Link
                  href={cat.href}
                  className="flex items-center gap-1 whitespace-nowrap px-3 py-3 text-sm font-semibold text-primary-foreground hover:bg-white/15 transition-colors"
                >
                  {cat.name}
                  <ChevronDown className="h-3 w-3 opacity-70" />
                </Link>

                {/* Dropdown */}
                <div className="absolute top-full left-0 z-50 min-w-[180px] border border-border bg-card shadow-xl pointer-events-none opacity-0 -translate-y-1 invisible transition-all duration-200 ease-out group-hover:pointer-events-auto group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible rounded-b-sm">
                  <div className="h-1 bg-secondary" />
                  <ul className="py-2">
                    {cat.subcategories.map((sub) => (
                      <li key={sub}>
                        <Link
                          href={`/${cat.slug}#${sub.toLowerCase().replace(/\s+/g, "-")}`}
                          className="block px-4 py-2 text-sm text-foreground hover:bg-muted hover:text-primary font-medium transition-colors"
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
