"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, Shield, Award, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MARCAS, MODELOS_POR_MARCA, TIPOS } from "@/lib/vehicles-data";

const banners = [
  {
    id: 1,
    title: "Seu Próximo Carro Está Aqui",
    subtitle: "Amplo estoque de seminovos com qualidade e procedência garantida",
    gradient: "from-[#0a0a0a] via-[#1a1a1a] to-[#0a0a0a]",
  },
  {
    id: 2,
    title: "Financiamento Facilitado",
    subtitle: "As melhores taxas do mercado para você sair de carro hoje",
    gradient: "from-[#0a0a0a] via-[#1a0a0a] to-[#0a0a0a]",
  },
  {
    id: 3,
    title: "Garantia em Todos os Veículos",
    subtitle: "Revisão completa, laudo cautelar e documentação em dia",
    gradient: "from-[#0a0a0a] via-[#0a0a1a] to-[#0a0a0a]",
  },
];

const benefits = [
  { icon: Shield, text: "Garantia", subtext: "Em todos os veículos" },
  { icon: Award, text: "Procedência", subtext: "Laudo cautelar" },
  { icon: Headphones, text: "Suporte", subtext: "Pós-venda completo" },
  { icon: Search, text: "Busca grátis", subtext: "Encontramos seu carro" },
];

const ANOS = Array.from({ length: 15 }, (_, i) => new Date().getFullYear() - i);

export function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [marcaSelecionada, setMarcaSelecionada] = useState("");
  const [modeloSelecionado, setModeloSelecionado] = useState("");
  const [anoSelecionado, setAnoSelecionado] = useState("");
  const [tipoSelecionado, setTipoSelecionado] = useState("");
  const router = useRouter();

  const modelos = marcaSelecionada ? MODELOS_POR_MARCA[marcaSelecionada] ?? [] : [];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (marcaSelecionada) params.set("marca", marcaSelecionada);
    if (modeloSelecionado) params.set("modelo", modeloSelecionado);
    if (anoSelecionado) params.set("ano", anoSelecionado);
    if (tipoSelecionado) params.set("tipo", tipoSelecionado);
    router.push(`/busca?${params.toString()}`);
  };

  const handleMarcaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMarcaSelecionada(e.target.value);
    setModeloSelecionado("");
  };

  return (
    <section>
      {/* Banner Carousel */}
      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {banners.map((banner) => (
            <div
              key={banner.id}
              className={`min-w-full bg-gradient-to-br ${banner.gradient} px-4 py-16 md:py-24`}
            >
              <div className="container mx-auto">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  {/* Text */}
                  <div>
                    <div className="inline-block bg-primary px-3 py-1 rounded text-primary-foreground text-xs font-bold uppercase tracking-widest mb-4">
                      TFT Motors
                    </div>
                    <h1 className="font-serif text-3xl md:text-5xl font-bold text-white leading-tight mb-4">
                      {banner.title}
                    </h1>
                    <p className="text-white/70 text-lg mb-6">{banner.subtitle}</p>
                    <div className="flex gap-3">
                      <Button
                        size="lg"
                        className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold"
                        onClick={() => router.push("/busca")}
                      >
                        Ver Estoque
                      </Button>
                      <Button
                        size="lg"
                        variant="outline"
                        className="border-white/30 text-white bg-transparent hover:bg-white/10"
                        onClick={() => router.push("/comparador")}
                      >
                        Comparador
                      </Button>
                    </div>
                  </div>

                  {/* Search Form */}
                  <div className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-6">
                    <h2 className="text-white font-serif text-lg font-bold mb-4">
                      Encontre Seu Carro
                    </h2>
                    <form onSubmit={handleSearch} className="flex flex-col gap-3">
                      <select
                        value={marcaSelecionada}
                        onChange={handleMarcaChange}
                        className="w-full rounded-lg border border-white/20 bg-white/10 px-3 py-2.5 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-primary [&>option]:text-black"
                      >
                        <option value="">Todas as marcas</option>
                        {MARCAS.map((m) => (
                          <option key={m.slug} value={m.slug}>{m.nome}</option>
                        ))}
                      </select>

                      <select
                        value={modeloSelecionado}
                        onChange={(e) => setModeloSelecionado(e.target.value)}
                        disabled={!marcaSelecionada}
                        className="w-full rounded-lg border border-white/20 bg-white/10 px-3 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-40 [&>option]:text-black"
                      >
                        <option value="">Todos os modelos</option>
                        {modelos.map((m) => (
                          <option key={m} value={m}>{m}</option>
                        ))}
                      </select>

                      <div className="grid grid-cols-2 gap-3">
                        <select
                          value={anoSelecionado}
                          onChange={(e) => setAnoSelecionado(e.target.value)}
                          className="w-full rounded-lg border border-white/20 bg-white/10 px-3 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary [&>option]:text-black"
                        >
                          <option value="">Qualquer ano</option>
                          {ANOS.map((a) => (
                            <option key={a} value={a}>{a}</option>
                          ))}
                        </select>

                        <select
                          value={tipoSelecionado}
                          onChange={(e) => setTipoSelecionado(e.target.value)}
                          className="w-full rounded-lg border border-white/20 bg-white/10 px-3 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary [&>option]:text-black"
                        >
                          <option value="">Qualquer tipo</option>
                          {TIPOS.map((t) => (
                            <option key={t.slug} value={t.slug}>{t.nome}</option>
                          ))}
                        </select>
                      </div>

                      <Button type="submit" size="lg"
                        className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold gap-2">
                        <Search className="h-4 w-4" />
                        Buscar Veículos
                      </Button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
          {banners.map((_, index) => (
            <button key={index} onClick={() => setCurrentSlide(index)}
              className={`h-1.5 rounded-full transition-all ${
                index === currentSlide ? "w-8 bg-primary" : "w-1.5 bg-white/30"
              }`}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Benefits Bar */}
      <div className="bg-[#111] border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center justify-center gap-3 md:justify-start">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/20">
                  <benefit.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{benefit.text}</p>
                  <p className="text-xs text-white/50">{benefit.subtext}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
