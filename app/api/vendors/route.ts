import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const vendors = await prisma.vendor.findMany({
    where: { verified: true },
    orderBy: { rating: "desc" },
    select: {
      id: true,
      companyName: true,
      description: true,
      rating: true,
      reviewCount: true,
      badgeTier: true,
      serviceRoutes: true,
    },
  });
  return NextResponse.json(vendors);
}
