import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, MapPin, Clock, Instagram, Facebook } from "lucide-react";

const WHATSAPP_LINK = "https://api.whatsapp.com/send?phone=555596859071";
const PHONE_NUMBER = "(55) 9 9685-9071";

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-primary via-primary to-secondary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Logo & About */}
          <div className="space-y-4 flex flex-col items-center md:items-start">
            <Image
              src="/logo.png"
              alt="Inova Multiloja"
              width={80}
              height={80}
              className="h-16 w-16 rounded-full object-cover shadow-md"
            />
            <p className="text-sm leading-relaxed opacity-90 text-center md:text-left">
              A Inova Multiloja oferece os melhores produtos de tecnologia com preços imbatíveis, 
              entrega rápida e atendimento personalizado.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-foreground/10 transition-colors hover:bg-primary-foreground/20"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-foreground/10 transition-colors hover:bg-primary-foreground/20"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="text-center md:text-left">
            <h3 className="mb-4 font-serif text-lg font-semibold">Institucional</h3>
            <ul className="space-y-2 text-sm opacity-90">
              <li><Link href="#" className="hover:underline">Quem Somos</Link></li>
              <li><Link href="#" className="hover:underline">Política de Privacidade</Link></li>
              <li><Link href="#" className="hover:underline">Termos de Uso</Link></li>
              <li><Link href="#" className="hover:underline">Trocas e Devoluções</Link></li>
              <li><Link href="#" className="hover:underline">Formas de Pagamento</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div className="text-center md:text-left">
            <h3 className="mb-4 font-serif text-lg font-semibold">Categorias</h3>
            <ul className="space-y-2 text-sm opacity-90">
              <li><Link href="#smartphones" className="hover:underline">Smartphones</Link></li>
              <li><Link href="#notebooks" className="hover:underline">Notebooks</Link></li>
              <li><Link href="#tablets" className="hover:underline">Tablets</Link></li>
              <li><Link href="#smartwatches" className="hover:underline">Smartwatches</Link></li>
              <li><Link href="#acessorios" className="hover:underline">Acessórios</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="text-center md:text-left">
            <h3 className="mb-4 font-serif text-lg font-semibold">Atendimento</h3>
            <ul className="space-y-3 text-sm opacity-90">
              <li className="flex items-center justify-center md:justify-start gap-2">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="hover:underline">{PHONE_NUMBER}</a>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-2">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span>contato@inovamultiloja.com.br</span>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-2">
                <MapPin className="h-4 w-4 flex-shrink-0" />
                <span>Santiago, RS - Brasil</span>
              </li>
              <li className="flex items-start justify-center md:justify-start gap-2">
                <Clock className="h-4 w-4 flex-shrink-0 mt-0.5" />
                <span>Seg a Sex: 08:30 às 18:30<br />Sáb: 09:00-17:00</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Payment Methods & Security */}
        <div className="mt-10 border-t border-primary-foreground/20 pt-8">
          <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
            <div className="text-center md:text-left">
              <p className="text-sm opacity-70">Formas de Pagamento</p>
              <div className="mt-2 flex items-center gap-2">
                {["Visa", "Mastercard", "Pix", "Boleto"].map((method) => (
                  <span
                    key={method}
                    className="rounded bg-primary-foreground/10 px-3 py-1 text-xs font-medium"
                  >
                    {method}
                  </span>
                ))}
              </div>
            </div>
            <div className="text-center md:text-right">
              <p className="text-sm opacity-70">Site Seguro</p>
              <p className="mt-1 text-xs opacity-50">SSL 256 bits | Compra 100% protegida</p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-primary-foreground/20 pt-6 text-center">
          <p className="text-xs opacity-60">
            © {new Date().getFullYear()} Inova Multiloja. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
