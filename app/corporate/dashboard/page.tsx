"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import { Card } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import {
  MOCK_COMPANY,
  MOCK_EXPAT_MOVES,
  DEPARTMENT_BUDGET,
  TOP_DESTINATIONS,
} from "@/lib/mock-corporate-data";

const fmt = (n: number) =>
  new Intl.NumberFormat("ko-KR", { style: "currency", currency: "KRW" }).format(n);

function BudgetRing({ pct }: { pct: number }) {
  const r = 38;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;
  const color = pct > 80 ? "#ef4444" : pct > 60 ? "#f59e0b" : "#1553F0";
  return (
    <svg width="100" height="100" className="-rotate-90" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r={r} fill="none" stroke="#f1f5f9" strokeWidth="11" />
      <circle
        cx="50" cy="50" r={r} fill="none"
        stroke={color} strokeWidth="11"
        strokeDasharray={circ} strokeDashoffset={offset}
        strokeLinecap="round" className="transition-all duration-700"
      />
    </svg>
  );
}

const STATUS_CONFIG: Record<string, { color: string; label: string; labelKo: string; dot: string }> = {
  QUOTING:    { color: "bg-gray-100 text-gray-600",     label: "Quoting",    labelKo: "견적 중",   dot: "bg-gray-400" },
  CONTRACTED: { color: "bg-blue-100 text-blue-700",     label: "Contracted", labelKo: "계약 완료", dot: "bg-blue-500" },
  PACKED:     { color: "bg-amber-100 text-amber-700",   label: "Packed",     labelKo: "포장 완료", dot: "bg-amber-500" },
  IN_TRANSIT: { color: "bg-primary-100 text-primary",   label: "In Transit", labelKo: "운송 중",   dot: "bg-primary" },
  ARRIVED:    { color: "bg-indigo-100 text-indigo-700", label: "Arrived",    labelKo: "도착",      dot: "bg-indigo-500" },
  DELIVERED:  { color: "bg-green-100 text-green-700",   label: "Delivered",  labelKo: "완료",      dot: "bg-green-500" },
};

export default function CorporateDashboard() {
  const { t, lang } = useLanguage();
  const [filter, setFilter] = useState<"all" | "active" | "pending" | "completed">("all");

  const active    = MOCK_EXPAT_MOVES.filter((m) => !["DELIVERED", "CANCELLED"].includes(m.status));
  const pending   = MOCK_EXPAT_MOVES.filter((m) => m.internalStatus === "PENDING");
  const completed = MOCK_EXPAT_MOVES.filter((m) => m.status === "DELIVERED");

  const filtered = MOCK_EXPAT_MOVES.filter((m) => {
    if (filter === "active")    return !["DELIVERED", "CANCELLED"].includes(m.status);
    if (filter === "pending")   return m.internalStatus === "PENDING";
    if (filter === "completed") return m.status === "DELIVERED";
    return true;
  });

  const budgetPct = Math.round((MOCK_COMPANY.usedBudget / MOCK_COMPANY.annualBudget) * 100);
  const topDest   = TOP_DESTINATIONS.slice(0, 6);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 pb-16 md:pb-0">
      <Header />

      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8">

        {/* ── Company Banner ── */}
        <div className="rounded-2xl p-5 sm:p-6 mb-8 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          style={{ background: "linear-gradient(135deg, #1e293b 0%, #334155 100%)" }}>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-2xl border border-white/20 flex-shrink-0">🏢</div>
            <div>
              <p className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-0.5">
                {lang === "ko" ? "기업 계정" : "Corporate Account"}
              </p>
              <h1 className="text-xl font-black">{lang === "ko" ? MOCK_COMPANY.nameKo : MOCK_COMPANY.name}</h1>
              <p className="text-white/60 text-sm mt-0.5">
                {MOCK_COMPANY.contactPerson} · {MOCK_COMPANY.contactTitle}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <Link href="/corporate/employees">
              <Button size="sm" className="!bg-white !text-slate-800 hover:!bg-slate-100 font-semibold">
                {t("corporate.employeeList")}
              </Button>
            </Link>
            <Link href="/corporate/reports">
              <Button size="sm" className="!bg-white/10 !text-white border border-white/20 hover:!bg-white/20">
                {lang === "ko" ? "리포트" : "Reports"}
              </Button>
            </Link>
          </div>
        </div>

        {/* ── KPI Stats Row ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            {
              label: t("corporate.totalExpats"),
              value: MOCK_EXPAT_MOVES.length,
              icon: "👥",
              sub: lang === "ko" ? `${MOCK_COMPANY.employeeCount}명 관리 중` : `${MOCK_COMPANY.employeeCount} managed`,
              color: "text-slate-800",
              bg: "bg-slate-50",
            },
            {
              label: t("corporate.activeExpats"),
              value: active.length,
              icon: "🚢",
              sub: lang === "ko" ? "현재 이동 중" : "currently moving",
              color: "text-primary",
              bg: "bg-blue-50",
            },
            {
              label: t("corporate.pendingApproval"),
              value: pending.length,
              icon: "⏳",
              sub: lang === "ko" ? "인사팀 검토 필요" : "requires HR review",
              color: pending.length > 0 ? "text-amber-600" : "text-gray-400",
              bg: pending.length > 0 ? "bg-amber-50" : "bg-gray-50",
            },
            {
              label: t("corporate.completedMoves"),
              value: completed.length,
              icon: "✅",
              sub: lang === "ko" ? "2026년 기준" : "in 2026",
              color: "text-green-600",
              bg: "bg-green-50",
            },
          ].map((s) => (
            <Card key={s.label} padding="sm" className="hover:shadow-md transition-shadow">
              <div className={`w-10 h-10 ${s.bg} rounded-xl flex items-center justify-center text-xl mb-3`}>
                {s.icon}
              </div>
              <p className={`text-3xl font-black ${s.color} mb-0.5`}>{s.value}</p>
              <p className="text-xs font-semibold text-gray-700 leading-tight">{s.label}</p>
              <p className="text-xs text-gray-400 mt-0.5">{s.sub}</p>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">

          {/* ── Main: Expat Table ── */}
          <div className="lg:col-span-2 space-y-4">

            {/* Filter + action row */}
            <div className="flex items-center justify-between gap-3">
              <div className="flex gap-1 bg-gray-100 rounded-xl p-1">
                {([
                  ["all",       t("corporate.filterAll")],
                  ["active",    t("corporate.filterActive")],
                  ["pending",   t("corporate.filterPending")],
                  ["completed", t("corporate.filterCompleted")],
                ] as const).map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => setFilter(key)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                      filter === key ? "bg-white shadow-sm text-gray-900" : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {label}
                    {key === "pending" && pending.length > 0 && (
                      <span className="ml-1.5 bg-amber-500 text-white text-[9px] rounded-full px-1.5 py-0.5 font-black">
                        {pending.length}
                      </span>
                    )}
                  </button>
                ))}
              </div>
              <Link href="/corporate/employees" className="flex-shrink-0">
                <Button variant="outline" size="sm">{lang === "ko" ? "전체 목록 →" : "Full list →"}</Button>
              </Link>
            </div>

            {/* Table */}
            <Card padding="none" className="overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-sm" style={{ minWidth: "600px" }}>
                  <thead className="bg-slate-50 border-b border-gray-100">
                    <tr>
                      <th className="text-left px-5 py-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider w-[200px]">
                        {t("corporate.colEmployee")}
                      </th>
                      <th className="text-left px-4 py-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider hidden sm:table-cell w-[110px]">
                        {t("corporate.colDepartment")}
                      </th>
                      <th className="text-left px-4 py-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider w-[160px]">
                        {t("corporate.colDestination")}
                      </th>
                      <th className="text-left px-4 py-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider w-[140px]">
                        {t("corporate.colStatus")}
                      </th>
                      <th className="text-left px-4 py-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider hidden md:table-cell w-[90px]">
                        {t("corporate.colEta")}
                      </th>
                      <th className="text-right px-4 py-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider hidden lg:table-cell w-[110px]">
                        {t("corporate.colCost")}
                      </th>
                      <th className="w-10 px-3 py-3"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {filtered.slice(0, 10).map((move) => {
                      const sc = STATUS_CONFIG[move.status] ?? STATUS_CONFIG["QUOTING"];
                      return (
                        <tr key={move.id} className="hover:bg-blue-50/30 transition-colors group">

                          {/* Employee */}
                          <td className="px-5 py-3.5">
                            <div className="flex items-center gap-2.5">
                              <div className="w-8 h-8 rounded-full flex items-center justify-center text-primary text-xs font-black flex-shrink-0"
                                style={{ background: "#EEF2FF" }}>
                                {move.name.charAt(0)}
                              </div>
                              <div className="min-w-0">
                                <p className="font-semibold text-gray-900 text-sm leading-tight truncate">
                                  {lang === "ko" ? move.name : move.nameEn}
                                </p>
                                <p className="text-[11px] text-gray-400 leading-tight">{move.employeeId}</p>
                              </div>
                            </div>
                          </td>

                          {/* Department */}
                          <td className="px-4 py-3.5 hidden sm:table-cell">
                            <span className="text-[11px] font-medium text-gray-600 bg-gray-100 px-2 py-0.5 rounded-full whitespace-nowrap">
                              {move.department}
                            </span>
                          </td>

                          {/* Destination — flag + city + country */}
                          <td className="px-4 py-3.5">
                            <div className="flex items-center gap-2">
                              <span className="text-base leading-none flex-shrink-0">{move.destinationFlag}</span>
                              <div>
                                <p className="text-sm font-semibold text-gray-900 leading-tight">{move.destinationCity}</p>
                                <p className="text-[11px] text-gray-400 leading-tight">{move.destinationCountry}</p>
                              </div>
                            </div>
                          </td>

                          {/* Status — inline badges, no line breaks */}
                          <td className="px-4 py-3.5">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap ${sc.color}`}>
                                <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${sc.dot}`} />
                                {lang === "ko" ? sc.labelKo : sc.label}
                              </span>
                              {move.internalStatus === "PENDING" && (
                                <span className="inline-flex items-center gap-0.5 text-[10px] font-bold bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full whitespace-nowrap">
                                  ⏳ {lang === "ko" ? "승인대기" : "Pending"}
                                </span>
                              )}
                            </div>
                          </td>

                          {/* ETA */}
                          <td className="px-4 py-3.5 hidden md:table-cell">
                            <p className="text-sm text-gray-700 tabular-nums">
                              {move.eta
                                ? new Date(move.eta).toLocaleDateString(lang === "ko" ? "ko-KR" : "en-US", { month: "short", day: "numeric" })
                                : <span className="text-gray-300">—</span>}
                            </p>
                          </td>

                          {/* Cost */}
                          <td className="px-4 py-3.5 text-right hidden lg:table-cell">
                            <p className="text-sm font-bold text-gray-800 tabular-nums">
                              {move.quotePrice ? fmt(move.quotePrice) : <span className="text-gray-300 font-normal">—</span>}
                            </p>
                          </td>

                          {/* View */}
                          <td className="px-3 py-3.5 text-center">
                            <Link href={`/corporate/moves/${move.id}`}>
                              <span className="text-xs text-gray-300 group-hover:text-primary font-semibold transition-colors">
                                →
                              </span>
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {filtered.length === 0 && (
                <div className="text-center py-12 text-gray-400">
                  <p className="text-3xl mb-2">📋</p>
                  <p className="text-sm font-medium">
                    {lang === "ko" ? "해당 조건의 주재원이 없습니다" : "No expats found for this filter"}
                  </p>
                </div>
              )}

              {filtered.length > 10 && (
                <div className="border-t border-gray-100 px-5 py-3 text-center">
                  <Link href="/corporate/employees" className="text-xs font-semibold text-primary hover:underline">
                    {lang === "ko" ? `+${filtered.length - 10}명 더 보기 →` : `+${filtered.length - 10} more →`}
                  </Link>
                </div>
              )}
            </Card>
          </div>

          {/* ── Sidebar ── */}
          <div className="space-y-5">

            {/* Budget */}
            <Card>
              <h3 className="text-sm font-bold text-gray-700 mb-4 uppercase tracking-wide">
                {t("corporate.budgetOverview")}
              </h3>
              <div className="flex items-center gap-4 mb-5">
                <div className="relative flex-shrink-0">
                  <BudgetRing pct={budgetPct} />
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <p className="text-base font-black text-gray-900 leading-none">{budgetPct}%</p>
                    <p className="text-[9px] text-gray-400 font-medium">{lang === "ko" ? "사용" : "used"}</p>
                  </div>
                </div>
                <div className="flex-1 min-w-0 space-y-2">
                  <div>
                    <p className="text-[10px] text-gray-400 font-medium uppercase">{t("corporate.spentToDate")}</p>
                    <p className="text-base font-black text-gray-900 tabular-nums">{fmt(MOCK_COMPANY.usedBudget)}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-medium uppercase">{t("corporate.annualBudget")}</p>
                    <p className="text-xs font-semibold text-gray-500 tabular-nums">{fmt(MOCK_COMPANY.annualBudget)}</p>
                  </div>
                </div>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${budgetPct}%`,
                    background: budgetPct > 80 ? "#ef4444" : budgetPct > 60 ? "#f59e0b" : "#1553F0",
                  }}
                />
              </div>
              <div className="flex justify-between mt-2 text-[11px] text-gray-400">
                <span>₩0</span>
                <span className={budgetPct > 80 ? "text-red-500 font-bold" : "font-medium"}>
                  {t("corporate.budgetRemaining")}: {fmt(MOCK_COMPANY.annualBudget - MOCK_COMPANY.usedBudget)}
                </span>
              </div>
            </Card>

            {/* Department Breakdown */}
            <Card>
              <h3 className="text-sm font-bold text-gray-700 mb-4 uppercase tracking-wide">
                {t("corporate.departmentBreakdown")}
              </h3>
              <div className="space-y-3">
                {DEPARTMENT_BUDGET.slice(0, 5).map((dept) => {
                  const pct = Math.round((dept.used / dept.budget) * 100);
                  return (
                    <div key={dept.dept}>
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className="font-medium text-gray-700">{lang === "ko" ? dept.deptKo : dept.dept}</span>
                        <span className="text-gray-400 tabular-nums">
                          {fmt(dept.used)}
                          <span className="text-gray-200"> / {fmt(dept.budget)}</span>
                        </span>
                      </div>
                      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${pct}%`,
                            background: pct > 85 ? "#ef4444" : pct > 65 ? "#f59e0b" : "#1553F0",
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              <Link href="/corporate/reports" className="block mt-4 text-xs font-semibold text-primary hover:underline">
                {lang === "ko" ? "전체 리포트 보기 →" : "Full report →"}
              </Link>
            </Card>

            {/* Top Destinations */}
            <Card>
              <h3 className="text-sm font-bold text-gray-700 mb-4 uppercase tracking-wide">
                {t("corporate.topDestinations")}
              </h3>
              <div className="space-y-2">
                {topDest.map((d, i) => (
                  <div key={d.country} className="flex items-center gap-3 py-1">
                    <span className="text-[11px] font-bold text-gray-300 w-3 flex-shrink-0">{i + 1}</span>
                    <span className="text-sm text-gray-700 flex-1 truncate">{d.country}</span>
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 rounded-full overflow-hidden bg-gray-100" style={{ width: `${d.count * 14}px` }}>
                        <div className="h-full rounded-full" style={{ width: "100%", background: "#1553F0" }} />
                      </div>
                      <span className="text-xs font-bold text-gray-500 w-3 text-right tabular-nums">{d.count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Pending Approvals */}
            {pending.length > 0 && (
              <Card className="border-amber-200 bg-amber-50">
                <div className="flex items-start gap-3">
                  <span className="text-xl flex-shrink-0">⚠️</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-black text-amber-800 mb-1">
                      {lang === "ko" ? `승인 대기 ${pending.length}건` : `${pending.length} pending approval`}
                    </p>
                    <p className="text-xs text-amber-700 mb-3">
                      {lang === "ko" ? "인사팀 검토 및 승인이 필요합니다." : "HR review and approval required."}
                    </p>
                    <div className="space-y-1.5">
                      {pending.map((m) => (
                        <Link key={m.id} href={`/corporate/moves/${m.id}`}
                          className="flex items-center gap-2 py-1.5 px-2 bg-amber-100/60 rounded-lg hover:bg-amber-100 transition-colors">
                          <span className="text-base flex-shrink-0">{m.destinationFlag}</span>
                          <div className="min-w-0">
                            <p className="text-xs font-bold text-amber-800 truncate">
                              {lang === "ko" ? m.name : m.nameEn}
                            </p>
                            <p className="text-[10px] text-amber-600">{m.destinationCity}, {m.destinationCountry}</p>
                          </div>
                          <span className="ml-auto text-amber-400 text-xs flex-shrink-0">→</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
