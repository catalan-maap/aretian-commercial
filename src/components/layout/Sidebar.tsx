"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Globe,
  Building2,
  TrendingUp,
  Newspaper,
  Presentation,
  CheckSquare,
  Settings,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Mapa Global", href: "/map", icon: Globe },
  { label: "Clientes", href: "/clients", icon: Building2 },
  { label: "Oportunidades", href: "/opportunities", icon: TrendingUp },
  { label: "Noticias", href: "/news", icon: Newspaper },
  { label: "Presentaciones", href: "/presentations", icon: Presentation },
  { label: "Tareas", href: "/tasks", icon: CheckSquare },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-64 flex-col border-r border-slate-200 bg-white">
      {/* Logo */}
      <div className="flex h-16 items-center gap-2.5 border-b border-slate-100 px-6">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900">
          <span className="text-xs font-bold text-white">A</span>
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900">Aretian</p>
          <p className="text-[10px] text-slate-400 leading-none">Commercial Hub</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <div className="mb-1">
          <p className="px-3 pb-1 text-[10px] font-semibold uppercase tracking-widest text-slate-400">
            Principal
          </p>
          {NAV.slice(0, 3).map(({ label, href, icon: Icon }) => {
            const active = pathname === href || pathname.startsWith(href + "/");
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-slate-900 text-white"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                )}
              >
                <Icon className="h-4 w-4" />
                {label}
                {active && <ChevronRight className="ml-auto h-3 w-3" />}
              </Link>
            );
          })}
        </div>

        <div className="mt-4 mb-1">
          <p className="px-3 pb-1 text-[10px] font-semibold uppercase tracking-widest text-slate-400">
            Comercial
          </p>
          {NAV.slice(3).map(({ label, href, icon: Icon }) => {
            const active = pathname === href || pathname.startsWith(href + "/");
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-slate-900 text-white"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                )}
              >
                <Icon className="h-4 w-4" />
                {label}
                {active && <ChevronRight className="ml-auto h-3 w-3" />}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Bottom */}
      <div className="border-t border-slate-100 p-3">
        <Link
          href="/settings"
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
            pathname === "/settings"
              ? "bg-slate-900 text-white"
              : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
          )}
        >
          <Settings className="h-4 w-4" />
          Configuración
        </Link>
        <div className="mt-3 flex items-center gap-2.5 rounded-lg px-3 py-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-100 text-xs font-semibold text-indigo-700">
            P
          </div>
          <div className="min-w-0">
            <p className="truncate text-xs font-medium text-slate-900">Pablo Roca</p>
            <p className="truncate text-[10px] text-slate-400">Admin</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
