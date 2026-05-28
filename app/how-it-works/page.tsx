"use client";

import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const CUSTOMER_STEPS = {
  en: [
    {
      number: "01", icon: "📷",
      title: "Upload Photos & Build Item List",
      desc: "Take photos of each room. Our catalog of 30+ item types lets you build a precise item list with standard CBM values. No guessing — add sofas, beds, boxes, and more with sizes.",
      detail: "The system calculates your total estimated volume (CBM). ±10% variance is allowed at no extra charge.",
    },
    {
      number: "02", icon: "📋",
      title: "Submit Quote Request",
      desc: "Enter your destination country, preferred packing dates, and any special notes. Your request is broadcast to all certified vendors serving your route.",
      detail: "Vendors have 24 hours to submit quotes. You'll receive an email & SMS notification when quotes arrive.",
    },
    {
      number: "03", icon: "📊",
      title: "Compare Vendor Quotes",
      desc: "Each vendor submits their FCL price, LCL price, available packing dates, and appeal points. Compare ratings, reviews, and prices side by side.",
      detail: "FCL = full container (your items only). LCL = shared container (lower cost for smaller volumes).",
    },
    {
      number: "04", icon: "✍️",
      title: "Sign Contract & Upload Documents",
      desc: "E-sign the contract digitally. Upload your passport, visa, and any other required documents once — they're stored securely on the platform.",
      detail: "No printing, no scanning. Everything is managed digitally. Register your payment card (no charge yet).",
    },
    {
      number: "05", icon: "📦",
      title: "Packing Day",
      desc: "The vendor arrives on the confirmed date. Once packing is complete, they confirm via the platform — this automatically triggers your payment.",
      detail: "100% of the agreed price is charged automatically to your registered card. A digital receipt and tax invoice are issued instantly.",
    },
    {
      number: "06", icon: "🚢",
      title: "Real-Time Tracking",
      desc: "Track your cargo live from port departure to delivery. Get automated notifications at every milestone via SMS, KakaoTalk, and email.",
      detail: "Status updates: Booked → Packed → Departed → In Transit → Arrived → Customs Cleared → Delivered.",
    },
  ],
  ko: [
    {
      number: "01", icon: "📷",
      title: "사진 업로드 & 물품 목록 작성",
      desc: "방마다 사진을 찍으세요. 30가지 이상의 물품 유형으로 정확한 목록을 작성하고 CBM을 자동 계산합니다. 소파, 침대, 박스 등을 크기별로 추가하세요.",
      detail: "시스템이 총 예상 부피(CBM)를 계산합니다. ±10% 오차는 추가 비용 없이 허용됩니다.",
    },
    {
      number: "02", icon: "📋",
      title: "견적 요청 제출",
      desc: "목적지 국가, 희망 포장 날짜, 특이사항을 입력하세요. 해당 노선의 모든 인증 업체에게 요청이 전달됩니다.",
      detail: "업체들은 24시간 내에 견적을 제출합니다. 견적이 도착하면 이메일과 SMS로 알림을 받습니다.",
    },
    {
      number: "03", icon: "📊",
      title: "업체 견적 비교",
      desc: "각 업체가 FCL 가격, LCL 가격, 가능한 포장일, 특장점을 제출합니다. 평점, 리뷰, 가격을 한눈에 비교하세요.",
      detail: "FCL = 단독 컨테이너(내 짐만). LCL = 공유 컨테이너(소량 이사 시 비용 절감).",
    },
    {
      number: "04", icon: "✍️",
      title: "계약 & 서류 업로드",
      desc: "전자서명으로 계약을 완료하세요. 여권, 비자 등 필요 서류를 한 번만 업로드하면 플랫폼에 안전하게 보관됩니다.",
      detail: "인쇄·스캔 없음. 모든 것이 디지털로 처리됩니다. 결제 카드를 등록하지만 아직 청구되지 않습니다.",
    },
    {
      number: "05", icon: "📦",
      title: "포장 당일",
      desc: "확정된 날짜에 업체가 방문합니다. 포장 완료 후 업체가 플랫폼에서 확인하면 자동으로 결제가 진행됩니다.",
      detail: "합의된 금액의 100%가 등록 카드에 자동 청구됩니다. 전자 영수증과 세금계산서가 즉시 발행됩니다.",
    },
    {
      number: "06", icon: "🚢",
      title: "실시간 화물 추적",
      desc: "출항부터 배달까지 화물을 실시간으로 추적하세요. SMS, 카카오톡, 이메일로 모든 단계에서 자동 알림을 받습니다.",
      detail: "상태 업데이트: 예약 완료 → 포장 완료 → 출항 → 운송 중 → 도착 → 통관 완료 → 배달 완료.",
    },
  ],
};

const VENDOR_STEPS = {
  en: [
    { icon: "📝", title: "Register & Get Verified", desc: "Create a vendor account, upload your business license, and set your service routes. Our team verifies credentials within 2 business days." },
    { icon: "🔔", title: "Receive Quote Requests", desc: "Get notified instantly when customers on your routes submit quote requests. View their item list, volume, and dates." },
    { icon: "💼", title: "Submit Quotes", desc: "Enter your FCL/LCL prices, available packing dates, and appeal points. Customers see your rating and reviews alongside your quote." },
    { icon: "✅", title: "Confirm Packing & Get Paid", desc: "When packing is done, press 'Packing Complete'. Payment is automatically charged to the customer. Settlement reaches you within 3 business days." },
  ],
  ko: [
    { icon: "📝", title: "등록 & 인증", desc: "업체 계정을 만들고 사업자 등록증을 업로드한 뒤 서비스 노선을 설정하세요. 팀이 2영업일 내에 인증을 완료합니다." },
    { icon: "🔔", title: "견적 요청 수신", desc: "담당 노선의 고객이 견적을 요청하면 즉시 알림을 받습니다. 물품 목록, 부피, 날짜를 확인하세요." },
    { icon: "💼", title: "견적 제출", desc: "FCL/LCL 가격, 가능한 포장일, 특장점을 입력하세요. 고객은 귀사의 평점·리뷰와 견적을 함께 확인합니다." },
    { icon: "✅", title: "포장 확인 & 정산", desc: "포장 완료 후 '포장 완료' 버튼을 누르면 고객 결제가 자동으로 진행됩니다. 3영업일 내에 정산 금액이 입금됩니다." },
  ],
};

const FAQS = {
  en: [
    { q: "Is there a cost to use MoveUs?", a: "MoveUs is free for customers. Vendors pay a platform fee of 5–10% deducted from each settled transaction. There are no listing fees or monthly charges." },
    { q: "What if the final volume is different from the estimate?", a: "A ±10% variance from the estimated CBM is agreed at contract and covered at no extra charge. The vendor confirms the final CBM on packing day. If the variance exceeds 10%, the vendor must notify you in advance." },
    { q: "When is my card charged?", a: "Your card is registered during contract setup but NOT charged yet. The charge is triggered automatically when the vendor confirms packing is complete — typically on the morning of packing day." },
    { q: "What if something is damaged or lost?", a: "All platform-recorded moves include cargo insurance. File a claim directly through MoveUs. Our disputes team handles all claims — insurance is only valid for transactions conducted through the platform." },
    { q: "Can I cancel after signing the contract?", a: "Cancellations after contract signing are subject to a cancellation fee per the policy agreed at signing. We recommend reviewing the cancellation policy before signing." },
    { q: "How are vendors verified?", a: "Every vendor must submit their business registration, moving company license, and service route documentation. Our team manually verifies each submission before the vendor can receive quote requests." },
  ],
  ko: [
    { q: "MoveUs 이용 비용이 있나요?", a: "고객은 무료입니다. 업체는 각 정산 건의 5~10% 플랫폼 수수료를 납부합니다. 등록비나 월정액은 없습니다." },
    { q: "최종 부피가 예상과 다르면 어떻게 되나요?", a: "계약 시 ±10% 오차는 추가 비용 없이 허용하도록 합의됩니다. 포장 당일 업체가 최종 CBM을 확인합니다. 10% 초과 시 업체가 사전에 안내해야 합니다." },
    { q: "카드 청구는 언제 되나요?", a: "계약 시 카드를 등록하지만 아직 청구되지 않습니다. 업체가 포장 완료를 확인하면 자동으로 청구됩니다 — 보통 포장 당일 오전에 진행됩니다." },
    { q: "물품이 파손되거나 분실되면 어떻게 하나요?", a: "플랫폼에서 진행된 모든 이사에는 화물 보험이 포함됩니다. MoveUs를 통해 직접 클레임을 제기하세요. 분쟁팀이 모든 청구를 처리합니다 — 보험은 플랫폼 거래에만 유효합니다." },
    { q: "계약 후 취소할 수 있나요?", a: "계약 서명 후 취소 시 서명 시 합의된 정책에 따라 취소 수수료가 발생합니다. 서명 전에 취소 정책을 꼭 확인하세요." },
    { q: "업체 인증은 어떻게 진행되나요?", a: "모든 업체는 사업자 등록증, 이사 업체 면허, 서비스 노선 서류를 제출해야 합니다. 팀이 각 서류를 수동으로 검토한 후에만 견적 요청을 받을 수 있습니다." },
  ],
};

const PAYMENT_STEPS = {
  en: [
    { step: "1", icon: "💳", title: "Card Registered", desc: "At contract signing. Zero charge." },
    { step: "2", icon: "📦", title: "Packing Complete", desc: "Vendor confirms on platform." },
    { step: "3", icon: "⚡", title: "Auto-Charged", desc: "100% of agreed price, instantly." },
    { step: "4", icon: "🏦", title: "Vendor Settled", desc: "Net amount in 3 business days." },
  ],
  ko: [
    { step: "1", icon: "💳", title: "카드 등록", desc: "계약 서명 시. 청구 없음." },
    { step: "2", icon: "📦", title: "포장 완료", desc: "업체가 플랫폼에서 확인." },
    { step: "3", icon: "⚡", title: "자동 결제", desc: "합의 금액 100% 즉시 청구." },
    { step: "4", icon: "🏦", title: "업체 정산", desc: "3영업일 내 순액 입금." },
  ],
};

export default function HowItWorksPage() {
  const { t, lang } = useLanguage();

  const customerSteps = CUSTOMER_STEPS[lang] ?? CUSTOMER_STEPS.en;
  const vendorSteps = VENDOR_STEPS[lang] ?? VENDOR_STEPS.en;
  const faqs = FAQS[lang] ?? FAQS.en;
  const paymentSteps = PAYMENT_STEPS[lang] ?? PAYMENT_STEPS.en;

  return (
    <div className="min-h-screen flex flex-col pb-16 md:pb-0">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden text-white py-20"
        style={{ background: "linear-gradient(135deg, #0A32A8 0%, #1553F0 50%, #1A6AFF 100%)" }}>
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{
          backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }} />
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/15 border border-white/25 rounded-full px-4 py-1.5 text-sm mb-5">
            <span className="w-2 h-2 bg-yellow-300 rounded-full animate-pulse" />
            {lang === "ko" ? "완전 디지털 · 100% 투명" : "Fully Digital · 100% Transparent"}
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
            {t("howItWorks.heroTitle")}
          </h1>
          <p className="text-xl text-white/80 leading-relaxed">{t("howItWorks.heroSubtitle")}</p>
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {(lang === "ko"
              ? ["견적 비교", "전자계약", "실시간 추적", "보험 포함"]
              : ["Compare Quotes", "E-Contract", "Live Tracking", "Insurance Included"]
            ).map((tag) => (
              <span key={tag} className="text-xs font-semibold bg-white/15 border border-white/20 rounded-full px-3 py-1">
                ✓ {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Flow */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block bg-primary-50 text-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-3">
              {t("howItWorks.customerSection")}
            </span>
            <h2 className="text-3xl font-bold text-gray-900">{t("howItWorks.customerTitle")}</h2>
          </div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-100 hidden md:block" />

            <div className="space-y-10">
              {customerSteps.map((step) => (
                <div key={step.number} className="relative md:pl-20">
                  {/* Step Number Circle */}
                  <div className="absolute left-0 top-0 w-12 h-12 bg-primary rounded-full items-center justify-center text-white font-bold text-sm hidden md:flex z-10">
                    {step.number}
                  </div>

                  <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                    <div className="flex items-start gap-4">
                      <span className="text-3xl flex-shrink-0">{step.icon}</span>
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs font-bold text-primary bg-primary-50 px-2.5 py-1 rounded-full md:hidden">
                            STEP {step.number}
                          </span>
                          <h3 className="text-lg font-semibold text-gray-900">{step.title}</h3>
                        </div>
                        <p className="text-gray-600 text-sm leading-relaxed mb-3">{step.desc}</p>
                        <div className="flex items-start gap-2 bg-white border border-primary-100 rounded-lg px-3 py-2">
                          <span className="text-primary text-xs mt-0.5">ℹ</span>
                          <p className="text-xs text-gray-500 leading-relaxed">{step.detail}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/signup" className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors">
              {t("howItWorks.startBtn")}
            </Link>
          </div>
        </div>
      </section>

      {/* Vendor Flow */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block bg-gray-200 text-gray-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-3">
              {t("howItWorks.vendorSection")}
            </span>
            <h2 className="text-3xl font-bold text-gray-900">{t("howItWorks.vendorTitle")}</h2>
            <p className="text-gray-500 mt-2">{t("howItWorks.vendorSubtitle")}</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {vendorSteps.map((step, i) => (
              <div key={step.title} className="bg-white rounded-2xl p-6 border border-gray-200 relative overflow-hidden">
                <div className="absolute top-3 right-3 text-4xl font-black text-gray-50 leading-none select-none">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <span className="text-3xl mb-4 block">{step.icon}</span>
                <h3 className="font-semibold text-gray-900 mb-2 text-sm">{step.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/signup?role=VENDOR" className="inline-flex items-center gap-2 px-8 py-4 border-2 border-gray-800 text-gray-800 font-semibold rounded-xl hover:bg-gray-800 hover:text-white transition-all">
              {t("howItWorks.joinBtn")}
            </Link>
          </div>
        </div>
      </section>

      {/* Payment Flow Visual */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">{t("howItWorks.paymentTitle")}</h2>
            <p className="text-gray-500">{t("howItWorks.paymentSubtitle")}</p>
          </div>
          <div className="flex flex-col md:flex-row gap-0">
            {paymentSteps.map((item, i) => (
              <div key={item.step} className="flex md:flex-col items-center md:items-start flex-1">
                <div className="flex md:flex-col items-center gap-3 md:gap-0 w-full">
                  <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-xl flex-shrink-0">
                    {item.icon}
                  </div>
                  {i < 3 && (
                    <div className="flex-1 h-0.5 bg-primary-200 md:hidden block" />
                  )}
                  {i < 3 && (
                    <div className="w-full h-0.5 bg-primary-200 hidden md:block my-4" />
                  )}
                  <div className="md:mt-3">
                    <p className="font-semibold text-gray-900 text-sm">{item.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">{t("howItWorks.faqTitle")}</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <details key={i} className="group bg-white border border-gray-200 rounded-xl overflow-hidden">
                <summary className="flex items-center justify-between px-6 py-4 cursor-pointer list-none font-medium text-gray-900 text-sm hover:bg-gray-50 transition-colors">
                  {faq.q}
                  <span className="ml-4 flex-shrink-0 text-gray-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="px-6 pb-4 pt-0 text-sm text-gray-600 leading-relaxed border-t border-gray-100">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="relative overflow-hidden py-20"
        style={{ background: "linear-gradient(135deg, #0A32A8 0%, #1553F0 100%)" }}>
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{
          backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }} />
        <div className="relative max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-black text-white mb-4">{t("howItWorks.ctaTitle")}</h2>
          <p className="text-white/80 mb-8 text-lg">{t("howItWorks.ctaSubtitle")}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/quote/new"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 font-black rounded-xl text-base transition-all hover:shadow-2xl hover:-translate-y-0.5"
              style={{ background: "#FFD600", color: "#0A32A8" }}>
              {t("howItWorks.getQuoteBtn")}
            </Link>
            <Link href="/vendors"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/40 text-white font-bold rounded-xl hover:bg-white/10 transition-colors">
              {lang === "ko" ? "업체 탐색하기" : "Browse Vendors"}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
