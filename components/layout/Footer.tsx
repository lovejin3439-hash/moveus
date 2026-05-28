"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import Logo from "@/components/ui/Logo";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-gray-900 text-gray-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-10">
          <div className="col-span-2 md:col-span-1">
            <div className="mb-4">
              <Logo size={30} variant="light" />
            </div>
            <p className="text-sm leading-relaxed mb-4">
              {t("footer.tagline")}
            </p>
            <div className="flex gap-3">
              {["𝕏", "in", "f"].map((s) => (
                <div key={s} className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center text-sm hover:bg-gray-700 cursor-pointer transition-colors">
                  {s}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white text-sm font-semibold mb-3">{t("footer.platform")}</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/how-it-works" className="hover:text-white transition-colors">{t("footer.howItWorks")}</Link></li>
              <li><Link href="/vendors" className="hover:text-white transition-colors">{t("footer.findVendors")}</Link></li>
              <li><Link href="/pricing" className="hover:text-white transition-colors">{t("footer.pricing")}</Link></li>
              <li><Link href="/quote/new" className="hover:text-white transition-colors">{t("footer.getQuote")}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-sm font-semibold mb-3">{t("footer.destinations")}</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/countries/australia" className="hover:text-white transition-colors">🇦🇺 Australia</Link></li>
              <li><Link href="/countries/usa" className="hover:text-white transition-colors">🇺🇸 USA</Link></li>
              <li><Link href="/countries/canada" className="hover:text-white transition-colors">🇨🇦 Canada</Link></li>
              <li><Link href="/vendors" className="hover:text-white transition-colors">{t("footer.allDestinations")}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-sm font-semibold mb-3">{t("footer.company")}</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-white transition-colors">{t("footer.aboutUs")}</Link></li>
              <li><Link href="/pricing" className="hover:text-white transition-colors">{t("footer.forVendors")}</Link></li>
              <li><Link href="/signup?role=VENDOR" className="hover:text-white transition-colors">{t("footer.joinAsVendor")}</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">{t("footer.contact")}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-sm font-semibold mb-3">{t("footer.support")}</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/how-it-works" className="hover:text-white transition-colors">{t("footer.faq")}</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">{t("footer.terms")}</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">{t("footer.privacy")}</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
          <span>© {new Date().getFullYear()} MoveUs, Inc. {t("footer.rights")}</span>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span>{t("footer.ssl")}</span>
            <span>·</span>
            <span>{t("footer.iso")}</span>
            <span>·</span>
            <span>{t("footer.fidi")}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
