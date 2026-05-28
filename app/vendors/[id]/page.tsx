"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card } from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const VENDOR_DATA: Record<string, any> = {
  v1: {
    id: "v1",
    companyName: "GlobalMove Korea",
    rating: 4.8,
    reviewCount: 142,
    completedMoves: 520,
    responseTime: "< 2 hrs",
    founded: "2009",
    employees: "45",
    badgeTier: "Premium",
    verified: true,
    description: `글로벌무브코리아는 2009년 설립 이후 15년간 국제이사 전문 서비스를 제공해 왔습니다. FCL(단독 컨테이너)과 LCL(혼적) 모두 운영하며, 전 노선에 전담 매니저를 배정합니다. 포장재 무료 제공, 전 구간 화물보험 포함, 픽업부터 배달까지 Door-to-Door 서비스를 운영합니다.`,
    serviceRoutes: ["USA", "Canada", "Australia", "UK", "Germany", "France", "Netherlands"],
    specialties: ["Piano & Musical Instruments", "Art & Antiques", "Corporate Relocation", "FCL & LCL"],
    certifications: ["FIDI FAIM Certified", "ISO 9001:2015", "Korean Customs Broker"],
    reviews: [
      { name: "김민준", rating: 5, date: "2026-04-10", comment: "포장부터 배달까지 완벽했습니다. 담당자 연락이 빠르고 통관도 문제없이 됐어요.", tags: ["Punctuality", "Communication"] },
      { name: "Sarah L.", rating: 5, date: "2026-03-22", comment: "Excellent service from start to finish. All items arrived safely in Sydney.", tags: ["Packing Quality", "Professionalism"] },
      { name: "박수연", rating: 4, date: "2026-02-15", comment: "전반적으로 만족스럽습니다. 도착 후 배달이 예상보다 하루 늦었지만 양해해줬어요.", tags: ["Communication"] },
    ],
    insurance: "전 구간 화물보험 포함 (기본 $50,000)",
    pricingNote: "FCL 기준 서울→시드니: ₩2,800,000 ~ ₩3,500,000 (CBM 및 시기에 따라 변동)",
  },
};

// Fallback for demo
const DEFAULT_VENDOR = VENDOR_DATA["v1"];

const STAR_DISTRIBUTION = [
  { star: 5, pct: 72 },
  { star: 4, pct: 18 },
  { star: 3, pct: 7 },
  { star: 2, pct: 2 },
  { star: 1, pct: 1 },
];

export default function VendorProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { t, lang } = useLanguage();
  const resolvedId = (params as unknown as { id: string }).id;
  const vendor = VENDOR_DATA[resolvedId] ?? DEFAULT_VENDOR;
  const [activeTab, setActiveTab] = useState<"about" | "reviews" | "pricing">("about");

  return (
    <div className="min-h-screen flex flex-col pb-16 md:pb-0">
      <Header />

      {/* Hero */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-start gap-6">
            {/* Logo */}
            <div className="w-20 h-20 bg-primary-50 rounded-2xl flex items-center justify-center text-primary font-black text-3xl flex-shrink-0 border border-primary-100">
              {vendor.companyName.charAt(0)}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <h1 className="text-2xl font-bold text-gray-900">{vendor.companyName}</h1>
                {vendor.badgeTier && <Badge variant="teal">{vendor.badgeTier}</Badge>}
                {vendor.verified && <Badge variant="success">✓ Verified</Badge>}
              </div>

              {/* Rating Row */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                <div className="flex items-center gap-1">
                  {[1,2,3,4,5].map((s) => (
                    <span key={s} className={`text-lg ${s <= Math.round(vendor.rating) ? "text-yellow-400" : "text-gray-200"}`}>★</span>
                  ))}
                  <span className="font-semibold ml-1">{vendor.rating}</span>
                  <span className="text-gray-400">({vendor.reviewCount} {t("common.reviews")})</span>
                </div>
                <span>·</span>
                <span>{vendor.completedMoves} {t("vendors.completedMoves")}</span>
                <span>·</span>
                <span>{t("vendors.founded")} {vendor.founded}</span>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {vendor.serviceRoutes.map((r: string) => (
                  <span key={r} className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">{r}</span>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col gap-2 flex-shrink-0">
              <Link href="/quote/new">
                <Button size="lg" className="w-full sm:w-auto">{t("vendors.requestQuote")}</Button>
              </Link>
              <p className="text-xs text-center text-gray-400">{t("vendors.respondsIn")} {vendor.responseTime}</p>
            </div>
          </div>
        </div>
      </section>

      <main className="flex-1 bg-gray-50 py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-5">
              {/* Tabs */}
              <div className="flex gap-1 bg-gray-100 rounded-xl p-1 w-fit">
                {(["about", "reviews", "pricing"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-5 py-2 text-sm font-medium rounded-lg capitalize transition-all ${
                      activeTab === tab ? "bg-white shadow-sm text-gray-900" : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {tab === "about" ? t("vendors.about") : tab === "reviews" ? t("vendors.reviewsTab") : t("vendors.pricingTab")}
                  </button>
                ))}
              </div>

              {/* About */}
              {activeTab === "about" && (
                <div className="space-y-4">
                  <Card>
                    <h3 className="font-semibold mb-3">{t("vendors.about")}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{vendor.description}</p>
                  </Card>
                  <Card>
                    <h3 className="font-semibold mb-4">{t("vendors.specialties")}</h3>
                    <div className="flex flex-wrap gap-2">
                      {vendor.specialties.map((s: string) => (
                        <span key={s} className="flex items-center gap-1.5 text-sm bg-primary-50 text-primary px-3 py-1.5 rounded-full">
                          <span>✓</span> {s}
                        </span>
                      ))}
                    </div>
                  </Card>
                  <Card>
                    <h3 className="font-semibold mb-4">{t("vendors.certifications")}</h3>
                    <div className="space-y-2">
                      {vendor.certifications.map((c: string) => (
                        <div key={c} className="flex items-center gap-2 text-sm text-gray-700">
                          <span className="w-5 h-5 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs">✓</span>
                          {c}
                        </div>
                      ))}
                    </div>
                  </Card>
                  <Card>
                    <h3 className="font-semibold mb-3">{t("vendors.insurance")}</h3>
                    <p className="text-sm text-gray-600">{vendor.insurance}</p>
                  </Card>
                </div>
              )}

              {/* Reviews */}
              {activeTab === "reviews" && (
                <div className="space-y-4">
                  <Card>
                    <div className="flex gap-8 mb-6">
                      <div className="text-center">
                        <p className="text-5xl font-black text-gray-900">{vendor.rating}</p>
                        <div className="flex gap-0.5 my-1 justify-center">
                          {[1,2,3,4,5].map((s) => (
                            <span key={s} className={`text-lg ${s <= Math.round(vendor.rating) ? "text-yellow-400" : "text-gray-200"}`}>★</span>
                          ))}
                        </div>
                        <p className="text-xs text-gray-400">{vendor.reviewCount} reviews</p>
                      </div>
                      <div className="flex-1 space-y-1.5">
                        {STAR_DISTRIBUTION.map(({ star, pct }) => (
                          <div key={star} className="flex items-center gap-2 text-sm">
                            <span className="text-xs text-gray-500 w-3">{star}</span>
                            <span className="text-yellow-400 text-xs">★</span>
                            <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                              <div className="h-full bg-yellow-400 rounded-full" style={{ width: `${pct}%` }} />
                            </div>
                            <span className="text-xs text-gray-400 w-7">{pct}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Card>
                  {vendor.reviews.map((r: any, i: number) => (
                    <Card key={i}>
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm font-semibold text-gray-600">
                            {r.name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900">{r.name}</p>
                            <p className="text-xs text-gray-400">{new Date(r.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
                          </div>
                        </div>
                        <div className="flex gap-0.5">
                          {[1,2,3,4,5].map((s) => (
                            <span key={s} className={`text-sm ${s <= r.rating ? "text-yellow-400" : "text-gray-200"}`}>★</span>
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed mb-3">{r.comment}</p>
                      <div className="flex gap-1.5 flex-wrap">
                        {r.tags.map((tag: string) => (
                          <span key={tag} className="text-xs bg-primary-50 text-primary px-2 py-0.5 rounded-full">{tag}</span>
                        ))}
                      </div>
                    </Card>
                  ))}
                </div>
              )}

              {/* Pricing */}
              {activeTab === "pricing" && (
                <Card>
                  <h3 className="font-semibold mb-4">{t("vendors.pricingTab")}</h3>
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4 text-sm text-amber-700">
                    {lang === "ko"
                      ? "ℹ️ 정확한 가격은 개별 견적에서 제공됩니다. 아래 범위는 참고용입니다."
                      : "ℹ️ Exact prices are provided in individual quotes. The ranges below are for reference only."}
                  </div>
                  <p className="text-sm text-gray-600 mb-5">{vendor.pricingNote}</p>
                  <div className="space-y-3">
                    {[
                      { route: "Seoul → Sydney", fcl: "₩2.8M–3.5M", lcl: "₩1.5M–2.0M" },
                      { route: "Seoul → London", fcl: "₩3.2M–4.0M", lcl: "₩1.8M–2.5M" },
                      { route: "Seoul → LA", fcl: "₩2.5M–3.2M", lcl: "₩1.4M–1.9M" },
                      { route: "Seoul → Vancouver", fcl: "₩2.6M–3.3M", lcl: "₩1.5M–2.0M" },
                    ].map((p) => (
                      <div key={p.route} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0 text-sm">
                        <span className="font-medium text-gray-800">{p.route}</span>
                        <div className="flex gap-4 text-right">
                          <div>
                            <p className="text-xs text-gray-400">FCL</p>
                            <p className="font-semibold text-primary">{p.fcl}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-400">LCL</p>
                            <p className="font-semibold text-gray-700">{p.lcl}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-5">
                    <Link href="/quote/new">
                      <Button className="w-full">{t("vendors.requestQuote")}</Button>
                    </Link>
                  </div>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              <Card>
                <h3 className="text-sm font-semibold text-gray-700 mb-4">{t("vendors.quickStats")}</h3>
                <div className="space-y-3">
                  {[
                    { label: lang === "ko" ? "완료 이사" : "Completed Moves", value: vendor.completedMoves },
                    { label: lang === "ko" ? "평균 평점" : "Average Rating", value: `${vendor.rating} / 5.0` },
                    { label: lang === "ko" ? "응답 시간" : "Response Time", value: vendor.responseTime },
                    { label: lang === "ko" ? "팀 규모" : "Team Size", value: `${vendor.employees}${lang === "ko" ? "명" : " staff"}` },
                    { label: lang === "ko" ? "설립 연도" : "In Business Since", value: vendor.founded },
                  ].map((s) => (
                    <div key={s.label} className="flex justify-between text-sm py-2 border-b border-gray-50 last:border-0">
                      <span className="text-gray-500">{s.label}</span>
                      <span className="font-semibold text-gray-900">{s.value}</span>
                    </div>
                  ))}
                </div>
              </Card>

              <Card>
                <h3 className="text-sm font-semibold text-gray-700 mb-3">{t("vendors.serviceRoutes")}</h3>
                <div className="flex flex-wrap gap-1.5">
                  {vendor.serviceRoutes.map((r: string) => (
                    <span key={r} className="text-xs bg-primary-50 text-primary px-2.5 py-1 rounded-full">{r}</span>
                  ))}
                </div>
              </Card>

              <Card className="bg-primary text-white border-primary">
                <p className="font-semibold mb-1">{t("vendors.readyQuote")}</p>
                <p className="text-primary-100 text-xs mb-4 leading-relaxed">
                  {lang === "ko"
                    ? `견적 요청을 제출하면 ${vendor.companyName}이(가) ${vendor.responseTime} 내에 응답합니다.`
                    : `Submit a quote request and ${vendor.companyName} will respond within ${vendor.responseTime}.`}
                </p>
                <Link href="/quote/new">
                  <Button className="w-full !bg-white !text-primary hover:!bg-primary-50">
                    {t("vendors.requestQuote")}
                  </Button>
                </Link>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
