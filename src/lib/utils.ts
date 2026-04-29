import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { CommercialStatus, OrganizationType, Priority, OpportunityStatus } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date | null | undefined): string {
  if (!date) return "—";
  return new Date(date).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function formatCurrency(value: number | null | undefined): string {
  if (value == null) return "—";
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

export const STATUS_COLORS: Record<CommercialStatus, string> = {
  PROSPECT: "bg-slate-100 text-slate-700",
  CONTACTED: "bg-blue-100 text-blue-700",
  MEETING_SCHEDULED: "bg-indigo-100 text-indigo-700",
  PROPOSAL_SENT: "bg-violet-100 text-violet-700",
  NEGOTIATION: "bg-amber-100 text-amber-700",
  ACTIVE_CLIENT: "bg-emerald-100 text-emerald-700",
  PAST_CLIENT: "bg-gray-100 text-gray-600",
  LOST: "bg-red-100 text-red-700",
  ON_HOLD: "bg-orange-100 text-orange-700",
  STRATEGIC_PARTNER: "bg-purple-100 text-purple-700",
};

export const PRIORITY_COLORS: Record<Priority, string> = {
  LOW: "bg-slate-100 text-slate-600",
  MEDIUM: "bg-blue-100 text-blue-700",
  HIGH: "bg-amber-100 text-amber-700",
  STRATEGIC: "bg-red-100 text-red-700",
};

export const OPP_STATUS_COLORS: Record<OpportunityStatus, string> = {
  IDENTIFIED: "bg-slate-100 text-slate-700",
  RESEARCH: "bg-blue-100 text-blue-700",
  INITIAL_CONTACT: "bg-sky-100 text-sky-700",
  MEETING: "bg-indigo-100 text-indigo-700",
  PROPOSAL: "bg-violet-100 text-violet-700",
  NEGOTIATION: "bg-amber-100 text-amber-700",
  WON: "bg-emerald-100 text-emerald-700",
  LOST: "bg-red-100 text-red-700",
  ON_HOLD: "bg-orange-100 text-orange-700",
};

export const TYPE_MAP_COLORS: Record<OrganizationType, string> = {
  GOVERNMENT: "#3B82F6",
  REAL_ESTATE_DEVELOPER: "#10B981",
  URBAN_DEVELOPER: "#059669",
  INVESTMENT_FUND: "#8B5CF6",
  INFRASTRUCTURE: "#F59E0B",
  ARCHITECTURE_PLANNING: "#EC4899",
  TECHNOLOGY_PARTNER: "#06B6D4",
  ACADEMIC: "#6366F1",
  MULTILATERAL: "#EF4444",
  NGO_FOUNDATION: "#84CC16",
  SMART_CITY: "#0EA5E9",
  MOBILITY_TRANSPORT: "#F97316",
  CLIMATE_RESILIENCE: "#22C55E",
  TOURISM_DESTINATION: "#A855F7",
  HOUSING_URBAN: "#14B8A6",
  INNOVATION_DISTRICT: "#F43F5E",
  ECONOMIC_DEVELOPMENT: "#FB923C",
  OTHER: "#94A3B8",
};

export const PIPELINE_STAGES: OpportunityStatus[] = [
  "IDENTIFIED",
  "RESEARCH",
  "INITIAL_CONTACT",
  "MEETING",
  "PROPOSAL",
  "NEGOTIATION",
  "WON",
];
