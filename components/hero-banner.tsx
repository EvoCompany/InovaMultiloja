"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Truck, CreditCard, Shield, Percent } from "lucide-react";
import { Button } from "@/components/ui/button";

const banners = [
  {
    id: 1,
    title: "Ofertas Imperdíveis",
    subtitle: "Até 40% OFF em Smartphones",
    cta: "Ver Ofertas",
    gradient: "from-secondary via-primary to-primary",
  },
  {
    id: 2,
    title: "Novos Lançamentos",
    subtitle: "iPhones e iPads com desconto",
    cta: "Conferir",
    gradient: "from-primary via-primary to-secondary",
  },
  {
    id: 3,
    title: "Frete Grátis",
    subtitle: "Em todas as compras do site",
    cta: "Aproveitar",
    gradient: "from-secondary to-primary",
  },
];

const benefits = [
  { icon: Truck, text: "Frete Grátis", subtext: "Em todo Brasil" },
  { icon: Percent, text: "7% OFF", subtext: "No Pix" },
  { icon: CreditCard, text: "Até 12x", subtext: "Sem juros" },
  { icon: Shield, text: "Compra Segura", subtext: "100% protegida" },
];

export function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % banners.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);

  return (
    <section>
      {/* Banner Carousel */}
      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {banners.map((banner) => (
            <div
              key={banner.id}
              className={`min-w-full bg-gradient-to-r ${banner.gradient} px-4 py-16 md:py-24`}
            >
              <div className="container mx-auto text-center text-primary-foreground">
                <h2 className="mb-2 font-serif text-3xl font-bold md:text-5xl">
                  {banner.title}
                </h2>
                <p className="mb-6 text-lg opacity-90 md:text-xl">
                  {banner.subtitle}
                </p>
                <Button
                  size="lg"
                  className="bg-card text-primary hover:bg-card/90"
                >
                  {banner.cta}
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-4 -translate-y-1/2 rounded-full bg-card/80 p-2 text-foreground shadow-lg transition-all hover:bg-card"
          aria-label="Banner anterior"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-4 -translate-y-1/2 rounded-full bg-card/80 p-2 text-foreground shadow-lg transition-all hover:bg-card"
          aria-label="Próximo banner"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide ? "w-8 bg-card" : "w-2 bg-card/50"
              }`}
              aria-label={`Ir para banner ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Benefits Bar */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-center justify-center gap-3 text-center md:justify-start md:text-left"
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-secondary/20 to-primary/20">
                  <benefit.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{benefit.text}</p>
                  <p className="text-xs text-muted-foreground">{benefit.subtext}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
