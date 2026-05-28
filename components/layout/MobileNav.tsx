"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { clsx } from "clsx";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
  activeIcon: React.ReactNode;
  exact?: boolean;
}

const HomeIcon = ({ filled }: { filled?: boolean }) => (
  <svg className="w-5 h-5" fill={filled ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24" strokeWidth={filled ? 0 : 1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

const BoxIcon = ({ filled }: { filled?: boolean }) => (
  <svg className="w-5 h-5" fill={filled ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24" strokeWidth={filled ? 0 : 1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
  </svg>
);

const QuoteIcon = ({ filled }: { filled?: boolean }) => (
  <svg className="w-5 h-5" fill={filled ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24" strokeWidth={filled ? 0 : 1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const DashboardIcon = ({ filled }: { filled?: boolean }) => (
  <svg className="w-5 h-5" fill={filled ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24" strokeWidth={filled ? 0 : 1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
  </svg>
);

const ProfileIcon = ({ filled }: { filled?: boolean }) => (
  <svg className="w-5 h-5" fill={filled ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24" strokeWidth={filled ? 0 : 1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const PeopleIcon = ({ filled }: { filled?: boolean }) => (
  <svg className="w-5 h-5" fill={filled ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24" strokeWidth={filled ? 0 : 1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const ReportIcon = ({ filled }: { filled?: boolean }) => (
  <svg className="w-5 h-5" fill={filled ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24" strokeWidth={filled ? 0 : 1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const CUSTOMER_NAV: NavItem[] = [
  {
    href: "/",
    label: "Home",
    icon: <HomeIcon />,
    activeIcon: <HomeIcon filled />,
    exact: true,
  },
  {
    href: "/my/moves",
    label: "My Moves",
    icon: <BoxIcon />,
    activeIcon: <BoxIcon filled />,
  },
  {
    href: "/quote/new",
    label: "Quote",
    icon: <QuoteIcon />,
    activeIcon: <QuoteIcon filled />,
  },
  {
    href: "/my/profile",
    label: "Profile",
    icon: <ProfileIcon />,
    activeIcon: <ProfileIcon filled />,
  },
];

const VENDOR_NAV: NavItem[] = [
  {
    href: "/vendor/dashboard",
    label: "Dashboard",
    icon: <DashboardIcon />,
    activeIcon: <DashboardIcon filled />,
  },
  {
    href: "/vendor/quotes",
    label: "Requests",
    icon: <QuoteIcon />,
    activeIcon: <QuoteIcon filled />,
  },
  {
    href: "/vendor/profile",
    label: "Profile",
    icon: <ProfileIcon />,
    activeIcon: <ProfileIcon filled />,
  },
];

export default function MobileNav() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const { lang } = useLanguage();

  if (!session) return null;

  const role = (session?.user as any)?.role;

  // Hide mobile nav on admin pages or for admin role
  if (role === "ADMIN" || pathname.startsWith("/admin")) return null;

  const CORPORATE_NAV: NavItem[] = [
    {
      href: "/corporate/dashboard",
      label: lang === "ko" ? "대시보드" : "Dashboard",
      icon: <DashboardIcon />,
      activeIcon: <DashboardIcon filled />,
    },
    {
      href: "/corporate/employees",
      label: lang === "ko" ? "주재원" : "Expats",
      icon: <PeopleIcon />,
      activeIcon: <PeopleIcon filled />,
    },
    {
      href: "/corporate/reports",
      label: lang === "ko" ? "리포트" : "Reports",
      icon: <ReportIcon />,
      activeIcon: <ReportIcon filled />,
    },
    {
      href: "/my/profile",
      label: lang === "ko" ? "프로필" : "Profile",
      icon: <ProfileIcon />,
      activeIcon: <ProfileIcon filled />,
    },
  ];

  const items =
    role === "VENDOR"
      ? VENDOR_NAV
      : role === "CORPORATE"
      ? CORPORATE_NAV
      : CUSTOMER_NAV;

  const isActive = (item: NavItem) => {
    if (item.exact) return pathname === item.href;
    return pathname.startsWith(item.href);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 md:hidden">
      {/* Blur background */}
      <div className="glass border-t border-gray-200/80 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
        <div className="flex items-stretch" style={{ paddingBottom: "env(safe-area-inset-bottom)" }}>
          {items.map((item) => {
            const active = isActive(item);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "flex-1 flex flex-col items-center justify-center gap-0.5 pt-2 pb-3 transition-all duration-200 relative",
                  active ? "text-primary" : "text-gray-400 hover:text-gray-600"
                )}
              >
                {/* Active pill indicator */}
                {active && (
                  <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-primary rounded-full" />
                )}
                <span className={clsx("transition-transform duration-200", active && "scale-110")}>
                  {active ? item.activeIcon : item.icon}
                </span>
                <span className={clsx(
                  "text-[10px] font-medium transition-all",
                  active ? "text-primary font-semibold" : "text-gray-400"
                )}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
