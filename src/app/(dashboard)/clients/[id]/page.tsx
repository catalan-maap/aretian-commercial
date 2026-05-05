import { notFound } from "next/navigation";
import { MOCK_ORGS, MOCK_OPPORTUNITIES, MOCK_TASKS } from "@/lib/data";
import { ClientDetailContent } from "@/components/clients/ClientDetailContent";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ClientDetailPage({ params }: PageProps) {
  const { id } = await params;
  const org = MOCK_ORGS.find((o) => o.id === id);
  if (!org) notFound();

  const opportunities = MOCK_OPPORTUNITIES.filter((o) => o.organizationId === id);
  const tasks = MOCK_TASKS.filter((t) => t.organizationId === id);

  return <ClientDetailContent org={org} opportunities={opportunities} tasks={tasks} />;
}
