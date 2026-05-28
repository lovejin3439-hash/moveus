"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function NotFound() {
  const { lang } = useLanguage();

  return (
    <div className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "linear-gradient(135deg, #F5F7FF 0%, #EEF2FF 100%)" }}>
      <div className="text-center max-w-md">
        {/* Ship animation */}
        <div className="relative mx-auto mb-8 w-32 h-32">
          <div className="w-32 h-32 rounded-3xl flex items-center justify-center mx-auto shadow-xl"
            style={{ background: "linear-gradient(135deg, #1553F0, #5C82FF)" }}>
            <span className="text-6xl float-mid select-none">🚢</span>
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-sm font-black shadow-md">
            ?
          </div>
        </div>

        <h1 className="text-7xl font-black mb-2" style={{ color: "#1553F0" }}>404</h1>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          {lang === "ko" ? "페이지를 찾을 수 없어요" : "Page Not Found"}
        </h2>
        <p className="text-gray-500 mb-8 leading-relaxed">
          {lang === "ko"
            ? "이 페이지는 바다 어딘가에서 길을 잃었나봐요. 올바른 경로로 다시 안내해 드릴게요."
            : "Looks like this page got lost at sea. Let's get you back on course."}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 text-white font-bold rounded-xl transition-all hover:shadow-lg hover:-translate-y-0.5"
            style={{ background: "#1553F0" }}>
            {lang === "ko" ? "← 홈으로" : "← Back to Home"}
          </Link>
          <Link href="/quote/new"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:border-primary hover:text-primary transition-all">
            {lang === "ko" ? "무료 견적 받기" : "Get a Quote"}
          </Link>
        </div>

        <p className="mt-8 text-xs text-gray-400">
          {lang === "ko"
            ? "찾으시는 페이지가 있으면 "
            : "Need help? "}
          <a href="/contact" className="text-primary hover:underline font-medium">
            {lang === "ko" ? "문의하기" : "Contact us"}
          </a>
        </p>
      </div>
    </div>
  );
}
