"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Truck, CreditCard, Shield, Percent } from "lucide-react";

const banners = [
  {
    id: 1,
    badge: "OFERTA DO DIA",
    title: "Smartphones",
    subtitle: "com até",
    discount: "40% OFF",
    cta: "VER OFERTAS",
    href: "/smartphones",
    bgFrom: "#0070CD",
    bgTo: "#004A99",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1920&q=80",
  },
  {
    id: 2,
    badge: "LANÇAMENTO",
    title: "Notebooks",
    subtitle: "a partir de",
    discount: "R$ 1.999",
    cta: "CONFERIR",
    href: "/notebooks",
    bgFrom: "#1a1a2e",
    bgTo: "#0070CD",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1920&q=80",
  },
  {
    id: 3,
    badge: "FRETE GRÁTIS",
    title: "Áudio & Games",
    subtitle: "desconto de até",
    discount: "35% OFF",
    cta: "APROVEITAR",
    href: "/audio",
    bgFrom: "#004A99",
    bgTo: "#0070CD",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1920&q=80",
  },
];

const benefits = [
  { icon: Truck, text: "Frete Grátis", subtext: "Em todo o Brasil" },
  { icon: Percent, text: "7% OFF no Pix", subtext: "Desconto direto" },
  { icon: CreditCard, text: "Até 12x", subtext: "Sem juros no cartão" },
  { icon: Shield, text: "Compra Segura", subtext: "100% protegida" },
];

function pad(v: number) {
  return String(v).padStart(2, "0");
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeUntilEndOfMonth(): TimeLeft {
  const now = new Date();
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 1, 0, 0, 0, 0);
  const diff = end.getTime() - now.getTime();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
  };
}

function TimeBox({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center justify-center w-12 h-12 bg-destructive text-destructive-foreground animate-[glow-pulse_3s_ease-in-out_infinite]">
      <span className="text-lg font-serif font-bold leading-none tabular-nums">{pad(value)}</span>
      <span className="text-[9px] uppercase mt-0.5 opacity-80 tracking-widest">{label}</span>
    </div>
  );
}

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    setTimeLeft(getTimeUntilEndOfMonth());
    const interval = setInterval(() => setTimeLeft(getTimeUntilEndOfMonth()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-1.5">
      <TimeBox value={timeLeft.days} label="Dias" />
      <span className="text-2xl font-bold text-destructive">:</span>
      <TimeBox value={timeLeft.hours} label="Horas" />
      <span className="text-2xl font-bold text-destructive">:</span>
      <TimeBox value={timeLeft.minutes} label="Min" />
      <span className="text-2xl font-bold text-destructive">:</span>
      <TimeBox value={timeLeft.seconds} label="Seg" />
    </div>
  );
}

export function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrentSlide((prev) => (prev + 1) % banners.length), 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % banners.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);

  return (
    <section>
      {/* Carrossel */}
      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {banners.map((banner, i) => (
            <div
              key={banner.id}
              className="relative min-w-full overflow-hidden py-14 md:py-20"
              style={{ background: `linear-gradient(135deg, ${banner.bgFrom} 0%, ${banner.bgTo} 100%)` }}
            >
              {/* Imagem com overlay */}
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 animate-[ken-burns_5s_ease-in-out_alternate_infinite]"
                style={{ backgroundImage: `url(${banner.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/20" />

              {/* Conteúdo */}
              <div className="relative z-10 container mx-auto px-4 text-white">
                <div
                  key={i === currentSlide ? `active-${currentSlide}` : `passive-${banner.id}`}
                  className={i === currentSlide ? "animate-[fade-up_0.5s_ease-out_both]" : ""}
                >
                  {/* Badge vermelha */}
                  <div className="mb-4 inline-flex">
                    <span className="bg-destructive text-destructive-foreground text-xs font-black px-3 py-1 uppercase tracking-widest">
                      {banner.badge}
                    </span>
                  </div>

                  <h2 className="font-serif font-bold text-5xl md:text-6xl lg:text-7xl leading-none mb-1 drop-shadow-lg">
                    {banner.title}
                  </h2>
                  <p className="text-lg md:text-xl opacity-90 mb-1">{banner.subtitle}</p>
                  <p className="font-serif font-bold text-4xl md:text-5xl text-secondary mb-6 drop-shadow-md">
                    {banner.discount}
                  </p>

                  <a
                    href={banner.href}
                    className="inline-flex items-center gap-2 bg-secondary hover:bg-secondary/90 text-secondary-foreground font-serif font-bold text-base px-8 py-3 uppercase tracking-wide transition-colors shadow-lg"
                  >
                    {banner.cta} →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Setas */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-3 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-2 transition-all"
          aria-label="Banner anterior"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-3 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-2 transition-all"
          aria-label="Próximo banner"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`transition-all duration-300 ${
                index === currentSlide
                  ? "w-8 h-2.5 bg-secondary"
                  : "w-2.5 h-2.5 bg-white/50 hover:bg-white/80"
              }`}
              aria-label={`Banner ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Faixa de Ofertas do Mês */}
      <div className="bg-white border-y-2 border-secondary">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-destructive text-white text-center px-3 py-2 leading-none">
                <span className="block text-[10px] font-bold uppercase tracking-wider">OFERTA</span>
                <span className="block text-lg font-serif font-black">DO MÊS</span>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Promoções até</p>
                <p className="font-serif font-bold text-xl text-foreground uppercase">
                  FIM DO MÊS — NÃO PERCA!
                </p>
              </div>
            </div>
            <CountdownTimer />
          </div>
        </div>
      </div>

      {/* Barra de benefícios */}
      <div className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-3">
          <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
            {benefits.map((benefit, i) => (
              <div key={i} className="flex items-center gap-2.5 py-1">
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center bg-white/15">
                  <benefit.icon className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <p className="text-xs font-bold text-secondary uppercase leading-tight">{benefit.text}</p>
                  <p className="text-[10px] text-primary-foreground/75">{benefit.subtext}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
