"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Check, MessageCircle, BarChart2, Store } from "lucide-react";

interface Props {
  whatsappNumero: string;
  facebookPixelId: string;
  nomeLojaDisplay: string;
}

export function ConfiguracoesClient({ whatsappNumero, facebookPixelId, nomeLojaDisplay }: Props) {
  const [whatsapp, setWhatsapp] = useState(whatsappNumero);
  const [pixel, setPixel] = useState(facebookPixelId);
  const [nomeLoja, setNomeLoja] = useState(nomeLojaDisplay);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const upsert = async (key: string, value: string) => {
    const supabase = createClient();
    await supabase
      .from("configuracoes")
      .upsert({ key, value }, { onConflict: "key" });
  };

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    setError("");
    try {
      await Promise.all([
        upsert("whatsapp_numero", whatsapp.trim()),
        upsert("facebook_pixel_id", pixel.trim()),
        upsert("nome_loja", nomeLoja.trim()),
      ]);
      await fetch("/api/revalidate", { method: "POST" });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      setError("Erro ao salvar configurações. Tente novamente.");
    }
    setSaving(false);
  };

  return (
    <div className="max-w-xl space-y-6">
      <div className="rounded-xl border border-border bg-card p-6 space-y-5">
        <h2 className="font-semibold text-foreground flex items-center gap-2">
          <Store className="h-5 w-5 text-primary" />
          Loja
        </h2>
        <div>
          <label className="text-sm font-medium text-foreground block mb-1.5">Nome da Loja</label>
          <input
            type="text"
            value={nomeLoja}
            onChange={(e) => setNomeLoja(e.target.value)}
            placeholder="Ex: Inova Multiloja"
            className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
          <p className="text-xs text-muted-foreground mt-1.5">Exibido no cabeçalho e títulos do site.</p>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-6 space-y-5">
        <h2 className="font-semibold text-foreground flex items-center gap-2">
          <MessageCircle className="h-5 w-5 text-green-600" />
          WhatsApp
        </h2>
        <div>
          <label className="text-sm font-medium text-foreground block mb-1.5">Número do WhatsApp</label>
          <input
            type="text"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            placeholder="5511999999999"
            className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
          <p className="text-xs text-muted-foreground mt-1.5">
            Apenas dígitos com código do país e DDD. Ex: <code className="font-mono">5511999999999</code>
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-6 space-y-5">
        <h2 className="font-semibold text-foreground flex items-center gap-2">
          <BarChart2 className="h-5 w-5 text-blue-600" />
          Meta / Facebook Pixel
        </h2>
        <div>
          <label className="text-sm font-medium text-foreground block mb-1.5">ID do Pixel</label>
          <input
            type="text"
            value={pixel}
            onChange={(e) => setPixel(e.target.value)}
            placeholder="123456789012345"
            className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
          <p className="text-xs text-muted-foreground mt-1.5">
            Encontre seu Pixel ID no Gerenciador de Eventos do Meta Business Suite.
          </p>
        </div>
      </div>

      {error && <p className="text-sm text-red-500 bg-red-50 rounded-xl px-4 py-3">{error}</p>}

      <div className="flex items-center gap-3">
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-secondary to-primary text-primary-foreground px-6 py-2.5 text-sm font-semibold shadow-sm disabled:opacity-60 transition-opacity"
        >
          {saving ? "Salvando..." : "Salvar Configurações"}
        </button>
        {saved && (
          <span className="flex items-center gap-1.5 text-sm text-green-600 font-medium">
            <Check className="h-4 w-4" />Salvo com sucesso!
          </span>
        )}
      </div>
    </div>
  );
}
