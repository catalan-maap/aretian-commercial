"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Globe,
  Building2,
  Mail,
  Phone,
  ExternalLink,
  Calendar,
  Clock,
  ArrowRight,
  Star,
  Edit,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  STATUS_LABELS,
  PRIORITY_LABELS,
  ORG_TYPE_LABELS,
  OPP_STATUS_LABELS,
  Organization,
  Opportunity,
  Task,
} from "@/types";
import {
  cn,
  STATUS_COLORS,
  PRIORITY_COLORS,
  OPP_STATUS_COLORS,
  formatDate,
  formatCurrency,
} from "@/lib/utils";
import { EditClientDialog } from "./EditClientDialog";

const SERVICES_SUGGESTED = [
  "Urban Analytics",
  "Digital Twin Platform",
  "Strategic Master Planning",
  "Real Estate Intelligence",
];

interface Props {
  org: Organization;
  opportunities: Opportunity[];
  tasks: Task[];
}

export function ClientDetailContent({ org: initialOrg, opportunities, tasks }: Props) {
  const [org, setOrg] = useState<Organization>(initialOrg);
  const [editOpen, setEditOpen] = useState(false);

  const handleSave = (updated: Partial<Organization>) => {
    setOrg((prev) => ({ ...prev, ...updated }));
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Back */}
      <Link
        href="/clients"
        className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver a Clientes
      </Link>

      {/* Header card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-xl font-bold text-slate-600">
                {org.name.charAt(0)}
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">{org.name}</h1>
                <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-slate-500">
                  {org.website && (
                    <a
                      href={org.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 hover:text-indigo-600"
                    >
                      <ExternalLink className="h-3 w-3" />
                      {org.website.replace(/^https?:\/\//, "")}
                    </a>
                  )}
                  {(org.city || org.country) && (
                    <span className="flex items-center gap-1">
                      <Globe className="h-3 w-3" />
                      {[org.city, org.country].filter(Boolean).join(", ")}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Building2 className="h-3 w-3" />
                    {ORG_TYPE_LABELS[org.type]}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end gap-2">
              <div className="flex gap-2">
                <span
                  className={cn(
                    "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
                    STATUS_COLORS[org.status]
                  )}
                >
                  {STATUS_LABELS[org.status]}
                </span>
                <span
                  className={cn(
                    "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
                    PRIORITY_COLORS[org.priority]
                  )}
                >
                  {PRIORITY_LABELS[org.priority]}
                </span>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="gap-2"
                onClick={() => setEditOpen(true)}
              >
                <Edit className="h-3.5 w-3.5" />
                Editar
              </Button>
            </div>
          </div>

          {org.description && (
            <p className="mt-4 text-sm text-slate-600 leading-relaxed">{org.description}</p>
          )}
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left column */}
        <div className="space-y-4 lg:col-span-2">
          {/* Commercial info */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Información Comercial</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <dt className="text-xs text-slate-400">Último contacto</dt>
                  <dd className="font-medium text-slate-900">{formatDate(org.lastContact)}</dd>
                </div>
                <div>
                  <dt className="text-xs text-slate-400">Responsable</dt>
                  <dd className="font-medium text-slate-900">{org.owner?.name ?? "Sin asignar"}</dd>
                </div>
                <div>
                  <dt className="text-xs text-slate-400">Fuente</dt>
                  <dd className="font-medium text-slate-900">{org.source ?? "—"}</dd>
                </div>
                <div>
                  <dt className="text-xs text-slate-400">Sector</dt>
                  <dd className="font-medium text-slate-900">{org.sector ?? "—"}</dd>
                </div>
                {org.nextAction && (
                  <div className="col-span-2">
                    <dt className="text-xs text-slate-400">Próxima Acción</dt>
                    <dd className="mt-0.5 flex items-start gap-1.5 font-medium text-slate-900">
                      <ArrowRight className="h-3.5 w-3.5 mt-0.5 text-indigo-500 flex-shrink-0" />
                      {org.nextAction}
                    </dd>
                  </div>
                )}
                {org.notes && (
                  <div className="col-span-2">
                    <dt className="text-xs text-slate-400">Notas</dt>
                    <dd className="mt-0.5 text-slate-700 leading-relaxed">{org.notes}</dd>
                  </div>
                )}
              </dl>
            </CardContent>
          </Card>

          {/* Opportunities */}
          {opportunities.length > 0 && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Oportunidades</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-slate-100">
                  {opportunities.map((opp) => (
                    <div key={opp.id} className="px-6 py-3">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-medium text-slate-900">{opp.name}</p>
                        <span
                          className={cn(
                            "flex-shrink-0 inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium",
                            OPP_STATUS_COLORS[opp.status]
                          )}
                        >
                          {OPP_STATUS_LABELS[opp.status]}
                        </span>
                      </div>
                      <div className="mt-1 flex items-center gap-3">
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
          )}

          {/* Tasks */}
          {tasks.length > 0 && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Tareas</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-slate-100">
                  {tasks.map((t) => (
                    <div key={t.id} className="flex items-center gap-3 px-6 py-3">
                      <div
                        className={cn(
                          "h-2 w-2 rounded-full flex-shrink-0",
                          t.status === "IN_PROGRESS"
                            ? "bg-amber-400"
                            : t.status === "DONE"
                            ? "bg-emerald-400"
                            : "bg-slate-300"
                        )}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-900 truncate">{t.title}</p>
                        <p className="text-xs text-slate-400">Vence {formatDate(t.dueDate)}</p>
                      </div>
                      <span
                        className={cn(
                          "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium",
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
          )}
        </div>

        {/* Right column */}
        <div className="space-y-4">
          {/* Services suggested */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Star className="h-4 w-4 text-amber-500" />
                Servicios Recomendados
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-1.5">
                {SERVICES_SUGGESTED.map((s) => (
                  <span
                    key={s}
                    className="inline-flex items-center rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-700"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick actions */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Acciones Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start gap-2" size="sm">
                <Mail className="h-4 w-4" />
                Enviar email de outreach
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2" size="sm">
                <Calendar className="h-4 w-4" />
                Agendar reunión
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2" size="sm">
                <Clock className="h-4 w-4" />
                Registrar interacción
              </Button>
              <Button variant="primary" className="w-full justify-start gap-2" size="sm">
                <ArrowRight className="h-4 w-4" />
                Crear oportunidad
              </Button>
            </CardContent>
          </Card>

          {/* Map preview */}
          <Card>
            <CardContent className="p-4">
              <div className="rounded-lg bg-slate-100 h-32 flex flex-col items-center justify-center text-sm text-slate-400 gap-1">
                <span>📍 {[org.city, org.country].filter(Boolean).join(", ")}</span>
                {org.lat && org.lng && (
                  <span className="text-xs">
                    {org.lat.toFixed(4)}, {org.lng.toFixed(4)}
                  </span>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Edit dialog */}
      <EditClientDialog
        org={org}
        open={editOpen}
        onOpenChange={setEditOpen}
        onSave={handleSave}
      />
    </div>
  );
}
