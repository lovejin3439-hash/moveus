"use client";

import Link from "next/link";
import { useMemo } from "react";
import Header from "@/components/layout/Header";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import {
  MOCK_COMPANY,
  MOCK_EXPAT_MOVES,
  DEPARTMENT_BUDGET,
  TOP_DESTINATIONS,
} from "@/lib/mock-corporate-data";

/* ── small SVG ring ── */
function BudgetRing({ pct }: { pct: number }) {
  const r = 44;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;
  const color = pct > 80 ? "#ef4444" : pct > 60 ? "#f59e0b" : "#1553F0";
  return (
    <svg width="112" height="112" className="-rotate-90" viewBox="0 0 112 112">
      <circle cx="56" cy="56" r={r} fill="none" stroke="#f1f5f9" strokeWidth="12" />
      <circle
        cx="56" cy="56" r={r}
        fill="none"
        stroke={color}
        strokeWidth="12"
        strokeDasharray={circ}
        strokeDashoffset={offset}
        strokeLinecap="round"
        className="transition-all duration-700"
      />
    </svg>
  );
}

/* ── mini bar ── */
function MiniBar({ value, max, color = "bg-primary" }: { value: number; max: number; color?: string }) {
  const pct = max > 0 ? Math.min((value / max) * 100, 100) : 0;
  return (
    <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
      <div className={`h-full ${color} rounded-full transition-all duration-500`} style={{ width: `${pct}%` }} />
    </div>
  );
}

const KRW = (n: number) =>
  n >= 1_000_000
    ? `₩${(n / 1_000_000).toFixed(1)}M`
    : `₩${n.toLocaleString()}`;

const STATUS_COLORS: Record<string, string> = {
  DELIVERED: "#10b981",
  IN_TRANSIT: "#1553F0",
  PACKED: "#8b5cf6",
  CONTRACTED: "#f59e0b",
  QUOTING: "#94a3b8",
};

export default function CorporateReportsPage() {
  const { t, lang } = useLanguage();

  /* ── computed stats ── */
  const stats = useMemo(() => {
    const total = MOCK_EXPAT_MOVES.length;
    const completed = MOCK_EXPAT_MOVES.filter((m) => m.status === "DELIVERED").length;
    const active = MOCK_EXPAT_MOVES.filter((m) =>
      ["IN_TRANSIT", "PACKED", "CONTRACTED"].includes(m.status)
    ).length;
    const quoting = MOCK_EXPAT_MOVES.filter((m) => m.status === "QUOTING").length;

    const totalSpend = MOCK_EXPAT_MOVES.reduce((s, m) => s + (m.quotePrice ?? 0), 0);
    const avgCost = completed > 0
      ? MOCK_EXPAT_MOVES.filter((m) => m.status === "DELIVERED").reduce((s, m) => s + (m.quotePrice ?? 0), 0) / completed
      : 0;

    const totalCbm = MOCK_EXPAT_MOVES.reduce((s, m) => s + (m.finalCbm ?? m.estimatedCbm), 0);

    const familyMoves = MOCK_EXPAT_MOVES.filter((m) => m.familyMove).length;

    const statusMap = Object.entries(
      MOCK_EXPAT_MOVES.reduce<Record<string, number>>((acc, m) => {
        acc[m.status] = (acc[m.status] ?? 0) + 1;
        return acc;
      }, {})
    ).sort((a, b) => b[1] - a[1]);

    return { total, completed, active, quoting, totalSpend, avgCost, totalCbm, familyMoves, statusMap };
  }, []);

  const budgetPct = Math.round((MOCK_COMPANY.usedBudget / MOCK_COMPANY.annualBudget) * 100);
  const remaining = MOCK_COMPANY.annualBudget - MOCK_COMPANY.usedBudget;

  const STATUS_LABEL: Record<string, { en: string; ko: string }> = {
    DELIVERED:  { en: "Delivered",  ko: "배달 완료" },
    IN_TRANSIT: { en: "In Transit", ko: "운송 중" },
    PACKED:     { en: "Packed",     ko: "포장 완료" },
    CONTRACTED: { en: "Contracted", ko: "계약 완료" },
    QUOTING:    { en: "Quoting",    ko: "견적 중" },
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-16 md:pb-0">
      <Header />
      {/* ── page header ── */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* breadcrumb */}
          <nav className="text-xs text-slate-400 mb-4 flex items-center gap-1.5">
            <Link href="/corporate/dashboard" className="hover:text-white transition-colors">
              {t("corporate.dashboardTitle")}
            </Link>
            <span>/</span>
            <span className="text-slate-200">{lang === "ko" ? "리포트" : "Reports"}</span>
          </nav>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold">{t("corporate.reportTitle")}</h1>
              <p className="text-slate-300 text-sm mt-1">{t("corporate.reportSubtitle")}</p>
            </div>

            {/* export */}
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1.5 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-sm font-medium transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                {lang === "ko" ? "리포트 다운로드" : "Download Report"}
              </button>
              <span className="text-xs bg-white/10 px-2.5 py-1 rounded-lg border border-white/20 text-slate-300">
                {lang === "ko" ? "데이터 기준: 2026-05-14" : "Data as of 2026-05-14"}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* ── KPI row ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            {
              label: t("corporate.totalMoves"),
              value: stats.total,
              sub: lang === "ko" ? `완료 ${stats.completed}건` : `${stats.completed} completed`,
              icon: "📦",
              color: "bg-blue-50 border-blue-100",
            },
            {
              label: t("corporate.avgCostPerMove"),
              value: KRW(stats.avgCost),
              sub: lang === "ko" ? "완료 이사 기준" : "based on delivered",
              icon: "💰",
              color: "bg-emerald-50 border-emerald-100",
            },
            {
              label: lang === "ko" ? "가족 동반 이사" : "Family Moves",
              value: stats.familyMoves,
              sub: `${Math.round((stats.familyMoves / stats.total) * 100)}%`,
              icon: "👨‍👩‍👧",
              color: "bg-violet-50 border-violet-100",
            },
            {
              label: lang === "ko" ? "총 이사 물량" : "Total Volume",
              value: `${stats.totalCbm.toFixed(1)} CBM`,
              sub: lang === "ko" ? `건당 평균 ${(stats.totalCbm / stats.total).toFixed(1)} CBM` : `avg ${(stats.totalCbm / stats.total).toFixed(1)} CBM/move`,
              icon: "📐",
              color: "bg-amber-50 border-amber-100",
            },
          ].map((card) => (
            <div key={card.label} className={`${card.color} border rounded-xl p-4`}>
              <div className="flex items-start justify-between mb-2">
                <p className="text-xs text-gray-500 font-medium">{card.label}</p>
                <span className="text-lg">{card.icon}</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{card.value}</p>
              <p className="text-xs text-gray-400 mt-0.5">{card.sub}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* ── LEFT: budget + dept ── */}
          <div className="lg:col-span-2 space-y-6">

            {/* Budget Overview */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-5">
                {t("corporate.budgetOverview")}
              </h2>

              <div className="flex flex-col sm:flex-row items-center gap-6 mb-6">
                {/* ring */}
                <div className="relative flex-shrink-0">
                  <BudgetRing pct={budgetPct} />
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold text-gray-900">{budgetPct}%</span>
                    <span className="text-[10px] text-gray-400 font-medium">
                      {lang === "ko" ? "사용" : "used"}
                    </span>
                  </div>
                </div>

                {/* bars */}
                <div className="flex-1 w-full space-y-3">
                  {[
                    { label: t("corporate.annualBudget"), value: MOCK_COMPANY.annualBudget, pct: 100, color: "bg-gray-200" },
                    { label: t("corporate.spentToDate"),  value: MOCK_COMPANY.usedBudget,   pct: budgetPct, color: budgetPct > 80 ? "bg-red-400" : budgetPct > 60 ? "bg-amber-400" : "bg-primary" },
                    { label: t("corporate.remaining"),    value: remaining,                  pct: 100 - budgetPct, color: "bg-slate-300" },
                  ].map((row) => (
                    <div key={row.label}>
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span className="font-medium">{row.label}</span>
                        <span className="font-bold text-gray-700">{KRW(row.value)}</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${row.color} rounded-full transition-all duration-700`}
                          style={{ width: `${row.pct}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* forecast */}
              <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 flex items-start gap-2 text-sm">
                <span className="text-lg">📊</span>
                <div>
                  <p className="font-semibold text-amber-800">
                    {lang === "ko" ? "예산 소진 예측" : "Budget Forecast"}
                  </p>
                  <p className="text-amber-700 text-xs mt-0.5">
                    {lang === "ko"
                      ? `현재 소진 속도 기준 ${new Date().getFullYear()}년 9월경 예산 초과 예상. 추가 예산 검토를 권장합니다.`
                      : "At the current burn rate, budget may be exceeded around September. Consider requesting additional allocation."}
                  </p>
                </div>
              </div>
            </div>

            {/* Department breakdown */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-5">
                {t("corporate.departmentBreakdown")}
              </h2>
              <div className="space-y-4">
                {DEPARTMENT_BUDGET.map((dept) => {
                  const pct = Math.round((dept.used / dept.budget) * 100);
                  const over = pct > 90;
                  return (
                    <div key={dept.dept}>
                      <div className="flex items-center justify-between text-sm mb-1.5">
                        <span className="font-medium text-gray-700">
                          {lang === "ko" ? dept.deptKo : dept.dept}
                        </span>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <span>{KRW(dept.used)}</span>
                          <span className="text-gray-300">/</span>
                          <span>{KRW(dept.budget)}</span>
                          {over && <span className="text-red-500 font-semibold">⚠</span>}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${over ? "bg-red-400" : pct > 70 ? "bg-amber-400" : "bg-primary"}`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <span className={`text-xs font-semibold w-8 text-right ${over ? "text-red-500" : "text-gray-500"}`}>
                          {pct}%
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Move list summary */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wide">
                  {lang === "ko" ? "비용 상위 이사" : "Top Moves by Cost"}
                </h2>
                <Link href="/corporate/employees" className="text-xs text-primary hover:underline font-medium">
                  {lang === "ko" ? "전체 보기 →" : "View all →"}
                </Link>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="text-left pb-2 text-xs font-semibold text-gray-400 uppercase">{t("corporate.colEmployee")}</th>
                      <th className="text-left pb-2 text-xs font-semibold text-gray-400 uppercase hidden sm:table-cell">{t("corporate.colDestination")}</th>
                      <th className="text-left pb-2 text-xs font-semibold text-gray-400 uppercase hidden md:table-cell">{lang === "ko" ? "CBM" : "CBM"}</th>
                      <th className="text-right pb-2 text-xs font-semibold text-gray-400 uppercase">{t("corporate.colCost")}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {[...MOCK_EXPAT_MOVES]
                      .filter((m) => m.quotePrice !== null)
                      .sort((a, b) => (b.quotePrice ?? 0) - (a.quotePrice ?? 0))
                      .slice(0, 6)
                      .map((move) => (
                        <tr key={move.id} className="hover:bg-gray-50 transition-colors">
                          <td className="py-2.5">
                            <Link href={`/corporate/moves/${move.id}`} className="hover:text-primary transition-colors">
                              <p className="font-medium text-gray-900">{lang === "ko" ? move.name : move.nameEn}</p>
                              <p className="text-xs text-gray-400">{lang === "ko" ? move.department : move.department}</p>
                            </Link>
                          </td>
                          <td className="py-2.5 hidden sm:table-cell">
                            <div className="flex items-center gap-1">
                              <span className="text-sm">{move.destinationFlag}</span>
                              <div>
                                <p className="text-xs font-medium text-gray-700 leading-tight">{move.destinationCity}</p>
                                <p className="text-xs text-gray-400 leading-tight">{move.destinationCountry}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-2.5 text-gray-500 hidden md:table-cell">{(move.finalCbm ?? move.estimatedCbm).toFixed(1)}</td>
                          <td className="py-2.5 text-right font-semibold text-gray-900">{KRW(move.quotePrice!)}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* ── RIGHT sidebar ── */}
          <div className="space-y-6">
            {/* Moves by status */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
              <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-4">
                {t("corporate.movesByStatus")}
              </h3>
              <div className="space-y-3">
                {stats.statusMap.map(([status, count]) => (
                  <div key={status} className="flex items-center gap-3">
                    <div
                      className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: STATUS_COLORS[status] ?? "#94a3b8" }}
                    />
                    <div className="flex-1">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="font-medium text-gray-700">
                          {STATUS_LABEL[status]?.[lang] ?? status}
                        </span>
                        <span className="text-gray-500">{count}</span>
                      </div>
                      <MiniBar value={count} max={stats.total} />
                    </div>
                  </div>
                ))}
              </div>

              {/* donut-like legend */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-blue-50 rounded-lg p-2 text-center">
                    <p className="text-blue-600 font-bold text-base">{stats.active}</p>
                    <p className="text-blue-500">{lang === "ko" ? "진행 중" : "Active"}</p>
                  </div>
                  <div className="bg-emerald-50 rounded-lg p-2 text-center">
                    <p className="text-emerald-600 font-bold text-base">{stats.completed}</p>
                    <p className="text-emerald-500">{lang === "ko" ? "완료" : "Delivered"}</p>
                  </div>
                  <div className="bg-amber-50 rounded-lg p-2 text-center">
                    <p className="text-amber-600 font-bold text-base">{stats.quoting}</p>
                    <p className="text-amber-500">{lang === "ko" ? "견적 중" : "Quoting"}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-2 text-center">
                    <p className="text-gray-600 font-bold text-base">{stats.total}</p>
                    <p className="text-gray-500">{lang === "ko" ? "전체" : "Total"}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Top destinations */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
              <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-4">
                {t("corporate.topDestinations")}
              </h3>
              <div className="space-y-3">
                {TOP_DESTINATIONS.map((dest, i) => (
                  <div key={dest.country} className="flex items-center gap-3">
                    <span className="text-xs font-bold text-gray-300 w-4">{i + 1}</span>
                    <div className="flex-1">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="font-medium text-gray-700">{dest.country}</span>
                        <span className="text-gray-500">{dest.count} {lang === "ko" ? "건" : "moves"}</span>
                      </div>
                      <MiniBar value={dest.count} max={TOP_DESTINATIONS[0].count} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Special items summary */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
              <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-4">
                {lang === "ko" ? "특수 품목 현황" : "Special Items Summary"}
              </h3>
              {(() => {
                const itemMap = MOCK_EXPAT_MOVES.reduce<Record<string, number>>((acc, m) => {
                  m.specialItems.forEach((item) => {
                    acc[item] = (acc[item] ?? 0) + 1;
                  });
                  return acc;
                }, {});
                const sorted = Object.entries(itemMap).sort((a, b) => b[1] - a[1]);
                if (sorted.length === 0) {
                  return <p className="text-sm text-gray-400">{lang === "ko" ? "특수 품목 없음" : "No special items"}</p>;
                }
                return (
                  <div className="space-y-2">
                    {sorted.map(([item, count]) => (
                      <div key={item} className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block" />
                          {item}
                        </span>
                        <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                          {count}
                        </span>
                      </div>
                    ))}
                  </div>
                );
              })()}
            </div>

            {/* quick links */}
            <div className="bg-slate-800 rounded-2xl p-5 text-white">
              <h3 className="text-sm font-semibold mb-3">
                {lang === "ko" ? "빠른 이동" : "Quick Navigation"}
              </h3>
              <div className="space-y-2">
                {[
                  { href: "/corporate/dashboard", label: lang === "ko" ? "대시보드로 돌아가기" : "Back to Dashboard", icon: "🏠" },
                  { href: "/corporate/employees", label: lang === "ko" ? "주재원 현황 보기" : "View All Expats", icon: "👥" },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center gap-2.5 px-3 py-2.5 bg-white/10 hover:bg-white/20 rounded-xl text-sm transition-colors"
                  >
                    <span>{link.icon}</span>
                    <span>{link.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
