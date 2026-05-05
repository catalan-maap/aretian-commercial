"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ORG_TYPE_LABELS,
  STATUS_LABELS,
  PRIORITY_LABELS,
  Organization,
  OrganizationType,
  CommercialStatus,
  Priority,
} from "@/types";

interface Props {
  org: Organization;
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onSave: (updated: Partial<Organization>) => void;
}

export function EditClientDialog({ org, open, onOpenChange, onSave }: Props) {
  const [form, setForm] = useState({
    name: org.name ?? "",
    website: org.website ?? "",
    country: org.country ?? "",
    city: org.city ?? "",
    type: org.type as string,
    sector: org.sector ?? "",
    status: org.status as string,
    priority: org.priority as string,
    source: org.source ?? "",
    description: org.description ?? "",
    lastContact: org.lastContact ? org.lastContact.split("T")[0] : "",
    nextAction: org.nextAction ?? "",
    notes: org.notes ?? "",
  });
  const [saving, setSaving] = useState(false);

  const set =
    (k: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSave = async () => {
    setSaving(true);
    const payload = {
      ...form,
      type: form.type as OrganizationType,
      status: form.status as CommercialStatus,
      priority: form.priority as Priority,
      lastContact: form.lastContact || null,
    };
    onSave(payload);
    setSaving(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar — {org.name}</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-2">
          <div className="grid grid-cols-2 gap-3">
            {/* Name */}
            <div className="col-span-2">
              <label className="mb-1 block text-xs font-medium text-slate-700">Nombre *</label>
              <Input value={form.name} onChange={set("name")} placeholder="Nombre de la organización" />
            </div>

            {/* Country / City */}
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-700">País</label>
              <Input value={form.country} onChange={set("country")} placeholder="Spain" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-700">Ciudad</label>
              <Input value={form.city} onChange={set("city")} placeholder="Madrid" />
            </div>

            {/* Type */}
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-700">Tipo</label>
              <Select
                value={form.type}
                onValueChange={(v) => setForm((f) => ({ ...f, type: v }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(ORG_TYPE_LABELS).map(([k, v]) => (
                    <SelectItem key={k} value={k}>
                      {v}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Sector */}
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-700">Sector</label>
              <Input value={form.sector} onChange={set("sector")} placeholder="Urban Governance" />
            </div>

            {/* Status */}
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-700">Estado comercial</label>
              <Select
                value={form.status}
                onValueChange={(v) => setForm((f) => ({ ...f, status: v }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(STATUS_LABELS).map(([k, v]) => (
                    <SelectItem key={k} value={k}>
                      {v}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Priority */}
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-700">Prioridad</label>
              <Select
                value={form.priority}
                onValueChange={(v) => setForm((f) => ({ ...f, priority: v }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(PRIORITY_LABELS).map(([k, v]) => (
                    <SelectItem key={k} value={k}>
                      {v}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Website */}
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-700">Website</label>
              <Input value={form.website} onChange={set("website")} placeholder="https://" />
            </div>

            {/* Source */}
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-700">Fuente</label>
              <Input value={form.source} onChange={set("source")} placeholder="Referral, LinkedIn…" />
            </div>

            {/* Last contact */}
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-700">Último contacto</label>
              <Input type="date" value={form.lastContact} onChange={set("lastContact")} />
            </div>

            {/* Next action */}
            <div className="col-span-2">
              <label className="mb-1 block text-xs font-medium text-slate-700">Próxima Acción</label>
              <Input
                value={form.nextAction}
                onChange={set("nextAction")}
                placeholder="¿Cuál es el siguiente paso?"
              />
            </div>

            {/* Description */}
            <div className="col-span-2">
              <label className="mb-1 block text-xs font-medium text-slate-700">Descripción</label>
              <Textarea
                rows={2}
                value={form.description}
                onChange={set("description")}
                placeholder="Descripción de la organización…"
              />
            </div>

            {/* Notes */}
            <div className="col-span-2">
              <label className="mb-1 block text-xs font-medium text-slate-700">Notas</label>
              <Textarea
                rows={3}
                value={form.notes}
                onChange={set("notes")}
                placeholder="Notas internas…"
              />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button variant="primary" disabled={!form.name || saving} onClick={handleSave}>
            {saving ? "Guardando…" : "Guardar cambios"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
