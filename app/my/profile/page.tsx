"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import Link from "next/link";
import { useToast } from "@/components/ui/Toast";
import PageHeader from "@/components/ui/PageHeader";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const NOTIFICATION_SETTINGS = [
  { id: "quote_received",   label: "New quotes received",        email: true,  sms: true,  kakao: false },
  { id: "contract_ready",   label: "Contract ready to sign",     email: true,  sms: true,  kakao: true  },
  { id: "packing_reminder", label: "Packing day reminder (T-1)", email: true,  sms: true,  kakao: true  },
  { id: "payment_charged",  label: "Payment processed",          email: true,  sms: true,  kakao: false },
  { id: "vessel_departed",  label: "Vessel departed",            email: false, sms: true,  kakao: true  },
  { id: "vessel_arrived",   label: "Vessel arrived at port",     email: false, sms: true,  kakao: true  },
  { id: "customs_cleared",  label: "Customs cleared",            email: false, sms: false, kakao: true  },
  { id: "delivered",        label: "Delivery complete",          email: true,  sms: false, kakao: true  },
];

export default function CustomerProfilePage() {
  const toast = useToast();
  const { lang } = useLanguage();
  const [activeTab, setActiveTab] = useState<"profile" | "notifications" | "security" | "billing">("profile");
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState({
    name: "Demo Customer", email: "customer@demo.com",
    phone: "+82-10-1234-5678", kakaoId: "demo_customer",
    nationality: "Korean", language: "Korean",
  });
  const [notifs, setNotifs] = useState(NOTIFICATION_SETTINGS);
  const [passwords, setPasswords] = useState({ current: "", next: "", confirm: "" });

  const handleSave = async (type: "profile" | "notifications" | "password") => {
    if (type === "password") {
      if (passwords.next !== passwords.confirm) {
        toast.error(
          lang === "ko" ? "비밀번호 불일치" : "Passwords don't match",
          lang === "ko" ? "새 비밀번호와 확인 비밀번호가 다릅니다." : "New password and confirmation must be identical."
        );
        return;
      }
      if (passwords.next.length < 8) {
        toast.error(
          lang === "ko" ? "비밀번호 너무 짧음" : "Password too short",
          lang === "ko" ? "비밀번호는 최소 8자 이상이어야 합니다." : "Password must be at least 8 characters."
        );
        return;
      }
    }
    setSaving(true);
    await new Promise((r) => setTimeout(r, 900));
    setSaving(false);
    const messages = lang === "ko" ? {
      profile:       ["프로필 업데이트 완료!", "개인 정보가 저장되었습니다."],
      notifications: ["설정 저장 완료!", "알림 설정이 업데이트되었습니다."],
      password:      ["비밀번호 변경 완료!", "새 비밀번호가 적용되었습니다."],
    } : {
      profile:       ["Profile updated!", "Your personal information has been saved."],
      notifications: ["Preferences saved!", "Notification settings updated."],
      password:      ["Password changed!", "Your new password is active."],
    };
    toast.success(messages[type][0], messages[type][1]);
    if (type === "password") setPasswords({ current: "", next: "", confirm: "" });
  };

  const toggleNotif = (id: string, channel: "email" | "sms" | "kakao") => {
    setNotifs(notifs.map((n) => n.id === id ? { ...n, [channel]: !n[channel as keyof typeof n] } : n));
  };

  const TABS = lang === "ko" ? [
    { id: "profile",       label: "프로필",  icon: "👤" },
    { id: "notifications", label: "알림",    icon: "🔔" },
    { id: "security",      label: "보안",    icon: "🔒" },
    { id: "billing",       label: "결제",    icon: "💳" },
  ] as const : [
    { id: "profile",       label: "Profile",       icon: "👤" },
    { id: "notifications", label: "Notifications", icon: "🔔" },
    { id: "security",      label: "Security",      icon: "🔒" },
    { id: "billing",       label: "Billing",       icon: "💳" },
  ] as const;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 pb-16 md:pb-0">
      <Header />
      <div className="max-w-3xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8">

        {/* Profile Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-700 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-md">
              {profile.name.charAt(0)}
            </div>
            <button className="absolute -bottom-1 -right-1 w-6 h-6 bg-white border border-gray-200 rounded-full flex items-center justify-center text-xs shadow-sm hover:bg-gray-50 transition-colors">
              ✏️
            </button>
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">{profile.name}</h1>
            <p className="text-gray-500 text-sm">{profile.email}</p>
            <span className="inline-flex items-center gap-1 text-xs font-medium text-primary bg-primary-50 px-2 py-0.5 rounded-full mt-1">
              🏠 Customer
            </span>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { label: lang === "ko" ? "전체 이사" : "Total Moves", value: "4", icon: "📦", color: "bg-blue-50" },
            { label: lang === "ko" ? "진행 중" : "Active Moves",  value: "2", icon: "🚢", color: "bg-blue-50" },
            { label: lang === "ko" ? "국가" : "Countries",       value: "3", icon: "🌍", color: "bg-purple-50" },
          ].map((s) => (
            <Card key={s.label} padding="sm" className="text-center hover:shadow-md transition-shadow">
              <div className={`w-10 h-10 ${s.color} rounded-xl flex items-center justify-center text-xl mx-auto mb-2`}>
                {s.icon}
              </div>
              <p className="text-xl font-extrabold text-gray-900">{s.value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
            </Card>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-6 overflow-x-auto scrollbar-none">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-4 py-1.5 text-sm font-medium rounded-lg whitespace-nowrap transition-all ${
                activeTab === tab.id ? "bg-white shadow-sm text-gray-900" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── PROFILE TAB ── */}
        {activeTab === "profile" && (
          <div className="space-y-5">
            <Card>
              <h3 className="font-bold text-gray-900 mb-5">
                {lang === "ko" ? "개인 정보" : "Personal Information"}
              </h3>
              <div className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input label={lang === "ko" ? "이름" : "Full Name"} value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} />
                  <Input label={lang === "ko" ? "이메일" : "Email"} type="email" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} />
                  <Input label={lang === "ko" ? "전화번호" : "Phone Number"} value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} placeholder="+82-10-0000-0000" />
                  <Input label={lang === "ko" ? "카카오톡 ID" : "KakaoTalk ID"} value={profile.kakaoId} onChange={(e) => setProfile({ ...profile, kakaoId: e.target.value })} placeholder={lang === "ko" ? "카카오 ID 입력" : "Your Kakao ID"} />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { label: lang === "ko" ? "국적" : "Nationality", key: "nationality", options: ["Korean", "American", "British", "Australian", "Canadian", "Other"] },
                    { label: lang === "ko" ? "선호 언어" : "Preferred Language", key: "language", options: ["Korean", "English", "Japanese", "Chinese"] },
                  ].map(({ label, key, options }) => (
                    <div key={key} className="space-y-1">
                      <label className="block text-sm font-medium text-gray-700">{label}</label>
                      <select
                        value={profile[key as keyof typeof profile]}
                        onChange={(e) => setProfile({ ...profile, [key]: e.target.value })}
                        className="block w-full px-3 py-2.5 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-white transition-all"
                      >
                        {options.map((o) => <option key={o}>{o}</option>)}
                      </select>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-end mt-5">
                <Button onClick={() => handleSave("profile")} loading={saving}>
                  {lang === "ko" ? "변경 저장" : "Save Changes"}
                </Button>
              </div>
            </Card>

            <Card>
              <h3 className="font-bold text-gray-900 mb-4">
                {lang === "ko" ? "최근 이사 현황" : "Recent Move Activity"}
              </h3>
              <div className="space-y-0 divide-y divide-gray-50">
                {[
                  { routeEn: "Seoul → Sydney",   routeKo: "서울 → 시드니",   statusEn: "In Transit", statusKo: "운송 중",   date: lang === "ko" ? "2026년 5월 20일" : "May 20, 2026", color: "text-primary",    href: "/shipments/demo-shipment-id" },
                  { routeEn: "Seoul → Vancouver", routeKo: "서울 → 밴쿠버",   statusEn: "Contracted", statusKo: "계약 완료",  date: lang === "ko" ? "2026년 5월 10일" : "May 10, 2026", color: "text-yellow-600", href: "/contract/demo-contract-id" },
                  { routeEn: "Seoul → London",    routeKo: "서울 → 런던",     statusEn: "Delivered",  statusKo: "완료",      date: lang === "ko" ? "2026년 4월 28일" : "Apr 28, 2026", color: "text-green-600",  href: "#" },
                ].map((m) => (
                  <Link key={m.routeEn} href={m.href} className="flex items-center justify-between py-3 hover:bg-gray-50 rounded-lg px-2 -mx-2 transition-colors group">
                    <div>
                      <p className="text-sm font-medium text-gray-800 group-hover:text-primary transition-colors">
                        {lang === "ko" ? m.routeKo : m.routeEn}
                      </p>
                      <p className="text-xs text-gray-400">{m.date}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-semibold ${m.color}`}>
                        {lang === "ko" ? m.statusKo : m.statusEn}
                      </span>
                      <svg className="w-4 h-4 text-gray-300 group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Link>
                ))}
              </div>
              <Link href="/my/moves" className="block mt-3 text-xs text-primary hover:underline font-medium">
                {lang === "ko" ? "전체 이사 보기 →" : "View all moves →"}
              </Link>
            </Card>
          </div>
        )}

        {/* ── NOTIFICATIONS TAB ── */}
        {activeTab === "notifications" && (
          <Card>
            <h3 className="font-bold text-gray-900 mb-1">
              {lang === "ko" ? "알림 설정" : "Notification Preferences"}
            </h3>
            <p className="text-sm text-gray-500 mb-5">
              {lang === "ko" ? "이사 각 단계에서 알림 받을 방법을 선택하세요." : "Choose how you'd like to be notified at each stage of your move."}
            </p>
            <div className="overflow-x-auto -mx-1">
              <table className="w-full text-sm min-w-[360px]">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left py-2 pr-4 font-semibold text-gray-500 text-xs uppercase tracking-wide">
                      {lang === "ko" ? "이벤트" : "Event"}
                    </th>
                    {(["Email", "SMS", "KakaoTalk"] as const).map((ch) => (
                      <th key={ch} className="text-center py-2 px-3 font-semibold text-gray-500 text-xs uppercase tracking-wide">{ch}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {notifs.map((n) => (
                    <tr key={n.id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-3 pr-4 text-gray-700 text-sm">{n.label}</td>
                      {(["email", "sms", "kakao"] as const).map((ch) => (
                        <td key={ch} className="text-center py-3 px-3">
                          <button
                            onClick={() => toggleNotif(n.id, ch)}
                            className={`w-10 h-5.5 h-[22px] rounded-full transition-all duration-200 relative flex-shrink-0 ${n[ch] ? "bg-primary" : "bg-gray-200"}`}
                            role="switch"
                            aria-checked={n[ch]}
                          >
                            <span className={`absolute top-[3px] w-4 h-4 bg-white rounded-full shadow transition-all duration-200 ${n[ch] ? "left-[22px]" : "left-[3px]"}`} />
                          </button>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-end mt-5">
              <Button onClick={() => handleSave("notifications")} loading={saving}>
                {lang === "ko" ? "설정 저장" : "Save Preferences"}
              </Button>
            </div>
          </Card>
        )}

        {/* ── SECURITY TAB ── */}
        {activeTab === "security" && (
          <div className="space-y-5">
            <Card>
              <h3 className="font-bold text-gray-900 mb-5">{lang === "ko" ? "비밀번호 변경" : "Change Password"}</h3>
              <div className="space-y-4">
                <Input
                  label="Current Password"
                  type="password"
                  placeholder="••••••••"
                  value={passwords.current}
                  onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                />
                <Input
                  label="New Password"
                  type="password"
                  placeholder="Minimum 8 characters"
                  value={passwords.next}
                  onChange={(e) => setPasswords({ ...passwords, next: e.target.value })}
                />
                <Input
                  label="Confirm New Password"
                  type="password"
                  placeholder="••••••••"
                  value={passwords.confirm}
                  onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                  error={passwords.confirm && passwords.next !== passwords.confirm ? "Passwords do not match" : undefined}
                />
              </div>
              <div className="flex justify-end mt-4">
                <Button
                  onClick={() => handleSave("password")}
                  loading={saving}
                  disabled={!passwords.current || !passwords.next || !passwords.confirm}
                >
                  Update Password
                </Button>
              </div>
            </Card>

            <Card>
              <h3 className="font-bold text-gray-900 mb-4">{lang === "ko" ? "활성 세션" : "Active Sessions"}</h3>
              <div className="space-y-0 divide-y divide-gray-50">
                {[
                  { device: "Chrome on Windows", location: "Seoul, Korea", current: true,  lastSeen: "Now" },
                  { device: "Safari on iPhone",  location: "Seoul, Korea", current: false, lastSeen: "2 days ago" },
                ].map((s, i) => (
                  <div key={i} className="flex items-center justify-between py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-xl">
                        {s.device.includes("iPhone") ? "📱" : "💻"}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800">{s.device}</p>
                        <p className="text-xs text-gray-400">{s.location} · {s.lastSeen}</p>
                      </div>
                    </div>
                    {s.current ? (
                      <span className="text-xs font-semibold text-green-700 bg-green-50 border border-green-200 px-2.5 py-0.5 rounded-full">Current</span>
                    ) : (
                      <button
                        onClick={() => toast.info("Session revoked", "Device has been signed out.")}
                        className="text-xs text-red-500 hover:text-red-700 font-medium"
                      >
                        Revoke
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </Card>

            <Card className="border-red-100 bg-red-50/50">
              <h3 className="font-bold text-red-600 mb-2">{lang === "ko" ? "위험 구역" : "Danger Zone"}</h3>
              <p className="text-sm text-gray-500 mb-4">
                {lang === "ko" ? "계정 및 모든 데이터를 영구 삭제합니다. 되돌릴 수 없습니다." : "Permanently delete your account and all associated data. This cannot be undone."}
              </p>
              <Button
                variant="danger"
                size="sm"
                onClick={() => toast.error(
                  lang === "ko" ? "계정 삭제" : "Account deletion",
                  lang === "ko" ? "계정 삭제는 고객 지원팀에 문의해주세요." : "Please contact support to delete your account."
                )}
              >
                {lang === "ko" ? "계정 삭제" : "Delete Account"}
              </Button>
            </Card>
          </div>
        )}

        {/* ── BILLING TAB ── */}
        {activeTab === "billing" && (
          <div className="space-y-5">
            <Card>
              <h3 className="font-bold text-gray-900 mb-5">{lang === "ko" ? "결제 수단" : "Payment Methods"}</h3>
              <div className="space-y-3 mb-4">
                {[
                  { brand: "Shinhan Card", last4: "4242", expiry: "06/28", default: true },
                  { brand: "Kakao Pay",    last4: "8765", expiry: "12/27", default: false },
                ].map((card) => (
                  <div key={card.last4} className={`flex items-center gap-4 p-4 border rounded-xl transition-all ${card.default ? "border-primary bg-primary-50" : "border-gray-200 hover:border-gray-300"}`}>
                    <div className="w-12 h-8 bg-gradient-to-br from-gray-700 to-gray-900 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-[10px] font-bold">CARD</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-900">{card.brand} •••• {card.last4}</p>
                      <p className="text-xs text-gray-500">Expires {card.expiry}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {card.default && (
                        <span className="text-xs text-primary font-semibold bg-white border border-primary-200 px-2 py-0.5 rounded-full">Default</span>
                      )}
                      <button
                        onClick={() => toast.info("Card removed", "Payment method removed successfully.")}
                        className="text-xs text-gray-400 hover:text-red-500 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => toast.info("Add card", "Card management coming soon.")}
              >
                + Add Payment Method
              </Button>
            </Card>

            <Card>
              <h3 className="font-bold text-gray-900 mb-4">Payment History</h3>
              <div className="divide-y divide-gray-50">
                {[
                  { desc: "Seoul → Sydney · GlobalMove Korea",        amount: 3200000, date: "May 20, 2026", status: "Paid" },
                  { desc: "Seoul → London · Euro Cargo Express",       amount: 2100000, date: "Mar 10, 2026", status: "Paid" },
                  { desc: "Busan → Singapore · Asia Bridge Movers",    amount: 1400000, date: "Jan 05, 2026", status: "Paid" },
                ].map((p, i) => (
                  <div key={i} className="flex items-center justify-between py-3.5">
                    <div>
                      <p className="text-sm font-medium text-gray-800">{p.desc}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{p.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-gray-900">
                        {new Intl.NumberFormat("ko-KR", { style: "currency", currency: "KRW" }).format(p.amount)}
                      </p>
                      <p className="text-xs text-green-600 font-medium">✓ {p.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
