"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import QuoteCard from "@/components/features/QuoteCard";
import Button from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { MOCK_QUOTES } from "@/lib/mock-data";
import PageHeader from "@/components/ui/PageHeader";
import { useToast } from "@/components/ui/Toast";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function QuoteResultsPage() {
  const router = useRouter();
  const { lang } = useLanguage();
  const [selectedQuoteId, setSelectedQuoteId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const move = {
    origin: "Seoul, Korea",
    destination: "Sydney, Australia",
    estimatedCbm: 12.4,
    itemCount: 23,
    packingDateFrom: "2026-06-05",
    packingDateTo: "2026-06-15",
  };

  const handleProceed = async () => {
    if (!selectedQuoteId) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    toast.success(
      lang === "ko" ? "업체가 선택됐습니다!" : "Vendor selected!",
      lang === "ko" ? "계약 서명 페이지로 이동합니다..." : "Redirecting to contract signing..."
    );
    router.push("/contract/demo-contract-id");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 pb-16 md:pb-0">
      <Header />

      <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <PageHeader
          title={lang === "ko" ? `업체 ${MOCK_QUOTES.length}곳 견적 제출` : `${MOCK_QUOTES.length} Vendors Submitted Quotes`}
          subtitle={lang === "ko" ? "가격, 날짜, 서비스 혜택을 비교해 최적의 업체를 선택하세요." : "Compare prices, dates, and service perks to find the best fit for your move."}
          breadcrumbs={[
            { label: lang === "ko" ? "내 이사" : "My Moves", href: "/my/moves" },
            { label: "Seoul → Sydney", href: "#" },
            { label: lang === "ko" ? "견적 비교" : "Compare Quotes" },
          ]}
          badge={{ label: lang === "ko" ? "24시간 마감" : "24h deadline", color: "orange" }}
        />

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Quotes List */}
          <div className="lg:col-span-2 space-y-4">
            {MOCK_QUOTES.map((quote, index) => (
              <QuoteCard
                key={quote.id}
                quote={quote}
                selected={selectedQuoteId === quote.id}
                onSelect={setSelectedQuoteId}
                recommended={index === 0}
              />
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Move Summary */}
            <Card>
              <h3 className="text-sm font-semibold text-gray-700 mb-4">
                {lang === "ko" ? "내 이사 정보" : "Your Move Summary"}
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">{lang === "ko" ? "경로" : "Route"}</p>
                  <p className="text-sm font-medium">{move.origin}</p>
                  <p className="text-xs text-gray-400 my-0.5">↓</p>
                  <p className="text-sm font-medium">{move.destination}</p>
                </div>
                <div className="h-px bg-gray-100" />
                <div className="flex justify-between">
                  <span className="text-xs text-gray-500">{lang === "ko" ? "물품 수" : "Items"}</span>
                  <span className="text-xs font-medium">{lang === "ko" ? `${move.itemCount}개` : `${move.itemCount} items`}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-gray-500">{lang === "ko" ? "예상 부피" : "Est. Volume"}</span>
                  <span className="text-xs font-bold text-primary">{move.estimatedCbm} CBM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-gray-500">{lang === "ko" ? "희망 포장일" : "Packing Window"}</span>
                  <span className="text-xs font-medium">{lang === "ko" ? "6월 5일 – 6월 15일" : "Jun 5 – Jun 15"}</span>
                </div>
              </div>
            </Card>

            {/* CBM Info */}
            <Card className="bg-amber-50 border-amber-200">
              <div className="flex gap-2">
                <span className="text-lg">⚠️</span>
                <div>
                  <p className="text-xs font-semibold text-amber-800 mb-1">
                    {lang === "ko" ? "부피 오차 안내" : "Volume Variance Note"}
                  </p>
                  <p className="text-xs text-amber-700 leading-relaxed">
                    {lang === "ko"
                      ? "최종 CBM은 포장 당일 확정됩니다. ±10% 오차는 추가 비용 없이 허용됩니다."
                      : "Final CBM is confirmed on packing day. ±10% variance is covered at no extra charge."}
                  </p>
                </div>
              </div>
            </Card>

            {/* Proceed Button */}
            {selectedQuoteId && (
              <Card className="bg-primary border-primary">
                <p className="text-white text-sm font-semibold mb-1">
                  {lang === "ko" ? "업체 선택 완료 ✓" : "Vendor Selected ✓"}
                </p>
                <p className="text-primary-100 text-xs mb-4">
                  {MOCK_QUOTES.find((q) => q.id === selectedQuoteId)?.vendor.companyName}
                </p>
                <Button
                  className="w-full bg-white !text-primary hover:bg-primary-50"
                  onClick={handleProceed}
                  loading={loading}
                >
                  {lang === "ko" ? "계약 진행하기 →" : "Proceed to Contract →"}
                </Button>
              </Card>
            )}

            {!selectedQuoteId && (
              <p className="text-xs text-gray-400 text-center">
                {lang === "ko" ? "위에서 업체를 선택하세요" : "Select a vendor above to proceed"}
              </p>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
