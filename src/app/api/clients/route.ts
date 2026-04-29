import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

export const dynamic = "force-dynamic";

const CreateOrgSchema = z.object({
  name: z.string().min(1),
  website: z.string().url().optional().nullable(),
  country: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  lat: z.number().optional().nullable(),
  lng: z.number().optional().nullable(),
  type: z.string().optional().default("OTHER"),
  sector: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  status: z.string().optional().default("PROSPECT"),
  priority: z.string().optional().default("MEDIUM"),
  source: z.string().optional().nullable(),
  ownerId: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
  nextAction: z.string().optional().nullable(),
});

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search") ?? "";
  const status = searchParams.get("status");
  const priority = searchParams.get("priority");
  const type = searchParams.get("type");
  const page = parseInt(searchParams.get("page") ?? "1");
  const limit = parseInt(searchParams.get("limit") ?? "20");

  try {
    const where: Record<string, unknown> = {};

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { country: { contains: search, mode: "insensitive" } },
        { city: { contains: search, mode: "insensitive" } },
      ];
    }
    if (status) where.status = status;
    if (priority) where.priority = priority;
    if (type) where.type = type;

    const [items, total] = await Promise.all([
      prisma.organization.findMany({
        where,
        include: {
          owner: { select: { id: true, name: true, email: true } },
          _count: { select: { contacts: true, opportunities: true } },
        },
        orderBy: { updatedAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.organization.count({ where }),
    ]);

    return NextResponse.json({ items, total, page, limit });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch organizations" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = CreateOrgSchema.parse(body);

    const org = await prisma.organization.create({
      data: data as any,
      include: {
        owner: { select: { id: true, name: true, email: true } },
      },
    });

    return NextResponse.json(org, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to create organization" }, { status: 500 });
  }
}
