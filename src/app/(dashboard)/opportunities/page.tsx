"use client";

import { useState } from "react";
import { Plus, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MOCK_OPPORTUNITIES } from "@/lib/data";
import { OPP_STATUS_LABELS, PRIORITY_LABELS, OpportunityStatus } from "@/types";
import { cn, OPP_STATUS_COLORS, PRIORITY_COLORS, formatCurrency, formatDate, PIPELINE_STAGES } from "@/lib/utils";
import { Opportunity } from "@/types";

function OpportunityCard({ opp }: { opp: Opportunity }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
      <p className="text-xs font-semibold text-slate-900 line-clamp-2">{opp.name}</p>
      {opp.organization && (
        <p className="mt-0.5 text-[10px] text-slate-400 truncate">{opp.organization.name}</p>
      )}
      <div className="mt-2 flex items-center justify-between">
        <span className="text-xs font-bold text-slate-700">{formatCurrency(opp.value ?? 0)}</span>
        <span className="text-[10px] text-slate-400">{opp.probability}%</span>
      </div>
      <div className="mt-1.5 h-1 rounded-full bg-slate-100">
        <div className="h-1 rounded-full bg-indigo-500" style={{ width: `${opp.probability ?? 0}%` }} />
      </div>
      {opp.closeDate && (
        <p className="mt-1.5 text-[10px] text-slate-400">Cierre: {formatDate(opp.closeDate)}</p>
      )}
    </div>
  );
}

export default function OpportunitiesPage() {
  const [view, setView] = useState<"kanban" | "list">("kanban");

  const byStage = PIPELINE_STAGES.reduce((acc, s) => {
    acc[s] = MOCK_OPPORTUNITIES.filter((o) => o.status === s);
    return acc;
  }, {} as Record<OpportunityStatus, Opportunity[]>);

  const totalValue = MOCK_OPPORTUNITIES.reduce((s, o) => s + (o.value ?? 0), 0);
  const weightedValue = MOCK_OPPORTUNITIES.reduce(
    (s, o) => s + ((o.value ?? 0) * (o.probability ?? 0)) / 100,
    0
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-slate-900">{formatCurrency(totalValue)}</p>
            <p className="text-xs text-slate-400">Pipeline total</p>
          </div>
          <div className="w-px bg-slate-200" />
          <div className="text-center">
            <p className="text-2xl font-bold text-indigo-600">{formatCurrency(weightedValue)}</p>
            <p className="text-xs text-slate-400">Valor ponderado</p>
          </div>
          <div className="w-px bg-slate-200" />
          <div className="text-center">
            <p className="text-2xl font-bold text-slate-900">{MOCK_OPPORTUNITIES.length}</p>
            <p className="text-xs text-slate-400">Oportunidades</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant={view === "kanban" ? "default" : "outline"}
            size="sm"
            onClick={() => setView("kanban")}
          >
            Kanban
          </Button>
          <Button
            variant={view === "list" ? "default" : "outline"}
            size="sm"
            onClick={() => setView("list")}
          >
            Lista
          </Button>
          <Button variant="primary" size="sm" className="gap-2">
            <Plus className="h-4 w-4" />
            Nueva Oportunidad
          </Button>
        </div>
      </div>

      {/* Kanban board */}
      {view === "kanban" && (
        <div className="flex gap-4 overflow-x-auto pb-4">
          {PIPELINE_STAGES.map((stage) => {
            const opps = byStage[stage] ?? [];
            const stageValue = opps.reduce((s, o) => s + (o.value ?? 0), 0);
            return (
              <div key={stage} className="w-64 flex-shrink-0">
                <div className="mb-3 flex items-center justify-between">
                  <div>
                    <span
                      className={cn(
                        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold",
                        OPP_STATUS_COLORS[stage]
                      )}
                    >
                      {OPP_STATUS_LABELS[stage]}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400">{opps.length} ops</span>
                    {stageValue > 0 && (
                      <p className="text-[10px] font-medium text-slate-600">{formatCurrency(stageValue)}</p>
                    )}
                  </div>
                </div>
                <div className="space-y-2 min-h-[100px] rounded-xl bg-slate-50 p-2">
                  {opps.map((opp) => (
                    <OpportunityCard key={opp.id} opp={opp} />
                  ))}
                  {opps.length === 0 && (
                    <div className="flex h-16 items-center justify-center text-xs text-slate-300">
                      Sin oportunidades
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* List view */}
      {view === "list" && (
        <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500">Oportunidad</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500">Cliente</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500">País</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500">Valor</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500">Prob.</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500">Estado</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500">Cierre</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_OPPORTUNITIES.map((opp) => (
                <tr key={opp.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 font-medium text-slate-900">{opp.name}</td>
                  <td className="px-4 py-3 text-slate-500">{opp.organization?.name ?? "—"}</td>
                  <td className="px-4 py-3 text-slate-500">{opp.country ?? "—"}</td>
                  <td className="px-4 py-3 font-semibold text-slate-900">{formatCurrency(opp.value ?? 0)}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 rounded-full bg-slate-100">
                        <div
                          className="h-1.5 rounded-full bg-indigo-500"
                          style={{ width: `${opp.probability ?? 0}%` }}
                        />
                      </div>
                      <span className="text-xs text-slate-500">{opp.probability}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-medium", OPP_STATUS_COLORS[opp.status])}>
                      {OPP_STATUS_LABELS[opp.status]}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-500">{formatDate(opp.closeDate)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
