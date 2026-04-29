import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

export const dynamic = "force-dynamic";

const CreateSchema = z.object({
  name: z.string().min(1),
  organizationId: z.string().optional().nullable(),
  country: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  value: z.number().optional().nullable(),
  probability: z.number().min(0).max(100).optional().nullable(),
  status: z.string().optional().default("IDENTIFIED"),
  closeDate: z.string().optional().nullable(),
  ownerId: z.string().optional().nullable(),
  nextAction: z.string().optional().nullable(),
  source: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
});

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");

  try {
    const where: Record<string, unknown> = {};
    if (status) where.status = status;

    const items = await prisma.opportunity.findMany({
      where,
      include: {
        organization: { select: { id: true, name: true } },
        owner: { select: { id: true, name: true } },
      },
      orderBy: { updatedAt: "desc" },
    });

    return NextResponse.json({ items });
  } catch {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = CreateSchema.parse(body);

    const opp = await prisma.opportunity.create({
      data: {
        ...data,
        closeDate: data.closeDate ? new Date(data.closeDate) : null,
      } as any,
    });

    return NextResponse.json(opp, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to create" }, { status: 500 });
  }
}
