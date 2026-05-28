"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StatusTracker from "@/components/features/StatusTracker";
import { Card } from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import PageHeader from "@/components/ui/PageHeader";
import { useToast } from "@/components/ui/Toast";
import { MOCK_TRACKING_EVENTS } from "@/lib/mock-data";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function ShipmentDetailPage() {
  const toast = useToast();
  const { t, lang } = useLanguage();
  const [reviewMode, setReviewMode] = useState(false);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [submittingReview, setSubmittingReview] = useState(false);

  const shipment = {
    id: "demo-shipment-id",
    status: "IN_TRANSIT",
    origin: "Seoul, Korea",
    destination: "Sydney, Australia",
    estimatedCbm: 12.4,
    finalCbm: 13.1,
    quotePrice: 3200000,
    packingDate: "2026-05-20",
    vendor: { companyName: "GlobalMove Korea", rating: 4.8 },
    vessel: "COSCO SHIPPING UNIVERSE",
    eta: "2026-06-28",
  };

  const reviewTags = lang === "ko"
    ? ["정시성", "포장 품질", "소통", "가격 정확성", "전문성"]
    : ["Punctuality", "Packing Quality", "Communication", "Price Accuracy", "Professionalism"];

  const fmt = (n: number) =>
    new Intl.NumberFormat("ko-KR", { style: "currency", currency: "KRW" }).format(n);

  const handleSubmitReview = async () => {
    if (rating === 0) {
      toast.error(
        lang === "ko" ? "평점 필요" : "Rating required",
        lang === "ko" ? "제출 전에 별점을 선택해주세요." : "Please select a star rating before submitting."
      );
      return;
    }
    setSubmittingReview(true);
    await new Promise((r) => setTimeout(r, 1000));
    setReviewSubmitted(true);
    setSubmittingReview(false);
    toast.success(
      lang === "ko" ? "리뷰가 제출됐습니다! 🎉" : "Review submitted! 🎉",
      lang === "ko" ? "감사합니다 — 리뷰가 커뮤니티에 큰 도움이 됩니다." : "Thank you — your feedback helps the community."
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 pb-16 md:pb-0">
      <Header />

      <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <PageHeader
          title={`${shipment.origin} → ${shipment.destination}`}
          subtitle={`${t("myMoves.via")} ${shipment.vendor.companyName} · ${t("shipment.eta")} ${new Date(shipment.eta).toLocaleDateString("en-US", { month: "long", day: "numeric" })}`}
          breadcrumbs={[
            { label: t("myMoves.title"), href: "/my/moves" },
            { label: "Seoul → Sydney" },
          ]}
          badge={{ label: shipment.status.replace("_", " "), color: "blue" }}
        />

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main: Tracker */}
          <div className="lg:col-span-2 space-y-5">
            <Card>
              <h3 className="font-semibold mb-6 flex items-center gap-2">
                <span className="w-6 h-6 bg-primary-50 rounded-lg flex items-center justify-center text-xs">🗺️</span>
                {lang === "ko" ? "화물 현황" : "Shipment Status"}
              </h3>
              <StatusTracker
                currentStatus={shipment.status}
                events={MOCK_TRACKING_EVENTS}
                lang={lang}
              />
            </Card>

            {/* Vessel Info */}
            <Card>
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <span className="w-6 h-6 bg-blue-50 rounded-lg flex items-center justify-center text-xs">🚢</span>
                {lang === "ko" ? "선박 정보" : "Vessel Information"}
              </h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                {[
                  [lang === "ko" ? "선박명" : "Vessel", shipment.vessel],
                  [t("shipment.eta"), new Date(shipment.eta).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })],
                  [t("shipment.packing"), new Date(shipment.packingDate).toLocaleDateString("en-US", { month: "long", day: "numeric" })],
                  [t("shipment.finalCbm"), `${shipment.finalCbm} CBM`],
                ].map(([k, v]) => (
                  <div key={k} className="bg-gray-50 rounded-xl p-3">
                    <p className="text-gray-400 text-xs mb-1">{k}</p>
                    <p className="font-semibold text-gray-900 text-sm">{v}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Notification settings mock */}
            <Card>
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <span className="w-6 h-6 bg-amber-50 rounded-lg flex items-center justify-center text-xs">🔔</span>
                {lang === "ko" ? "알림 일정" : "Notification Schedule"}
              </h3>
              <div className="space-y-0 divide-y divide-gray-50">
                {[
                  { label: lang === "ko" ? "선박 출항" : "Vessel Departed",      sent: true,  channel: "KakaoTalk + SMS" },
                  { label: lang === "ko" ? "항구 도착" : "Vessel Arrived at Port", sent: false, channel: "KakaoTalk + Push" },
                  { label: lang === "ko" ? "통관 완료" : "Customs Cleared",      sent: false, channel: "Push notification" },
                  { label: lang === "ko" ? "배달 완료" : "Delivery Complete",    sent: false, channel: "Email" },
                ].map((n) => (
                  <div key={n.label} className="flex items-center justify-between py-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full flex-shrink-0 ${n.sent ? "bg-green-500" : "bg-gray-200"}`} />
                      <span className="text-sm text-gray-700">{n.label}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-400">{n.channel}</p>
                      {n.sent && <p className="text-xs text-green-600 font-medium">{lang === "ko" ? "발송 완료 ✓" : "Sent ✓"}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Move Summary */}
            <Card>
              <h3 className="text-sm font-bold text-gray-700 mb-4">{t("shipment.shipmentDetails")}</h3>
              <div className="space-y-3 text-sm">
                {[
                  [t("shipment.vendor"),       shipment.vendor.companyName],
                  [t("shipment.estimatedCbm"), `${shipment.estimatedCbm}`],
                  [t("shipment.finalCbm"),     `${shipment.finalCbm}`],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between">
                    <span className="text-gray-400">{k}</span>
                    <span className={`font-medium text-xs text-right max-w-[55%] truncate ${k === t("shipment.finalCbm") ? "text-primary" : "text-gray-800"}`}>
                      {v}
                    </span>
                  </div>
                ))}
                <div className="h-px bg-gray-100" />
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">{lang === "ko" ? "총 결제 금액" : "Total Paid"}</span>
                  <span className="font-bold text-gray-900">{fmt(shipment.quotePrice)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">{lang === "ko" ? "상태" : "Status"}</span>
                  <StatusBadge status={shipment.status} lang={lang} />
                </div>
              </div>
            </Card>

            {/* Documents */}
            <Card>
              <h3 className="text-sm font-bold text-gray-700 mb-3">{lang === "ko" ? "서류" : "Documents"}</h3>
              <div className="space-y-2">
                {(lang === "ko"
                  ? ["여권 사본", "비자", "물품 목록", "전자계약서"]
                  : ["Passport Copy", "Visa", "Inventory List", "E-Contract"]
                ).map((doc) => (
                  <div key={doc} className="flex items-center gap-2 py-1.5 border-b border-gray-50 last:border-0">
                    <div className="w-5 h-5 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-700">{doc}</span>
                  </div>
                ))}
              </div>
              <button className="mt-3 text-xs text-primary hover:underline font-medium">
                {t("shipment.downloadDocs")} →
              </button>
            </Card>

            {/* Review Card */}
            {!reviewSubmitted ? (
              <Card>
                <h3 className="text-sm font-bold text-gray-700 mb-3">{t("shipment.reviewTitle")}</h3>
                {!reviewMode ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 p-3 bg-amber-50 border border-amber-100 rounded-xl">
                      <span className="text-xl">⭐</span>
                      <p className="text-xs text-amber-700">{lang === "ko" ? "리뷰가 다른 고객들의 업체 선택에 도움이 됩니다." : "Your review helps other customers choose vendors."}</p>
                    </div>
                    <Button variant="outline" className="w-full" onClick={() => setReviewMode(true)}>
                      {lang === "ko" ? `${shipment.vendor.companyName} 리뷰 남기기` : `Rate ${shipment.vendor.companyName}`}
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Stars */}
                    <div className="flex gap-1 justify-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onMouseEnter={() => setHover(star)}
                          onMouseLeave={() => setHover(0)}
                          onClick={() => setRating(star)}
                          className="text-3xl transition-all duration-100 hover:scale-125"
                        >
                          <span className={(hover || rating) >= star ? "text-yellow-400" : "text-gray-200"}>★</span>
                        </button>
                      ))}
                    </div>
                    {rating > 0 && (
                      <p className="text-xs text-center text-gray-500">
                        {lang === "ko"
                          ? ["", "별로예요", "그저그래요", "좋아요", "매우 좋아요", "최고예요!"][rating]
                          : ["", "Poor", "Fair", "Good", "Very Good", "Excellent!"][rating]}
                      </p>
                    )}

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {reviewTags.map((tag) => (
                        <button
                          key={tag}
                          onClick={() => setTags(tags.includes(tag) ? tags.filter((t) => t !== tag) : [...tags, tag])}
                          className={`text-xs px-2.5 py-1 rounded-full border transition-all ${
                            tags.includes(tag)
                              ? "bg-primary text-white border-primary shadow-sm"
                              : "border-gray-200 text-gray-500 hover:border-primary hover:text-primary"
                          }`}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>

                    <textarea
                      rows={3}
                      placeholder={t("shipment.reviewPlaceholder")}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2.5 resize-none focus:outline-none focus:ring-2 focus:ring-primary bg-gray-50 focus:bg-white transition-all"
                    />
                    <Button
                      className="w-full"
                      disabled={rating === 0}
                      loading={submittingReview}
                      onClick={handleSubmitReview}
                    >
                      {t("shipment.reviewSubmit")}
                    </Button>
                  </div>
                )}
              </Card>
            ) : (
              <Card className="bg-gradient-to-br from-green-50 to-blue-50 border-green-200">
                <div className="text-center py-2">
                  <p className="text-3xl mb-2">🎉</p>
                  <p className="text-sm font-bold text-green-700">{t("shipment.reviewSubmitted")}</p>
                  <p className="text-xs text-green-600 mt-1 leading-relaxed">
                    {lang === "ko" ? "소중한 피드백 감사합니다. 커뮤니티가 더 나은 선택을 하는 데 도움이 됩니다." : "Thank you for your feedback. It helps the community make better decisions."}
                  </p>
                  <div className="flex justify-center gap-0.5 mt-3">
                    {[1,2,3,4,5].map((s) => (
                      <span key={s} className={s <= rating ? "text-yellow-400 text-lg" : "text-gray-200 text-lg"}>★</span>
                    ))}
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
