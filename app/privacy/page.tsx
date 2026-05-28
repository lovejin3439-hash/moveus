"use client";

import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function PrivacyPage() {
  const { lang } = useLanguage();

  const sections = lang === "ko" ? [
    {
      title: "1. 수집하는 정보",
      body: `MoveUs는 서비스 제공을 위해 다음 정보를 수집합니다: 이름, 이메일 주소, 전화번호 등 계정 등록 정보; 출발지 및 목적지, 이사 일정, 물품 목록 등 이사 관련 정보; 여권 사본, 비자 등 서류(이사 진행 시 필요한 경우); 서비스 이용 기록, 접속 IP, 기기 정보 등.`,
    },
    {
      title: "2. 정보 이용 목적",
      body: `수집된 정보는 다음 목적으로 이용됩니다: 견적 요청 처리 및 업체 매칭; 계약 체결 및 결제 처리; 화물 추적 및 배송 현황 알림; 고객 지원 및 분쟁 처리; 서비스 개선을 위한 통계 분석; 관련 법령에 따른 의무 이행.`,
    },
    {
      title: "3. 정보 공유",
      body: `MoveUs는 다음 경우에 한하여 정보를 공유합니다: 고객이 선택한 이사 업체(이사 서비스 제공에 필요한 정보만); 법적 요구 또는 정부 기관의 적법한 요청; 서비스 운영에 필요한 제3자 서비스(결제, 이메일 등). 마케팅 목적으로 개인정보를 제3자에게 판매하지 않습니다.`,
    },
    {
      title: "4. 정보 보호",
      body: `모든 데이터는 SSL/TLS 암호화를 통해 전송됩니다. 결제 정보는 PCI-DSS 인증 결제 프로세서를 통해 처리됩니다. 서류 및 개인정보는 AES-256 암호화로 저장됩니다.`,
    },
    {
      title: "5. 이용자의 권리",
      body: `이용자는 자신의 개인정보에 대해 다음 권리를 갖습니다: 열람 요청(수집된 정보 확인); 정정 요청(부정확한 정보 수정); 삭제 요청(법적 의무 보관 기간 경과 후); 처리 제한 요청; 이의 제기권. 권리 행사는 privacy@moveus.io로 문의하세요.`,
    },
    {
      title: "6. 보관 기간",
      body: `개인정보는 서비스 이용 목적 달성 후 즉시 파기하는 것을 원칙으로 합니다. 단, 관련 법령에 따라 일정 기간 보관이 필요한 경우(예: 전자상거래법상 거래 기록 5년)에는 해당 기간 동안 보관합니다.`,
    },
  ] : [
    {
      title: "1. Information We Collect",
      body: `MoveUs collects the following information to provide our service: account registration details including name, email, and phone number; move-related information such as origin, destination, schedule, and inventory; documents such as passport copies and visas (when required for the move); and service usage logs, IP addresses, and device information.`,
    },
    {
      title: "2. How We Use Your Information",
      body: `Collected information is used to: process quote requests and match vendors; facilitate contracts and payments; provide cargo tracking and delivery notifications; deliver customer support and dispute resolution; perform statistical analysis to improve our service; and comply with legal obligations.`,
    },
    {
      title: "3. Information Sharing",
      body: `MoveUs shares information only in the following circumstances: with the moving vendor selected by the customer (only information necessary for the move); in response to legal requirements or lawful government requests; with third-party service providers necessary for operations (payments, email, etc.). We do not sell personal data to third parties for marketing purposes.`,
    },
    {
      title: "4. Data Security",
      body: `All data transmissions are secured via SSL/TLS encryption. Payment information is processed through PCI-DSS certified payment processors. Documents and personal data are stored with AES-256 encryption.`,
    },
    {
      title: "5. Your Rights",
      body: `You have the following rights regarding your personal data: access (review collected information); rectification (correct inaccurate information); erasure (after the mandatory retention period); restriction of processing; right to object. To exercise these rights, contact privacy@moveus.io.`,
    },
    {
      title: "6. Retention Period",
      body: `Personal information is deleted immediately upon fulfillment of its collection purpose. However, where required by applicable law (e.g., transaction records for 5 years under e-commerce regulations), data is retained for the specified period.`,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col pb-16 md:pb-0">
      <Header />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1">
        <div className="mb-10">
          <Link href="/" className="text-xs text-primary hover:underline">
            ← {lang === "ko" ? "홈으로" : "Back to Home"}
          </Link>
          <h1 className="text-4xl font-black text-gray-900 mt-4 mb-2">
            {lang === "ko" ? "개인정보 처리방침" : "Privacy Policy"}
          </h1>
          <p className="text-sm text-gray-400">
            {lang === "ko" ? "최종 업데이트: 2026년 1월 1일" : "Last updated: January 1, 2026"}
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-2xl px-5 py-4 mb-10 flex gap-3">
          <span className="text-xl">🔒</span>
          <p className="text-sm text-blue-800 leading-relaxed">
            {lang === "ko"
              ? "MoveUs는 고객의 개인정보를 소중하게 여깁니다. 이 방침은 서비스 데모 목적으로 작성된 예시입니다."
              : "MoveUs values your privacy. This policy is provided as a demo example for development purposes."}
          </p>
        </div>

        <div className="space-y-8">
          {sections.map((s) => (
            <div key={s.title}>
              <h2 className="text-lg font-bold text-gray-900 mb-3">{s.title}</h2>
              <p className="text-gray-600 leading-relaxed text-sm">{s.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-gray-100 text-sm text-gray-400">
          <p>{lang === "ko" ? "개인정보 문의: " : "Privacy contact: "}<a href="mailto:privacy@moveus.io" className="text-primary hover:underline">privacy@moveus.io</a></p>
          <p className="mt-1">© {new Date().getFullYear()} MoveUs, Inc.</p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
