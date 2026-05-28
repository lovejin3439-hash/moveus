"use client";

import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function TermsPage() {
  const { lang } = useLanguage();

  const sections = lang === "ko" ? [
    {
      title: "1. 서비스 이용 약관",
      body: `본 약관은 MoveUs, Inc.("회사")가 제공하는 국제이사 중개 플랫폼 서비스("서비스")의 이용에 관한 조건을 규정합니다. 서비스를 이용함으로써 이용자는 본 약관에 동의하는 것으로 간주됩니다.`,
    },
    {
      title: "2. 플랫폼의 역할",
      body: `MoveUs는 이사 고객과 이사 업체를 연결하는 중개 플랫폼입니다. 회사는 직접 이사 서비스를 제공하지 않으며, 업체의 서비스 품질에 대한 직접적인 책임을 지지 않습니다. 단, 모든 업체는 당사의 인증 기준을 충족해야 합니다.`,
    },
    {
      title: "3. 계약 및 결제",
      body: `고객과 업체 간의 이사 계약은 플랫폼을 통해 체결됩니다. 결제는 포장 완료 시점에 자동으로 처리됩니다. 계약 이후 취소 시 취소 수수료가 발생할 수 있으며, 세부 조건은 각 계약서에 명시됩니다.`,
    },
    {
      title: "4. 이용자 의무",
      body: `이용자는 정확한 정보를 제공해야 하며, 플랫폼을 합법적 목적으로만 이용해야 합니다. 타인의 개인정보를 무단으로 수집하거나 사용하는 행위, 플랫폼 운영을 방해하는 행위는 금지됩니다.`,
    },
    {
      title: "5. 보험 및 분쟁",
      body: `플랫폼을 통해 진행된 이사에는 화물 보험이 적용됩니다. 분쟁 발생 시 MoveUs 분쟁 처리팀을 통해 조정을 받을 수 있습니다. 보험 및 분쟁 처리는 플랫폼 내 거래에만 적용됩니다.`,
    },
    {
      title: "6. 약관 변경",
      body: `회사는 필요에 따라 본 약관을 변경할 수 있습니다. 변경 사항은 플랫폼을 통해 공지되며, 변경 후 서비스 이용 시 변경된 약관에 동의한 것으로 간주됩니다. 주요 변경 시 이메일로 사전 안내합니다.`,
    },
  ] : [
    {
      title: "1. Acceptance of Terms",
      body: `These Terms of Service ("Terms") govern your use of the MoveUs platform ("Service") operated by MoveUs, Inc. ("Company"). By using the Service, you agree to be bound by these Terms.`,
    },
    {
      title: "2. Platform Role",
      body: `MoveUs is an intermediary platform that connects customers with moving vendors. The Company does not directly provide moving services and does not assume direct liability for vendor service quality. However, all vendors must meet our certification standards.`,
    },
    {
      title: "3. Contracts & Payments",
      body: `Moving contracts are formed between customers and vendors through the platform. Payment is processed automatically upon packing completion. Cancellations after contract signing may incur fees as specified in each individual contract.`,
    },
    {
      title: "4. User Obligations",
      body: `Users must provide accurate information and may only use the platform for lawful purposes. Unauthorized collection or use of others' personal data and any activity that disrupts platform operations are prohibited.`,
    },
    {
      title: "5. Insurance & Disputes",
      body: `Moves conducted through the platform include cargo insurance coverage. In the event of a dispute, mediation is available through the MoveUs Disputes Team. Insurance and dispute resolution apply only to transactions conducted through the platform.`,
    },
    {
      title: "6. Changes to Terms",
      body: `The Company may update these Terms as necessary. Changes will be announced through the platform, and continued use of the Service after changes constitutes acceptance of the revised Terms. Material changes will be communicated via email in advance.`,
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
            {lang === "ko" ? "서비스 이용 약관" : "Terms of Service"}
          </h1>
          <p className="text-sm text-gray-400">
            {lang === "ko" ? "최종 업데이트: 2026년 1월 1일" : "Last updated: January 1, 2026"}
          </p>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-2xl px-5 py-4 mb-10 flex gap-3">
          <span className="text-xl">⚠️</span>
          <p className="text-sm text-amber-800 leading-relaxed">
            {lang === "ko"
              ? "이 약관은 서비스 데모 목적으로 작성된 예시입니다. 실제 법적 구속력이 없으며, 실제 서비스 운영 시 법률 전문가의 검토가 필요합니다."
              : "These terms are provided as a demo example only. They have no legal force and should be reviewed by legal counsel before production use."}
          </p>
        </div>

        <div className="space-y-8 prose prose-sm max-w-none">
          {sections.map((s) => (
            <div key={s.title}>
              <h2 className="text-lg font-bold text-gray-900 mb-3">{s.title}</h2>
              <p className="text-gray-600 leading-relaxed text-sm">{s.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-gray-100 text-sm text-gray-400">
          <p>{lang === "ko" ? "문의: " : "Contact: "}<a href="mailto:legal@moveus.io" className="text-primary hover:underline">legal@moveus.io</a></p>
          <p className="mt-1">© {new Date().getFullYear()} MoveUs, Inc.</p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
