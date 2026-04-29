"use client";

import { useState } from "react";
import { ExternalLink, Globe, Tag, Zap, CheckCircle, Archive, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MOCK_NEWS } from "@/lib/data";
import { NewsStatus } from "@/types";
import { cn, formatDate } from "@/lib/utils";
import { Input } from "@/components/ui/input";

const STATUS_CONFIG = {
  UNREVIEWED: { label: "Sin revisar", color: "bg-slate-100 text-slate-600" },
  REVIEWED: { label: "Revisada", color: "bg-blue-100 text-blue-700" },
  SAVED: { label: "Guardada", color: "bg-emerald-100 text-emerald-700" },
  DISCARDED: { label: "Descartada", color: "bg-red-100 text-red-700" },
  CONVERTED: { label: "Convertida", color: "bg-purple-100 text-purple-700" },
};

function RelevanceBar({ value }: { value: number }) {
  const pct = (value / 10) * 100;
  const color = value >= 8 ? "bg-emerald-500" : value >= 6 ? "bg-amber-500" : "bg-slate-300";
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 rounded-full bg-slate-100">
        <div className={cn("h-1.5 rounded-full", color)} style={{ width: `${pct}%` }} />
      </div>
      <span className={cn("text-xs font-bold", value >= 8 ? "text-emerald-600" : value >= 6 ? "text-amber-600" : "text-slate-400")}>
        {value}/10
      </span>
    </div>
  );
}

export default function NewsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const filtered = MOCK_NEWS.filter((n) => {
    const q = search.toLowerCase();
    const matchQ = !q || n.title.toLowerCase().includes(q) || n.source?.toLowerCase().includes(q) || n.country?.toLowerCase().includes(q);
    const matchStatus = statusFilter === "ALL" || n.status === statusFilter;
    return matchQ && matchStatus;
  });

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Input
            placeholder="Buscar noticias..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-4"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-44">
            <SelectValue placeholder="Estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">Todos los estados</SelectItem>
            {Object.entries(STATUS_CONFIG).map(([k, v]) => (
              <SelectItem key={k} value={k}>{v.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button variant="primary" size="sm" className="gap-2">
          <Plus className="h-4 w-4" />
          Añadir Noticia
        </Button>
      </div>

      {/* Stats row */}
      <div className="flex gap-4">
        {Object.entries(STATUS_CONFIG).map(([k, v]) => {
          const count = MOCK_NEWS.filter((n) => n.status === k).length;
          return (
            <button
              key={k}
              onClick={() => setStatusFilter(statusFilter === k ? "ALL" : k)}
              className={cn(
                "flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-medium transition-colors",
                statusFilter === k ? "border-indigo-300 bg-indigo-50 text-indigo-700" : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
              )}
            >
              <span className={cn("inline-flex h-5 w-5 items-center justify-center rounded-full text-[10px]", v.color)}>
                {count}
              </span>
              {v.label}
            </button>
          );
        })}
      </div>

      {/* News cards */}
      <div className="space-y-3">
        {filtered.map((news) => {
          const cfg = STATUS_CONFIG[news.status];
          return (
            <Card key={news.id} className="hover:border-indigo-200 transition-colors">
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  {/* Relevance indicator */}
                  <div className="flex-shrink-0 flex flex-col items-center gap-1">
                    <div className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold",
                      (news.relevance ?? 0) >= 8 ? "bg-emerald-100 text-emerald-700" :
                      (news.relevance ?? 0) >= 6 ? "bg-amber-100 text-amber-700" : "bg-slate-100 text-slate-500"
                    )}>
                      {news.relevance}
                    </div>
                    <span className="text-[8px] text-slate-400">relev.</span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-sm font-semibold text-slate-900 leading-tight">
                          {news.title}
                        </h3>
                        <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-400">
                          <span className="font-medium text-slate-600">{news.source}</span>
                          <span>·</span>
                          <span className="flex items-center gap-1">
                            <Globe className="h-3 w-3" />
                            {news.country}
                          </span>
                          <span>·</span>
                          <span>{formatDate(news.publishedAt)}</span>
                          {news.sector && (
                            <>
                              <span>·</span>
                              <span className="flex items-center gap-1">
                                <Tag className="h-3 w-3" />
                                {news.sector}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="flex-shrink-0 flex items-center gap-2">
                        <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-medium", cfg.color)}>
                          {cfg.label}
                        </span>
                        {news.url && (
                          <a
                            href={news.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-400 hover:text-indigo-600"
                          >
                            <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        )}
                      </div>
                    </div>

                    {news.summary && (
                      <p className="mt-2 text-xs text-slate-600 line-clamp-2">{news.summary}</p>
                    )}

                    {news.aiSummary && (
                      <div className="mt-2 flex items-start gap-1.5 rounded-lg bg-indigo-50 px-3 py-2">
                        <Zap className="h-3 w-3 mt-0.5 flex-shrink-0 text-indigo-500" />
                        <p className="text-xs text-indigo-700">{news.aiSummary}</p>
                      </div>
                    )}

                    {news.nextAction && (
                      <div className="mt-2 flex items-center gap-2">
                        <span className="text-xs font-medium text-slate-500">→ Acción:</span>
                        <span className="text-xs text-slate-700">{news.nextAction}</span>
                      </div>
                    )}

                    {news.aiTags && news.aiTags.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {news.aiTags.map((tag) => (
                          <span key={tag} className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] text-slate-500">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex-shrink-0 flex flex-col gap-1">
                    <button className="rounded-lg p-1.5 hover:bg-emerald-50 text-slate-400 hover:text-emerald-600 transition-colors" title="Guardar">
                      <CheckCircle className="h-4 w-4" />
                    </button>
                    <button className="rounded-lg p-1.5 hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors" title="Descartar">
                      <Archive className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-slate-400">
            <p className="text-lg font-medium">No hay noticias</p>
            <p className="text-sm">Prueba con otros filtros</p>
          </div>
        )}
      </div>
    </div>
  );
}
