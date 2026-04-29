"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Search, Filter, Globe, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { MOCK_ORGS } from "@/lib/data";
import {
  STATUS_LABELS,
  PRIORITY_LABELS,
  ORG_TYPE_LABELS,
  CommercialStatus,
  Priority,
} from "@/types";
import { cn, STATUS_COLORS, PRIORITY_COLORS } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { NewClientDialog } from "@/components/clients/NewClientDialog";

const STATUSES: { value: CommercialStatus | "ALL"; label: string }[] = [
  { value: "ALL", label: "Todos los estados" },
  { value: "PROSPECT", label: "Prospect" },
  { value: "CONTACTED", label: "Contactado" },
  { value: "MEETING_SCHEDULED", label: "Reunión Agendada" },
  { value: "PROPOSAL_SENT", label: "Propuesta Enviada" },
  { value: "NEGOTIATION", label: "Negociación" },
  { value: "ACTIVE_CLIENT", label: "Cliente Activo" },
  { value: "PAST_CLIENT", label: "Cliente Pasado" },
  { value: "STRATEGIC_PARTNER", label: "Partner Estratégico" },
  { value: "ON_HOLD", label: "En Pausa" },
  { value: "LOST", label: "Perdido" },
];

export default function ClientsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [priorityFilter, setPriorityFilter] = useState<string>("ALL");
  const [showNew, setShowNew] = useState(false);

  const filtered = MOCK_ORGS.filter((o) => {
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      o.name.toLowerCase().includes(q) ||
      o.country?.toLowerCase().includes(q) ||
      o.city?.toLowerCase().includes(q);
    const matchStatus = statusFilter === "ALL" || o.status === statusFilter;
    const matchPriority = priorityFilter === "ALL" || o.priority === priorityFilter;
    return matchSearch && matchStatus && matchPriority;
  });

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            placeholder="Buscar clientes..."
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Estado" />
          </SelectTrigger>
          <SelectContent>
            {STATUSES.map((s) => (
              <SelectItem key={s.value} value={s.value}>
                {s.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={priorityFilter} onValueChange={setPriorityFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Prioridad" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">Toda prioridad</SelectItem>
            <SelectItem value="STRATEGIC">Estratégica</SelectItem>
            <SelectItem value="HIGH">Alta</SelectItem>
            <SelectItem value="MEDIUM">Media</SelectItem>
            <SelectItem value="LOW">Baja</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="primary" onClick={() => setShowNew(true)} className="ml-auto gap-2">
          <Plus className="h-4 w-4" />
          Nuevo Cliente
        </Button>
      </div>

      {/* Count */}
      <p className="text-sm text-slate-500">
        <span className="font-semibold text-slate-900">{filtered.length}</span> clientes
      </p>

      {/* Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((org) => (
          <Link key={org.id} href={`/clients/${org.id}`}>
            <Card className="cursor-pointer p-4 hover:shadow-md transition-shadow hover:border-indigo-200">
              <div className="flex items-start justify-between gap-2">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-slate-100 text-base font-bold text-slate-600">
                  {org.name.charAt(0)}
                </div>
                <span
                  className={cn(
                    "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium",
                    PRIORITY_COLORS[org.priority]
                  )}
                >
                  {PRIORITY_LABELS[org.priority]}
                </span>
              </div>

              <div className="mt-3">
                <h3 className="text-sm font-semibold text-slate-900 leading-tight line-clamp-2">
                  {org.name}
                </h3>
                <div className="mt-1 flex items-center gap-1 text-xs text-slate-400">
                  <Globe className="h-3 w-3" />
                  {org.city ?? "—"}, {org.country ?? "—"}
                </div>
                <div className="mt-0.5 flex items-center gap-1 text-xs text-slate-400">
                  <Building2 className="h-3 w-3" />
                  {ORG_TYPE_LABELS[org.type]}
                </div>
              </div>

              <div className="mt-3 flex items-center gap-2">
                <span
                  className={cn(
                    "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium",
                    STATUS_COLORS[org.status]
                  )}
                >
                  {STATUS_LABELS[org.status]}
                </span>
              </div>

              {org.nextAction && (
                <p className="mt-2 text-[10px] text-slate-400 line-clamp-1">
                  → {org.nextAction}
                </p>
              )}
            </Card>
          </Link>
        ))}
      </div>

      <NewClientDialog open={showNew} onOpenChange={setShowNew} />
    </div>
  );
}
