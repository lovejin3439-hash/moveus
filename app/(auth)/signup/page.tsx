"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import Button from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import Logo from "@/components/ui/Logo";

type Role = "CUSTOMER" | "VENDOR";

export default function SignupPage() {
  const router = useRouter();
  const params = useSearchParams();
  const { t, tArr, lang } = useLanguage();
  const [role, setRole] = useState<Role>((params.get("role") as Role) ?? "CUSTOMER");
  const [form, setForm] = useState({ name: "", email: "", password: "", companyName: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, role }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error ?? (lang === "ko" ? "가입에 실패했습니다. 다시 시도해주세요." : "Registration failed. Try again."));
      setLoading(false);
      return;
    }

    const result = await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false,
    });

    if (result?.ok) {
      router.push(role === "VENDOR" ? "/vendor/dashboard" : "/quote/new");
    } else {
      setError(lang === "ko" ? "계정이 생성됐지만 로그인에 실패했습니다. 로그인 페이지를 이용해주세요." : "Account created but sign-in failed. Try logging in.");
      setLoading(false);
    }
  };

  const BENEFITS = {
    CUSTOMER: tArr("signup.benefitsCustomer"),
    VENDOR: tArr("signup.benefitsVendor"),
  };

  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 text-white relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0A32A8 0%, #1553F0 50%, #1A6AFF 100%)" }}>
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-0 w-60 h-60 bg-white/5 rounded-full blur-3xl" />

        {/* Logo */}
        <Link href="/" className="relative z-10">
          <Logo size={36} variant="light" />
        </Link>

        {/* Role benefits */}
        <div className="relative z-10">
          <div className="flex bg-white/10 rounded-xl p-1 mb-8 w-fit">
            {(["CUSTOMER", "VENDOR"] as Role[]).map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={`px-4 py-1.5 text-sm font-semibold rounded-lg transition-all ${
                  role === r ? "bg-white text-primary" : "text-white/70 hover:text-white"
                }`}
              >
                {r === "CUSTOMER" ? t("signup.iAmMoving") : t("signup.iAmVendor")}
              </button>
            ))}
          </div>

          <h2 className="text-3xl font-extrabold mb-2">
            {role === "CUSTOMER" ? t("signup.heroCustomerTitle") : t("signup.heroVendorTitle")}
          </h2>
          <p className="text-white/70 mb-8">
            {role === "CUSTOMER" ? t("signup.heroCustomerSubtitle") : t("signup.heroVendorSubtitle")}
          </p>

          <ul className="space-y-3">
            {BENEFITS[role].map((benefit) => (
              <li key={benefit} className="flex items-center gap-3 text-sm">
                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                {benefit}
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom stats */}
        <div className="relative z-10 grid grid-cols-3 gap-4">
          {[
            { value: "2,400+", labelKey: "signup.stat1" },
            { value: "45+",    labelKey: "signup.stat2" },
            { value: "98%",    labelKey: "signup.stat3" },
          ].map((s) => (
            <div key={s.labelKey} className="bg-white/10 rounded-xl p-3 text-center backdrop-blur-sm">
              <p className="text-lg font-extrabold">{s.value}</p>
              <p className="text-xs text-white/60">{t(s.labelKey)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center py-12 px-6 bg-gray-50">
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <div className="lg:hidden text-center mb-8">
            <Link href="/" className="inline-flex">
              <Logo size={34} variant="dark" />
            </Link>
          </div>

          <div className="mb-8">
            <h1 className="text-2xl font-extrabold text-gray-900">{t("signup.title")}</h1>
            <p className="text-gray-500 text-sm mt-1.5">
              {t("signup.alreadyHave")}{" "}
              <Link href="/login" className="text-primary hover:underline font-semibold">{t("signup.logIn")}</Link>
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-7">
            {/* Mobile role selector */}
            <div className="flex bg-gray-100 rounded-xl p-1 mb-5">
              {(["CUSTOMER", "VENDOR"] as Role[]).map((r) => (
                <button
                  key={r}
                  onClick={() => { setRole(r); setError(""); }}
                  className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
                    role === r ? "bg-white shadow-sm text-gray-900" : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {r === "CUSTOMER" ? t("signup.iAmMoving") : t("signup.iAmVendor")}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label={t("signup.fullName")}
                type="text"
                placeholder="Kim Min-jun"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />

              {role === "VENDOR" && (
                <Input
                  label={t("signup.companyName")}
                  type="text"
                  placeholder="GlobalMove Korea"
                  required
                  value={form.companyName}
                  onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                />
              )}

              <Input
                label={t("signup.email")}
                type="email"
                placeholder="you@example.com"
                required
                autoComplete="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />

              <Input
                label={t("signup.password")}
                type="password"
                placeholder={t("signup.passwordPlaceholder")}
                required
                minLength={8}
                autoComplete="new-password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />

              {/* Password strength hint */}
              {form.password.length > 0 && (
                <div className="flex gap-1">
                  {[1, 2, 3, 4].map((n) => (
                    <div
                      key={n}
                      className={`flex-1 h-1 rounded-full transition-all ${
                        form.password.length >= n * 3
                          ? n <= 1 ? "bg-red-400"
                          : n <= 2 ? "bg-amber-400"
                          : n <= 3 ? "bg-yellow-400"
                          : "bg-green-500"
                          : "bg-gray-200"
                      }`}
                    />
                  ))}
                </div>
              )}

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl flex gap-2">
                  <span>⚠️</span>
                  <span>{error}</span>
                </div>
              )}

              <Button type="submit" size="lg" className="w-full" loading={loading}>
                {role === "CUSTOMER" ? t("signup.customerCta") : t("signup.vendorCta")}
              </Button>

              <p className="text-xs text-gray-400 text-center leading-relaxed">
                {t("signup.termsText")}{" "}
                <Link href="/terms" className="underline hover:text-primary">{t("signup.termsLink")}</Link> &amp;{" "}
                <Link href="/privacy" className="underline hover:text-primary">{t("signup.privacyLink")}</Link>.
              </p>
            </form>
          </div>

          <p className="text-xs text-center text-gray-400 mt-6">
            {t("signup.freeNote")}
          </p>
        </div>
      </div>
    </div>
  );
}
