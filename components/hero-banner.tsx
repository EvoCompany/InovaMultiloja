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

function pad(value: number): string {
  return String(value).padStart(2, "0");
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeUntilEndOfMonth(): TimeLeft {
  const now = new Date();
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1, 0, 0, 0, 0);
  const diff = endOfMonth.getTime() - now.getTime();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds };
}

function TimeBox({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center justify-center w-14 h-14 rounded-lg bg-primary text-primary-foreground">
      <span className="text-xl font-bold leading-none">{pad(value)}</span>
      <span className="text-[10px] uppercase mt-0.5">{label}</span>
    </div>
  );
}

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    setTimeLeft(getTimeUntilEndOfMonth());

    const interval = setInterval(() => {
      setTimeLeft(getTimeUntilEndOfMonth());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-2">
      <TimeBox value={timeLeft.days} label="Dias" />
      <span className="text-xl font-bold text-foreground">:</span>
      <TimeBox value={timeLeft.hours} label="Horas" />
      <span className="text-xl font-bold text-foreground">:</span>
      <TimeBox value={timeLeft.minutes} label="Min" />
      <span className="text-xl font-bold text-foreground">:</span>
      <TimeBox value={timeLeft.seconds} label="Seg" />
    </div>
  );
}

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

      {/* Ofertas do Mês */}
      <section className="bg-gradient-to-r from-secondary/10 to-primary/10 border-y border-border py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-1.5 rounded-full bg-secondary" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-secondary">
                  Tempo Limitado
                </p>
                <h2 className="font-serif text-2xl font-bold text-foreground md:text-3xl">
                  OFERTAS DO MÊS
                </h2>
              </div>
            </div>
            <CountdownTimer />
          </div>
        </div>
      </section>

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
