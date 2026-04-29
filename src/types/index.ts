export type UserRole = "ADMIN" | "BUSINESS_DEVELOPMENT" | "PARTNER" | "VIEWER";

export type OrganizationType =
  | "GOVERNMENT"
  | "REAL_ESTATE_DEVELOPER"
  | "URBAN_DEVELOPER"
  | "INVESTMENT_FUND"
  | "INFRASTRUCTURE"
  | "ARCHITECTURE_PLANNING"
  | "TECHNOLOGY_PARTNER"
  | "ACADEMIC"
  | "MULTILATERAL"
  | "NGO_FOUNDATION"
  | "SMART_CITY"
  | "MOBILITY_TRANSPORT"
  | "CLIMATE_RESILIENCE"
  | "TOURISM_DESTINATION"
  | "HOUSING_URBAN"
  | "INNOVATION_DISTRICT"
  | "ECONOMIC_DEVELOPMENT"
  | "OTHER";

export type CommercialStatus =
  | "PROSPECT"
  | "CONTACTED"
  | "MEETING_SCHEDULED"
  | "PROPOSAL_SENT"
  | "NEGOTIATION"
  | "ACTIVE_CLIENT"
  | "PAST_CLIENT"
  | "LOST"
  | "ON_HOLD"
  | "STRATEGIC_PARTNER";

export type Priority = "LOW" | "MEDIUM" | "HIGH" | "STRATEGIC";

export type OpportunityStatus =
  | "IDENTIFIED"
  | "RESEARCH"
  | "INITIAL_CONTACT"
  | "MEETING"
  | "PROPOSAL"
  | "NEGOTIATION"
  | "WON"
  | "LOST"
  | "ON_HOLD";

export type NewsStatus = "UNREVIEWED" | "REVIEWED" | "SAVED" | "DISCARDED" | "CONVERTED";

export type PresentationStatus = "DRAFT" | "ACTIVE" | "OBSOLETE";

export type TaskStatus = "PENDING" | "IN_PROGRESS" | "DONE" | "CANCELLED";

export interface Organization {
  id: string;
  name: string;
  logo?: string | null;
  website?: string | null;
  country?: string | null;
  city?: string | null;
  lat?: number | null;
  lng?: number | null;
  type: OrganizationType;
  sector?: string | null;
  description?: string | null;
  status: CommercialStatus;
  priority: Priority;
  source?: string | null;
  ownerId?: string | null;
  notes?: string | null;
  lastContact?: string | null;
  nextAction?: string | null;
  createdAt: string;
  updatedAt: string;
  owner?: { id: string; name: string | null; email: string } | null;
  _count?: { contacts: number; opportunities: number };
}

export interface Contact {
  id: string;
  organizationId: string;
  name: string;
  role?: string | null;
  email?: string | null;
  phone?: string | null;
  linkedin?: string | null;
  notes?: string | null;
}

export interface Opportunity {
  id: string;
  name: string;
  organizationId?: string | null;
  country?: string | null;
  city?: string | null;
  description?: string | null;
  value?: number | null;
  probability?: number | null;
  status: OpportunityStatus;
  closeDate?: string | null;
  ownerId?: string | null;
  nextAction?: string | null;
  source?: string | null;
  notes?: string | null;
  createdAt: string;
  updatedAt: string;
  organization?: { id: string; name: string } | null;
  owner?: { id: string; name: string | null } | null;
}

export interface NewsItem {
  id: string;
  title: string;
  source?: string | null;
  url?: string | null;
  publishedAt?: string | null;
  summary?: string | null;
  country?: string | null;
  city?: string | null;
  sector?: string | null;
  relevance?: number | null;
  opportunityType?: string | null;
  nextAction?: string | null;
  status: NewsStatus;
  assigneeId?: string | null;
  aiSummary?: string | null;
  aiTags?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Presentation {
  id: string;
  title: string;
  description?: string | null;
  fileUrl?: string | null;
  fileName?: string | null;
  targetType?: OrganizationType | null;
  sector?: string | null;
  region?: string | null;
  language?: string | null;
  services?: string[];
  version?: string | null;
  status: PresentationStatus;
  createdAt: string;
  updatedAt: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string | null;
  ownerId?: string | null;
  dueDate?: string | null;
  priority: Priority;
  status: TaskStatus;
  organizationId?: string | null;
  opportunityId?: string | null;
  newsItemId?: string | null;
  createdAt: string;
  updatedAt: string;
  owner?: { id: string; name: string | null } | null;
}

export interface DashboardStats {
  totalClients: number;
  activeClients: number;
  prospects: number;
  pastClients: number;
  openOpportunities: number;
  strategicPartners: number;
  pendingTasks: number;
  recentNews: number;
  countriesCount: number;
  pipelineByStatus: { status: string; count: number }[];
  clientsByType: { type: string; count: number }[];
  clientsByPriority: { priority: string; count: number }[];
}

export const ORG_TYPE_LABELS: Record<OrganizationType, string> = {
  GOVERNMENT: "Gobierno / Sector Público",
  REAL_ESTATE_DEVELOPER: "Real Estate Developer",
  URBAN_DEVELOPER: "Urban Developer",
  INVESTMENT_FUND: "Fondo de Inversión",
  INFRASTRUCTURE: "Infraestructura",
  ARCHITECTURE_PLANNING: "Arquitectura / Planificación",
  TECHNOLOGY_PARTNER: "Partner Tecnológico",
  ACADEMIC: "Institución Académica",
  MULTILATERAL: "Organismo Multilateral",
  NGO_FOUNDATION: "ONG / Fundación",
  SMART_CITY: "Smart City Initiative",
  MOBILITY_TRANSPORT: "Movilidad / Transporte",
  CLIMATE_RESILIENCE: "Clima / Resiliencia",
  TOURISM_DESTINATION: "Turismo / Destino",
  HOUSING_URBAN: "Vivienda / Desarrollo Urbano",
  INNOVATION_DISTRICT: "Distrito de Innovación",
  ECONOMIC_DEVELOPMENT: "Desarrollo Económico",
  OTHER: "Otro",
};

export const STATUS_LABELS: Record<CommercialStatus, string> = {
  PROSPECT: "Prospect",
  CONTACTED: "Contactado",
  MEETING_SCHEDULED: "Reunión Agendada",
  PROPOSAL_SENT: "Propuesta Enviada",
  NEGOTIATION: "Negociación",
  ACTIVE_CLIENT: "Cliente Activo",
  PAST_CLIENT: "Cliente Pasado",
  LOST: "Perdido",
  ON_HOLD: "En Pausa",
  STRATEGIC_PARTNER: "Partner Estratégico",
};

export const PRIORITY_LABELS: Record<Priority, string> = {
  LOW: "Baja",
  MEDIUM: "Media",
  HIGH: "Alta",
  STRATEGIC: "Estratégica",
};

export const OPP_STATUS_LABELS: Record<OpportunityStatus, string> = {
  IDENTIFIED: "Identificada",
  RESEARCH: "Investigación",
  INITIAL_CONTACT: "Contacto Inicial",
  MEETING: "Reunión",
  PROPOSAL: "Propuesta",
  NEGOTIATION: "Negociación",
  WON: "Ganada",
  LOST: "Perdida",
  ON_HOLD: "En Pausa",
};
