"use client";

import Link from "next/link";
import Header from "@/components/layout/Header";
import { Card } from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/Badge";
import { MOCK_MOVES } from "@/lib/mock-data";
import PageHeader from "@/components/ui/PageHeader";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function VendorDashboard() {
  const { t, lang } = useLanguage();
  const fmt = (n: number) =>
    new Intl.NumberFormat("ko-KR", { style: "currency", currency: "KRW" }).format(n);

  const STATS = [
    { label: t("vendor.newRequests"), value: "4", change: lang === "ko" ? "+2 오늘" : "+2 today", icon: "📋", color: "text-blue-600" },
    { label: t("vendor.activeJobs"), value: "2", change: lang === "ko" ? "진행 중" : "In progress", icon: "🚢", color: "text-primary" },
    { label: t("vendor.pendingSettlement"), value: "₩3,200,000", change: lang === "ko" ? "3영업일" : "3 business days", icon: "💰", color: "text-green-600" },
    { label: t("vendor.avgRating"), value: "4.8 ★", change: lang === "ko" ? "142 리뷰" : "142 reviews", icon: "⭐", color: "text-yellow-600" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 pb-16 md:pb-0">
      <Header />

      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <PageHeader
          title={t("vendor.dashboardTitle")}
          subtitle="GlobalMove Korea · Premium Partner"
          badge={{ label: "Premium", color: "blue" }}
          actions={
            <Link
              href="/vendor/quotes"
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary-700 transition-colors"
            >
              {t("vendor.quoteRequestsTitle")} →
            </Link>
          }
        />

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {STATS.map((stat) => (
            <Card key={stat.label} padding="sm" className="hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-xl">
                  {stat.icon}
                </div>
              </div>
              <p className={`text-2xl font-extrabold ${stat.color} mb-0.5`}>{stat.value}</p>
              <p className="text-xs font-semibold text-gray-600 leading-tight">{stat.label}</p>
              <p className="text-xs text-gray-400 mt-1">{stat.change}</p>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Active Jobs */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">{t("vendor.activeJobs")}</h2>
              <Link href="/vendor/quotes" className="text-sm text-primary hover:underline">{t("vendor.seeAll")}</Link>
            </div>

            {MOCK_MOVES.map((move) => (
              <Card key={move.id} hover>
                <Link href={`/vendor/jobs/${move.id}`} className="block">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-900">
                          {move.origin} → {move.destination}
                        </h3>
                        <StatusBadge status={move.status} lang={lang} />
                      </div>
                      <p className="text-sm text-gray-500">{move.customer.name} · {move.customer.email}</p>
                    </div>
                    <svg className="w-5 h-5 text-gray-400 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                  <div className="grid grid-cols-3 gap-3 text-sm">
                    <div className="bg-gray-50 rounded-lg p-2.5">
                      <p className="text-xs text-gray-400 mb-0.5">{lang === "ko" ? "부피" : "Volume"}</p>
                      <p className="font-semibold text-gray-900">{move.estimatedCbm} CBM</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-2.5">
                      <p className="text-xs text-gray-400 mb-0.5">{t("shipment.packing")}</p>
                      <p className="font-semibold text-gray-900">
                        {move.packingDate ? new Date(move.packingDate).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "TBD"}
                      </p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-2.5">
                      <p className="text-xs text-gray-400 mb-0.5">{lang === "ko" ? "견적 금액" : "Quote Price"}</p>
                      <p className="font-semibold text-primary">{move.quotePrice ? fmt(move.quotePrice) : "—"}</p>
                    </div>
                  </div>
                </Link>
              </Card>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* New Quote Requests */}
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">{t("vendor.newRequests")}</h3>
                <span className="w-5 h-5 bg-blue-100 text-blue-700 text-xs font-bold rounded-full flex items-center justify-center">4</span>
              </div>
              <div className="space-y-3">
                {[
                  { route: "Seoul → Melbourne", cbm: 9.2, days: "2 days ago" },
                  { route: "Incheon → Vancouver", cbm: 15.8, days: "5 hrs ago" },
                  { route: "Busan → London", cbm: 6.1, days: "1 hr ago" },
                  { route: "Seoul → New York", cbm: 11.3, days: "30 min ago" },
                ].map((req, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                    <div>
                      <p className="text-sm font-medium text-gray-800">{req.route}</p>
                      <p className="text-xs text-gray-400">{req.cbm} CBM · {req.days}</p>
                    </div>
                    <Link
                      href="/vendor/quotes"
                      className="text-xs text-primary hover:underline font-medium"
                    >
                      {t("vendor.submitQuote")}
                    </Link>
                  </div>
                ))}
              </div>
              <Link
                href="/vendor/quotes"
                className="block mt-4 text-center text-sm text-primary font-medium hover:underline"
              >
                {t("vendor.seeAll")}
              </Link>
            </Card>

            {/* Settlement */}
            <Card>
              <h3 className="font-semibold text-gray-900 mb-4">{lang === "ko" ? "최근 정산" : "Recent Settlements"}</h3>
              <div className="space-y-3">
                {[
                  { move: "Seoul → Sydney", amount: 3200000, fee: 320000, date: "May 20" },
                  { move: "Busan → LA", amount: 2800000, fee: 280000, date: "Apr 15" },
                ].map((s, i) => (
                  <div key={i} className="py-2 border-b border-gray-50 last:border-0 text-sm">
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-700">{s.move}</span>
                      <span className="font-medium text-green-600">{fmt(s.amount - s.fee)}</span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>Fee: {fmt(s.fee)}</span>
                      <span>{s.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Profile completeness */}
            <Card>
              <h3 className="font-semibold text-gray-900 mb-3">{lang === "ko" ? "프로필 상태" : "Profile Status"}</h3>
              <div className="space-y-2 text-sm">
                {[
                  { item: lang === "ko" ? "회사 인증 완료" : "Company verified", done: true },
                  { item: lang === "ko" ? "면허 업로드 완료" : "License uploaded", done: true },
                  { item: lang === "ko" ? "서비스 노선 설정" : "Service routes set", done: true },
                  { item: lang === "ko" ? "프리미엄 배지 활성" : "Premium badge active", done: true },
                  { item: lang === "ko" ? "은행 계좌 연동" : "Bank account linked", done: false },
                ].map((p) => (
                  <div key={p.item} className="flex items-center gap-2">
                    <span className={p.done ? "text-green-500" : "text-gray-300"}>{p.done ? "✓" : "○"}</span>
                    <span className={p.done ? "text-gray-700" : "text-gray-400"}>{p.item}</span>
                  </div>
                ))}
              </div>
              <Link href="/vendor/profile" className="block mt-4 text-xs text-primary hover:underline">
                {lang === "ko" ? "프로필 완성하기 →" : "Complete profile →"}
              </Link>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
