import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Demo customer
  const customerPw = await bcrypt.hash("demo1234", 12);
  const customer = await prisma.user.upsert({
    where: { email: "customer@demo.com" },
    update: {},
    create: {
      name: "Demo Customer",
      email: "customer@demo.com",
      password: customerPw,
      role: "CUSTOMER",
      phone: "+82-10-1234-5678",
    },
  });

  // Demo vendor
  const vendorPw = await bcrypt.hash("demo1234", 12);
  const vendorUser = await prisma.user.upsert({
    where: { email: "vendor@demo.com" },
    update: {},
    create: {
      name: "Demo Vendor",
      email: "vendor@demo.com",
      password: vendorPw,
      role: "VENDOR",
      vendor: {
        create: {
          companyName: "GlobalMove Korea",
          description: "15년 경력의 국제이사 전문 업체. FCL/LCL 모두 운영.",
          rating: 4.8,
          reviewCount: 142,
          badgeTier: "Premium",
          serviceRoutes: ["Australia", "USA", "Canada", "UK", "Germany"],
          verified: true,
        },
      },
    },
  });

  // Demo move
  const vendor = await prisma.vendor.findUnique({ where: { userId: vendorUser.id } });
  if (vendor) {
    const move = await prisma.move.upsert({
      where: { id: "demo-move-001" },
      update: {},
      create: {
        id: "demo-move-001",
        customerId: customer.id,
        vendorId: vendor.id,
        status: "IN_TRANSIT",
        origin: "Seoul, Korea",
        destination: "Sydney, Australia",
        estimatedCbm: 12.4,
        finalCbm: 13.1,
        quotePrice: 3200000,
        packingDate: new Date("2026-05-20"),
        items: {
          create: [
            { name: "Sofa (3-seat)", category: "Living Room", size: "L", cbmValue: 1.6, quantity: 1 },
            { name: "Bed Frame (Double)", category: "Bedroom", size: "M", cbmValue: 1.0, quantity: 1 },
            { name: "Wardrobe", category: "Bedroom", size: "M", cbmValue: 0.9, quantity: 2 },
            { name: "Dining Table", category: "Dining", size: "M", cbmValue: 0.5, quantity: 1 },
            { name: "Cardboard Box (Large)", category: "Boxes", size: "L", cbmValue: 0.1, quantity: 30 },
          ],
        },
        trackingEvents: {
          create: [
            { status: "BOOKED", location: "Seoul", note: "이사 예약 완료", timestamp: new Date("2026-05-01T09:00:00Z") },
            { status: "PACKED", location: "Seoul", note: "포장 완료 및 픽업", timestamp: new Date("2026-05-20T14:00:00Z") },
            { status: "DEPARTED", location: "Busan Port", note: "선박 출항 (COSCO SHIPPING)", timestamp: new Date("2026-05-22T08:00:00Z") },
            { status: "IN_TRANSIT", location: "Pacific Ocean", note: "항해 중", timestamp: new Date("2026-05-25T00:00:00Z") },
          ],
        },
      },
    });
    console.log("Demo move created:", move.id);
  }

  console.log("Seed complete!");
  console.log("Demo accounts: customer@demo.com / demo1234 | vendor@demo.com / demo1234");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
