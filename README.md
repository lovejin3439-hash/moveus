# MoveEase — International Moving Marketplace

A two-sided marketplace connecting customers with certified international moving vendors. Built with Next.js 15, Prisma, PostgreSQL, and NextAuth.

## Prerequisites

- **Node.js 18+** — [Download](https://nodejs.org/)
- **PostgreSQL** — [Download](https://www.postgresql.org/download/) or use [Neon](https://neon.tech) (free cloud PostgreSQL)

## Quick Start

### 1. Install dependencies
```bash
cd moveease
npm install
```

### 2. Set up environment variables
```bash
cp .env.example .env
```
Edit `.env`:
- Set `DATABASE_URL` to your PostgreSQL connection string
- Set `NEXTAUTH_SECRET` to any random string (run `openssl rand -base64 32`)

### 3. Set up the database
```bash
npm run db:generate    # Generate Prisma client
npm run db:push        # Push schema to database
npm run db:seed        # Seed demo data
```

### 4. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Demo Accounts

After seeding, use these accounts:

| Role | Email | Password |
|------|-------|----------|
| Customer | customer@demo.com | demo1234 |
| Vendor | vendor@demo.com | demo1234 |

## MVP Pages

### Public
| Page | URL |
|------|-----|
| Landing | `/` |
| Sign Up | `/signup` |
| Log In | `/login` |

### Customer Flow
| Page | URL |
|------|-----|
| New Quote (Step 1-3) | `/quote/new` |
| Quote Results | `/quote/[id]` |
| Contract & Documents | `/contract/[id]` |
| Shipment Tracking | `/shipments/[id]` |

### Vendor Flow
| Page | URL |
|------|-----|
| Dashboard | `/vendor/dashboard` |
| Quote Requests | `/vendor/quotes` |
| Job Detail | `/vendor/jobs/[id]` |

## Architecture

```
moveease/
├── app/                  Next.js App Router pages
│   ├── (auth)/          Signup & Login
│   ├── quote/           Customer quote flow
│   ├── contract/        Contract & document upload
│   ├── shipments/       Tracking
│   ├── vendor/          Vendor pages
│   └── api/             REST API routes
├── components/
│   ├── ui/              Button, Card, Badge, Input
│   ├── layout/          Header, Footer
│   └── features/        ItemList, QuoteCard, StatusTracker
├── lib/
│   ├── prisma.ts        DB client
│   ├── auth.ts          NextAuth config
│   ├── cbm-data.ts      Item catalog with CBM values
│   └── mock-data.ts     Demo data for prototype UI
└── prisma/
    ├── schema.prisma    Database schema
    └── seed.ts          Demo data seeder
```

## Phase 2 Roadmap

- [ ] Real shipping line API (AfterShip integration)
- [ ] Real payment gateway (Toss Payments / PortOne)
- [ ] AI object detection (OpenAI Vision API / YOLO)
- [ ] Corporate (B2B) dashboard
- [ ] KakaoTalk notification integration
- [ ] Country customs info database
- [ ] Admin panel (vendor approval, disputes, analytics)
- [ ] Document storage (AWS S3)
- [ ] Mobile app (React Native)
