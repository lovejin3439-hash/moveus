"use client";

import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const TEAM = [
  { name: "김도현",    nameEn: "Dohyun Kim",    role: "CEO & Co-founder",   roleKo: "CEO 및 공동 창업자",     emoji: "👨‍💼", bg: "from-blue-50 to-indigo-50" },
  { name: "이수진",    nameEn: "Sujin Lee",     role: "CTO & Co-founder",   roleKo: "CTO 및 공동 창업자",     emoji: "👩‍💻", bg: "from-violet-50 to-purple-50" },
  { name: "박준호",    nameEn: "Junho Park",    role: "Head of Operations", roleKo: "운영 총괄",              emoji: "⚙️",  bg: "from-amber-50 to-orange-50" },
  { name: "최예린",    nameEn: "Yerin Choi",    role: "Head of Product",    roleKo: "프로덕트 총괄",           emoji: "🎨",  bg: "from-rose-50 to-pink-50" },
];

const MILESTONES = [
  { year: "2022", eventEn: "MoveUs founded in Seoul, Korea", eventKo: "서울에서 MoveUs 창업" },
  { year: "2023", eventEn: "First 500 moves completed, 12 certified vendors", eventKo: "이사 500건 완료, 인증 업체 12개 확보" },
  { year: "2024", eventEn: "Expanded to 30+ countries, launched corporate portal", eventKo: "30개국 이상으로 확장, 기업 포털 출시" },
  { year: "2025", eventEn: "2,000+ moves, ISO 9001 vendor network established", eventKo: "이사 2,000건 돌파, ISO 9001 업체 네트워크 구축" },
  { year: "2026", eventEn: "2,400+ moves · 45+ vendors · 98% satisfaction", eventKo: "이사 2,400건 이상 · 업체 45개 이상 · 만족도 98%" },
];

const VALUES = [
  { icon: "🔒", titleEn: "Radical Transparency",    titleKo: "완전한 투명성",   descEn: "No hidden fees, no surprise charges. Every price is agreed and locked in the contract.",       descKo: "숨겨진 수수료, 예상치 못한 청구 없음. 모든 금액은 계약서에 명시됩니다." },
  { icon: "🛡️", titleEn: "Customer Protection",     titleKo: "고객 보호",       descEn: "Platform-only insurance, e-contracts, and a dedicated disputes team protect every move.",        descKo: "플랫폼 전용 보험, 전자계약, 전담 분쟁 처리팀이 모든 이사를 보호합니다." },
  { icon: "⚡", titleEn: "Digital First",            titleKo: "디지털 우선",     descEn: "From quote to delivery — everything happens digitally. No printing, no fax, no phone calls.", descKo: "견적부터 배달까지 모든 것이 디지털로. 출력, 팩스, 전화 통화 없음." },
  { icon: "🌏", titleEn: "Global Network",           titleKo: "글로벌 네트워크", descEn: "45+ vetted vendors across 30+ countries, each manually verified by our team.",                   descKo: "30개국 이상, 45개 이상의 검증된 업체. 모두 팀이 직접 심사합니다." },
];

export default function AboutPage() {
  const { lang } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col pb-16 md:pb-0">
      <Header />

      {/* Hero */}
      <section
        className="relative overflow-hidden text-white py-24"
        style={{ background: "linear-gradient(135deg, #0A32A8 0%, #1553F0 50%, #1A6AFF 100%)" }}
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-10"
            style={{ background: "radial-gradient(circle, #fff 0%, transparent 70%)" }} />
          <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full opacity-10"
            style={{ background: "radial-gradient(circle, #fff 0%, transparent 70%)" }} />
          <div className="absolute inset-0 opacity-[0.05]" style={{
            backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }} />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/15 border border-white/25 rounded-full px-4 py-1.5 text-sm mb-6">
            <span className="w-2 h-2 bg-yellow-300 rounded-full animate-pulse" />
            {lang === "ko" ? "MoveUs 소개" : "About MoveUs"}
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
            {lang === "ko" ? (
              <>국제이사를<br /><span style={{ color: "#FFD600" }}>다시 설계하다</span></>
            ) : (
              <>Reinventing<br /><span style={{ color: "#FFD600" }}>International Moving</span></>
            )}
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto leading-relaxed">
            {lang === "ko"
              ? "MoveUs는 국제이사의 복잡함과 불투명함을 없애기 위해 만들어졌습니다. 디지털 기술로 모든 과정을 단순하고 투명하게."
              : "MoveUs was built to eliminate the complexity and opacity of international moving. We make every step simple, digital, and transparent."}
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-primary mb-3 block">
                {lang === "ko" ? "우리의 미션" : "Our Mission"}
              </span>
              <h2 className="text-4xl font-black text-gray-900 mb-5 leading-tight">
                {lang === "ko"
                  ? "국제이사, 더 이상 어렵지 않아야 합니다"
                  : "International moving shouldn't be this hard"}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                {lang === "ko"
                  ? "해외로 이사하는 일은 인생에서 가장 큰 결정 중 하나입니다. 그런데 왜 그 과정은 여전히 불투명하고, 비효율적이며, 스트레스로 가득할까요?"
                  : "Moving abroad is one of life's biggest decisions. Yet the process remains opaque, inefficient, and full of anxiety. Why?"}
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                {lang === "ko"
                  ? "MoveUs는 이 문제를 해결하기 위해 탄생했습니다. 견적 비교부터 전자계약, 실시간 화물 추적까지 — 모든 것이 하나의 플랫폼에서."
                  : "MoveUs was founded to solve this. From quote comparison to e-contracts, real-time tracking — everything in one platform."}
              </p>
              <div className="flex gap-4">
                <Link
                  href="/quote/new"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white text-sm transition-all hover:shadow-lg hover:-translate-y-0.5"
                  style={{ background: "#1553F0" }}
                >
                  {lang === "ko" ? "지금 시작하기" : "Get Started"}
                </Link>
                <Link
                  href="/how-it-works"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-gray-200 font-bold text-gray-700 text-sm hover:border-primary hover:text-primary transition-all"
                >
                  {lang === "ko" ? "서비스 알아보기" : "How It Works"}
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "2,400+", labelEn: "Moves Completed",   labelKo: "완료된 이사",    color: "text-primary" },
                { value: "98%",    labelEn: "Satisfaction Rate",  labelKo: "고객 만족도",    color: "text-emerald-500" },
                { value: "45+",    labelEn: "Certified Vendors",  labelKo: "인증된 업체",    color: "text-violet-500" },
                { value: "30+",    labelEn: "Countries Covered",  labelKo: "서비스 국가",    color: "text-amber-500" },
              ].map((s) => (
                <div key={s.labelEn} className="bg-gray-50 rounded-2xl p-6 text-center border border-gray-100">
                  <p className={`text-4xl font-black mb-1 ${s.color}`}>{s.value}</p>
                  <p className="text-xs text-gray-500 font-medium">{lang === "ko" ? s.labelKo : s.labelEn}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20" style={{ background: "#F5F7FF" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-primary mb-3 block">
              {lang === "ko" ? "우리의 가치" : "Our Values"}
            </span>
            <h2 className="text-4xl font-black text-gray-900">
              {lang === "ko" ? "우리가 중요하게 생각하는 것" : "What We Stand For"}
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {VALUES.map((v) => (
              <div key={v.titleEn} className="bg-white rounded-2xl p-6 border border-gray-100 flex gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                  style={{ background: "#EEF2FF" }}>
                  {v.icon}
                </div>
                <div>
                  <h3 className="font-black text-gray-900 mb-1.5">{lang === "ko" ? v.titleKo : v.titleEn}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{lang === "ko" ? v.descKo : v.descEn}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-primary mb-3 block">
              {lang === "ko" ? "성장 이야기" : "Our Journey"}
            </span>
            <h2 className="text-4xl font-black text-gray-900">
              {lang === "ko" ? "MoveUs의 발자취" : "Building MoveUs"}
            </h2>
          </div>
          <div className="relative">
            <div className="absolute left-[19px] top-0 bottom-0 w-0.5 bg-gray-100" />
            <div className="space-y-8">
              {MILESTONES.map((m, i) => (
                <div key={m.year} className="flex gap-5 items-start">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-xs flex-shrink-0 z-10 ${
                    i === MILESTONES.length - 1
                      ? "text-white shadow-lg"
                      : "border-2 border-gray-100 text-gray-400 bg-white"
                  }`}
                    style={i === MILESTONES.length - 1 ? { background: "#1553F0" } : {}}>
                    {i === MILESTONES.length - 1 ? "★" : m.year.slice(2)}
                  </div>
                  <div className="flex-1 pb-2">
                    <p className="text-xs font-bold text-primary mb-0.5">{m.year}</p>
                    <p className="text-gray-700 text-sm font-medium leading-relaxed">
                      {lang === "ko" ? m.eventKo : m.eventEn}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20" style={{ background: "#F5F7FF" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-primary mb-3 block">
              {lang === "ko" ? "팀" : "Team"}
            </span>
            <h2 className="text-4xl font-black text-gray-900">
              {lang === "ko" ? "MoveUs를 만드는 사람들" : "The People Behind MoveUs"}
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {TEAM.map((member) => (
              <div key={member.nameEn} className="bg-white rounded-2xl p-6 border border-gray-100 text-center hover:shadow-md transition-all">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${member.bg} flex items-center justify-center text-3xl mx-auto mb-4 border border-gray-100`}>
                  {member.emoji}
                </div>
                <p className="font-black text-gray-900">{lang === "ko" ? member.name : member.nameEn}</p>
                <p className="text-xs text-gray-500 mt-1">{lang === "ko" ? member.roleKo : member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-white"
        style={{ background: "linear-gradient(135deg, #0A32A8 0%, #1553F0 100%)" }}>
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-black mb-4">
            {lang === "ko" ? "함께 시작할 준비가 됐나요?" : "Ready to move with us?"}
          </h2>
          <p className="text-white/80 mb-8 text-lg">
            {lang === "ko"
              ? "무료 견적을 받고 국제이사의 새로운 기준을 경험하세요."
              : "Get a free quote and experience a new standard for international moving."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/quote/new"
              className="inline-flex items-center justify-center px-8 py-4 font-black rounded-xl text-base transition-all hover:shadow-2xl hover:-translate-y-0.5"
              style={{ background: "#FFD600", color: "#0A32A8" }}>
              {lang === "ko" ? "무료 견적 받기" : "Get Free Quotes"}
            </Link>
            <Link href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/40 text-white font-bold rounded-xl hover:bg-white/10 transition-colors">
              {lang === "ko" ? "문의하기" : "Contact Us"}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
