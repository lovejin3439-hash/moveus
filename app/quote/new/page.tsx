"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ItemList, { type MoveItem } from "@/components/features/ItemList";
import Button from "@/components/ui/Button";
import { Input, Select, Textarea } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { POPULAR_DESTINATIONS } from "@/lib/cbm-data";
import StepIndicator from "@/components/ui/StepIndicator";
import { useToast } from "@/components/ui/Toast";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function NewQuotePage() {
  const router = useRouter();
  const toast = useToast();
  const { lang } = useLanguage();
  const [step, setStep] = useState(0);

  const STEP_DEFS = [
    { label: lang === "ko" ? "물품 목록" : "Item List",   description: lang === "ko" ? "이사할 물건 목록" : "What you're moving" },
    { label: lang === "ko" ? "상세 정보" : "Details",     description: lang === "ko" ? "경로 및 날짜" : "Route & dates" },
    { label: lang === "ko" ? "검토" : "Review",           description: lang === "ko" ? "확인 후 제출" : "Confirm & submit" },
  ];
  const [items, setItems] = useState<MoveItem[]>([]);
  const [photos, setPhotos] = useState<string[]>([]);
  const [dragging, setDragging] = useState(false);
  const [details, setDetails] = useState({
    origin: "Seoul, Korea",
    destination: "",
    packingDateFrom: "",
    packingDateTo: "",
    notes: "",
  });
  const [loading, setLoading] = useState(false);

  const totalCbm = items.reduce((s, i) => s + i.cbmValue * i.quantity, 0);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const files = Array.from(e.dataTransfer.files).filter((f) => f.type.startsWith("image/"));
    files.forEach((file) => {
      const url = URL.createObjectURL(file);
      setPhotos((p) => [...p, url]);
    });
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    files.forEach((file) => {
      const url = URL.createObjectURL(file);
      setPhotos((p) => [...p, url]);
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    toast.success(
      lang === "ko" ? "견적 요청이 전송됐습니다! 🎉" : "Quote request sent! 🎉",
      lang === "ko" ? "24시간 내에 업체 견적을 받으실 수 있습니다." : "You'll receive vendor quotes within 24 hours."
    );
    router.push("/quote/demo-quote-id");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 pb-16 md:pb-0">
      <Header />

      <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Step Indicator */}
        <StepIndicator steps={STEP_DEFS} current={step} className="mb-8" />

        {/* Step 0: Photos + Item List */}
        {step === 0 && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">
                {lang === "ko" ? "무엇을 이사하시나요?" : "What are you moving?"}
              </h1>
              <p className="text-gray-500">
                {lang === "ko"
                  ? "방 사진을 업로드하고 물품 목록을 작성해 정확한 부피를 계산하세요."
                  : "Upload room photos and build your item list to get an accurate volume estimate."}
              </p>
            </div>

            {/* Photo Upload */}
            <Card>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">
                {lang === "ko" ? "방 사진 (선택사항)" : "Room Photos (Optional)"}
              </h3>
              <div
                onDrop={handleDrop}
                onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                onDragLeave={() => setDragging(false)}
                className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
                  dragging ? "border-primary bg-primary-50" : "border-gray-300 hover:border-primary"
                }`}
              >
                <div className="text-3xl mb-3">📷</div>
                <p className="text-sm text-gray-600 mb-2">
                  {lang === "ko" ? "방 사진을 여기에 드래그 & 드롭하세요" : "Drag & drop room photos here"}
                </p>
                <p className="text-xs text-gray-400 mb-3">{lang === "ko" ? "또는" : "or"}</p>
                <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-700 transition-colors">
                  {lang === "ko" ? "사진 선택" : "Browse Photos"}
                  <input type="file" multiple accept="image/*" className="hidden" onChange={handleFileInput} />
                </label>
              </div>
              {photos.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {photos.map((url, i) => (
                    <div key={i} className="relative group">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={url} alt="" className="w-16 h-16 object-cover rounded-lg border border-gray-200" />
                      <button
                        onClick={() => setPhotos(photos.filter((_, idx) => idx !== i))}
                        className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >×</button>
                    </div>
                  ))}
                </div>
              )}
            </Card>

            {/* Item List */}
            <Card>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">
                {lang === "ko" ? "물품 목록 & CBM 계산" : "Item List & CBM Estimate"}
              </h3>
              <ItemList items={items} onChange={setItems} />
            </Card>

            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500">
                {items.length > 0 ? (
                  <span className="font-medium text-gray-900">
                    {lang === "ko"
                      ? `${items.length}개 물품 · 예상 ${totalCbm.toFixed(2)} CBM`
                      : `${items.length} items · ${totalCbm.toFixed(2)} CBM estimated`}
                  </span>
                ) : (
                  lang === "ko" ? "계속하려면 물품을 한 개 이상 추가하세요" : "Add at least one item to continue"
                )}
              </div>
              <Button onClick={() => setStep(1)} disabled={items.length === 0} size="lg">
                {lang === "ko" ? "다음: 이사 정보 →" : "Next: Shipment Details →"}
              </Button>
            </div>
          </div>
        )}

        {/* Step 1: Shipment Details */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">
                {lang === "ko" ? "이사 상세 정보" : "Shipment Details"}
              </h1>
              <p className="text-gray-500">
                {lang === "ko" ? "이사 경로와 날짜를 입력해주세요." : "Tell vendors where you're moving and when."}
              </p>
            </div>

            <Card>
              <div className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input
                    label={lang === "ko" ? "출발 도시" : "Origin City"}
                    value={details.origin}
                    onChange={(e) => setDetails({ ...details, origin: e.target.value })}
                    placeholder="Seoul, Korea"
                    required
                  />
                  <Select
                    label={lang === "ko" ? "목적지 국가" : "Destination Country"}
                    value={details.destination}
                    onChange={(e) => setDetails({ ...details, destination: e.target.value })}
                    required
                  >
                    <option value="">{lang === "ko" ? "목적지를 선택하세요..." : "Select destination..."}</option>
                    {POPULAR_DESTINATIONS.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </Select>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <Input
                    label={lang === "ko" ? "희망 포장일 (시작)" : "Preferred Packing Date (From)"}
                    type="date"
                    value={details.packingDateFrom}
                    onChange={(e) => setDetails({ ...details, packingDateFrom: e.target.value })}
                    min={new Date().toISOString().split("T")[0]}
                  />
                  <Input
                    label={lang === "ko" ? "희망 포장일 (종료)" : "Preferred Packing Date (To)"}
                    type="date"
                    value={details.packingDateTo}
                    onChange={(e) => setDetails({ ...details, packingDateTo: e.target.value })}
                    min={details.packingDateFrom}
                  />
                </div>

                <Textarea
                  label={lang === "ko" ? "추가 요청사항 (선택)" : "Additional Notes (Optional)"}
                  rows={3}
                  placeholder={lang === "ko"
                    ? "특수 요구사항, 파손주의 물품, 접근 제한 사항 등..."
                    : "Special requirements, fragile items, access restrictions, etc."}
                  value={details.notes}
                  onChange={(e) => setDetails({ ...details, notes: e.target.value })}
                />
              </div>
            </Card>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(0)}>
                {lang === "ko" ? "← 이전" : "← Back"}
              </Button>
              <Button onClick={() => setStep(2)} disabled={!details.destination} size="lg">
                {lang === "ko" ? "다음: 검토 →" : "Next: Review →"}
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Review */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">
                {lang === "ko" ? "견적 요청 검토" : "Review Your Request"}
              </h1>
              <p className="text-gray-500">
                {lang === "ko" ? "업체에 보내기 전에 정보를 확인하세요." : "Confirm your details before sending to vendors."}
              </p>
            </div>

            <Card>
              <div className="space-y-4">
                <div className="flex justify-between py-3 border-b border-gray-100">
                  <span className="text-sm text-gray-500">{lang === "ko" ? "경로" : "Route"}</span>
                  <span className="text-sm font-medium">{details.origin} → {details.destination}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-100">
                  <span className="text-sm text-gray-500">{lang === "ko" ? "물품 수" : "Items"}</span>
                  <span className="text-sm font-medium">{lang === "ko" ? `${items.length}개` : `${items.length} items`}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-100">
                  <span className="text-sm text-gray-500">{lang === "ko" ? "예상 부피" : "Estimated Volume"}</span>
                  <span className="text-sm font-bold text-primary">{totalCbm.toFixed(2)} CBM</span>
                </div>
                {details.packingDateFrom && (
                  <div className="flex justify-between py-3 border-b border-gray-100">
                    <span className="text-sm text-gray-500">{lang === "ko" ? "희망 날짜" : "Preferred Dates"}</span>
                    <span className="text-sm font-medium">
                      {details.packingDateFrom} {details.packingDateTo ? `– ${details.packingDateTo}` : ""}
                    </span>
                  </div>
                )}
                {details.notes && (
                  <div className="py-3">
                    <p className="text-sm text-gray-500 mb-1">{lang === "ko" ? "추가 요청사항" : "Notes"}</p>
                    <p className="text-sm text-gray-700">{details.notes}</p>
                  </div>
                )}
              </div>
            </Card>

            <Card className="bg-primary-50 border-primary-100">
              <div className="flex items-start gap-3">
                <span className="text-xl">ℹ️</span>
                <div className="text-sm text-gray-600">
                  <p className="font-medium text-gray-900 mb-1">
                    {lang === "ko" ? "다음 단계는?" : "What happens next?"}
                  </p>
                  <p>
                    {lang === "ko"
                      ? "해당 노선의 인증 업체들이 24시간 내에 견적을 제출합니다. 이메일 알림을 받은 후 한 곳에서 모든 견적을 비교할 수 있습니다."
                      : "Certified vendors matching your route will submit quotes within 24 hours. You'll receive an email notification and can compare all quotes in one place."}
                  </p>
                </div>
              </div>
            </Card>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(1)}>
                {lang === "ko" ? "← 이전" : "← Back"}
              </Button>
              <Button onClick={handleSubmit} size="lg" loading={loading}>
                {lang === "ko" ? "견적 요청 보내기" : "Submit Quote Request"}
              </Button>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
