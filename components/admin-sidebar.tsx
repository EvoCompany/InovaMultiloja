"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { LayoutDashboard, Package, Star, Tag, Award, Users, Settings, LogOut, Plus } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const NAV = [
  { href: "/admin/dashboard",     label: "Dashboard",   icon: LayoutDashboard },
  { href: "/admin/produtos",      label: "Produtos",    icon: Package },
  { href: "/admin/destaques",     label: "Destaques",   icon: Star },
  { href: "/admin/categorias",    label: "Categorias",  icon: Tag },
  { href: "/admin/marcas",        label: "Marcas",      icon: Award },
  { href: "/admin/leads",         label: "Leads",       icon: Users },
  { href: "/admin/configuracoes", label: "Config",      icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [expanded, setExpanded] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("sidebar-expanded") === "true";
    }
    return false;
  });

  const toggle = () => {
    const next = !expanded;
    setExpanded(next);
    localStorage.setItem("sidebar-expanded", String(next));
  };

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <aside
      className={`sticky top-0 h-screen flex-shrink-0 bg-card border-r border-border flex flex-col transition-all duration-200 overflow-hidden ${
        expanded ? "w-52" : "w-[60px]"
      }`}
    >
      {/* Logo / Toggle */}
      <button
        onClick={toggle}
        title={expanded ? "Recolher menu" : "Expandir menu"}
        className="h-14 flex items-center gap-3 px-3 border-b border-border flex-shrink-0 w-full hover:bg-muted/50 transition-colors"
      >
        <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-secondary to-primary flex items-center justify-center flex-shrink-0">
          <span className="text-primary-foreground text-xs font-bold select-none">I</span>
        </div>
        {expanded && (
          <span className="font-serif text-sm font-bold text-primary truncate">Inova Multiloja</span>
        )}
      </button>

      {/* Nav */}
      <nav className="flex-1 p-2 space-y-0.5 overflow-y-auto">
        {NAV.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              title={label}
              className={`flex items-center gap-3 rounded-lg px-2.5 py-2.5 text-sm font-medium transition-colors ${
                active
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              {expanded && <span className="truncate">{label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="p-2 border-t border-border space-y-1 flex-shrink-0">
        <Link
          href="/admin/produtos/novo"
          title="Novo Produto"
          className={`flex items-center gap-2 rounded-lg bg-gradient-to-r from-secondary to-primary text-primary-foreground font-semibold transition-all ${
            expanded ? "px-3 py-2 text-sm" : "p-2.5 justify-center"
          }`}
        >
          <Plus className="h-4 w-4 flex-shrink-0" />
          {expanded && <span className="truncate">Novo Produto</span>}
        </Link>
        <button
          onClick={handleLogout}
          title="Sair"
          className={`flex items-center gap-2 rounded-lg text-muted-foreground hover:text-red-500 hover:bg-red-50 transition-colors w-full ${
            expanded ? "px-3 py-2 text-sm" : "p-2.5 justify-center"
          }`}
        >
          <LogOut className="h-4 w-4 flex-shrink-0" />
          {expanded && <span className="truncate">Sair</span>}
        </button>
      </div>
    </aside>
  );
}
