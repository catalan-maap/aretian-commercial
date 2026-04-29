import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") ?? "";

  if (!q || q.length < 2) {
    return NextResponse.json({ results: [] });
  }

  try {
    const [orgs, opportunities, presentations] = await Promise.all([
      prisma.organization.findMany({
        where: {
          OR: [
            { name: { contains: q, mode: "insensitive" } },
            { country: { contains: q, mode: "insensitive" } },
            { city: { contains: q, mode: "insensitive" } },
          ],
        },
        select: { id: true, name: true, city: true, country: true, type: true },
        take: 5,
      }),
      prisma.opportunity.findMany({
        where: { name: { contains: q, mode: "insensitive" } },
        select: { id: true, name: true, status: true },
        take: 5,
      }),
      prisma.presentation.findMany({
        where: { title: { contains: q, mode: "insensitive" } },
        select: { id: true, title: true, status: true },
        take: 5,
      }),
    ]);

    return NextResponse.json({
      results: {
        organizations: orgs,
        opportunities,
        presentations,
      },
    });
  } catch {
    return NextResponse.json({ error: "Search failed" }, { status: 500 });
  }
}
