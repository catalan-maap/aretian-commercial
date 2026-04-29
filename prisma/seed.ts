import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Admin user
  const user = await prisma.user.upsert({
    where: { email: "pablo@aretian.com" },
    update: {},
    create: {
      name: "Pablo Roca",
      email: "pablo@aretian.com",
      role: "ADMIN",
    },
  });

  console.log("✅ User created:", user.email);

  // Sample organizations
  const orgs = [
    {
      name: "Ayuntamiento de Madrid",
      website: "https://www.madrid.es",
      country: "Spain",
      city: "Madrid",
      lat: 40.4168,
      lng: -3.7038,
      type: "GOVERNMENT" as const,
      sector: "Urban Governance",
      status: "ACTIVE_CLIENT" as const,
      priority: "STRATEGIC" as const,
      source: "Direct",
      ownerId: user.id,
      notes: "Contrato activo para análisis urbano del Plan Estratégico 2030.",
      nextAction: "Presentar resultados fase 2",
    },
    {
      name: "Singapore Urban Redevelopment Authority",
      website: "https://www.ura.gov.sg",
      country: "Singapore",
      city: "Singapore",
      lat: 1.3521,
      lng: 103.8198,
      type: "GOVERNMENT" as const,
      sector: "Urban Planning",
      status: "MEETING_SCHEDULED" as const,
      priority: "STRATEGIC" as const,
      source: "Conference",
      ownerId: user.id,
      notes: "Interés en plataforma de digital twin para master planning.",
      nextAction: "Presentación el 5 de mayo",
    },
    {
      name: "UN-Habitat",
      website: "https://unhabitat.org",
      country: "Kenya",
      city: "Nairobi",
      lat: -1.286389,
      lng: 36.817223,
      type: "MULTILATERAL" as const,
      sector: "Urban Development",
      status: "STRATEGIC_PARTNER" as const,
      priority: "STRATEGIC" as const,
      source: "Conference",
      ownerId: user.id,
      notes: "Partner en iniciativas de ciudades sostenibles.",
      nextAction: "Reunión Q2 sobre programa de datos urbanos",
    },
  ];

  for (const org of orgs) {
    await prisma.organization.upsert({
      where: { id: org.name.toLowerCase().replace(/\s/g, "-") },
      update: {},
      create: { id: org.name.toLowerCase().replace(/\s/g, "-"), ...org },
    });
  }

  console.log("✅ Organizations seeded:", orgs.length);
  console.log("🎉 Seed complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
