import {
  Building2,
  TrendingUp,
  Globe,
  Newspaper,
  CheckSquare,
  Users,
  Star,
  Clock,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MOCK_STATS, MOCK_ORGS, MOCK_OPPORTUNITIES, MOCK_TASKS, MOCK_NEWS } from "@/lib/data";
import {
  STATUS_LABELS,
  PRIORITY_LABELS,
  OPP_STATUS_LABELS,
  ORG_TYPE_LABELS,
} from "@/types";
import { STATUS_COLORS, PRIORITY_COLORS, OPP_STATUS_COLORS } from "@/lib/utils";
import { cn, formatDate, formatCurrency } from "@/lib/utils";
import { PipelineChart } from "@/components/dashboard/PipelineChart";
import { TypeChart } from "@/components/dashboard/TypeChart";

const STAT_CARDS = [
  {
    label: "Clientes Activos",
    value: MOCK_STATS.activeClients,
    icon: Building2,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    sub: `de ${MOCK_STATS.totalClients} totales`,
  },
  {
    label: "Prospects",
    value: MOCK_STATS.prospects,
    icon: Users,
    color: "text-blue-600",
    bg: "bg-blue-50",
    sub: "en seguimiento activo",
  },
  {
    label: "Oportunidades",
    value: MOCK_STATS.openOpportunities,
    icon: TrendingUp,
    color: "text-violet-600",
    bg: "bg-violet-50",
    sub: "pipeline abierto",
  },
  {
    label: "Países",
    value: MOCK_STATS.countriesCount,
    icon: Globe,
    color: "text-sky-600",
    bg: "bg-sky-50",
    sub: "con presencia comercial",
  },
  {
    label: "Noticias Nuevas",
    value: MOCK_STATS.recentNews,
    icon: Newspaper,
    color: "text-amber-600",
    bg: "bg-amber-50",
    sub: "por revisar",
  },
  {
    label: "Tareas Pendientes",
    value: MOCK_STATS.pendingTasks,
    icon: CheckSquare,
    color: "text-red-600",
    bg: "bg-red-50",
    sub: "esta semana",
  },
  {
    label: "Partners",
    value: MOCK_STATS.strategicPartners,
    icon: Star,
    color: "text-purple-600",
    bg: "bg-purple-50",
    sub: "estratégicos",
  },
  {
    label: "Clientes Pasados",
    value: MOCK_STATS.pastClients,
    icon: Clock,
    color: "text-slate-500",
    bg: "bg-slate-50",
    sub: "para reactivar",
  },
];

export default function DashboardPage() {
  const urgentTasks = MOCK_TASKS.filter((t) => t.status !== "DONE" && t.priority === "STRATEGIC");
  const recentOrgs = MOCK_ORGS.slice(0, 5);
  const topOpportunities = MOCK_OPPORTUNITIES.slice(0, 4);

  return (
    <div className="space-y-6">
      {/* KPIs */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-4 xl:grid-cols-8">
        {STAT_CARDS.map((s) => (
          <Card key={s.label} className="relative overflow-hidden">
            <CardContent className="p-4">
              <div className={cn("mb-2 inline-flex rounded-lg p-2", s.bg)}>
                <s.icon className={cn("h-4 w-4", s.color)} />
              </div>
              <p className="text-2xl font-bold text-slate-900">{s.value}</p>
              <p className="text-xs font-medium text-slate-700">{s.label}</p>
              <p className="text-[10px] text-slate-400">{s.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Pipeline chart */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle>Pipeline por Etapa</CardTitle>
          </CardHeader>
          <CardContent>
            <PipelineChart data={MOCK_STATS.pipelineByStatus} />
          </CardContent>
        </Card>

        {/* Type distribution */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Clientes por Tipo</CardTitle>
          </CardHeader>
          <CardContent>
            <TypeChart data={MOCK_STATS.clientsByType} />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent clients */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Actividad Reciente — Clientes</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-slate-100">
              {recentOrgs.map((org) => (
                <div key={org.id} className="flex items-center gap-3 px-6 py-3">
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-slate-100 text-sm font-bold text-slate-600">
                    {org.name.charAt(0)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-slate-900">{org.name}</p>
                    <p className="text-xs text-slate-400">
                      {org.city}, {org.country} · {ORG_TYPE_LABELS[org.type]}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span
                      className={cn(
                        "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium",
                        STATUS_COLORS[org.status]
                      )}
                    >
                      {STATUS_LABELS[org.status]}
                    </span>
                    <span
                      className={cn(
                        "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium",
                        PRIORITY_COLORS[org.priority]
                      )}
                    >
                      {PRIORITY_LABELS[org.priority]}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top opportunities */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Oportunidades Clave</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-slate-100">
              {topOpportunities.map((opp) => (
                <div key={opp.id} className="px-6 py-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-slate-900">{opp.name}</p>
                      <p className="text-xs text-slate-400">
                        {opp.organization?.name} · {opp.country}
                      </p>
                    </div>
                    <span
                      className={cn(
                        "flex-shrink-0 inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium",
                        OPP_STATUS_COLORS[opp.status]
                      )}
                    >
                      {OPP_STATUS_LABELS[opp.status]}
                    </span>
                  </div>
                  <div className="mt-1.5 flex items-center gap-3">
                    <span className="text-xs font-semibold text-slate-700">
                      {formatCurrency(opp.value ?? 0)}
                    </span>
                    <div className="flex-1 rounded-full bg-slate-100 h-1.5">
                      <div
                        className="h-1.5 rounded-full bg-indigo-500"
                        style={{ width: `${opp.probability ?? 0}%` }}
                      />
                    </div>
                    <span className="text-xs text-slate-400">{opp.probability}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent news + urgent tasks */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Noticias Recientes</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-slate-100">
              {MOCK_NEWS.map((n) => (
                <div key={n.id} className="px-6 py-3">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-medium text-slate-900 line-clamp-2">{n.title}</p>
                    <span className="flex-shrink-0 text-xs font-bold text-indigo-600 bg-indigo-50 rounded px-1.5 py-0.5">
                      {n.relevance}/10
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-slate-400">
                    {n.source} · {n.country} · {formatDate(n.publishedAt)}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Tareas Urgentes</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-slate-100">
              {MOCK_TASKS.map((t) => (
                <div key={t.id} className="flex items-center gap-3 px-6 py-3">
                  <div
                    className={cn(
                      "h-2 w-2 flex-shrink-0 rounded-full",
                      t.status === "IN_PROGRESS"
                        ? "bg-amber-400"
                        : t.status === "DONE"
                        ? "bg-emerald-400"
                        : "bg-slate-300"
                    )}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-slate-900">{t.title}</p>
                    <p className="text-xs text-slate-400">Vence {formatDate(t.dueDate)}</p>
                  </div>
                  <span
                    className={cn(
                      "flex-shrink-0 inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium",
                      PRIORITY_COLORS[t.priority]
                    )}
                  >
                    {PRIORITY_LABELS[t.priority]}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
