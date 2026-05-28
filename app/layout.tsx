import type { Metadata } from "next";
import "./globals.css";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import SessionProvider from "@/components/layout/SessionProvider";
import { ToastProvider } from "@/components/ui/Toast";
import MobileNav from "@/components/layout/MobileNav";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";

export const metadata: Metadata = {
  title: "MoveUs 무브어스 — 국제이사 플랫폼 | International Moving",
  description: "검증된 업체의 견적 비교, 디지털 계약, 실시간 화물 추적까지. Get instant quotes, compare vendors, and move internationally with confidence.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="ko">
      <body>
        <SessionProvider session={session}>
          <LanguageProvider>
            <ToastProvider>
              {children}
              <MobileNav />
            </ToastProvider>
          </LanguageProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
