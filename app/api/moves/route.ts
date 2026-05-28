import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = (session.user as any).id;
  const role = (session.user as any).role;

  if (role === "CUSTOMER") {
    const moves = await prisma.move.findMany({
      where: { customerId: userId },
      include: { vendor: true, items: true, trackingEvents: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(moves);
  }

  if (role === "VENDOR") {
    const vendor = await prisma.vendor.findUnique({ where: { userId } });
    if (!vendor) return NextResponse.json([]);
    const moves = await prisma.move.findMany({
      where: { vendorId: vendor.id },
      include: { customer: { select: { name: true, email: true, phone: true } }, items: true, trackingEvents: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(moves);
  }

  return NextResponse.json({ error: "Forbidden" }, { status: 403 });
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user || (session.user as any).role !== "CUSTOMER") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = (session.user as any).id;
  const body = await req.json();
  const { origin, destination, estimatedCbm, packingDate, notes, items } = body;

  const move = await prisma.move.create({
    data: {
      customerId: userId,
      origin,
      destination,
      estimatedCbm,
      packingDate: packingDate ? new Date(packingDate) : undefined,
      notes,
      items: {
        create: items?.map((item: any) => ({
          name: item.name,
          category: item.category,
          size: item.size,
          cbmValue: item.cbmValue,
          quantity: item.quantity,
        })) ?? [],
      },
    },
    include: { items: true },
  });

  return NextResponse.json(move, { status: 201 });
}
