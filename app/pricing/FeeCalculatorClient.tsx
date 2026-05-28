"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const TIERS = {
  en: [
    { label: "Standard", fee: 0.10 },
    { label: "Premium", fee: 0.08 },
    { label: "Enterprise", fee: 0.05 },
  ],
  ko: [
    { label: "스탠다드", fee: 0.10 },
    { label: "프리미엄", fee: 0.08 },
    { label: "엔터프라이즈", fee: 0.05 },
  ],
};

export default function FeeCalculatorClient() {
  const { t, lang } = useLanguage();
  const [price, setPrice] = useState(3000000);
  const [tier, setTier] = useState(0);

  const tiers = TIERS[lang] ?? TIERS.en;
  const fee = price * tiers[tier].fee;
  const net = price - fee;
  const fmt = (n: number) =>
    new Intl.NumberFormat("ko-KR", { style: "currency", currency: "KRW" }).format(n);

  return (
    <div className="bg-gray-50 rounded-2xl border border-gray-200 p-8 space-y-6">
      {/* Tier selector */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">{t("pricing.yourPlan")}</label>
        <div className="flex gap-2">
          {tiers.map((tier_item, i) => (
            <button
              key={tier_item.label}
              onClick={() => setTier(i)}
              className={`flex-1 py-2 text-sm font-semibold rounded-lg border-2 transition-all ${
                tier === i ? "border-primary bg-primary text-white" : "border-gray-200 text-gray-600 bg-white hover:border-primary"
              }`}
            >
              {tier_item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Price slider */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t("pricing.movePrice")} <span className="text-primary font-bold">{fmt(price)}</span>
        </label>
        <input
          type="range"
          min={500000}
          max={10000000}
          step={100000}
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="w-full accent-primary"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>₩500K</span>
          <span>₩10M</span>
        </div>
      </div>

      {/* Result */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">{t("pricing.quotePrice")}</span>
          <span className="font-medium">{fmt(price)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">{t("pricing.platformFee")} ({(tiers[tier].fee * 100).toFixed(0)}%)</span>
          <span className="text-red-500">− {fmt(fee)}</span>
        </div>
        <div className="h-px bg-gray-100" />
        <div className="flex justify-between">
          <span className="font-semibold text-gray-900">{t("pricing.settlement")}</span>
          <span className="text-2xl font-black text-primary">{fmt(net)}</span>
        </div>
        <p className="text-xs text-gray-400">{t("pricing.settlementNote")}</p>
      </div>
    </div>
  );
}
