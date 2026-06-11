"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Menu, Phone } from "lucide-react";
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

const categories = [
  "Smartphones",
  "Notebooks",
  "Tablets",
  "Smartwatches",
  "Acessórios",
  "Áudio",
  "Câmeras",
  "Games",
];

export function Header() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-secondary via-primary to-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-center text-sm">
            <div className="flex items-center justify-center gap-4 md:gap-6">
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <Phone className="h-4 w-4" />
                <span>{PHONE_NUMBER}</span>
              </a>
              <span className="hidden md:inline">•</span>
              <span className="hidden md:inline">Frete Grátis em todo o site</span>
              <span className="hidden md:inline">•</span>
              <span className="font-medium">7% OFF no Pix</span>
              <span className="hidden lg:inline">•</span>
              <span className="hidden lg:inline">Parcelamos em até 12x</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="border-b border-border bg-card shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-center gap-4 md:gap-8">
            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
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
                  <nav className="flex flex-col gap-2">
                    <p className="mb-2 font-serif text-sm font-semibold text-muted-foreground">
                      Categorias
                    </p>
                    {categories.map((category) => (
                      <Link
                        key={category}
                        href={`#${category.toLowerCase()}`}
                        className="rounded-lg px-3 py-2 text-foreground transition-colors hover:bg-muted"
                      >
                        {category}
                      </Link>
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
                className="h-14 w-14 rounded-full object-cover shadow-md md:h-16 md:w-16"
                priority
              />
            </Link>

            {/* Search Bar */}
            <div className="hidden max-w-xl flex-1 md:flex">
              <div className="relative w-full">
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
          </div>

          {/* Mobile Search */}
          <div className="mt-3 md:hidden">
            <div className="relative">
              <Input
                type="search"
                placeholder="Buscar produtos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-10 pr-12 pl-4"
              />
              <Button
                size="icon"
                className="absolute top-1/2 right-1 h-8 w-8 -translate-y-1/2 bg-gradient-to-r from-secondary to-primary hover:opacity-90"
              >
                <Search className="h-4 w-4" />
                <span className="sr-only">Buscar</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Nav */}
      <nav className="hidden border-b border-border bg-card md:block">
        <div className="container mx-auto px-4">
          <ul className="flex items-center justify-center gap-1 overflow-x-auto py-2">
            {categories.map((category) => (
              <li key={category}>
                <Link
                  href={`#${category.toLowerCase()}`}
                  className="whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted hover:text-primary"
                >
                  {category}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}
