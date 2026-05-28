"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import { Card } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { MOCK_EXPAT_MOVES, MOCK_COMPANY, type ExpatMove } from "@/lib/mock-corporate-data";

const fmt = (n: number) =>
  new Intl.NumberFormat("ko-KR", { style: "currency", currency: "KRW" }).format(n);

const STATUS_META: Record<string, { color: string; label: string; labelKo: string; dot: string }> = {
  QUOTING:    { color: "bg-gray-100 text-gray-600",   label: "Quoting",     labelKo: "견적 중",    dot: "bg-gray-400" },
  CONTRACTED: { color: "bg-blue-50 text-blue-700",    label: "Contracted",  labelKo: "계약 완료",  dot: "bg-blue-500" },
  PACKED:     { color: "bg-amber-50 text-amber-700",  label: "Packed",      labelKo: "포장 완료",  dot: "bg-amber-500" },
  IN_TRANSIT: { color: "bg-blue-50 text-blue-700",    label: "In Transit",  labelKo: "운송 중",    dot: "bg-blue-500" },
  ARRIVED:    { color: "bg-indigo-50 text-indigo-700", label: "Arrived",    labelKo: "도착",       dot: "bg-indigo-500" },
  DELIVERED:  { color: "bg-green-50 text-green-700",  label: "Delivered",   labelKo: "완료",       dot: "bg-green-500" },
  CANCELLED:  { color: "bg-red-50 text-red-600",      label: "Cancelled",   labelKo: "취소",       dot: "bg-red-400" },
};

const DEPARTMENTS_KO: Record<string, string> = {
  "R&D": "R&D",
  "마케팅": "마케팅",
  "반도체사업부": "반도체사업부",
  "재무팀": "재무팀",
  "글로벌전략팀": "글로벌전략팀",
  "소프트웨어개발팀": "소프트웨어개발팀",
  "인사팀": "인사팀",
  "생산기술팀": "생산기술팀",
  "구매팀": "구매팀",
};

export default function CorporateEmployeesPage() {
  const { t, lang } = useLanguage();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [deptFilter, setDeptFilter] = useState("all");
  const [sortBy, setSortBy] = useState<"name" | "status" | "eta" | "cost">("status");
  const [viewMode, setViewMode] = useState<"table" | "cards">("table");

  const departments = Array.from(new Set(MOCK_EXPAT_MOVES.map((m) => m.department)));

  const filtered = useMemo(() => {
    return MOCK_EXPAT_MOVES
      .filter((m) => {
        const q = search.toLowerCase();
        const matchSearch = !q ||
          m.name.toLowerCase().includes(q) ||
          m.nameEn.toLowerCase().includes(q) ||
          m.destination.toLowerCase().includes(q) ||
          m.destinationCity.toLowerCase().includes(q) ||
          m.destinationCountry.toLowerCase().includes(q) ||
          m.department.toLowerCase().includes(q) ||
          m.employeeId.toLowerCase().includes(q);
        const matchStatus = statusFilter === "all" || m.status === statusFilter ||
          (statusFilter === "PENDING" && m.internalStatus === "PENDING");
        const matchDept = deptFilter === "all" || m.department === deptFilter;
        return matchSearch && matchStatus && matchDept;
      })
      .sort((a, b) => {
        if (sortBy === "name")   return a.name.localeCompare(b.name);
        if (sortBy === "eta")    return (a.eta ?? "9999").localeCompare(b.eta ?? "9999");
        if (sortBy === "cost")   return (b.quotePrice ?? 0) - (a.quotePrice ?? 0);
        const statusOrder = ["PENDING_APPROVAL", "QUOTING", "CONTRACTED", "PACKED", "IN_TRANSIT", "ARRIVED", "DELIVERED", "CANCELLED"];
        return statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status);
      });
  }, [search, statusFilter, deptFilter, sortBy]);

  const totalCost = MOCK_EXPAT_MOVES.reduce((s, m) => s + (m.quotePrice ?? 0), 0);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 pb-16 md:pb-0">
      <Header />

      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-5">
          <Link href="/corporate/dashboard" className="hover:text-primary transition-colors">
            {lang === "ko" ? MOCK_COMPANY.nameKo : MOCK_COMPANY.name}
          </Link>
          <span>›</span>
          <span className="text-gray-700 font-medium">{t("corporate.employeeList")}</span>
        </div>

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900">{t("corporate.employeeList")}</h1>
            <p className="text-sm text-gray-500 mt-0.5">
              {t("corporate.employeeListSubtitle")} · <span className="font-semibold text-gray-700">{filtered.length}</span>{lang === "ko" ? "명" : " employees"}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {}} // mock CSV export
              className="flex items-center gap-1.5 text-sm text-gray-600 border border-gray-200 rounded-lg px-3 py-2 hover:border-primary hover:text-primary transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              {t("corporate.exportBtn")}
            </button>
            <Button size="sm">{t("corporate.addExpatBtn")}</Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {[
            { label: t("corporate.totalExpats"),    value: MOCK_EXPAT_MOVES.length, icon: "👥", color: "text-slate-700" },
            { label: t("corporate.activeExpats"),   value: MOCK_EXPAT_MOVES.filter((m) => !["DELIVERED","CANCELLED"].includes(m.status)).length, icon: "🚢", color: "text-primary" },
            { label: t("corporate.pendingApproval"),value: MOCK_EXPAT_MOVES.filter((m) => m.internalStatus === "PENDING").length, icon: "⏳", color: "text-amber-600" },
            { label: lang === "ko" ? "총 비용" : "Total Cost", value: fmt(totalCost), icon: "💰", color: "text-gray-800" },
          ].map((s) => (
            <Card key={s.label} padding="sm">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg">{s.icon}</span>
                <span className="text-xs text-gray-500 font-medium">{s.label}</span>
              </div>
              <p className={`text-xl font-extrabold ${s.color}`}>{s.value}</p>
            </Card>
          ))}
        </div>

        {/* Filters */}
        <Card padding="sm" className="mb-5">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="relative flex-1">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder={t("corporate.searchPlaceholder")}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white text-gray-700"
            >
              <option value="all">{t("corporate.filterAll")}</option>
              <option value="QUOTING">{lang === "ko" ? "견적 중" : "Quoting"}</option>
              <option value="CONTRACTED">{lang === "ko" ? "계약 완료" : "Contracted"}</option>
              <option value="PACKED">{lang === "ko" ? "포장 완료" : "Packed"}</option>
              <option value="IN_TRANSIT">{lang === "ko" ? "운송 중" : "In Transit"}</option>
              <option value="DELIVERED">{lang === "ko" ? "완료" : "Delivered"}</option>
              <option value="PENDING">{t("corporate.filterPending")}</option>
            </select>

            {/* Department Filter */}
            <select
              value={deptFilter}
              onChange={(e) => setDeptFilter(e.target.value)}
              className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white text-gray-700"
            >
              <option value="all">{lang === "ko" ? "전체 부서" : "All Departments"}</option>
              {departments.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white text-gray-700"
            >
              <option value="status">{t("corporate.colStatus")}</option>
              <option value="name">{t("corporate.colEmployee")}</option>
              <option value="eta">{t("corporate.colEta")}</option>
              <option value="cost">{t("corporate.colCost")}</option>
            </select>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-gray-100 rounded-lg p-0.5">
              <button
                onClick={() => setViewMode("table")}
                className={`px-2.5 py-1.5 rounded-md text-xs font-semibold transition-all ${viewMode === "table" ? "bg-white shadow-sm text-gray-900" : "text-gray-400"}`}
              >
                ≡
              </button>
              <button
                onClick={() => setViewMode("cards")}
                className={`px-2.5 py-1.5 rounded-md text-xs font-semibold transition-all ${viewMode === "cards" ? "bg-white shadow-sm text-gray-900" : "text-gray-400"}`}
              >
                ⊞
              </button>
            </div>
          </div>
        </Card>

        {/* Table View */}
        {viewMode === "table" && (
          <Card padding="none" className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 border-b border-gray-100">
                  <tr>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">{t("corporate.colEmployee")}</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden sm:table-cell">{t("corporate.colDepartment")}</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">{t("corporate.colDestination")}</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">{t("corporate.colStatus")}</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden md:table-cell">{t("corporate.colVendor")}</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden lg:table-cell">{t("corporate.colPackingDate")}</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden lg:table-cell">{t("corporate.colEta")}</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden xl:table-cell">{t("corporate.colCost")}</th>
                    <th className="px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filtered.map((move) => {
                    const sc = STATUS_META[move.status] ?? STATUS_META["QUOTING"];
                    return (
                      <tr key={move.id} className="hover:bg-slate-50/80 transition-colors group">
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 bg-gradient-to-br from-primary-50 to-blue-50 rounded-xl flex items-center justify-center text-primary font-extrabold text-sm flex-shrink-0 border border-primary-100">
                              {move.name.charAt(0)}
                            </div>
                            <div>
                              <div className="flex items-center gap-1.5">
                                <p className="font-semibold text-gray-900">{move.name}</p>
                                {move.familyMove && (
                                  <span title={lang === "ko" ? "가족 동반" : "Family Move"} className="text-[10px] bg-purple-100 text-purple-600 px-1.5 py-0.5 rounded-full font-semibold">👨‍👩‍👧</span>
                                )}
                              </div>
                              <p className="text-xs text-gray-400">{move.employeeId}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 hidden sm:table-cell">
                          <p className="text-xs font-medium text-gray-700 bg-gray-100 px-2 py-0.5 rounded-full w-fit whitespace-nowrap">{move.department}</p>
                          <p className="text-xs text-gray-400 mt-0.5">{lang === "ko" ? move.jobTitle : move.jobTitleEn}</p>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-1.5">
                            <span className="text-base leading-none">{move.destinationFlag}</span>
                            <div>
                              <p className="font-semibold text-gray-900 text-sm leading-tight">{move.destinationCity}</p>
                              <p className="text-xs text-gray-400 leading-tight">{move.destinationCountry}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="space-y-1">
                            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 w-fit ${sc.color}`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
                              {lang === "ko" ? sc.labelKo : sc.label}
                            </span>
                            {move.internalStatus === "PENDING" && (
                              <span className="text-[9px] font-bold bg-amber-100 text-amber-600 px-1.5 py-0.5 rounded-full flex items-center gap-0.5 w-fit">
                                ⏳ {lang === "ko" ? "승인 대기" : "Needs Approval"}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-4 hidden md:table-cell">
                          <p className="text-sm text-gray-700">{move.vendor ?? "—"}</p>
                        </td>
                        <td className="px-4 py-4 hidden lg:table-cell">
                          <p className="text-sm text-gray-700">
                            {move.packingDate ? new Date(move.packingDate).toLocaleDateString("ko-KR", { month: "short", day: "numeric" }) : "—"}
                          </p>
                        </td>
                        <td className="px-4 py-4 hidden lg:table-cell">
                          <p className="text-sm text-gray-700">
                            {move.eta ? new Date(move.eta).toLocaleDateString("ko-KR", { month: "short", day: "numeric" }) : "—"}
                          </p>
                        </td>
                        <td className="px-4 py-4 hidden xl:table-cell">
                          <p className="text-sm font-semibold text-gray-900">
                            {move.quotePrice ? fmt(move.quotePrice) : "—"}
                          </p>
                        </td>
                        <td className="px-4 py-4">
                          <Link href={`/corporate/moves/${move.id}`}>
                            <button className="text-xs bg-primary text-white px-3 py-1.5 rounded-lg hover:bg-primary-700 transition-colors font-medium whitespace-nowrap">
                              {t("corporate.viewBtn")} →
                            </button>
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            {filtered.length === 0 && (
              <div className="text-center py-16 text-gray-400">
                <p className="text-4xl mb-3">🔍</p>
                <p className="font-semibold text-gray-600">{lang === "ko" ? "검색 결과가 없습니다" : "No results found"}</p>
                <p className="text-sm mt-1">{lang === "ko" ? "다른 검색어나 필터를 사용해보세요." : "Try a different search or filter."}</p>
              </div>
            )}
          </Card>
        )}

        {/* Card View */}
        {viewMode === "cards" && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((move) => {
              const sc = STATUS_META[move.status] ?? STATUS_META["QUOTING"];
              return (
                <Card key={move.id} hover className="relative">
                  {move.internalStatus === "PENDING" && (
                    <div className="absolute top-3 right-3">
                      <span className="text-[9px] font-bold bg-amber-100 text-amber-600 px-2 py-1 rounded-full">
                        ⏳ {lang === "ko" ? "승인 대기" : "Pending"}
                      </span>
                    </div>
                  )}
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-11 h-11 bg-gradient-to-br from-primary-50 to-blue-50 rounded-xl flex items-center justify-center text-primary font-extrabold text-lg border border-primary-100 flex-shrink-0">
                      {move.name.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <p className="font-bold text-gray-900">{move.name}</p>
                        {move.familyMove && <span className="text-xs">👨‍👩‍👧</span>}
                      </div>
                      <p className="text-xs text-gray-400">{move.employeeId} · {move.department}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{lang === "ko" ? move.jobTitle : move.jobTitleEn}</p>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-3 mb-3">
                    <p className="text-xs text-gray-400 mb-0.5">{lang === "ko" ? "이사 경로" : "Route"}</p>
                    <div className="flex items-center gap-1.5">
                      <p className="text-sm font-semibold text-gray-800">{move.originCity}</p>
                      <span className="text-gray-400 text-xs">→</span>
                      <span className="text-base">{move.destinationFlag}</span>
                      <p className="text-sm font-semibold text-gray-800">{move.destinationCity}</p>
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5">{move.destinationCountry}</p>
                  </div>

                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1 ${sc.color}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
                      {lang === "ko" ? sc.labelKo : sc.label}
                    </span>
                    {move.quotePrice && (
                      <span className="text-sm font-bold text-primary">{fmt(move.quotePrice)}</span>
                    )}
                  </div>

                  {/* Progress bar */}
                  <div className="mb-3">
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-blue-400 to-primary rounded-full" style={{ width: `${move.progress}%` }} />
                    </div>
                  </div>

                  <Link href={`/corporate/moves/${move.id}`}>
                    <Button variant="outline" size="sm" className="w-full">{t("corporate.viewBtn")} →</Button>
                  </Link>
                </Card>
              );
            })}
          </div>
        )}

        {filtered.length > 0 && (
          <p className="text-xs text-center text-gray-400 mt-5">
            {lang === "ko"
              ? `총 ${MOCK_EXPAT_MOVES.length}명 중 ${filtered.length}명 표시`
              : `Showing ${filtered.length} of ${MOCK_EXPAT_MOVES.length} employees`}
          </p>
        )}
      </div>
    </div>
  );
}
