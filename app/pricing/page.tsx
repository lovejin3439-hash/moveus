"use client";

import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FeeCalculatorClient from "./FeeCalculatorClient";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const CUSTOMER_FEATURES = {
  en: [
    "Unlimited quote requests",
    "Compare all vendor quotes",
    "Digital e-contract",
    "Document upload & storage",
    "Real-time shipment tracking",
    "Automated notifications (SMS, Email)",
    "Cargo insurance coverage",
    "Dispute resolution support",
    "Tax invoice issuance",
    "Installment payment options",
  ],
  ko: [
    "무제한 견적 요청",
    "전체 업체 견적 비교",
    "디지털 전자계약",
    "서류 업로드 & 보관",
    "실시간 화물 추적",
    "자동 알림 (SMS, 이메일)",
    "화물 보험 적용",
    "분쟁 해결 지원",
    "세금계산서 발행",
    "할부 결제 옵션",
  ],
};

const VENDOR_PLANS = {
  en: [
    {
      name: "Standard",
      fee: "10%",
      badge: null,
      monthlyFee: "Free",
      color: "border-gray-200",
      features: [
        "Receive quote requests on active routes",
        "Submit unlimited quotes",
        "Platform contract & payment settlement",
        "Basic vendor profile page",
        "Customer review collection",
        "Settlement within 3 business days",
      ],
      cta: "Join Free",
      highlight: false,
    },
    {
      name: "Premium",
      fee: "8%",
      badge: "Most Popular",
      monthlyFee: "₩150,000/mo",
      color: "border-primary",
      features: [
        "Everything in Standard",
        "Premium badge on profile",
        "Priority listing in search results",
        "Reduced platform fee (8% vs 10%)",
        "Featured in vendor directory",
        "Route boost (2 routes included)",
        "Monthly performance analytics",
        "Dedicated account manager",
      ],
      cta: "Go Premium",
      highlight: true,
    },
    {
      name: "Enterprise",
      fee: "5%",
      badge: "B2B",
      monthlyFee: "Custom",
      color: "border-gray-200",
      features: [
        "Everything in Premium",
        "Lowest platform fee (5%)",
        "Corporate account integration",
        "Bulk move management dashboard",
        "White-label quote requests",
        "API access for ERP integration",
        "SLA guarantee",
        "Priority dispute resolution",
      ],
      cta: "Contact Sales",
      highlight: false,
    },
  ],
  ko: [
    {
      name: "스탠다드",
      fee: "10%",
      badge: null,
      monthlyFee: "무료",
      color: "border-gray-200",
      features: [
        "활성 노선의 견적 요청 수신",
        "무제한 견적 제출",
        "플랫폼 계약 & 결제 정산",
        "기본 업체 프로필 페이지",
        "고객 리뷰 수집",
        "3영업일 내 정산",
      ],
      cta: "무료 가입",
      highlight: false,
    },
    {
      name: "프리미엄",
      fee: "8%",
      badge: "가장 인기",
      monthlyFee: "₩150,000/월",
      color: "border-primary",
      features: [
        "스탠다드의 모든 기능 포함",
        "프로필에 프리미엄 배지 표시",
        "검색 결과 상위 노출",
        "낮은 플랫폼 수수료 (8% vs 10%)",
        "업체 디렉토리 추천 노출",
        "노선 부스트 (2개 노선 포함)",
        "월간 성과 분석 리포트",
        "전담 계정 매니저",
      ],
      cta: "프리미엄 시작",
      highlight: true,
    },
    {
      name: "엔터프라이즈",
      fee: "5%",
      badge: "기업용",
      monthlyFee: "맞춤 협의",
      color: "border-gray-200",
      features: [
        "프리미엄의 모든 기능 포함",
        "최저 플랫폼 수수료 (5%)",
        "법인 계정 연동",
        "대량 이사 관리 대시보드",
        "화이트라벨 견적 요청",
        "ERP 연동 API 접근",
        "SLA 보장",
        "우선 분쟁 처리",
      ],
      cta: "영업팀 문의",
      highlight: false,
    },
  ],
};

const FAQS = {
  en: [
    { q: "Is MoveUs free for customers?", a: "Yes. Customers pay zero fees to use MoveUs — no subscription, no commission. You only pay the vendor's quoted price." },
    { q: "When is the platform fee charged to vendors?", a: "The platform fee is automatically deducted from each settlement. If your quoted price is ₩3,000,000 and your fee is 10%, you receive ₩2,700,000 within 3 business days after packing confirmation." },
    { q: "Can I upgrade or downgrade my vendor plan?", a: "Yes. You can change plans at any time from your vendor profile. Changes take effect at the start of the next billing cycle." },
    { q: "Are there any hidden fees?", a: "No hidden fees. The platform fee is the only charge. No listing fees, no monthly minimum, no charge-back fees for Standard plan." },
    { q: "What counts toward the platform fee calculation?", a: "The fee is calculated on the final agreed contract price (FCL or LCL). It does not include separately agreed surcharges disclosed before contract signing." },
  ],
  ko: [
    { q: "고객은 무료인가요?", a: "네. 고객은 MoveUs 이용에 어떠한 수수료도 내지 않습니다 — 구독료도, 중개 수수료도 없습니다. 업체에게 견적 금액만 지불하면 됩니다." },
    { q: "업체 플랫폼 수수료는 언제 청구되나요?", a: "플랫폼 수수료는 각 정산 시 자동으로 공제됩니다. 견적 금액이 ₩3,000,000이고 수수료가 10%라면, 포장 확인 후 3영업일 내에 ₩2,700,000을 받으십니다." },
    { q: "요금제를 변경할 수 있나요?", a: "네. 업체 프로필에서 언제든지 요금제를 변경할 수 있습니다. 변경 사항은 다음 청구 주기 시작 시 적용됩니다." },
    { q: "숨겨진 수수료가 있나요?", a: "없습니다. 플랫폼 수수료가 유일한 비용입니다. 등록비, 최소 월정액, 스탠다드 플랜의 차지백 수수료가 없습니다." },
    { q: "플랫폼 수수료 계산의 기준은 무엇인가요?", a: "수수료는 최종 합의된 계약 금액(FCL 또는 LCL)을 기준으로 계산됩니다. 계약 서명 전에 공개된 별도 합의 추가 요금은 포함되지 않습니다." },
  ],
};

export default function PricingPage() {
  const { t, lang } = useLanguage();

  const customerFeatures = CUSTOMER_FEATURES[lang] ?? CUSTOMER_FEATURES.en;
  const vendorPlans = VENDOR_PLANS[lang] ?? VENDOR_PLANS.en;
  const faqs = FAQS[lang] ?? FAQS.en;

  return (
    <div className="min-h-screen flex flex-col pb-16 md:pb-0">
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 to-primary-900 text-white py-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t("pricing.heroTitle")}</h1>
          <p className="text-xl text-gray-300">{t("pricing.heroSubtitle")}</p>
        </div>
      </section>

      {/* Customer Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block bg-green-100 text-green-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-3">
              {t("pricing.customerSection")}
            </span>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">{t("pricing.customerTitle")}</h2>
            <p className="text-gray-500 text-lg">{t("pricing.customerSubtitle")}</p>
          </div>

          <div className="bg-gradient-to-br from-primary-50 to-white border border-primary-100 rounded-3xl p-10">
            <div className="flex flex-col md:flex-row gap-10 items-center">
              <div className="text-center md:text-left">
                <p className="text-7xl font-black text-primary mb-2">₩0</p>
                <p className="text-gray-500">
                  {lang === "ko" ? "고객 플랫폼 수수료" : "Platform fee for customers"}
                </p>
              </div>
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {customerFeatures.map((f) => (
                  <div key={f} className="flex items-center gap-2 text-sm text-gray-700">
                    <span className="w-5 h-5 bg-primary rounded-full text-white text-xs flex items-center justify-center flex-shrink-0">✓</span>
                    {f}
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-primary-100 flex flex-col sm:flex-row items-center gap-4">
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors"
              >
                {t("pricing.getQuoteBtn")}
              </Link>
              <p className="text-sm text-gray-500">
                {lang === "ko" ? "회원가입 시 신용카드 불필요." : "No credit card required to sign up."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vendor Plans */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block bg-gray-200 text-gray-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-3">
              {t("pricing.vendorSection")}
            </span>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">{t("pricing.vendorTitle")}</h2>
            <p className="text-gray-500 text-lg">{t("pricing.vendorSubtitle")}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {vendorPlans.map((plan) => (
              <div
                key={plan.name}
                className={`bg-white rounded-2xl border-2 ${plan.color} overflow-hidden ${plan.highlight ? "shadow-xl scale-[1.02]" : "shadow-sm"} relative flex flex-col`}
              >
                {plan.badge && (
                  <div className={`absolute top-0 left-0 right-0 text-center py-1.5 text-xs font-bold ${plan.highlight ? "bg-primary text-white" : "bg-gray-100 text-gray-600"}`}>
                    {plan.badge}
                  </div>
                )}
                <div className={`p-8 ${plan.badge ? "pt-10" : ""} flex-1 flex flex-col`}>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{plan.name}</h3>
                  <div className="mb-2">
                    <span className="text-4xl font-black text-primary">{plan.fee}</span>
                    <span className="text-gray-500 text-sm ml-1">{t("pricing.perMove")}</span>
                  </div>
                  <p className="text-sm text-gray-500 mb-6">
                    {t("pricing.monthly")} <span className="font-medium text-gray-700">{plan.monthlyFee}</span>
                  </p>

                  <ul className="space-y-3 flex-1 mb-8">
                    {plan.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className={`w-4 h-4 rounded-full text-xs flex items-center justify-center flex-shrink-0 mt-0.5 ${plan.highlight ? "bg-primary text-white" : "bg-gray-100 text-gray-500"}`}>
                          ✓
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={plan.name === "Enterprise" || plan.name === "엔터프라이즈" ? "/contact" : "/signup?role=VENDOR"}
                    className={`block text-center py-3 rounded-xl font-semibold transition-colors ${
                      plan.highlight
                        ? "bg-primary text-white hover:bg-primary-700"
                        : "border-2 border-gray-200 text-gray-700 hover:border-primary hover:text-primary"
                    }`}
                  >
                    {plan.cta}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fee Calculator */}
      <section className="py-20 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">{t("pricing.calculatorTitle")}</h2>
            <p className="text-gray-500">{t("pricing.calculatorSubtitle")}</p>
          </div>
          <FeeCalculatorClient />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">{t("pricing.faqTitle")}</h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <details key={i} className="group bg-white border border-gray-200 rounded-xl overflow-hidden">
                <summary className="flex items-center justify-between px-6 py-4 cursor-pointer list-none font-medium text-gray-900 text-sm hover:bg-gray-50">
                  {faq.q}
                  <span className="ml-4 text-gray-400 group-open:rotate-180 transition-transform text-xs">▼</span>
                </summary>
                <div className="px-6 pb-4 text-sm text-gray-600 leading-relaxed border-t border-gray-100">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
