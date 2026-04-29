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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ORG_TYPE_LABELS, STATUS_LABELS, PRIORITY_LABELS } from "@/types";

interface Props {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}

export function NewClientDialog({ open, onOpenChange }: Props) {
  const [form, setForm] = useState({
    name: "",
    country: "",
    city: "",
    type: "GOVERNMENT",
    status: "PROSPECT",
    priority: "MEDIUM",
    website: "",
    description: "",
    nextAction: "",
  });

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Nuevo Cliente / Organización</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-2">
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2">
              <label className="mb-1 block text-xs font-medium text-slate-700">Nombre *</label>
              <Input placeholder="Nombre de la organización" value={form.name} onChange={set("name")} />
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-slate-700">País</label>
              <Input placeholder="Spain" value={form.country} onChange={set("country")} />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-700">Ciudad</label>
              <Input placeholder="Madrid" value={form.city} onChange={set("city")} />
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-slate-700">Tipo</label>
              <Select value={form.type} onValueChange={(v) => setForm((f) => ({ ...f, type: v }))}>
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

            <div>
              <label className="mb-1 block text-xs font-medium text-slate-700">Estado</label>
              <Select value={form.status} onValueChange={(v) => setForm((f) => ({ ...f, status: v }))}>
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

            <div>
              <label className="mb-1 block text-xs font-medium text-slate-700">Website</label>
              <Input placeholder="https://" value={form.website} onChange={set("website")} />
            </div>

            <div className="col-span-2">
              <label className="mb-1 block text-xs font-medium text-slate-700">Descripción</label>
              <Textarea
                placeholder="Descripción de la organización..."
                rows={3}
                value={form.description}
                onChange={set("description")}
              />
            </div>

            <div className="col-span-2">
              <label className="mb-1 block text-xs font-medium text-slate-700">Próxima Acción</label>
              <Input
                placeholder="¿Cuál es el siguiente paso?"
                value={form.nextAction}
                onChange={set("nextAction")}
              />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button
            variant="primary"
            disabled={!form.name}
            onClick={() => {
              // In production: POST /api/clients
              onOpenChange(false);
            }}
          >
            Crear Cliente
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
