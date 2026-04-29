"use client";

import { useState } from "react";
import { Upload, FileText, Search, Globe, Tag, Download, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MOCK_PRESENTATIONS } from "@/lib/data";
import { ORG_TYPE_LABELS, PresentationStatus } from "@/types";
import { cn, formatDate } from "@/lib/utils";

const STATUS_CONFIG: Record<PresentationStatus, { label: string; color: string }> = {
  DRAFT: { label: "Borrador", color: "bg-amber-100 text-amber-700" },
  ACTIVE: { label: "Activa", color: "bg-emerald-100 text-emerald-700" },
  OBSOLETE: { label: "Obsoleta", color: "bg-slate-100 text-slate-500" },
};

export default function PresentationsPage() {
  const [search, setSearch] = useState("");
  const [langFilter, setLangFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const filtered = MOCK_PRESENTATIONS.filter((p) => {
    const q = search.toLowerCase();
    const matchQ = !q || p.title.toLowerCase().includes(q) || p.description?.toLowerCase().includes(q);
    const matchLang = langFilter === "ALL" || p.language === langFilter;
    const matchStatus = statusFilter === "ALL" || p.status === statusFilter;
    return matchQ && matchLang && matchStatus;
  });

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            placeholder="Buscar presentaciones..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={langFilter} onValueChange={setLangFilter}>
          <SelectTrigger className="w-36">
            <SelectValue placeholder="Idioma" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">Todos</SelectItem>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="es">Español</SelectItem>
            <SelectItem value="fr">Français</SelectItem>
            <SelectItem value="ar">Arabic</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-36">
            <SelectValue placeholder="Estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">Todos</SelectItem>
            <SelectItem value="ACTIVE">Activa</SelectItem>
            <SelectItem value="DRAFT">Borrador</SelectItem>
            <SelectItem value="OBSOLETE">Obsoleta</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="primary" className="gap-2">
          <Upload className="h-4 w-4" />
          Subir Presentación
        </Button>
      </div>

      <p className="text-sm text-slate-500">
        <span className="font-semibold text-slate-900">{filtered.length}</span> presentaciones
      </p>

      {/* Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((pres) => {
          const status = STATUS_CONFIG[pres.status];
          return (
            <Card key={pres.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                {/* File icon + status */}
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-400">
                    <FileText className="h-6 w-6" />
                  </div>
                  <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-medium", status.color)}>
                    {status.label}
                  </span>
                </div>

                {/* Info */}
                <div className="mt-3">
                  <h3 className="text-sm font-semibold text-slate-900 leading-tight line-clamp-2">
                    {pres.title}
                  </h3>
                  {pres.description && (
                    <p className="mt-1 text-xs text-slate-500 line-clamp-2">{pres.description}</p>
                  )}
                </div>

                {/* Meta */}
                <div className="mt-3 space-y-1">
                  {pres.targetType && (
                    <div className="flex items-center gap-1.5 text-xs text-slate-400">
                      <Tag className="h-3 w-3" />
                      {ORG_TYPE_LABELS[pres.targetType]}
                    </div>
                  )}
                  {pres.region && (
                    <div className="flex items-center gap-1.5 text-xs text-slate-400">
                      <Globe className="h-3 w-3" />
                      {pres.region}
                    </div>
                  )}
                </div>

                {/* Services */}
                {pres.services && pres.services.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {pres.services.slice(0, 3).map((s) => (
                      <span key={s} className="rounded-full bg-indigo-50 px-2 py-0.5 text-[10px] font-medium text-indigo-600">
                        {s}
                      </span>
                    ))}
                    {pres.services.length > 3 && (
                      <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] text-slate-400">
                        +{pres.services.length - 3}
                      </span>
                    )}
                  </div>
                )}

                {/* Footer */}
                <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">
                  <div>
                    <span className="text-[10px] text-slate-400">v{pres.version}</span>
                    <span className="mx-1 text-slate-200">·</span>
                    <span className="text-[10px] text-slate-400 uppercase">{pres.language}</span>
                  </div>
                  <div className="flex gap-1">
                    <button className="rounded p-1.5 hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors" title="Ver">
                      <Eye className="h-3.5 w-3.5" />
                    </button>
                    <button className="rounded p-1.5 hover:bg-indigo-50 text-slate-400 hover:text-indigo-600 transition-colors" title="Descargar">
                      <Download className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
        {filtered.length === 0 && (
          <div className="col-span-3 flex flex-col items-center justify-center py-16 text-slate-400">
            <FileText className="h-12 w-12 mb-2 text-slate-200" />
            <p>No hay presentaciones</p>
          </div>
        )}
      </div>
    </div>
  );
}
