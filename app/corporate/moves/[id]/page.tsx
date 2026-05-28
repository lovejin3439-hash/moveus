"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import { Card } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { MOCK_EXPAT_MOVES, MOCK_COMPANY, type InternalStatus } from "@/lib/mock-corporate-data";

const fmt = (n: number) =>
  new Intl.NumberFormat("ko-KR", { style: "currency", currency: "KRW" }).format(n);

const PROGRESS_STEPS = {
  en: ["Quote",    "Contract",    "Packing",    "In Transit", "Arrived",  "Delivered"],
  ko: ["견적 중",  "계약 완료",   "포장 완료",  "운송 중",    "도착",     "배달 완료"],
};

const STATUS_TO_STEP: Record<string, number> = {
  QUOTING: 0, CONTRACTED: 1, PACKED: 2, IN_TRANSIT: 3, ARRIVED: 4, DELIVERED: 5,
};

const STATUS_META: Record<string, { label: string; labelKo: string; color: string }> = {
  QUOTING:    { label: "Quoting",    labelKo: "견적 중",    color: "bg-gray-100 text-gray-600" },
  CONTRACTED: { label: "Contracted", labelKo: "계약 완료",  color: "bg-blue-50 text-blue-700" },
  PACKED:     { label: "Packed",     labelKo: "포장 완료",  color: "bg-amber-50 text-amber-700" },
  IN_TRANSIT: { label: "In Transit", labelKo: "운송 중",    color: "bg-blue-50 text-blue-700" },
  ARRIVED:    { label: "Arrived",    labelKo: "도착",       color: "bg-indigo-50 text-indigo-700" },
  DELIVERED:  { label: "Delivered",  labelKo: "완료",       color: "bg-green-50 text-green-700" },
};

export default function CorporateMoveDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { t, lang } = useLanguage();
  const toast = useToast();

  // Next.js 15: params is a Promise — unwrap synchronously via React.use() or fall back to MOCK_EXPAT_MOVES[0]
  const resolvedId = (params as unknown as { id: string }).id;
  const move = MOCK_EXPAT_MOVES.find((m) => m.id === resolvedId) ?? MOCK_EXPAT_MOVES[0];

  const [internalStatus, setInternalStatus] = useState<InternalStatus>(move.internalStatus);
  const [notes, setNotes] = useState(move.notes);
  const [notesSaved, setNotesSaved] = useState(true);
  const [approving, setApproving] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "documents" | "notes">("overview");

  const currentStep = STATUS_TO_STEP[move.status] ?? 0;
  const progressSteps = PROGRESS_STEPS[lang] ?? PROGRESS_STEPS.en;
  const sc = STATUS_META[move.status] ?? STATUS_META["QUOTING"];

  const handleApprove = async () => {
    setApproving(true);
    await new Promise((r) => setTimeout(r, 800));
    setInternalStatus("APPROVED");
    setApproving(false);
    toast.success(
      lang === "ko" ? "이사 승인 완료" : "Move Approved",
      lang === "ko" ? `${move.name}님의 이사가 승인되었습니다.` : `${move.name}'s move has been approved.`
    );
  };

  const handleReject = async () => {
    setInternalStatus("REJECTED");
    toast.error(
      lang === "ko" ? "이사 반려" : "Move Rejected",
      lang === "ko" ? "담당자에게 반려 사유를 전달해주세요." : "Please communicate the reason to the employee."
    );
  };

  const handleSaveNotes = async () => {
    await new Promise((r) => setTimeout(r, 400));
    setNotesSaved(true);
    toast.success(
      lang === "ko" ? "메모 저장됨" : "Notes Saved",
      lang === "ko" ? "내부 메모가 저장되었습니다." : "Internal notes have been saved."
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 pb-16 md:pb-0">
      <Header />

      <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-5 flex-wrap">
          <Link href="/corporate/dashboard" className="hover:text-primary transition-colors">
            {lang === "ko" ? MOCK_COMPANY.nameKo : MOCK_COMPANY.name}
          </Link>
          <span>›</span>
          <Link href="/corporate/employees" className="hover:text-primary transition-colors">
            {t("corporate.employeeList")}
          </Link>
          <span>›</span>
          <span className="text-gray-700 font-medium">{move.name}</span>
        </div>

        {/* Top Card: Employee + Approval Actions */}
        <Card className="mb-6 border-0 shadow-md overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-5">
            {/* Left: Employee */}
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-50 to-blue-50 rounded-2xl flex items-center justify-center text-primary font-black text-2xl border border-primary-100 flex-shrink-0">
                {move.name.charAt(0)}
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h1 className="text-xl font-extrabold text-gray-900">{move.name}</h1>
                  {move.familyMove && (
                    <span className="text-xs bg-purple-100 text-purple-600 px-2 py-0.5 rounded-full font-semibold">
                      {lang === "ko" ? "👨‍👩‍👧 가족 동반" : "👨‍👩‍👧 Family"}
                    </span>
                  )}
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${sc.color}`}>
                    {lang === "ko" ? sc.labelKo : sc.label}
                  </span>
                </div>
                <p className="text-sm text-gray-500">
                  {move.employeeId} · {move.department} · {lang === "ko" ? move.jobTitle : move.jobTitleEn}
                </p>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="text-sm font-medium text-gray-700">{move.originCity}</span>
                  <span className="text-gray-400">→</span>
                  <span className="text-base leading-none">{move.destinationFlag}</span>
                  <span className="text-sm font-medium text-gray-700">{move.destinationCity},</span>
                  <span className="text-sm text-gray-500">{move.destinationCountry}</span>
                </div>
              </div>
            </div>

            {/* Right: Approval */}
            <div className="flex flex-col items-end gap-3 flex-shrink-0">
              {/* Internal status badge */}
              <div className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 ${
                internalStatus === "APPROVED" ? "bg-green-100 text-green-700" :
                internalStatus === "REJECTED" ? "bg-red-100 text-red-600" :
                "bg-amber-100 text-amber-700"
              }`}>
                <span>{internalStatus === "APPROVED" ? "✓" : internalStatus === "REJECTED" ? "✕" : "⏳"}</span>
                <span>
                  {internalStatus === "APPROVED" ? t("corporate.approvedLabel") :
                   internalStatus === "REJECTED" ? t("corporate.rejectedLabel") :
                   t("corporate.pendingLabel")}
                </span>
              </div>

              {/* Approval Actions */}
              {internalStatus === "PENDING" && (
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleReject}
                    className="!border-red-200 !text-red-600 hover:!bg-red-50"
                  >
                    {t("corporate.rejectBtn")}
                  </Button>
                  <Button
                    size="sm"
                    loading={approving}
                    onClick={handleApprove}
                  >
                    {t("corporate.approveBtn")} ✓
                  </Button>
                </div>
              )}
              {internalStatus === "REJECTED" && (
                <button
                  onClick={() => setInternalStatus("PENDING")}
                  className="text-xs text-gray-400 hover:text-primary transition-colors underline"
                >
                  {lang === "ko" ? "재검토하기" : "Re-review"}
                </button>
              )}
            </div>
          </div>

          {/* Progress Tracker */}
          <div className="mt-6 pt-5 border-t border-gray-100">
            <div className="flex items-center justify-between mb-2">
              {progressSteps.map((step, i) => (
                <div key={step} className="flex-1 flex flex-col items-center">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    i < currentStep ? "bg-primary text-white" :
                    i === currentStep ? "bg-primary text-white ring-4 ring-primary/20" :
                    "bg-gray-100 text-gray-400"
                  }`}>
                    {i < currentStep ? "✓" : i + 1}
                  </div>
                  {i < progressSteps.length - 1 && (
                    <div className="absolute" />
                  )}
                </div>
              ))}
            </div>
            {/* Connector line */}
            <div className="relative -mt-9 mb-4 mx-3.5 flex">
              {progressSteps.slice(0, -1).map((_, i) => (
                <div key={i} className="flex-1">
                  <div className={`h-0.5 mt-3.5 ${i < currentStep ? "bg-primary" : "bg-gray-100"}`} />
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-1">
              {progressSteps.map((step, i) => (
                <div key={step} className="flex-1 text-center">
                  <p className={`text-[9px] font-medium leading-tight ${i === currentStep ? "text-primary font-bold" : "text-gray-400"}`}>
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-5">
            {/* Tabs */}
            <div className="flex gap-1 bg-gray-100 rounded-xl p-1 w-fit">
              {(["overview", "documents", "notes"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-all ${
                    activeTab === tab ? "bg-white shadow-sm text-gray-900" : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab === "overview"
                    ? (lang === "ko" ? "개요" : "Overview")
                    : tab === "documents"
                    ? (lang === "ko" ? "서류" : "Documents")
                    : (lang === "ko" ? "메모" : "Notes")}
                </button>
              ))}
            </div>

            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div className="space-y-4">
                {/* Employee Info */}
                <Card>
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="w-6 h-6 bg-primary-50 rounded-lg flex items-center justify-center text-xs">👤</span>
                    {t("corporate.employeeInfo")}
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      [t("corporate.employeeId"),   move.employeeId],
                      [t("corporate.employeeName"), move.name],
                      [t("corporate.department"),   move.department],
                      [t("corporate.jobTitle"),     lang === "ko" ? move.jobTitle : move.jobTitleEn],
                      [lang === "ko" ? "출발도시" : "Origin City",        `${move.originCity}`],
                      [lang === "ko" ? "목적 도시" : "Destination City",  `${move.destinationFlag} ${move.destinationCity}, ${move.destinationCountry}`],
                    ].map(([k, v]) => (
                      <div key={k} className="bg-gray-50 rounded-xl p-3">
                        <p className="text-xs text-gray-400 mb-0.5">{k}</p>
                        <p className="text-sm font-semibold text-gray-900">{v}</p>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Shipment Info */}
                <Card>
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="w-6 h-6 bg-blue-50 rounded-lg flex items-center justify-center text-xs">🚢</span>
                    {lang === "ko" ? "이사 정보" : "Shipment Info"}
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      [lang === "ko" ? "담당 업체" : "Vendor",        move.vendor ?? (lang === "ko" ? "견적 대기" : "Awaiting Quote")],
                      [lang === "ko" ? "예상 CBM" : "Est. Volume",    `${move.estimatedCbm} CBM`],
                      [lang === "ko" ? "확정 CBM" : "Final Volume",   move.finalCbm ? `${move.finalCbm} CBM` : "—"],
                      [lang === "ko" ? "포장일" : "Packing Date",     move.packingDate ? new Date(move.packingDate).toLocaleDateString("ko-KR") : "—"],
                      [lang === "ko" ? "도착 예정" : "ETA",           move.eta ? new Date(move.eta).toLocaleDateString("ko-KR") : "—"],
                      [lang === "ko" ? "견적 금액" : "Quote Price",   move.quotePrice ? fmt(move.quotePrice) : "—"],
                    ].map(([k, v]) => (
                      <div key={k} className="bg-gray-50 rounded-xl p-3">
                        <p className="text-xs text-gray-400 mb-0.5">{k}</p>
                        <p className="text-sm font-semibold text-gray-900">{v}</p>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Special Items */}
                {move.specialItems.length > 0 && (
                  <Card>
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <span className="w-6 h-6 bg-amber-50 rounded-lg flex items-center justify-center text-xs">⚠️</span>
                      {lang === "ko" ? "특수 화물" : "Special Items"}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {move.specialItems.map((item) => (
                        <span key={item} className="text-sm bg-amber-50 border border-amber-200 text-amber-700 px-3 py-1.5 rounded-full font-medium">
                          {item}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs text-gray-400 mt-3">
                      {lang === "ko"
                        ? "특수 화물이 포함된 이사입니다. 담당 업체에 사전 안내가 필요합니다."
                        : "This move contains special items that require advance notice to the vendor."}
                    </p>
                  </Card>
                )}
              </div>
            )}

            {/* Documents Tab */}
            {activeTab === "documents" && (
              <Card>
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 bg-green-50 rounded-lg flex items-center justify-center text-xs">📁</span>
                  {lang === "ko" ? "제출 서류" : "Submitted Documents"}
                </h3>
                <div className="space-y-2">
                  {(lang === "ko"
                    ? [
                        { name: "여권 사본",           status: "uploaded", date: "2026-03-15" },
                        { name: "비자 / 취업 허가",    status: "uploaded", date: "2026-03-20" },
                        { name: "물품 목록",           status: "uploaded", date: "2026-04-01" },
                        { name: "계약서 (전자서명)",   status: move.status !== "QUOTING" ? "uploaded" : "pending", date: move.status !== "QUOTING" ? "2026-04-05" : null },
                        { name: "포장 완료 확인서",    status: ["PACKED","IN_TRANSIT","ARRIVED","DELIVERED"].includes(move.status) ? "uploaded" : "pending", date: null },
                        { name: "최종 배송 확인서",    status: move.status === "DELIVERED" ? "uploaded" : "pending", date: null },
                      ]
                    : [
                        { name: "Passport Copy",         status: "uploaded", date: "2026-03-15" },
                        { name: "Visa / Work Permit",    status: "uploaded", date: "2026-03-20" },
                        { name: "Inventory List",        status: "uploaded", date: "2026-04-01" },
                        { name: "Signed Contract",       status: move.status !== "QUOTING" ? "uploaded" : "pending", date: move.status !== "QUOTING" ? "2026-04-05" : null },
                        { name: "Packing Confirmation",  status: ["PACKED","IN_TRANSIT","ARRIVED","DELIVERED"].includes(move.status) ? "uploaded" : "pending", date: null },
                        { name: "Delivery Confirmation", status: move.status === "DELIVERED" ? "uploaded" : "pending", date: null },
                      ]
                  ).map((doc) => (
                    <div key={doc.name} className={`flex items-center justify-between py-3 px-4 rounded-xl border ${doc.status === "uploaded" ? "border-green-100 bg-green-50/50" : "border-gray-100 bg-gray-50"}`}>
                      <div className="flex items-center gap-3">
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${doc.status === "uploaded" ? "bg-green-100 text-green-600" : "bg-gray-200 text-gray-400"}`}>
                          {doc.status === "uploaded" ? "✓" : "○"}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-800">{doc.name}</p>
                          {doc.date && <p className="text-xs text-gray-400">{doc.date}</p>}
                        </div>
                      </div>
                      {doc.status === "uploaded" ? (
                        <button className="text-xs text-primary hover:underline font-medium">
                          {lang === "ko" ? "다운로드" : "Download"}
                        </button>
                      ) : (
                        <span className="text-xs text-gray-400">{lang === "ko" ? "대기 중" : "Pending"}</span>
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Notes Tab */}
            {activeTab === "notes" && (
              <Card>
                <h3 className="font-semibold text-gray-900 mb-1 flex items-center gap-2">
                  <span className="w-6 h-6 bg-yellow-50 rounded-lg flex items-center justify-center text-xs">📝</span>
                  {t("corporate.internalNotes")}
                </h3>
                <p className="text-xs text-gray-400 mb-4">{t("corporate.notesHint")}</p>
                <textarea
                  rows={6}
                  value={notes}
                  onChange={(e) => { setNotes(e.target.value); setNotesSaved(false); }}
                  placeholder={t("corporate.notesPlaceholder")}
                  className="w-full text-sm border border-gray-200 rounded-xl px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-primary bg-gray-50 focus:bg-white transition-all"
                />
                <div className="flex items-center justify-between mt-3">
                  <p className="text-xs text-gray-400">
                    {notesSaved
                      ? (lang === "ko" ? "✓ 저장됨" : "✓ Saved")
                      : (lang === "ko" ? "저장되지 않은 변경 사항" : "Unsaved changes")}
                  </p>
                  <Button size="sm" onClick={handleSaveNotes} disabled={notesSaved}>
                    {t("corporate.saveNotes")}
                  </Button>
                </div>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Quick Actions */}
            <Card>
              <h3 className="text-sm font-bold text-gray-700 mb-4">
                {lang === "ko" ? "빠른 액션" : "Quick Actions"}
              </h3>
              <div className="space-y-2">
                <Link href={`/shipments/${move.id}`}>
                  <Button variant="outline" size="sm" className="w-full justify-start gap-2">
                    🗺️ {lang === "ko" ? "화물 추적" : "Track Shipment"}
                  </Button>
                </Link>
                {move.status !== "QUOTING" && (
                  <Button variant="outline" size="sm" className="w-full justify-start gap-2" onClick={() => setActiveTab("documents")}>
                    📄 {lang === "ko" ? "계약서 보기" : "View Contract"}
                  </Button>
                )}
                <Button variant="outline" size="sm" className="w-full justify-start gap-2" onClick={() => setActiveTab("notes")}>
                  📝 {lang === "ko" ? "내부 메모 작성" : "Add Notes"}
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start gap-2">
                  ✉️ {lang === "ko" ? "담당자에게 연락" : "Contact Employee"}
                </Button>
              </div>
            </Card>

            {/* Cost Breakdown */}
            {move.quotePrice && (
              <Card>
                <h3 className="text-sm font-bold text-gray-700 mb-4">
                  {lang === "ko" ? "비용 내역" : "Cost Breakdown"}
                </h3>
                <div className="space-y-2 text-sm">
                  {[
                    [lang === "ko" ? "이사 견적" : "Move Quote",     move.quotePrice],
                    [lang === "ko" ? "예산 범주" : "Budget Category", lang === "ko" ? "해외 발령 이사비" : "Expat Relocation"],
                  ].map(([k, v]) => (
                    <div key={String(k)} className="flex justify-between py-1.5 border-b border-gray-50 last:border-0">
                      <span className="text-gray-500">{k}</span>
                      <span className="font-semibold text-gray-900">
                        {typeof v === "number" ? fmt(v) : v}
                      </span>
                    </div>
                  ))}
                  <div className="flex justify-between items-center pt-2 mt-2 border-t border-gray-100">
                    <span className="text-gray-500 font-medium">{lang === "ko" ? "총 비용" : "Total Cost"}</span>
                    <span className="text-lg font-extrabold text-primary">{fmt(move.quotePrice)}</span>
                  </div>
                </div>
              </Card>
            )}

            {/* Related Expats (same destination) */}
            <Card>
              <h3 className="text-sm font-bold text-gray-700 mb-4">
                {lang === "ko" ? "같은 목적지 주재원" : "Same Destination"}
              </h3>
              <div className="space-y-2">
                {MOCK_EXPAT_MOVES
                  .filter((m) => m.destinationCountry === move.destinationCountry && m.id !== move.id)
                  .slice(0, 3)
                  .map((m) => (
                    <Link key={m.id} href={`/corporate/moves/${m.id}`} className="flex items-center gap-2 py-2 border-b border-gray-50 last:border-0 hover:text-primary transition-colors">
                      <div className="w-7 h-7 bg-primary-50 rounded-full flex items-center justify-center text-primary text-xs font-bold flex-shrink-0">
                        {m.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800">{m.name}</p>
                        <p className="text-xs text-gray-400">{m.destinationFlag} {m.destinationCity} · {m.department}</p>
                      </div>
                      <svg className="w-4 h-4 text-gray-300 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  ))}
                {MOCK_EXPAT_MOVES.filter((m) => m.destinationCountry === move.destinationCountry && m.id !== move.id).length === 0 && (
                  <p className="text-xs text-gray-400 py-2">
                    {lang === "ko" ? "같은 목적지 주재원 없음" : "No other expats to this destination"}
                  </p>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
