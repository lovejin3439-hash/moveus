"use client";

import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { MOCK_VENDORS } from "@/lib/mock-data";
import Badge from "@/components/ui/Badge";
import { useLanguage } from "@/lib/i18n/LanguageContext";

/* ─── data ─── */
const DESTINATIONS = [
  { flag: "🇦🇺", country: "Australia", citiesEn: "Sydney, Melbourne",     citiesKo: "시드니, 멜버른",    href: "/countries/australia" },
  { flag: "🇺🇸", country: "USA",       citiesEn: "New York, LA, SF",      citiesKo: "뉴욕, LA, 샌프란",  href: "/countries/usa" },
  { flag: "🇨🇦", country: "Canada",    citiesEn: "Vancouver, Toronto",    citiesKo: "밴쿠버, 토론토",    href: "/countries/canada" },
  { flag: "🇬🇧", country: "UK",        citiesEn: "London, Manchester",    citiesKo: "런던, 맨체스터",    href: "#" },
  { flag: "🇩🇪", country: "Germany",   citiesEn: "Berlin, Munich",        citiesKo: "베를린, 뮌헨",      href: "#" },
  { flag: "🇸🇬", country: "Singapore", citiesEn: "Singapore City",        citiesKo: "싱가포르",          href: "#" },
  { flag: "🇯🇵", country: "Japan",     citiesEn: "Tokyo, Osaka",          citiesKo: "도쿄, 오사카",      href: "#" },
  { flag: "🇳🇱", country: "Netherlands", citiesEn: "Amsterdam",          citiesKo: "암스테르담",        href: "#" },
];

const TESTIMONIALS_EN = [
  { name: "Sarah Kim",  route: "Seoul → Melbourne",  text: "Compared 4 vendors in one afternoon — the real-time tracking was incredibly reassuring. No surprise fees whatsoever.",    rating: 5, avatar: "S", date: "March 2026" },
  { name: "James Park", route: "Busan → Vancouver",  text: "Digital contract and document upload was seamless. I used to dread international moves — this was genuinely easy.",         rating: 5, avatar: "J", date: "February 2026" },
  { name: "Emily Chen", route: "Incheon → London",   text: "Transparent pricing, instant quotes, real-time updates. Exactly what I needed. Already recommended to three friends.",      rating: 5, avatar: "E", date: "January 2026" },
];
const TESTIMONIALS_KO = [
  { name: "김민준", route: "서울 → 시드니",   text: "방문 견적 없이 24시간 만에 4개 업체 견적을 받았어요. 비교하고 바로 전자계약까지 완료했습니다. 너무 편했어요.",       rating: 5, avatar: "김", date: "2026년 4월" },
  { name: "박수연", route: "부산 → 밴쿠버",   text: "서류 한 번만 올리면 끝이더라고요. 화물이 어디 있는지 실시간으로 알려줘서 불안하지 않았습니다.",                          rating: 5, avatar: "박", date: "2026년 3월" },
  { name: "이지호", route: "인천 → 런던",     text: "숨겨진 비용이 전혀 없었어요. 견적 금액 그대로 결제됐습니다. 이미 세 명한테 추천했어요.",                                 rating: 5, avatar: "이", date: "2026년 2월" },
];

export default function LandingPage() {
  const { lang, t, tArr } = useLanguage();

  const trustBadges  = tArr("home.trustBadges");
  const testimonials = lang === "ko" ? TESTIMONIALS_KO : TESTIMONIALS_EN;

  const CATEGORY_ICONS = [
    { icon: "🚢", labelKo: "국제이사",   labelEn: "Int'l Move",   href: "/quote/new" },
    { icon: "📦", labelKo: "포장 서비스", labelEn: "Packing",      href: "/quote/new" },
    { icon: "📋", labelKo: "견적 비교",   labelEn: "Compare",      href: "/vendors" },
    { icon: "✍️", labelKo: "전자계약",   labelEn: "E-Contract",   href: "/how-it-works" },
    { icon: "📍", labelKo: "화물 추적",   labelEn: "Tracking",     href: "/my/moves" },
    { icon: "🛡️", labelKo: "이사 보험",  labelEn: "Insurance",    href: "/how-it-works" },
    { icon: "🌏", labelKo: "목적지 안내", labelEn: "Destinations", href: "/countries/australia" },
    { icon: "🏢", labelKo: "기업 서비스", labelEn: "Corporate",    href: "/corporate/dashboard" },
  ];

  const SERVICE_CARDS = [
    {
      icon: "🚢",
      titleKo: "국제이사",
      titleEn: "International Move",
      descKo: "전문 업체들의 맞춤 견적을 24시간 내에 비교하세요. 방문 없이도 OK.",
      descEn: "Compare custom quotes from certified vendors within 24 hours. No site visit needed.",
      ctaKo: "무료 견적 확인하기 >",
      ctaEn: "Get Free Quote >",
      href: "/quote/new",
      color: "bg-blue-50",
      badge: lang === "ko" ? "최대 ₩50만 절약" : "Save up to ₩500K",
    },
    {
      icon: "📦",
      titleKo: "포장 & 픽업",
      titleEn: "Packing & Pickup",
      descKo: "전문 포장팀이 집으로 방문합니다. 파손 걱정 없이 안전하게.",
      descEn: "Professional packers come to your door. Fully insured, zero breakage.",
      ctaKo: "서비스 자세히 보기 >",
      ctaEn: "See Service Details >",
      href: "/how-it-works",
      color: "bg-orange-50",
      badge: null,
    },
    {
      icon: "🏢",
      titleKo: "기업 주재원 관리",
      titleEn: "Corporate Expat",
      descKo: "HR팀을 위한 전용 포털. 전체 발령자 현황을 한눈에 파악하세요.",
      descEn: "Dedicated HR portal. Track all expatriate moves in one dashboard.",
      ctaKo: "기업 포털 알아보기 >",
      ctaEn: "Explore Corporate Portal >",
      href: "/corporate/dashboard",
      color: "bg-slate-50",
      badge: lang === "ko" ? "NEW" : "NEW",
    },
    {
      icon: "📋",
      titleKo: "견적 비교",
      titleEn: "Quote Comparison",
      descKo: "최대 5개 업체 견적을 나란히 비교. 가격, 일정, 평점 모두.",
      descEn: "Compare up to 5 vendor quotes side by side — price, schedule, reviews.",
      ctaKo: "업체 탐색하기 >",
      ctaEn: "Browse Vendors >",
      href: "/vendors",
      color: "bg-purple-50",
      badge: null,
    },
    {
      icon: "✍️",
      titleKo: "디지털 계약",
      titleEn: "Digital Contract",
      descKo: "법적 효력 있는 전자계약을 플랫폼 안에서 바로 서명하세요.",
      descEn: "Sign legally binding e-contracts right inside the platform. No printing.",
      ctaKo: "이용 방법 보기 >",
      ctaEn: "See How It Works >",
      href: "/how-it-works",
      color: "bg-green-50",
      badge: null,
    },
    {
      icon: "📍",
      titleKo: "실시간 화물 추적",
      titleEn: "Real-Time Tracking",
      descKo: "출발부터 도착까지 단계별 알림. 불안 없이 기다리세요.",
      descEn: "Step-by-step alerts from packing to delivery. Peace of mind guaranteed.",
      ctaKo: "추적 기능 보기 >",
      ctaEn: "See Tracking Feature >",
      href: "/my/moves",
      color: "bg-cyan-50",
      badge: null,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col pb-16 md:pb-0 relative">
      <Header />

      {/* ══════════ HERO ══════════ */}
      <section className="relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0A32A8 0%, #1553F0 45%, #1A6AFF 100%)" }}>

        {/* ─ background blobs ─ */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full opacity-10"
            style={{ background: "radial-gradient(circle, #fff 0%, transparent 70%)" }} />
          <div className="absolute -bottom-20 right-0 w-[400px] h-[400px] rounded-full opacity-10"
            style={{ background: "radial-gradient(circle, #fff 0%, transparent 70%)" }} />
          {/* dot grid */}
          <div className="absolute inset-0 opacity-[0.06]" style={{
            backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }} />
        </div>

        {/* ─ floating coins ─ */}
        <span className="absolute top-14 left-[8%]  text-3xl float-slow  select-none pointer-events-none">🪙</span>
        <span className="absolute top-8  left-[22%] text-2xl float-fast  select-none pointer-events-none opacity-80">💰</span>
        <span className="absolute top-20 right-[20%] text-3xl float-mid  select-none pointer-events-none">🪙</span>
        <span className="absolute top-6  right-[35%] text-2xl float-slow  select-none pointer-events-none opacity-70">✨</span>
        <span className="absolute bottom-16 left-[14%] text-2xl float-fast select-none pointer-events-none opacity-60">💫</span>
        <span className="absolute bottom-10 right-[12%] text-3xl float-mid select-none pointer-events-none">🪙</span>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* ─ copy ─ */}
            <div>
              {/* badge */}
              <div className="inline-flex items-center gap-2 bg-white/15 border border-white/25 rounded-full px-4 py-1.5 text-sm text-white mb-6 backdrop-blur-sm">
                <span className="w-2 h-2 bg-yellow-300 rounded-full animate-pulse flex-shrink-0" />
                {t("home.badge")}
              </div>

              {/* headline */}
              <h1 className="text-4xl md:text-6xl font-black leading-[1.05] tracking-tight mb-6 text-white">
                {lang === "ko" ? (
                  <>
                    가만히 두면<br />
                    <span style={{ color: "#FFD600" }}>손해!</span>
                    <br />
                    <span className="text-3xl md:text-4xl font-extrabold opacity-90">
                      국제이사는 MoveUs
                    </span>
                  </>
                ) : (
                  <>
                    {t("home.heroTitle1")}<br />
                    <span style={{ color: "#FFD600" }}>{t("home.heroTitle2")}</span>
                  </>
                )}
              </h1>

              <p className="text-lg text-white/80 mb-8 leading-relaxed max-w-xl">
                {t("home.heroSubtitle")}
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/quote/new"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 font-black rounded-xl text-base transition-all hover:shadow-2xl hover:-translate-y-0.5 active:translate-y-0"
                  style={{ background: "#FFD600", color: "#0A32A8" }}
                >
                  {t("home.heroCta")}
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  href="/how-it-works"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/40 text-white font-semibold rounded-xl hover:bg-white/10 transition-colors text-base backdrop-blur-sm"
                >
                  {t("home.heroSecondaryCta")}
                </Link>
              </div>

              {/* trust badges */}
              <div className="flex flex-wrap items-center gap-3 mt-8">
                {trustBadges.map((badge) => (
                  <span key={badge} className="text-xs text-white/70 bg-white/10 border border-white/20 rounded-full px-3 py-1">
                    {badge}
                  </span>
                ))}
              </div>
            </div>

            {/* ─ floating UI card ─ */}
            <div className="hidden lg:flex justify-center items-center">
              <div className="relative w-full max-w-sm">
                {/* shadow card */}
                <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-2xl" style={{ background: "rgba(10,50,168,0.35)" }} />

                <div className="relative bg-white rounded-2xl p-6 shadow-2xl">
                  {/* header */}
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl"
                      style={{ background: "#EEF2FF" }}>🚢</div>
                    <div className="flex-1">
                      <p className="font-bold text-sm text-gray-900">
                        {lang === "ko" ? "서울 → 시드니" : "Seoul → Sydney"}
                      </p>
                      <p className="text-xs text-gray-400">
                        {lang === "ko" ? "견적 3개 도착" : "3 quotes received"}
                      </p>
                    </div>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full text-white"
                      style={{ background: "#1553F0" }}>
                      {lang === "ko" ? "실시간" : "Live"}
                    </span>
                  </div>

                  {/* quotes */}
                  <div className="space-y-2 mb-5">
                    {[
                      { name: "GlobalMove Korea", price: "₩3,200,000", stars: 5, featured: true },
                      { name: "Pacific Movers",   price: "₩3,500,000", stars: 4, featured: false },
                      { name: "EastWest Cargo",   price: "₩2,900,000", stars: 4, featured: false },
                    ].map((q) => (
                      <div key={q.name}
                        className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs transition-all ${
                          q.featured ? "border font-semibold" : "bg-gray-50"
                        }`}
                        style={q.featured ? { background: "#EEF2FF", borderColor: "#C2D4FF" } : {}}>
                        <div className="w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0"
                          style={{ background: q.featured ? "#1553F0" : "#94a3b8" }}>
                          {q.name.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 truncate">{q.name}</p>
                          <p className="text-yellow-400 text-[10px]">{"★".repeat(q.stars)}</p>
                        </div>
                        <span className={`font-bold ${q.featured ? "text-primary" : "text-gray-700"}`}>
                          {q.price}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* progress */}
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-2">
                    <div className="h-full w-2/3 rounded-full"
                      style={{ background: "linear-gradient(90deg, #1553F0, #5C82FF)" }} />
                  </div>
                  <div className="flex justify-between text-[10px] text-gray-400">
                    <span>{lang === "ko" ? "📦 포장완료" : "📦 Packed"}</span>
                    <span className="font-semibold" style={{ color: "#1553F0" }}>
                      {lang === "ko" ? "🚢 운송 중" : "🚢 In Transit"}
                    </span>
                    <span>{lang === "ko" ? "🏠 배달완료" : "🏠 Delivered"}</span>
                  </div>

                  {/* savings badge */}
                  <div className="mt-4 flex items-center gap-2 bg-yellow-50 border border-yellow-200 rounded-xl px-3 py-2">
                    <span className="text-base">💰</span>
                    <p className="text-xs font-semibold text-yellow-800">
                      {lang === "ko" ? "비교 견적으로 ₩600,000 절약!" : "Saved ₩600,000 by comparing!"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 40" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0 40 L0 20 Q360 0 720 20 Q1080 40 1440 20 L1440 40 Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* ══════════ CATEGORY QUICK ACCESS ══════════ */}
      <section className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
            {CATEGORY_ICONS.map((cat) => (
              <Link
                key={cat.labelKo}
                href={cat.href}
                className="flex flex-col items-center gap-2 p-3 rounded-2xl hover:bg-blue-50 transition-all group"
              >
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl transition-all group-hover:scale-110 group-hover:shadow-md"
                  style={{ background: "#EEF2FF" }}>
                  {cat.icon}
                </div>
                <span className="text-[11px] font-semibold text-gray-600 group-hover:text-primary text-center leading-tight">
                  {lang === "ko" ? cat.labelKo : cat.labelEn}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ STATS BAR ══════════ */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-bold text-gray-400 uppercase tracking-widest mb-8">
            {t("home.statsTitle")}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "2,400+", label: t("home.statsMoves"),        icon: "📦" },
              { value: "98%",    label: t("home.statsSatisfaction"),  icon: "⭐" },
              { value: "45+",    label: t("home.statsVendors"),       icon: "🏢" },
              { value: "30+",    label: t("home.statsCountries"),     icon: "🌍" },
            ].map((s, i) => (
              <div key={s.label} className="text-center group">
                <div className="w-14 h-14 rounded-2xl mx-auto mb-3 flex items-center justify-center text-2xl transition-transform group-hover:scale-110"
                  style={{ background: "#EEF2FF" }}>
                  {s.icon}
                </div>
                <p className="text-4xl font-black mb-1 stat-number" style={{ color: "#1553F0", animationDelay: `${i*100}ms` }}>
                  {s.value}
                </p>
                <p className="text-sm text-gray-500">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ SERVICE CARDS — "한 번의 클릭, 최대의 혜택" ══════════ */}
      <section className="py-20" style={{ background: "#F5F7FF" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#1553F0" }}>
              {lang === "ko" ? "서비스" : "Services"}
            </span>
            <h2 className="text-4xl font-black text-gray-900 mb-3">
              {lang === "ko" ? "한 번의 클릭, 최대의 혜택" : "One Click, Maximum Benefit"}
            </h2>
            <p className="text-gray-500 text-lg">
              {lang === "ko" ? "국제이사의 모든 것, MoveUs에서 해결하세요." : "Everything for your international move — all in one place."}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICE_CARDS.map((card) => (
              <Link
                key={card.titleKo}
                href={card.href}
                className="group relative bg-white rounded-2xl p-6 border border-gray-100 hover:border-blue-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                {/* top accent line */}
                <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: "linear-gradient(90deg, #1553F0, #5C82FF)" }} />

                {card.badge && (
                  <span className="absolute top-4 right-4 text-[10px] font-black px-2 py-0.5 rounded-full text-white"
                    style={{ background: card.badge === "NEW" ? "#1553F0" : "#FFD600", color: card.badge === "NEW" ? "white" : "#0A32A8" }}>
                    {card.badge}
                  </span>
                )}

                <div className={`w-14 h-14 rounded-2xl ${card.color} flex items-center justify-center text-3xl mb-4 transition-transform group-hover:scale-110`}>
                  {card.icon}
                </div>
                <h3 className="font-black text-gray-900 text-lg mb-2">
                  {lang === "ko" ? card.titleKo : card.titleEn}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-4">
                  {lang === "ko" ? card.descKo : card.descEn}
                </p>
                <span className="text-sm font-bold transition-colors" style={{ color: "#1553F0" }}>
                  {lang === "ko" ? card.ctaKo : card.ctaEn}
                </span>
              </Link>
            ))}
          </div>

          {/* bottom CTA */}
          <div className="text-center mt-10">
            <Link
              href="/how-it-works"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 font-bold text-sm transition-all hover:shadow-md"
              style={{ borderColor: "#1553F0", color: "#1553F0" }}
            >
              {lang === "ko" ? "서비스 전체보기" : "View All Services"}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════ HOW IT WORKS ══════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#1553F0" }}>
              {t("home.howLabel")}
            </span>
            <h2 className="text-4xl font-black text-gray-900 mb-4">{t("home.howTitle")}</h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">{t("home.howSubtitle")}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 relative">
            {/* connector */}
            <div className="hidden md:block absolute top-14 left-1/4 right-1/4 h-0.5"
              style={{ background: "linear-gradient(90deg, #C2D4FF, #1553F0, #C2D4FF)" }} />

            {[
              { step: "01", titleKey: "home.howStep1Title", descKey: "home.howStep1Desc", icon: "📷" },
              { step: "02", titleKey: "home.howStep2Title", descKey: "home.howStep2Desc", icon: "📊" },
              { step: "03", titleKey: "home.howStep3Title", descKey: "home.howStep3Desc", icon: "🚢" },
            ].map((s, i) => (
              <div key={s.step} className="relative bg-white rounded-2xl p-8 border-2 hover:border-blue-300 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                style={{ borderColor: "#E0E9FF" }}>
                <div className="absolute top-4 right-5 text-7xl font-black select-none leading-none pointer-events-none"
                  style={{ color: "#EEF2FF" }}>
                  {s.step}
                </div>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-5 relative z-10"
                  style={{ background: "#EEF2FF" }}>
                  {s.icon}
                </div>
                <h3 className="text-lg font-black text-gray-900 mb-3 relative z-10">{t(s.titleKey)}</h3>
                <p className="text-gray-500 text-sm leading-relaxed relative z-10">{t(s.descKey)}</p>
                <div className="flex items-center gap-1.5 mt-5">
                  {[0,1,2].map((j) => (
                    <div key={j} className={`h-1.5 rounded-full transition-all ${j === i ? "w-6" : "w-1.5 bg-gray-200"}`}
                      style={j === i ? { background: "#1553F0", width: "1.5rem" } : {}} />
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 px-8 py-4 font-black rounded-xl text-white text-base transition-all hover:shadow-xl hover:-translate-y-0.5"
              style={{ background: "linear-gradient(135deg, #1553F0, #1A6AFF)" }}
            >
              {t("home.howCta")}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════ WHY MOVEEASE — feature grid ══════════ */}
      <section className="py-20" style={{ background: "#F5F7FF" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#1553F0" }}>
              {t("home.whyLabel")}
            </span>
            <h2 className="text-4xl font-black text-gray-900 mb-4">{t("home.whyTitle")}</h2>
            <p className="text-gray-500">{t("home.whySubtitle")}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: "🔒", titleKey: "home.feature1Title", descKey: "home.feature1Desc" },
              { icon: "📝", titleKey: "home.feature2Title", descKey: "home.feature2Desc" },
              { icon: "📍", titleKey: "home.feature3Title", descKey: "home.feature3Desc" },
              { icon: "⭐", titleKey: "home.feature4Title", descKey: "home.feature4Desc" },
              { icon: "💳", titleKey: "home.feature5Title", descKey: "home.feature5Desc" },
              { icon: "🛡️", titleKey: "home.feature6Title", descKey: "home.feature6Desc" },
            ].map((f) => (
              <div key={f.titleKey}
                className="group flex gap-4 p-6 bg-white rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all duration-200 cursor-default">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 transition-transform group-hover:scale-110"
                  style={{ background: "#EEF2FF" }}>
                  {f.icon}
                </div>
                <div>
                  <h4 className="font-black text-gray-900 mb-1.5">{t(f.titleKey)}</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">{t(f.descKey)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ DESTINATIONS ══════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#1553F0" }}>
              {t("home.destLabel")}
            </span>
            <h2 className="text-4xl font-black text-gray-900 mb-4">{t("home.destTitle")}</h2>
            <p className="text-gray-500">{t("home.destSubtitle")}</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {DESTINATIONS.map((d) => (
              <Link key={d.country} href={d.href}
                className="group flex flex-col items-center p-4 bg-white rounded-2xl border-2 hover:shadow-lg transition-all duration-200 text-center"
                style={{ borderColor: "#E0E9FF" }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#1553F0")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#E0E9FF")}>
                <span className="text-4xl mb-2 group-hover:scale-125 transition-transform">{d.flag}</span>
                <p className="font-bold text-gray-900 text-xs">{d.country}</p>
                <p className="text-[10px] text-gray-400 mt-0.5 leading-tight">
                  {lang === "ko" ? d.citiesKo : d.citiesEn}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ TESTIMONIALS ══════════ */}
      <section className="py-20" style={{ background: "#F5F7FF" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#1553F0" }}>
              {t("home.reviewsLabel")}
            </span>
            <h2 className="text-4xl font-black text-gray-900 mb-3">{t("home.reviewsTitle")}</h2>
            <div className="flex items-center justify-center gap-2 text-gray-500">
              <span className="text-yellow-400 text-lg">★★★★★</span>
              <span className="font-bold text-gray-700">4.9</span>
              <span>{t("home.reviewsAvg")}</span>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((tv) => (
              <div key={tv.name}
                className="bg-white rounded-2xl p-6 border-2 hover:shadow-xl transition-all hover:-translate-y-1"
                style={{ borderColor: "#E0E9FF" }}>
                <div className="flex gap-0.5 mb-4">
                  {"★".repeat(tv.rating).split("").map((s, i) => (
                    <span key={i} className="text-yellow-400 text-lg">{s}</span>
                  ))}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-5 italic">
                  &ldquo;{tv.text}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-black text-sm flex-shrink-0"
                    style={{ background: "linear-gradient(135deg, #1553F0, #5C82FF)" }}>
                    {tv.avatar}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{tv.name}</p>
                    <p className="text-xs text-gray-400">{tv.route} · {tv.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ FEATURED VENDORS ══════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="inline-block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#1553F0" }}>
                {t("home.vendorsLabel")}
              </span>
              <h2 className="text-4xl font-black text-gray-900 mb-1">{t("home.vendorsTitle")}</h2>
              <p className="text-gray-500">{t("home.vendorsSubtitle")}</p>
            </div>
            <Link href="/vendors" className="text-sm font-bold hover:underline hidden sm:block flex-shrink-0 mb-1"
              style={{ color: "#1553F0" }}>
              {t("common.viewAll")}
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {MOCK_VENDORS.map((vendor) => (
              <Link key={vendor.id} href={`/vendors/${vendor.id}`}
                className="group bg-white rounded-2xl border-2 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
                style={{ borderColor: "#E0E9FF" }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#1553F0")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#E0E9FF")}>
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center font-black text-lg text-white"
                    style={{ background: "linear-gradient(135deg, #1553F0, #5C82FF)" }}>
                    {vendor.companyName.charAt(0)}
                  </div>
                  {vendor.badgeTier && <Badge variant="teal">{vendor.badgeTier}</Badge>}
                </div>
                <h3 className="font-black text-gray-900 mb-1.5">{vendor.companyName}</h3>
                <p className="text-xs text-gray-500 mb-4 line-clamp-2 leading-relaxed">{vendor.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="text-yellow-400">★</span>
                    <span className="font-black text-gray-900">{vendor.rating}</span>
                    <span className="text-gray-400 text-xs">({vendor.reviewCount})</span>
                  </div>
                  <div className="flex gap-1 flex-wrap justify-end">
                    {vendor.serviceRoutes.slice(0, 2).map((r) => (
                      <span key={r} className="text-[11px] px-2 py-0.5 rounded-full font-medium"
                        style={{ background: "#EEF2FF", color: "#1553F0" }}>
                        {r}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ CTA BANNER ══════════ */}
      <section className="relative py-20 overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0A32A8 0%, #1553F0 50%, #1A6AFF 100%)" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-10"
            style={{ background: "radial-gradient(circle, #fff 0%, transparent 70%)" }} />
          <div className="absolute bottom-0 left-10 w-64 h-64 rounded-full opacity-10"
            style={{ background: "radial-gradient(circle, #fff 0%, transparent 70%)" }} />
          {/* floating coins */}
          <span className="absolute top-8 left-[5%] text-3xl float-slow select-none opacity-60">🪙</span>
          <span className="absolute bottom-8 right-[8%] text-2xl float-mid select-none opacity-60">💰</span>
          <span className="absolute top-12 right-[25%] text-2xl float-fast select-none opacity-40">✨</span>
        </div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-black text-white mb-4">{t("home.ctaTitle")}</h2>
          <p className="text-white/80 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            {t("home.ctaSubtitle")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center px-8 py-4 font-black rounded-xl text-base transition-all hover:shadow-2xl hover:-translate-y-0.5"
              style={{ background: "#FFD600", color: "#0A32A8" }}
            >
              {t("home.ctaCustomer")}
            </Link>
            <Link
              href="/signup?role=VENDOR"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/40 text-white font-bold rounded-xl hover:bg-white/10 transition-colors backdrop-blur-sm"
            >
              {t("home.ctaVendor")}
            </Link>
          </div>
          <p className="mt-6 text-white/50 text-sm">{t("home.ctaNote")}</p>
        </div>
      </section>

      <Footer />

      {/* ══════════ FLOATING CONSULT BUTTON (mobile & desktop) ══════════ */}
      <div className="hidden md:block fixed right-0 top-1/2 -translate-y-1/2 z-40">
        <div className="flex flex-col gap-2 mr-0">
          {/* main consult panel */}
          <div className="rounded-l-2xl shadow-2xl overflow-hidden border border-blue-100"
            style={{ background: "white", width: "160px" }}>
            <div className="px-3 py-2.5 text-center border-b border-gray-100">
              <p className="text-xs font-black text-gray-800">
                {lang === "ko" ? "상담하기" : "Consult"}
              </p>
            </div>
            <Link href="/quote/new"
              className="flex items-center justify-center gap-1.5 px-3 py-3 text-xs font-bold text-white w-full transition-all hover:opacity-90"
              style={{ background: "#FFD600", color: "#0A32A8" }}>
              <span>💬</span>
              <span>{lang === "ko" ? "무료 견적 받기" : "Free Quote"}</span>
            </Link>
            <Link href="/vendors"
              className="flex items-center justify-center gap-1.5 px-3 py-2.5 text-xs font-semibold border-b border-gray-100 hover:bg-blue-50 transition-colors"
              style={{ color: "#1553F0" }}>
              <span>🔍</span>
              <span>{lang === "ko" ? "업체 찾기" : "Find Vendors"}</span>
            </Link>
            <Link href="/how-it-works"
              className="flex items-center justify-center gap-1.5 px-3 py-2.5 text-xs font-semibold hover:bg-blue-50 transition-colors text-gray-600">
              <span>📋</span>
              <span>{lang === "ko" ? "이용 방법" : "How It Works"}</span>
            </Link>
            <div className="px-3 py-2.5 border-t border-gray-100 text-center">
              <p className="text-[9px] text-gray-400 font-semibold">
                {lang === "ko" ? "365일 24시간 견적" : "24/7 Quote"}
              </p>
              <p className="text-base font-black" style={{ color: "#1553F0" }}>1833-MOVE</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
