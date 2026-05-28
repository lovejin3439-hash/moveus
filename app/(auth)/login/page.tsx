"use client";

import { useState } from "react";
import { signIn, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import Logo from "@/components/ui/Logo";

export default function LoginPage() {
  const router = useRouter();
  const { t, lang } = useLanguage();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false,
    });

    if (result?.ok) {
      // Fetch session to read role, then redirect accordingly
      const session = await getSession();
      const role = (session?.user as any)?.role;
      if (role === "CORPORATE") {
        router.push("/corporate/dashboard");
      } else if (role === "VENDOR") {
        router.push("/vendor/dashboard");
      } else {
        router.push("/");
      }
      router.refresh();
    } else {
      setError(
        lang === "ko"
          ? "이메일 또는 비밀번호가 올바르지 않습니다. 아래 데모 계정을 이용해보세요."
          : "Invalid email or password. Try the demo accounts below."
      );
      setLoading(false);
    }
  };

  const quickFill = (email: string, password: string) => {
    setForm({ email, password });
    setError("");
  };

  return (
    <div className="min-h-screen flex">
      {/* Left panel — hero */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 text-white relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0A32A8 0%, #1553F0 50%, #1A6AFF 100%)" }}>
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-0 w-60 h-60 bg-white/5 rounded-full blur-3xl" />

        {/* Logo */}
        <Link href="/" className="relative z-10">
          <Logo size={36} variant="light" />
        </Link>

        {/* Center content */}
        <div className="relative z-10">
          <p className="text-5xl font-black leading-tight mb-6">
            {lang === "ko" ? (
              <>국제이사를<br /><span style={{ color: "#FFD600" }}>자신 있게.</span></>
            ) : (
              <>Move internationally<br /><span style={{ color: "#FFD600" }}>with confidence.</span></>
            )}
          </p>
          <p className="text-white/70 text-lg leading-relaxed mb-8">
            {lang === "ko"
              ? "투명한 견적, 디지털 계약, 실시간 화물 추적 — 모두 한 플랫폼에서."
              : "Transparent quotes, digital contracts, and real-time shipment tracking — all in one place."}
          </p>

          {/* Social proof */}
          <div className="flex items-center gap-4">
            <div className="flex -space-x-2">
              {["S", "J", "E", "K"].map((a, i) => (
                <div key={i} className="w-9 h-9 rounded-full bg-white/20 border-2 border-white/30 flex items-center justify-center text-xs font-bold">
                  {a}
                </div>
              ))}
            </div>
            <div>
              <p className="text-sm font-semibold">
                {lang === "ko" ? "2,400건 이상 이사 완료" : "2,400+ moves completed"}
              </p>
              <p className="text-white/60 text-xs">★★★★★ 4.9 {lang === "ko" ? "평균 평점" : "average rating"}</p>
            </div>
          </div>
        </div>

        {/* Bottom quote */}
        <div className="relative z-10 bg-white/10 rounded-2xl p-5 backdrop-blur-sm border border-white/20">
          <p className="text-sm italic text-white/90 leading-relaxed">
            {lang === "ko"
              ? "\"MoveUs 덕분에 서울 → 시드니 이사가 정말 수월했어요. 실시간 추적으로 걱정 없이 기다릴 수 있었습니다.\""
              : "\"MoveUs made our Seoul → Sydney move incredibly smooth. Real-time tracking gave us so much peace of mind.\""}
          </p>
          <div className="flex items-center gap-2 mt-3">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold">S</div>
            <div>
              <p className="text-xs font-semibold">{lang === "ko" ? "김민준" : "Kim Min-jun"}</p>
              <p className="text-xs text-white/50">{lang === "ko" ? "서울 → 시드니, 2026" : "Seoul → Sydney, 2026"}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center py-12 px-6 bg-gray-50">
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <div className="lg:hidden text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2 mb-2">
              <Logo size={34} variant="dark" />
            </Link>
          </div>

          <div className="mb-8">
            <h1 className="text-2xl font-extrabold text-gray-900">{t("login.title")}</h1>
            <p className="text-gray-500 text-sm mt-1.5">
              {t("login.subtitle")}{" "}
              <Link href="/signup" className="text-primary hover:underline font-semibold">{t("login.signUp")}</Link>
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-7">
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label={t("login.email")}
                type="email"
                placeholder="you@example.com"
                required
                autoComplete="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />

              <div className="space-y-1">
                <Input
                  label={t("login.password")}
                  type="password"
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
                <div className="flex justify-end">
                  <Link href="/forgot-password" className="text-xs text-primary hover:underline">
                    {t("login.forgotPassword")}
                  </Link>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl flex items-start gap-2">
                  <span className="text-base leading-none mt-0.5">⚠️</span>
                  <span>{error}</span>
                </div>
              )}

              <Button type="submit" size="lg" className="w-full" loading={loading}>
                {t("login.signIn")} →
              </Button>
            </form>

            {/* Demo accounts */}
            <div className="mt-6 pt-5 border-t border-gray-100">
              <p className="text-xs font-semibold text-gray-400 text-center mb-3 uppercase tracking-wide">
                {t("login.demoTitle")}
              </p>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => quickFill("customer@demo.com", "demo1234")}
                  className="flex flex-col items-center gap-1 py-3 px-2 bg-gray-50 border border-gray-200 rounded-xl text-gray-600 hover:bg-primary-50 hover:border-primary-200 hover:text-primary transition-all"
                >
                  <span className="text-xl">🏠</span>
                  <span className="text-xs font-semibold">{t("login.customerDemo")}</span>
                  <span className="text-[10px] text-gray-400">customer@</span>
                </button>
                <button
                  type="button"
                  onClick={() => quickFill("vendor@demo.com", "demo1234")}
                  className="flex flex-col items-center gap-1 py-3 px-2 bg-gray-50 border border-gray-200 rounded-xl text-gray-600 hover:bg-primary-50 hover:border-primary-200 hover:text-primary transition-all"
                >
                  <span className="text-xl">🚢</span>
                  <span className="text-xs font-semibold">{t("login.vendorDemo")}</span>
                  <span className="text-[10px] text-gray-400">vendor@</span>
                </button>
                <button
                  type="button"
                  onClick={() => quickFill("corporate@demo.com", "demo1234")}
                  className="flex flex-col items-center gap-1 py-3 px-2 bg-gray-50 border border-gray-200 rounded-xl text-gray-600 hover:bg-slate-100 hover:border-slate-300 hover:text-slate-700 transition-all"
                >
                  <span className="text-xl">🏢</span>
                  <span className="text-xs font-semibold">{t("login.corporateDemo")}</span>
                  <span className="text-[10px] text-gray-400">corporate@</span>
                </button>
              </div>
              <p className="text-[10px] text-gray-400 text-center mt-2">
                {t("login.demoPasswordHint")} <span className="font-bold text-gray-500">demo1234</span>
              </p>
            </div>
          </div>

          <p className="text-xs text-center text-gray-400 mt-6">
            {lang === "ko" ? (
              <>로그인 시 <Link href="/terms" className="hover:underline">이용약관</Link> 및 <Link href="/privacy" className="hover:underline">개인정보처리방침</Link>에 동의합니다.</>
            ) : (
              <>By logging in you agree to our <Link href="/terms" className="hover:underline">Terms</Link> &amp; <Link href="/privacy" className="hover:underline">Privacy Policy</Link></>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
