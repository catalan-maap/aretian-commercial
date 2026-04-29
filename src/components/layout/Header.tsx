"use client";

import { Search, Bell } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

const PAGE_TITLES: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/map": "Mapa Global",
  "/clients": "Clientes",
  "/opportunities": "Oportunidades",
  "/news": "Noticias e Inteligencia",
  "/presentations": "Presentaciones",
  "/tasks": "Tareas",
  "/settings": "Configuración",
};

export function Header() {
  const pathname = usePathname();
  const base = "/" + pathname.split("/")[1];
  const title = PAGE_TITLES[base] ?? "Aretian Commercial Hub";

  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6">
      <h1 className="text-lg font-semibold text-slate-900">{title}</h1>
      <div className="flex items-center gap-3">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input placeholder="Buscar clientes, noticias, oportunidades..." className="w-72 pl-9" />
        </div>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-4 w-4" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
        </Button>
      </div>
    </header>
  );
}
