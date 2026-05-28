import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const moveId = searchParams.get("moveId");

  if (!moveId) {
    return NextResponse.json({ error: "moveId required" }, { status: 400 });
  }

  const quotes = await prisma.quote.findMany({
    where: { moveId },
    include: { vendor: true },
    orderBy: { fclPrice: "asc" },
  });

  return NextResponse.json(quotes);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user || (session.user as any).role !== "VENDOR") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = (session.user as any).id;
  const vendor = await prisma.vendor.findUnique({ where: { userId } });
  if (!vendor) return NextResponse.json({ error: "Vendor profile not found" }, { status: 404 });

  const body = await req.json();
  const { moveId, fclPrice, lclPrice, availableDates, appealPoints, companyIntro } = body;

  const move = await prisma.move.findUnique({ where: { id: moveId } });
  if (!move || move.status !== "QUOTING") {
    return NextResponse.json({ error: "Move not available for quoting" }, { status: 400 });
  }

  const existing = await prisma.quote.findFirst({ where: { moveId, vendorId: vendor.id } });
  if (existing) {
    return NextResponse.json({ error: "Already submitted a quote for this move" }, { status: 409 });
  }

  const quote = await prisma.quote.create({
    data: {
      moveId,
      vendorId: vendor.id,
      fclPrice: fclPrice ? Number(fclPrice) : null,
      lclPrice: lclPrice ? Number(lclPrice) : null,
      availableDates: availableDates ?? [],
      appealPoints,
      companyIntro,
    },
  });

  return NextResponse.json(quote, { status: 201 });
}
