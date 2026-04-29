"use client";

import { useState } from "react";
import { Plus, CheckCircle2, Circle, Clock, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MOCK_TASKS } from "@/lib/data";
import { PRIORITY_LABELS, Priority, TaskStatus } from "@/types";
import { cn, PRIORITY_COLORS, formatDate } from "@/lib/utils";

const STATUS_CONFIG: Record<TaskStatus, { label: string; icon: React.ElementType; color: string }> = {
  PENDING: { label: "Pendiente", icon: Circle, color: "text-slate-400" },
  IN_PROGRESS: { label: "En Progreso", icon: Clock, color: "text-amber-500" },
  DONE: { label: "Completada", icon: CheckCircle2, color: "text-emerald-500" },
  CANCELLED: { label: "Cancelada", icon: AlertCircle, color: "text-red-400" },
};

export default function TasksPage() {
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [priorityFilter, setPriorityFilter] = useState("ALL");

  const filtered = MOCK_TASKS.filter((t) => {
    const matchStatus = statusFilter === "ALL" || t.status === statusFilter;
    const matchPriority = priorityFilter === "ALL" || t.priority === priorityFilter;
    return matchStatus && matchPriority;
  });

  const grouped = {
    PENDING: filtered.filter((t) => t.status === "PENDING"),
    IN_PROGRESS: filtered.filter((t) => t.status === "IN_PROGRESS"),
    DONE: filtered.filter((t) => t.status === "DONE"),
    CANCELLED: filtered.filter((t) => t.status === "CANCELLED"),
  };

  const isOverdue = (dueDate: string | null | undefined) => {
    if (!dueDate) return false;
    return new Date(dueDate) < new Date();
  };

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">Todos</SelectItem>
            {Object.entries(STATUS_CONFIG).map(([k, v]) => (
              <SelectItem key={k} value={k}>{v.label}</SelectItem>
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
        <Button variant="primary" className="ml-auto gap-2">
          <Plus className="h-4 w-4" />
          Nueva Tarea
        </Button>
      </div>

      {/* Summary badges */}
      <div className="flex gap-3">
        {Object.entries(STATUS_CONFIG).map(([k, cfg]) => {
          const count = MOCK_TASKS.filter((t) => t.status === k).length;
          const Icon = cfg.icon;
          return (
            <button
              key={k}
              onClick={() => setStatusFilter(statusFilter === k ? "ALL" : k)}
              className={cn(
                "flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-medium transition-colors",
                statusFilter === k
                  ? "border-indigo-300 bg-indigo-50 text-indigo-700"
                  : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
              )}
            >
              <Icon className={cn("h-3.5 w-3.5", cfg.color)} />
              {cfg.label}
              <span className="ml-1 rounded-full bg-slate-100 px-1.5 py-0.5 text-[10px]">{count}</span>
            </button>
          );
        })}
      </div>

      {/* Task list */}
      <div className="space-y-2">
        {(["IN_PROGRESS", "PENDING", "DONE", "CANCELLED"] as TaskStatus[]).map((status) => {
          const tasks = grouped[status];
          if (tasks.length === 0) return null;
          const cfg = STATUS_CONFIG[status];
          const Icon = cfg.icon;

          return (
            <div key={status}>
              <div className="mb-2 flex items-center gap-2">
                <Icon className={cn("h-4 w-4", cfg.color)} />
                <h2 className="text-sm font-semibold text-slate-700">{cfg.label}</h2>
                <span className="rounded-full bg-slate-100 px-1.5 py-0.5 text-[10px] text-slate-500">
                  {tasks.length}
                </span>
              </div>
              <div className="space-y-2 mb-4">
                {tasks.map((task) => (
                  <Card
                    key={task.id}
                    className={cn(
                      "hover:shadow-sm transition-shadow",
                      isOverdue(task.dueDate) && task.status !== "DONE" ? "border-red-200" : ""
                    )}
                  >
                    <CardContent className="flex items-start gap-3 p-4">
                      <button className="mt-0.5 flex-shrink-0">
                        <Icon className={cn("h-4 w-4", cfg.color)} />
                      </button>
                      <div className="flex-1 min-w-0">
                        <p
                          className={cn(
                            "text-sm font-medium",
                            task.status === "DONE" ? "line-through text-slate-400" : "text-slate-900"
                          )}
                        >
                          {task.title}
                        </p>
                        {task.description && (
                          <p className="mt-0.5 text-xs text-slate-500 line-clamp-1">{task.description}</p>
                        )}
                        <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs text-slate-400">
                          {task.owner && <span>{task.owner.name}</span>}
                          {task.dueDate && (
                            <span
                              className={cn(
                                isOverdue(task.dueDate) && task.status !== "DONE"
                                  ? "text-red-500 font-medium"
                                  : ""
                              )}
                            >
                              Vence {formatDate(task.dueDate)}
                            </span>
                          )}
                        </div>
                      </div>
                      <span
                        className={cn(
                          "flex-shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium",
                          PRIORITY_COLORS[task.priority]
                        )}
                      >
                        {PRIORITY_LABELS[task.priority]}
                      </span>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-slate-400">
            <CheckCircle2 className="h-12 w-12 mb-2 text-slate-200" />
            <p>No hay tareas</p>
          </div>
        )}
      </div>
    </div>
  );
}
