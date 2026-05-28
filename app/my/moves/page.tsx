"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card } from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import PageHeader from "@/components/ui/PageHeader";
import EmptyState from "@/components/ui/EmptyState";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const MOCK_CUSTOMER_MOVES = [
  {
    id: "m-sydney",
    status: "IN_TRANSIT",
    origin: "Seoul, Korea",
    destination: "Sydney, Australia",
    estimatedCbm: 12.4,
    finalCbm: 13.1,
    quotePrice: 3200000,
    packingDate: "2026-05-20",
    vendor: "GlobalMove Korea",
    eta: "2026-06-28",
    progress: 60,
  },
  {
    id: "m-vancouver",
    status: "CONTRACTED",
    origin: "Seoul, Korea",
    destination: "Vancouver, Canada",
    estimatedCbm: 8.6,
    finalCbm: null,
    quotePrice: 2600000,
    packingDate: "2026-06-15",
    vendor: "Pacific Relocations",
    eta: null,
    progress: 30,
  },
  {
    id: "m-london",
    status: "DELIVERED",
    origin: "Busan, Korea",
    destination: "London, UK",
    estimatedCbm: 5.2,
    finalCbm: 5.0,
    quotePrice: 2100000,
    packingDate: "2026-03-10",
    vendor: "Euro Cargo Express",
    eta: "2026-04-28",
    progress: 100,
  },
  {
    id: "m-newyork",
    status: "QUOTING",
    origin: "Seoul, Korea",
    destination: "New York, USA",
    estimatedCbm: 15.2,
    finalCbm: null,
    quotePrice: null,
    packingDate: null,
    vendor: null,
    eta: null,
    progress: 10,
  },
];

const STATUS_STEP: Record<string, number> = {
  QUOTING: 1, CONTRACTED: 2, PACKED: 3, IN_TRANSIT: 4, ARRIVED: 5, DELIVERED: 6,
};

const fmt = (n: number) =>
  new Intl.NumberFormat("ko-KR", { style: "currency", currency: "KRW" }).format(n);

export default function MyMovesPage() {
  const { t, tArr, lang } = useLanguage();
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  const filtered = MOCK_CUSTOMER_MOVES.filter((m) => {
    if (filter === "active") return !["DELIVERED", "CANCELLED"].includes(m.status);
    if (filter === "completed") return m.status === "DELIVERED";
    return true;
  });

  const totalSpend = MOCK_CUSTOMER_MOVES.filter((m) => m.quotePrice).reduce((s, m) => s + (m.quotePrice ?? 0), 0);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 pb-16 md:pb-0 relative">
      <Header />

      <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <PageHeader
          title={t("myMoves.title")}
          subtitle={t("myMoves.subtitle")}
          actions={
            <Link href="/quote/new">
              <Button size="md">{t("myMoves.newMove")}</Button>
            </Link>
          }
        />

        {/* Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: t("myMoves.totalMoves"), value: MOCK_CUSTOMER_MOVES.length, icon: "📦" },
            { label: t("myMoves.active"), value: MOCK_CUSTOMER_MOVES.filter((m) => !["DELIVERED","CANCELLED"].includes(m.status)).length, icon: "🚢" },
            { label: t("myMoves.completed"), value: MOCK_CUSTOMER_MOVES.filter((m) => m.status === "DELIVERED").length, icon: "✅" },
            { label: t("myMoves.totalSpend"), value: fmt(totalSpend), icon: "💰" },
          ].map((s) => (
            <Card key={s.label} padding="sm">
              <p className="text-xl mb-2">{s.icon}</p>
              <p className="text-xl font-bold text-gray-900">{s.value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
            </Card>
          ))}
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-1 bg-gray-100 rounded-xl p-1 w-fit mb-6">
          {(["all", "active", "completed"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 text-sm font-medium rounded-lg capitalize transition-all ${
                filter === f ? "bg-white shadow-sm text-gray-900" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {f === "all" ? t("myMoves.filterAll") : f === "active" ? t("myMoves.filterActive") : t("myMoves.filterCompleted")}
            </button>
          ))}
        </div>

        {/* Move Cards */}
        <div className="space-y-4">
          {filtered.map((move) => (
            <Card key={move.id} className="hover:shadow-md hover:border-primary-200 transition-all">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-semibold text-gray-900">
                      {move.origin} → {move.destination}
                    </h3>
                    <StatusBadge status={move.status} lang={lang} />
                  </div>
                  <p className="text-sm text-gray-500 mb-3">
                    {move.vendor ? `${t("myMoves.via")} ${move.vendor}` : t("myMoves.awaitingQuotes")}
                    {move.packingDate && ` · ${t("myMoves.packing")} ${new Date(move.packingDate).toLocaleDateString(lang === "ko" ? "ko-KR" : "en-US", { month: "short", day: "numeric" })}`}
                    {move.eta && ` · ${t("myMoves.eta")} ${new Date(move.eta).toLocaleDateString(lang === "ko" ? "ko-KR" : "en-US", { month: "short", day: "numeric" })}`}
                  </p>

                  {/* Progress Bar */}
                  <div className="space-y-1.5">
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700 bg-gradient-to-r from-blue-400 via-primary to-primary-700"
                        style={{ width: `${move.progress}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-[10px] text-gray-300">
                      {tArr("myMoves.progressLabels").map((label, i) => (
                        <span key={label} className={i === 5 && move.status === "DELIVERED" ? "text-primary font-semibold" : ""}>{label}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end gap-3 sm:gap-1 flex-shrink-0">
                  {move.quotePrice && (
                    <p className="text-lg font-bold text-primary">{fmt(move.quotePrice)}</p>
                  )}
                  <p className="text-xs text-gray-500">
                    {move.finalCbm ? `${move.finalCbm} ${t("myMoves.finalCbm")}` : `${move.estimatedCbm} ${t("myMoves.estCbm")}`}
                  </p>
                  <Link href={
                    move.status === "QUOTING" ? `/quote/${move.id}` :
                    move.status === "CONTRACTED" ? `/contract/${move.id}` :
                    `/shipments/${move.id}`
                  }>
                    <Button variant="outline" size="sm">
                      {move.status === "QUOTING" ? t("myMoves.viewQuotes") :
                       move.status === "CONTRACTED" ? t("myMoves.viewContract") :
                       move.status === "DELIVERED" ? t("myMoves.viewDetails") : t("myMoves.track")}
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filtered.length === 0 && (
          <Card>
            <EmptyState
              icon="📦"
              title={filter === "completed" ? t("myMoves.emptyCompletedTitle") : filter === "active" ? t("myMoves.emptyFilterTitle") : t("myMoves.emptyTitle")}
              description={filter === "all" ? t("myMoves.emptyDesc") : undefined}
              action={{ label: t("myMoves.emptyBtn"), href: "/quote/new" }}
              size="lg"
            />
          </Card>
        )}
      </div>

      <Footer />
    </div>
  );
}

