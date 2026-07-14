"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Menu, Phone, ShoppingCart, User, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";

const WHATSAPP_LINK = "https://api.whatsapp.com/send?phone=555596859071";
const PHONE_NUMBER = "(55) 9 9685-9071";

const navCategories = [
  {
    name: "Smartphones",
    href: "#smartphones",
    subcategories: ["iPhone", "Samsung", "Xiaomi", "Motorola"],
  },
  {
    name: "Notebooks",
    href: "#notebooks",
    subcategories: ["MacBook", "Dell", "ASUS", "Lenovo", "HP"],
  },
  {
    name: "Tablets",
    href: "#tablets",
    subcategories: ["iPad", "Samsung Tab", "Xiaomi Pad"],
  },
  {
    name: "Smartwatches",
    href: "#smartwatches",
    subcategories: ["Apple Watch", "Samsung Galaxy Watch"],
  },
  {
    name: "Acessórios",
    href: "#acessorios",
    subcategories: ["Capas", "Carregadores", "Fones", "Hubs"],
  },
  {
    name: "Áudio",
    href: "#audio",
    subcategories: ["AirPods", "Fones Bluetooth", "Caixas de Som"],
  },
  {
    name: "Câmeras",
    href: "#cameras",
    subcategories: ["Canon", "Nikon", "GoPro", "DJI"],
  },
  {
    name: "Games",
    href: "#games",
    subcategories: ["PlayStation", "Xbox", "Nintendo", "PC Gamer"],
  },
];

export function Header() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-secondary to-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between text-sm">
            {/* Telefone à esquerda */}
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <Phone className="h-4 w-4" />
              <span>{PHONE_NUMBER}</span>
            </a>

            {/* Benefícios no centro */}
            <div className="hidden md:flex items-center gap-4 text-xs">
              <span>Frete Grátis em todo o site</span>
              <span>•</span>
              <span className="font-medium">7% OFF no Pix</span>
              <span>•</span>
              <span className="hidden lg:inline">Parcelamos em até 12x</span>
            </div>

            {/* Minha Conta à direita */}
            <button className="flex items-center gap-1.5 hover:opacity-80 transition-opacity text-sm font-medium">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Minha Conta</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="border-b border-border bg-card shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-4">
            {/* Hamburger + Logo à esquerda */}
            <div className="flex items-center gap-2 flex-shrink-0">
              {/* Mobile Menu */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80">
                  <SheetTitle className="sr-only">Menu de navegação</SheetTitle>
                  <div className="flex flex-col gap-6 pt-6">
                    <Link href="/" className="flex items-center justify-center gap-2">
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
                                href={`#${sub.toLowerCase().replace(/\s+/g, "-")}`}
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
                  className="h-12 w-12 rounded-full object-cover shadow-md md:h-14 md:w-14"
                  priority
                />
              </Link>
            </div>

            {/* Barra de busca flex-1 no centro */}
            <div className="flex-1">
              <div className="relative w-full max-w-2xl mx-auto">
                <Input
                  type="search"
                  placeholder="O que você está procurando?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-11 pr-12 pl-4"
                />
                <Button
                  size="icon"
                  className="absolute top-1/2 right-1 h-9 w-9 -translate-y-1/2 bg-gradient-to-r from-secondary to-primary hover:opacity-90"
                >
                  <Search className="h-4 w-4" />
                  <span className="sr-only">Buscar</span>
                </Button>
              </div>
            </div>

            {/* Ícone carrinho à direita */}
            <button
              className="flex-shrink-0 flex flex-col items-center gap-0.5 text-foreground hover:text-primary transition-colors relative"
              aria-label="Carrinho de compras"
            >
              <div className="relative">
                <ShoppingCart className="h-6 w-6" />
                <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-secondary text-[10px] font-bold text-primary-foreground">
                  0
                </span>
              </div>
              <span className="hidden text-xs font-medium md:block">Carrinho</span>
            </button>
          </div>
        </div>
      </div>

      {/* Categories Nav */}
      <nav className="hidden border-b border-border bg-primary md:block">
        <div className="container mx-auto px-4">
          <ul className="flex items-center justify-center gap-0 overflow-x-auto">
            {navCategories.map((category) => (
              <li key={category.name} className="group relative">
                <Link
                  href={category.href}
                  className="flex items-center gap-1 whitespace-nowrap px-4 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-foreground/10"
                >
                  {category.name}
                  <ChevronDown className="h-3.5 w-3.5 opacity-70" />
                </Link>

                {/* Dropdown */}
                <div className="absolute top-full left-0 z-50 hidden min-w-[160px] rounded-b-lg border border-border bg-card shadow-lg group-hover:block">
                  <ul className="py-2">
                    {category.subcategories.map((sub) => (
                      <li key={sub}>
                        <Link
                          href={`#${sub.toLowerCase().replace(/\s+/g, "-")}`}
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
