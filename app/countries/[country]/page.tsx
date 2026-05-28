"use client";

import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card } from "@/components/ui/Card";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const COUNTRY_DATA: Record<string, any> = {
  australia: {
    name: "Australia", flag: "🇦🇺", capital: "Canberra",
    currency: "AUD", timezone: "AEST (UTC+10 to UTC+11)",
    transitTime: { en: "18–25 days from Korea", ko: "한국에서 18~25일" },
    ports: ["Sydney (Port Botany)", "Melbourne", "Brisbane", "Perth"],
    difficulty: "moderate",
    summary: {
      en: "Australia has strict biosecurity laws — one of the strictest in the world. All wooden furniture and items must be declared. AQIS (Australian Quarantine) may inspect and fumigate shipments.",
      ko: "호주는 세계에서 가장 엄격한 생물 보안 법규를 시행합니다. 모든 목재 가구 및 물품은 신고해야 합니다. AQIS(호주 검역청)가 화물을 검사하고 훈증 소독할 수 있습니다.",
    },
    customs: [
      {
        en: { item: "Household goods used 12+ months", rule: "Duty-free if owned and used for 12 months before departure" },
        ko: { item: "12개월 이상 사용한 가정용품", rule: "출발 전 12개월 이상 소유·사용 시 면세" },
      },
      {
        en: { item: "Alcohol", rule: "Up to 2.25L duty-free per adult" },
        ko: { item: "주류", rule: "성인 1인당 최대 2.25L 면세" },
      },
      {
        en: { item: "Tobacco", rule: "Up to 25 cigarettes or 25g per adult" },
        ko: { item: "담배", rule: "성인 1인당 담배 25개비 또는 25g" },
      },
      {
        en: { item: "Food items", rule: "Strict — most fresh/dried food prohibited. Declare everything." },
        ko: { item: "식품류", rule: "엄격함 — 대부분의 신선/건조 식품 반입 금지. 전부 신고 필수." },
      },
      {
        en: { item: "Wooden furniture/items", rule: "Must be declared. May require fumigation (cost: AUD 200–600)" },
        ko: { item: "목재 가구·물품", rule: "신고 필수. 훈증 소독 필요 시 비용 AUD 200~600 발생" },
      },
      {
        en: { item: "Vehicles", rule: "Require compliance modification and import approval" },
        ko: { item: "차량", rule: "규정 적합 개조 및 수입 승인 필요" },
      },
    ],
    prohibited: {
      en: ["Fresh fruits and vegetables", "Animal products (meat, dairy, eggs)", "Soil", "Seeds and plants", "Weapons and firearms"],
      ko: ["신선 과일 및 채소", "동물성 식품 (육류, 유제품, 달걀)", "토양", "씨앗 및 식물", "무기 및 총기류"],
    },
    visaTypes: [
      {
        en: { name: "Skilled Independent (189)", desc: "Points-based permanent visa" },
        ko: { name: "기술 독립 비자 (189)", desc: "점수 기반 영구 비자" },
      },
      {
        en: { name: "Skilled Nominated (190)", desc: "State-sponsored points-based visa" },
        ko: { name: "주정부 지명 비자 (190)", desc: "주정부 후원 점수 기반 비자" },
      },
      {
        en: { name: "Employer Sponsored (482)", desc: "Temporary skill shortage visa" },
        ko: { name: "고용주 후원 비자 (482)", desc: "임시 기술 부족 비자" },
      },
      {
        en: { name: "Partner Visa (820/801)", desc: "For partners of Australian citizens/PRs" },
        ko: { name: "파트너 비자 (820/801)", desc: "호주 시민권자/영주권자의 파트너용" },
      },
    ],
    tips: {
      en: [
        "Book your container 6–8 weeks in advance for Sydney/Melbourne routes.",
        "All items should be clean — AQIS will inspect for soil, insects, and food residue.",
        "Get a comprehensive insurance policy — Australian customs inspection can cause delays.",
        "Cost of living is high — budget AUD 3,000–5,000/month for a family in major cities.",
        "Korean communities are large in Sydney (Strathfield) and Melbourne (Box Hill).",
      ],
      ko: [
        "시드니/멜버른 노선은 6~8주 전에 컨테이너를 예약하세요.",
        "모든 물품을 깨끗이 — AQIS는 토양, 해충, 음식 잔여물을 검사합니다.",
        "종합 보험에 가입하세요 — 호주 통관 검사로 지연이 발생할 수 있습니다.",
        "물가가 높습니다 — 주요 도시 가족 기준 월 AUD 3,000~5,000 예산 필요.",
        "한인 커뮤니티가 시드니(스트라스필드)와 멜버른(박스힐)에 밀집해 있습니다.",
      ],
    },
    avgMoveCost: "₩2,800,000 – ₩3,800,000 (LCL/FCL, 10–15 CBM)",
    surcharge: false,
  },
  usa: {
    name: "United States", flag: "🇺🇸", capital: "Washington D.C.",
    currency: "USD", timezone: "ET/CT/MT/PT",
    transitTime: { en: "20–28 days (LA), 28–35 days (East Coast)", ko: "LA 20~28일, 동부해안 28~35일" },
    ports: ["Los Angeles", "Long Beach", "New York/NJ", "Seattle"],
    difficulty: "easy",
    summary: {
      en: "The US has relatively straightforward customs for household goods. Items owned and used for 12+ months are typically duty-free. CBP (Customs and Border Protection) handles all entries.",
      ko: "미국은 가정용품에 대한 통관 절차가 비교적 간단합니다. 12개월 이상 소유·사용한 물품은 일반적으로 면세입니다. CBP(세관국경보호국)가 모든 반입을 처리합니다.",
    },
    customs: [
      {
        en: { item: "Used household goods (12+ months)", rule: "Duty-free. Proof of ownership/use date may be required." },
        ko: { item: "중고 가정용품 (12개월 이상)", rule: "면세. 소유/사용일 증명 요청 가능." },
      },
      {
        en: { item: "Alcohol", rule: "1L duty-free. Quantities over 1L taxed by state law." },
        ko: { item: "주류", rule: "1L 면세. 초과분은 주법에 따라 과세." },
      },
      {
        en: { item: "Gifts", rule: "Up to $800 USD duty-free per person" },
        ko: { item: "선물", rule: "1인당 $800 USD까지 면세" },
      },
      {
        en: { item: "Electronics", rule: "Personal use items duty-free. Commercial quantities subject to duty." },
        ko: { item: "전자제품", rule: "개인 사용 물품 면세. 상업적 수량은 관세 부과." },
      },
      {
        en: { item: "Food", rule: "Commercially sealed products generally allowed. Fresh produce restricted." },
        ko: { item: "식품", rule: "상업적으로 밀봉된 제품은 일반적으로 허용. 신선 농산물 제한." },
      },
      {
        en: { item: "Currency", rule: "Over $10,000 USD must be declared" },
        ko: { item: "현금", rule: "$10,000 USD 초과 시 신고 의무" },
      },
    ],
    prohibited: {
      en: ["Narcotics", "Counterfeit goods", "Certain agricultural products", "Soil and live plants", "Endangered species products"],
      ko: ["마약류", "위조 상품", "특정 농산물", "토양 및 살아있는 식물", "멸종위기종 관련 제품"],
    },
    visaTypes: [
      {
        en: { name: "H-1B (Specialty Occupation)", desc: "For skilled professionals — annual lottery cap" },
        ko: { name: "H-1B (전문직)", desc: "전문 기술직 종사자용 — 연간 추첨제 상한 적용" },
      },
      {
        en: { name: "L-1 (Intracompany Transferee)", desc: "For managers/executives transferred within same company" },
        ko: { name: "L-1 (사내 전근)", desc: "동일 회사 내 임원/관리자 전근용" },
      },
      {
        en: { name: "O-1 (Extraordinary Ability)", desc: "For individuals with extraordinary talent" },
        ko: { name: "O-1 (특기자)", desc: "특출한 재능을 가진 개인용" },
      },
      {
        en: { name: "EB-5 (Investor)", desc: "Investment-based green card — $1.05M minimum" },
        ko: { name: "EB-5 (투자자)", desc: "투자 기반 영주권 — 최소 $1.05M" },
      },
    ],
    tips: {
      en: [
        "LA port is the most common entry for Korea → USA moves. Plan for 3–5 day truck transit to the East Coast.",
        "Hire a licensed US customs broker — they handle CBP clearance and can save significant time.",
        "State taxes apply differently — research your destination state before committing.",
        "Korean communities are concentrated in LA (Koreatown), NYC, and New Jersey.",
        "US power is 110V/60Hz — Korean appliances (220V) require transformers.",
      ],
      ko: [
        "LA 항구가 한국→미국 이사의 가장 일반적인 입항지입니다. 동부해안까지 트럭 이동 3~5일 추가 소요.",
        "미국 통관 전문가(브로커)를 고용하세요 — CBP 통관 처리로 시간을 크게 절약할 수 있습니다.",
        "주별 세금이 다릅니다 — 목적지 주를 사전에 조사하세요.",
        "한인 커뮤니티가 LA(코리아타운), 뉴욕, 뉴저지에 밀집해 있습니다.",
        "미국 전압은 110V/60Hz입니다 — 한국 가전제품(220V)은 변압기가 필요합니다.",
      ],
    },
    avgMoveCost: "₩2,500,000 – ₩3,500,000 (LCL/FCL, 10–15 CBM)",
    surcharge: false,
  },
  canada: {
    name: "Canada", flag: "🇨🇦", capital: "Ottawa",
    currency: "CAD", timezone: "ET/CT/MT/PT",
    transitTime: { en: "18–24 days (Vancouver), 25–32 days (Toronto)", ko: "밴쿠버 18~24일, 토론토 25~32일" },
    ports: ["Vancouver", "Montreal", "Halifax"],
    difficulty: "easy",
    summary: {
      en: "Canada is one of the easiest countries to import household goods into. The CBSA (Canada Border Services Agency) processes moves efficiently. Returning Canadian residents and new immigrants get significant duty exemptions.",
      ko: "캐나다는 가정용품을 반입하기 가장 쉬운 국가 중 하나입니다. CBSA(캐나다 국경서비스청)가 효율적으로 처리합니다. 귀국 거주자와 신규 이민자는 상당한 관세 면제 혜택을 받습니다.",
    },
    customs: [
      {
        en: { item: "Settler's effects (new immigrants)", rule: "Duty/tax-free for items owned before arriving in Canada" },
        ko: { item: "이민자 이사 화물", rule: "캐나다 도착 전 소유한 물품에 대해 관세·세금 면제" },
      },
      {
        en: { item: "Returning residents (abroad 1+ year)", rule: "CAD $10,000 exemption on personal goods" },
        ko: { item: "귀국 거주자 (1년 이상 해외 체류)", rule: "개인 물품 CAD $10,000 면제" },
      },
      {
        en: { item: "Alcohol", rule: "Provincial limits apply — typically 1.14L spirits or 1.5L wine" },
        ko: { item: "주류", rule: "주별 한도 적용 — 일반적으로 스피리츠 1.14L 또는 와인 1.5L" },
      },
      {
        en: { item: "Gifts", rule: "Up to CAD $60 per gift, duty-free" },
        ko: { item: "선물", rule: "선물당 CAD $60까지 면세" },
      },
      {
        en: { item: "Vehicles", rule: "Eligible vehicles: manufactured in USA/Canada after import reform" },
        ko: { item: "차량", rule: "적격 차량: 수입 개혁 이후 미국/캐나다 제조 차량" },
      },
    ],
    prohibited: {
      en: ["Weapons without permit", "Certain food items", "Endangered species", "Hate material"],
      ko: ["허가 없는 무기", "특정 식품류", "멸종위기종", "혐오 자료"],
    },
    visaTypes: [
      {
        en: { name: "Express Entry (Federal Skilled Worker)", desc: "Points-based permanent residency" },
        ko: { name: "익스프레스 엔트리 (연방 기술 노동자)", desc: "점수 기반 영주권" },
      },
      {
        en: { name: "Provincial Nominee Program (PNP)", desc: "Province-specific nomination pathways" },
        ko: { name: "주정부 추천 프로그램 (PNP)", desc: "주별 특정 추천 경로" },
      },
      {
        en: { name: "International Mobility Program", desc: "CUSMA/USMCA work permits for eligible professions" },
        ko: { name: "국제 이동성 프로그램", desc: "적격 직종을 위한 CUSMA/USMCA 취업 허가" },
      },
      {
        en: { name: "Start-up Visa", desc: "For entrepreneurs with Canadian VC/incubator backing" },
        ko: { name: "스타트업 비자", desc: "캐나다 VC/인큐베이터 지원을 받은 창업가용" },
      },
    ],
    tips: {
      en: [
        "Vancouver is the fastest port from Korea. Toronto shipments come via Vancouver with rail transfer.",
        "Canada uses a points-based immigration system — file for PR before or during the shipping process.",
        "Korean communities are strong in Vancouver (Richmond, Burnaby) and Toronto (North York).",
        "Canada uses 110V/60Hz — same as USA. Korean 220V appliances need converters.",
        "Winter shipping can cause delays — avoid November–February if possible.",
      ],
      ko: [
        "밴쿠버가 한국에서 가장 빠른 항구입니다. 토론토 화물은 밴쿠버 경유 철도 이송됩니다.",
        "캐나다는 점수 기반 이민 제도를 사용합니다 — 운송 전이나 과정 중에 영주권을 신청하세요.",
        "한인 커뮤니티가 밴쿠버(리치먼드, 버나비)와 토론토(노스요크)에 밀집해 있습니다.",
        "캐나다 전압은 110V/60Hz입니다 — 미국과 동일. 한국 220V 가전제품은 변압기 필요.",
        "겨울 운송은 지연될 수 있습니다 — 가능하면 11월~2월을 피하세요.",
      ],
    },
    avgMoveCost: "₩2,600,000 – ₩3,400,000 (LCL/FCL, 10–15 CBM)",
    surcharge: false,
  },
};

const DIFFICULTY_COLOR: Record<string, string> = {
  easy: "bg-green-100 text-green-700",
  moderate: "bg-yellow-100 text-yellow-700",
  hard: "bg-red-100 text-red-700",
};

const DIFFICULTY_LABEL: Record<string, { en: string; ko: string }> = {
  easy: { en: "Easy Customs", ko: "통관 쉬움" },
  moderate: { en: "Moderate Customs", ko: "통관 보통" },
  hard: { en: "Strict Customs", ko: "통관 엄격" },
};

export default function CountryPage({ params }: { params: Promise<{ country: string }> }) {
  const { lang } = useLanguage();
  const resolvedCountry = (params as unknown as { country: string }).country;
  const data = COUNTRY_DATA[resolvedCountry.toLowerCase()] ?? COUNTRY_DATA["australia"];

  const labels = {
    breadcrumb: lang === "ko" ? "목적지" : "Destinations",
    movingTo: lang === "ko" ? `${data.name}으로 이사` : `Moving to ${data.name}`,
    overview: lang === "ko" ? "개요" : "Overview",
    customsRules: lang === "ko" ? "통관 규정" : "Customs Rules",
    prohibited: lang === "ko" ? "반입 금지 품목" : "Prohibited Items",
    visaTypes: lang === "ko" ? "주요 비자 종류" : "Common Visa Types",
    tips: lang === "ko" ? "💡 이사 팁" : "💡 Moving Tips",
    readyToMove: lang === "ko" ? `${data.name}으로 이사 준비가 됐나요?` : `Ready to move to ${data.name}?`,
    getQuotes: lang === "ko"
      ? `한국 → ${data.name} 노선 전문 업체 견적을 받아보세요.`
      : `Get quotes from vendors specialized in the Korea → ${data.name} route.`,
    freeQuotes: lang === "ko" ? "무료 견적 받기" : "Get Free Quotes",
    quickFacts: lang === "ko" ? "빠른 정보" : "Quick Facts",
    flag: lang === "ko" ? "국기" : "Flag",
    capital: lang === "ko" ? "수도" : "Capital",
    currency: lang === "ko" ? "통화" : "Currency",
    transitTime: lang === "ko" ? "운송 기간" : "Transit Time",
    avgMoveCost: lang === "ko" ? "평균 이사 비용" : "Avg. Move Cost",
    customsDiff: lang === "ko" ? "통관 난이도" : "Customs Difficulty",
    surcharge: lang === "ko" ? "특별 할증료" : "Special Surcharge",
    surchargeYes: "⚠️ Yes",
    surchargeNo: "✓ No",
    entryPorts: lang === "ko" ? "입항 항구" : "Entry Ports",
    otherDest: lang === "ko" ? "다른 목적지" : "Other Destinations",
    viewAll: lang === "ko" ? "전체 목적지 보기 →" : "View all destinations →",
  };

  return (
    <div className="min-h-screen flex flex-col pb-16 md:pb-0">
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
            <Link href="/vendors" className="hover:text-white">{labels.breadcrumb}</Link>
            <span>›</span>
            <span className="text-white">{data.name}</span>
          </div>
          <div className="flex items-start gap-5">
            <span className="text-6xl">{data.flag}</span>
            <div>
              <h1 className="text-4xl font-bold mb-2">{labels.movingTo}</h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-300">
                <span>✈️ {typeof data.transitTime === "object" ? data.transitTime[lang] ?? data.transitTime.en : data.transitTime}</span>
                <span>·</span>
                <span>💱 {data.currency}</span>
                <span>·</span>
                <span>🕐 {data.timezone}</span>
                <span>·</span>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${DIFFICULTY_COLOR[data.difficulty]}`}>
                  {DIFFICULTY_LABEL[data.difficulty]?.[lang] ?? data.difficulty}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="flex-1 bg-gray-50 py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-5">

              {/* Summary */}
              <Card>
                <h2 className="font-semibold text-gray-900 mb-3">{labels.overview}</h2>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {typeof data.summary === "object" ? data.summary[lang] ?? data.summary.en : data.summary}
                </p>
              </Card>

              {/* Customs Rules */}
              <Card>
                <h2 className="font-semibold text-gray-900 mb-4">{labels.customsRules}</h2>
                <div className="divide-y divide-gray-100">
                  {data.customs.map((c: any, i: number) => {
                    const entry = typeof c.en === "object" ? (lang === "ko" ? c.ko : c.en) : c;
                    return (
                      <div key={i} className="py-3 flex gap-3">
                        <span className="w-5 h-5 bg-primary-50 text-primary text-xs rounded flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">i</span>
                        <div>
                          <p className="text-sm font-medium text-gray-800">{entry.item}</p>
                          <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{entry.rule}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>

              {/* Prohibited */}
              <Card>
                <h2 className="font-semibold text-gray-900 mb-4">{labels.prohibited}</h2>
                <div className="grid sm:grid-cols-2 gap-2">
                  {(typeof data.prohibited === "object" && !Array.isArray(data.prohibited)
                    ? (data.prohibited[lang] ?? data.prohibited.en)
                    : data.prohibited
                  ).map((p: string, i: number) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-gray-600 py-1.5">
                      <span className="w-4 h-4 bg-red-100 text-red-500 rounded text-xs flex items-center justify-center flex-shrink-0">✕</span>
                      {p}
                    </div>
                  ))}
                </div>
              </Card>

              {/* Visa Types */}
              <Card>
                <h2 className="font-semibold text-gray-900 mb-4">{labels.visaTypes}</h2>
                <div className="space-y-3">
                  {data.visaTypes.map((v: any, i: number) => {
                    const entry = typeof v.en === "object" ? (lang === "ko" ? v.ko : v.en) : v;
                    return (
                      <div key={i} className="flex gap-3 py-2 border-b border-gray-50 last:border-0">
                        <div className="w-8 h-8 bg-primary-50 text-primary rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0">
                          {i + 1}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{entry.name}</p>
                          <p className="text-xs text-gray-500">{entry.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>

              {/* Tips */}
              <Card>
                <h2 className="font-semibold text-gray-900 mb-4">{labels.tips}</h2>
                <ul className="space-y-3">
                  {(typeof data.tips === "object" && !Array.isArray(data.tips)
                    ? (data.tips[lang] ?? data.tips.en)
                    : data.tips
                  ).map((tip: string, i: number) => (
                    <li key={i} className="flex gap-3 text-sm text-gray-600">
                      <span className="text-primary font-bold flex-shrink-0">→</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              <Card className="bg-primary text-white border-primary">
                <p className="font-semibold mb-1">{labels.readyToMove}</p>
                <p className="text-primary-100 text-xs mb-4 leading-relaxed">{labels.getQuotes}</p>
                <Link href="/quote/new"
                  className="block text-center py-2.5 bg-white text-primary font-semibold rounded-xl hover:bg-primary-50 transition-colors text-sm">
                  {labels.freeQuotes}
                </Link>
              </Card>

              <Card>
                <h3 className="text-sm font-semibold text-gray-700 mb-4">{labels.quickFacts}</h3>
                <div className="space-y-3 text-sm">
                  {[
                    [labels.flag, data.flag],
                    [labels.capital, data.capital],
                    [labels.currency, data.currency],
                    [labels.transitTime, typeof data.transitTime === "object" ? data.transitTime[lang] ?? data.transitTime.en : data.transitTime],
                    [labels.avgMoveCost, data.avgMoveCost],
                    [labels.customsDiff, <span key="diff" className={`px-2 py-0.5 rounded-full text-xs font-semibold ${DIFFICULTY_COLOR[data.difficulty]}`}>{DIFFICULTY_LABEL[data.difficulty]?.[lang]}</span>],
                    [labels.surcharge, data.surcharge ? labels.surchargeYes : labels.surchargeNo],
                  ].map(([k, v]) => (
                    <div key={String(k)} className="flex justify-between items-center py-1.5 border-b border-gray-50 last:border-0">
                      <span className="text-gray-500">{k}</span>
                      <span className="font-medium text-gray-800 text-right">{v as any}</span>
                    </div>
                  ))}
                </div>
              </Card>

              <Card>
                <h3 className="text-sm font-semibold text-gray-700 mb-3">{labels.entryPorts}</h3>
                <div className="space-y-1.5">
                  {data.ports.map((port: string) => (
                    <div key={port} className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="text-primary">⚓</span> {port}
                    </div>
                  ))}
                </div>
              </Card>

              <Card>
                <h3 className="text-sm font-semibold text-gray-700 mb-3">{labels.otherDest}</h3>
                <div className="space-y-1">
                  {["australia","usa","canada"].filter((c) => c !== resolvedCountry.toLowerCase()).map((c) => (
                    <Link key={c} href={`/countries/${c}`}
                      className="flex items-center justify-between py-2 text-sm text-gray-600 hover:text-primary transition-colors">
                      <span>{COUNTRY_DATA[c]?.flag} {COUNTRY_DATA[c]?.name}</span>
                      <span className="text-gray-300">›</span>
                    </Link>
                  ))}
                  <Link href="/vendors" className="block mt-2 text-xs text-primary hover:underline">{labels.viewAll}</Link>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
