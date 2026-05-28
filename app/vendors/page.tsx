"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card } from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { POPULAR_DESTINATIONS } from "@/lib/cbm-data";
import EmptyState from "@/components/ui/EmptyState";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const ALL_VENDORS = [
  {
    id: "v1",
    companyName: "GlobalMove Korea",
    rating: 4.8,
    reviewCount: 142,
    description: "15년 경력의 국제이사 전문 업체. FCL/LCL 모두 운영. 전담 매니저 배정 및 전 구간 보험 포함.",
    serviceRoutes: ["USA", "Canada", "Australia", "UK", "Germany"],
    badgeTier: "Premium",
    verified: true,
    completedMoves: 520,
    responseTime: "< 2 hrs",
    specialties: ["Piano Moving", "Art & Antiques", "Corporate Relocation"],
  },
  {
    id: "v2",
    companyName: "Pacific Relocations",
    rating: 4.6,
    reviewCount: 89,
    description: "태평양 노선 특화. 호주/뉴질랜드/아시아 전문. 도착지 창고보관 2주 무료 제공.",
    serviceRoutes: ["Australia", "New Zealand", "Singapore", "Japan", "Hong Kong"],
    badgeTier: "Standard",
    verified: true,
    completedMoves: 310,
    responseTime: "< 4 hrs",
    specialties: ["LCL Specialist", "Port-to-Door", "Pet Relocation"],
  },
  {
    id: "v3",
    companyName: "Euro Cargo Express",
    rating: 4.5,
    reviewCount: 61,
    description: "유럽 전 지역 Door-to-Door 서비스. 통관 대행 포함. 독일, 프랑스, 영국 특화.",
    serviceRoutes: ["Germany", "France", "Netherlands", "UK", "Belgium"],
    badgeTier: null,
    verified: true,
    completedMoves: 188,
    responseTime: "< 6 hrs",
    specialties: ["EU Customs Expert", "Door-to-Door", "Insurance Included"],
  },
  {
    id: "v4",
    companyName: "Asia Bridge Movers",
    rating: 4.7,
    reviewCount: 203,
    description: "동남아시아 최다 노선 보유. 베트남, 태국, 싱가포르 정기 서비스. 최저가 보장.",
    serviceRoutes: ["Singapore", "Vietnam", "Thailand", "Malaysia", "Indonesia"],
    badgeTier: "Premium",
    verified: true,
    completedMoves: 670,
    responseTime: "< 1 hr",
    specialties: ["Southeast Asia Specialist", "FCL & LCL", "Warehousing"],
  },
  {
    id: "v5",
    companyName: "Trans-Global Shipping",
    rating: 4.3,
    reviewCount: 44,
    description: "미국 전역 Door-to-Door. 동부/서부 해안 모두 커버. 통관 전문 파트너 보유.",
    serviceRoutes: ["USA", "Canada", "Mexico"],
    badgeTier: null,
    verified: true,
    completedMoves: 142,
    responseTime: "< 8 hrs",
    specialties: ["US Customs", "East & West Coast", "Large Volume FCL"],
  },
  {
    id: "v6",
    companyName: "Middle East Move Co.",
    rating: 4.4,
    reviewCount: 37,
    description: "중동 지역 전문. UAE, 사우디 정기 항로. 현지 창고 및 배달 네트워크 보유.",
    serviceRoutes: ["UAE", "Saudi Arabia", "Qatar", "Kuwait"],
    badgeTier: "Standard",
    verified: true,
    completedMoves: 110,
    responseTime: "< 4 hrs",
    specialties: ["Middle East Customs", "Temperature-Controlled", "Corporate"],
  },
];

export default function VendorsPage() {
  const { t } = useLanguage();
  const [search, setSearch] = useState("");
  const [selectedRoute, setSelectedRoute] = useState("");
  const [sortBy, setSortBy] = useState<"rating" | "reviews" | "moves">("rating");

  const filtered = ALL_VENDORS
    .filter((v) => {
      const matchSearch = v.companyName.toLowerCase().includes(search.toLowerCase()) ||
        v.description.toLowerCase().includes(search.toLowerCase());
      const matchRoute = !selectedRoute || v.serviceRoutes.some((r) =>
        r.toLowerCase().includes(selectedRoute.toLowerCase())
      );
      return matchSearch && matchRoute;
    })
    .sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "reviews") return b.reviewCount - a.reviewCount;
      return b.completedMoves - a.completedMoves;
    });

  return (
    <div className="min-h-screen flex flex-col pb-16 md:pb-0">
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 to-primary-900 text-white py-14">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-3">{t("vendors.heroTitle")}</h1>
          <p className="text-gray-300 text-lg mb-8">{t("vendors.heroSubtitle")}</p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto">
            <input
              type="text"
              placeholder={t("vendors.searchPlaceholder")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 px-4 py-3 rounded-xl text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <select
              value={selectedRoute}
              onChange={(e) => setSelectedRoute(e.target.value)}
              className="px-4 py-3 rounded-xl text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-white"
            >
              <option value="">{t("vendors.allDestinations")}</option>
              {POPULAR_DESTINATIONS.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      <main className="flex-1 bg-gray-50 py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Sort & Count */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-gray-500">
              <span className="font-semibold text-gray-900">{filtered.length}</span> {t("vendors.found")}
            </p>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-500">{t("vendors.sortBy")}</span>
              {(["rating", "reviews", "moves"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setSortBy(s)}
                  className={`px-3 py-1 rounded-full border transition-colors capitalize ${
                    sortBy === s
                      ? "bg-primary text-white border-primary"
                      : "border-gray-300 text-gray-600 hover:border-primary"
                  }`}
                >
                  {s === "rating" ? t("vendors.sortRating") : s === "reviews" ? t("vendors.sortReviews") : t("vendors.sortCompleted")}
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((vendor) => (
              <Link key={vendor.id} href={`/vendors/${vendor.id}`}>
                <Card hover className="h-full flex flex-col">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 bg-primary-50 rounded-xl flex items-center justify-center text-primary font-bold text-lg flex-shrink-0">
                        {vendor.companyName.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 text-sm leading-tight">{vendor.companyName}</h3>
                        <div className="flex items-center gap-1 mt-0.5">
                          <span className="text-yellow-400 text-xs">★</span>
                          <span className="text-xs font-medium text-gray-700">{vendor.rating}</span>
                          <span className="text-xs text-gray-400">({vendor.reviewCount})</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1 items-end">
                      {vendor.badgeTier && <Badge variant="teal">{vendor.badgeTier}</Badge>}
                      {vendor.verified && <Badge variant="success">Verified</Badge>}
                    </div>
                  </div>

                  <p className="text-xs text-gray-500 mb-4 leading-relaxed line-clamp-2 flex-1">{vendor.description}</p>

                  {/* Specialties */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {vendor.specialties.slice(0, 2).map((s) => (
                      <span key={s} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{s}</span>
                    ))}
                  </div>

                  {/* Stats row */}
                  <div className="grid grid-cols-3 gap-2 pt-3 border-t border-gray-100 text-center">
                    <div>
                      <p className="text-sm font-bold text-gray-900">{vendor.completedMoves}</p>
                      <p className="text-xs text-gray-400">{t("vendors.statMoves")}</p>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">{vendor.responseTime}</p>
                      <p className="text-xs text-gray-400">{t("vendors.statResponse")}</p>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">{vendor.serviceRoutes.length}</p>
                      <p className="text-xs text-gray-400">{t("vendors.statCountries")}</p>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>

          {filtered.length === 0 && (
            <Card>
              <EmptyState
                icon="🔍"
                title={t("vendors.noVendors")}
                description={t("vendors.noVendorsDesc")}
                action={{ label: t("vendors.clearFilters"), onClick: () => { setSearch(""); setSelectedRoute(""); } }}
                size="lg"
              />
            </Card>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
