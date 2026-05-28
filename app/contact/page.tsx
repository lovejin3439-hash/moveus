"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { useToast } from "@/components/ui/Toast";

const TOPICS_EN = ["General Inquiry", "Quote Help", "Vendor Partnership", "Corporate Services", "Technical Issue", "Other"];
const TOPICS_KO = ["일반 문의", "견적 도움", "업체 파트너십", "기업 서비스", "기술 문제", "기타"];

const CONTACT_ITEMS = [
  { icon: "📧", labelEn: "Email",         labelKo: "이메일",     value: "hello@moveus.io",  sub: null },
  { icon: "💬", labelEn: "KakaoTalk",     labelKo: "카카오톡",   value: "@moveease",          sub: null },
  { icon: "📞", labelEn: "Phone",         labelKo: "전화",       value: "1833-MOVE",          sub: "Mon–Fri 9am–6pm KST" },
  { icon: "🏢", labelEn: "HQ",            labelKo: "본사",       value: "서울 강남구 테헤란로 123",  sub: "Seoul, Korea" },
];

export default function ContactPage() {
  const { lang } = useLanguage();
  const toast = useToast();

  const [form, setForm] = useState({ name: "", email: "", topic: "", message: "" });
  const [loading, setLoading] = useState(false);

  const topics = lang === "ko" ? TOPICS_KO : TOPICS_EN;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setForm({ name: "", email: "", topic: "", message: "" });
    toast.success(
      lang === "ko" ? "문의가 접수됐습니다! 🎉" : "Message sent! 🎉",
      lang === "ko" ? "1–2 영업일 내에 답변 드리겠습니다." : "We'll get back to you within 1–2 business days."
    );
  };

  return (
    <div className="min-h-screen flex flex-col pb-16 md:pb-0">
      <Header />

      {/* Hero */}
      <section
        className="relative overflow-hidden text-white py-20"
        style={{ background: "linear-gradient(135deg, #0A32A8 0%, #1553F0 50%, #1A6AFF 100%)" }}
      >
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{
          backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }} />
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            {lang === "ko" ? <>무엇이든 <span style={{ color: "#FFD600" }}>물어보세요</span></> : <>Get in <span style={{ color: "#FFD600" }}>Touch</span></>}
          </h1>
          <p className="text-white/80 text-lg">
            {lang === "ko"
              ? "이사 관련 질문, 업체 파트너십, 기업 서비스 문의 등 무엇이든 알려주세요."
              : "Questions about moving, vendor partnerships, or corporate services — we're here to help."}
          </p>
        </div>
      </section>

      <section className="py-16 bg-white flex-1">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-10">

            {/* Contact Info */}
            <div className="space-y-5">
              <h2 className="text-xl font-black text-gray-900">
                {lang === "ko" ? "연락 방법" : "Contact Info"}
              </h2>
              {CONTACT_ITEMS.map((item) => (
                <div key={item.labelEn} className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                    style={{ background: "#EEF2FF" }}>
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500">{lang === "ko" ? item.labelKo : item.labelEn}</p>
                    <p className="text-sm font-bold text-gray-900">{item.value}</p>
                    {item.sub && <p className="text-xs text-gray-400">{item.sub}</p>}
                  </div>
                </div>
              ))}

              {/* FAQ shortcut */}
              <div className="mt-6 p-4 rounded-2xl border-2" style={{ borderColor: "#E0E9FF", background: "#F5F7FF" }}>
                <p className="text-sm font-bold text-gray-900 mb-1">
                  {lang === "ko" ? "자주 묻는 질문" : "Quick Answers"}
                </p>
                <p className="text-xs text-gray-500 mb-3">
                  {lang === "ko"
                    ? "대부분의 질문은 FAQ에서 바로 해결됩니다."
                    : "Most questions are answered in our FAQ."}
                </p>
                <a
                  href="/how-it-works"
                  className="text-xs font-bold hover:underline"
                  style={{ color: "#1553F0" }}
                >
                  {lang === "ko" ? "FAQ 보러가기 →" : "See FAQ →"}
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <h2 className="text-xl font-black text-gray-900 mb-6">
                {lang === "ko" ? "메시지 보내기" : "Send a Message"}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                      {lang === "ko" ? "이름 *" : "Name *"}
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder={lang === "ko" ? "홍길동" : "Your name"}
                      className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-gray-50 focus:bg-white transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                      {lang === "ko" ? "이메일 *" : "Email *"}
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="you@example.com"
                      className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-gray-50 focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                    {lang === "ko" ? "문의 유형" : "Topic"}
                  </label>
                  <select
                    value={form.topic}
                    onChange={(e) => setForm({ ...form, topic: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-gray-50 focus:bg-white transition-all"
                  >
                    <option value="">{lang === "ko" ? "선택하세요" : "Select a topic"}</option>
                    {topics.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                    {lang === "ko" ? "내용 *" : "Message *"}
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder={lang === "ko" ? "문의 내용을 입력해주세요..." : "Tell us how we can help..."}
                    className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary resize-none bg-gray-50 focus:bg-white transition-all"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading || !form.name || !form.email || !form.message}
                  className="w-full py-3.5 rounded-xl font-black text-white text-sm transition-all hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  style={{ background: loading ? "#94AFFF" : "#1553F0" }}
                >
                  {loading
                    ? (lang === "ko" ? "전송 중..." : "Sending...")
                    : (lang === "ko" ? "메시지 보내기 →" : "Send Message →")}
                </button>

                <p className="text-xs text-gray-400 text-center">
                  {lang === "ko"
                    ? "1–2 영업일 내에 이메일로 답변 드립니다."
                    : "We typically respond within 1–2 business days."}
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
