"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState, useRef, useEffect } from "react";
import NotificationBell from "./NotificationBell";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import Logo from "@/components/ui/Logo";

export default function Header() {
  const { data: session } = useSession();
  const { lang, setLang, t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const role = (session?.user as any)?.role;
  const name = session?.user?.name ?? session?.user?.email ?? "";

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const customerLinks = [
    { href: "/my/moves", label: t("nav.myMoves") },
    { href: "/quote/new", label: t("nav.newQuote") },
    { href: "/my/profile", label: t("nav.myProfile") },
  ];

  const vendorLinks = [
    { href: "/vendor/dashboard", label: t("nav.dashboard") },
    { href: "/vendor/quotes", label: t("nav.quoteRequests") },
    { href: "/vendor/profile", label: t("nav.myProfile") },
  ];

  const corporateLinks = [
    { href: "/corporate/dashboard", label: t("nav.dashboard") },
    { href: "/corporate/employees", label: t("corporate.employeeList") },
    { href: "/corporate/reports", label: lang === "ko" ? "리포트" : "Reports" },
  ];

  const navLinks =
    role === "VENDOR"
      ? vendorLinks
      : role === "CORPORATE"
      ? corporateLinks
      : customerLinks;

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Logo size={34} variant="dark" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            <Link href="/how-it-works" className="px-3 py-2 text-sm text-gray-600 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors">
              {t("nav.howItWorks")}
            </Link>
            <Link href="/vendors" className="px-3 py-2 text-sm text-gray-600 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors">
              {t("nav.vendors")}
            </Link>

            {session && (
              <>
                {navLinks.map((link) => (
                  <Link key={link.href} href={link.href} className="px-3 py-2 text-sm text-gray-600 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors">
                    {link.label}
                  </Link>
                ))}
              </>
            )}
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-2">
            {/* Language Toggle */}
            <div className="flex items-center bg-gray-100 rounded-lg p-0.5 text-xs font-semibold">
              <button
                onClick={() => setLang("ko")}
                className={`px-2.5 py-1 rounded-md transition-all ${
                  lang === "ko" ? "bg-white shadow-sm text-gray-900" : "text-gray-400 hover:text-gray-600"
                }`}
              >
                KO
              </button>
              <button
                onClick={() => setLang("en")}
                className={`px-2.5 py-1 rounded-md transition-all ${
                  lang === "en" ? "bg-white shadow-sm text-gray-900" : "text-gray-400 hover:text-gray-600"
                }`}
              >
                EN
              </button>
            </div>

            {!session ? (
              <>
                <Link href="/login" className="hidden md:block px-3 py-2 text-sm text-gray-600 hover:text-primary transition-colors">
                  {t("nav.login")}
                </Link>
                <Link href="/signup" className="text-sm bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
                  {t("nav.getStarted")}
                </Link>
              </>
            ) : (
              <>
                {/* Notification Bell */}
                <NotificationBell />

                {/* User Avatar Menu */}
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="w-7 h-7 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                      {name.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-sm font-medium text-gray-700 hidden sm:block max-w-24 truncate">
                      {name.split(" ")[0]}
                    </span>
                    <svg className={`w-3.5 h-3.5 text-gray-400 transition-transform ${userMenuOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {userMenuOpen && (
                    <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-xl shadow-lg border border-gray-200 py-1.5 z-50 overflow-hidden">
                      {/* User info */}
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-semibold text-gray-900 truncate">{name}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{session.user?.email}</p>
                        <span className={`inline-block mt-1.5 text-xs px-2 py-0.5 rounded-full font-medium ${
                          role === "VENDOR"
                            ? "bg-primary-50 text-primary"
                            : role === "CORPORATE"
                            ? "bg-slate-100 text-slate-700"
                            : "bg-gray-100 text-gray-600"
                        }`}>
                          {role === "VENDOR"
                            ? t("nav.vendor")
                            : role === "CORPORATE"
                            ? (lang === "ko" ? "🏢 기업 HR" : "🏢 Corporate HR")
                            : t("nav.customer")}
                        </span>
                      </div>

                      {/* Links */}
                      <div className="py-1">
                        {navLinks.map((link) => (
                          <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setUserMenuOpen(false)}
                            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                          >
                            {link.label}
                          </Link>
                        ))}
                      </div>

                      <div className="border-t border-gray-100 py-1">
                        <button
                          onClick={() => { signOut({ callbackUrl: "/" }); setUserMenuOpen(false); }}
                          className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                          {t("nav.signOut")}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 rounded-md text-gray-600 ml-1"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden py-3 border-t border-gray-100 space-y-1">
            {/* Mobile language toggle */}
            <div className="flex items-center gap-2 px-3 py-2">
              <span className="text-xs text-gray-400 font-medium">Language:</span>
              <div className="flex bg-gray-100 rounded-lg p-0.5 text-xs font-semibold">
                <button onClick={() => setLang("ko")} className={`px-2.5 py-1 rounded-md transition-all ${lang === "ko" ? "bg-white shadow-sm text-gray-900" : "text-gray-400"}`}>KO</button>
                <button onClick={() => setLang("en")} className={`px-2.5 py-1 rounded-md transition-all ${lang === "en" ? "bg-white shadow-sm text-gray-900" : "text-gray-400"}`}>EN</button>
              </div>
            </div>
            <Link href="/how-it-works" onClick={() => setMenuOpen(false)} className="block px-3 py-2 text-sm text-gray-600 rounded-lg hover:bg-gray-50">{t("nav.howItWorks")}</Link>
            <Link href="/vendors" onClick={() => setMenuOpen(false)} className="block px-3 py-2 text-sm text-gray-600 rounded-lg hover:bg-gray-50">{t("nav.vendors")}</Link>
            {session && navLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)} className="block px-3 py-2 text-sm text-gray-600 rounded-lg hover:bg-gray-50">
                {link.label}
              </Link>
            ))}
            {!session && (
              <>
                <Link href="/login" onClick={() => setMenuOpen(false)} className="block px-3 py-2 text-sm text-gray-600">{t("nav.login")}</Link>
                <Link href="/signup" onClick={() => setMenuOpen(false)} className="block px-3 py-2 text-sm bg-primary text-white rounded-lg text-center">{t("nav.getStarted")}</Link>
              </>
            )}
            {session && (
              <button
                onClick={() => { signOut({ callbackUrl: "/" }); setMenuOpen(false); }}
                className="block w-full px-3 py-2 text-sm text-left text-red-600 rounded-lg hover:bg-red-50"
              >
                {t("nav.signOut")}
              </button>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
