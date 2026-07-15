"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <aside className="w-56 flex-shrink-0 min-h-screen bg-card border-r border-border flex flex-col">
      <div className="p-5 border-b border-border">
        <h1 className="font-serif text-base font-bold text-primary leading-tight">Inova Multiloja</h1>
        <p className="text-xs text-muted-foreground mt-0.5">Painel Admin</p>
      </div>

      <nav className="flex-1 p-3 space-y-0.5">
        {NAV.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                active
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <Icon className="h-4 w-4 flex-shrink-0" />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-border space-y-1.5">
        <Link
          href="/admin/produtos/novo"
          className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-secondary to-primary text-primary-foreground px-3 py-2 text-sm font-semibold w-full justify-center"
        >
          <Plus className="h-4 w-4" />
          Novo Produto
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:text-red-500 hover:bg-red-50 transition-colors w-full"
        >
          <LogOut className="h-4 w-4" />
          Sair
        </button>
      </div>
    </aside>
  );
}
