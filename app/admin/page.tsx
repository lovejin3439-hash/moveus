"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import { Card } from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { StatusBadge } from "@/components/ui/Badge";
import { useToast } from "@/components/ui/Toast";

const KPI = [
  { label: "Total GMV", value: "₩2.14B", change: "+18% MoM", icon: "💰", color: "text-green-600" },
  { label: "Active Moves", value: "47", change: "+5 this week", icon: "🚢", color: "text-primary" },
  { label: "Platform Revenue", value: "₩214M", change: "+18% MoM", icon: "🏦", color: "text-blue-600" },
  { label: "Registered Users", value: "1,284", change: "+52 this week", icon: "👥", color: "text-purple-600" },
  { label: "Active Vendors", value: "45", change: "3 pending approval", icon: "🏢", color: "text-orange-600" },
  { label: "Avg. Take Rate", value: "9.2%", change: "Target: 10%", icon: "📊", color: "text-gray-600" },
];

const INITIAL_PENDING_VENDORS = [
  { id: "pv1", name: "Seoul Global Movers", email: "contact@seoulmovers.kr", routes: ["USA", "Canada"], submittedAt: "2026-05-10", licenseUploaded: true },
  { id: "pv2", name: "KoreaShip Express", email: "admin@koreaship.com", routes: ["Japan", "Singapore"], submittedAt: "2026-05-09", licenseUploaded: false },
  { id: "pv3", name: "International Home Co.", email: "info@inthome.kr", routes: ["Germany", "France", "UK"], submittedAt: "2026-05-08", licenseUploaded: true },
];

const RECENT_DISPUTES = [
  { id: "d1", move: "Seoul → Sydney", customer: "Kim Min-jun", vendor: "GlobalMove Korea", issue: "Final CBM 15% over estimate — disputed charge", status: "open", createdAt: "2026-05-08" },
  { id: "d2", move: "Busan → LA", customer: "Park Soo-yeon", vendor: "Trans-Global Shipping", issue: "2 boxes missing upon delivery", status: "in_review", createdAt: "2026-05-05" },
  { id: "d3", move: "Seoul → London", customer: "Lee Ji-ho", vendor: "Euro Cargo Express", issue: "Delivery 3 weeks late", status: "resolved", createdAt: "2026-04-28" },
];

const RECENT_MOVES = [
  { id: "m1", route: "Seoul → Sydney", customer: "Kim Min-jun", vendor: "GlobalMove Korea", cbm: 13.1, amount: 3200000, status: "IN_TRANSIT" },
  { id: "m2", route: "Incheon → Vancouver", customer: "Park Soo-yeon", vendor: "Pacific Relocations", cbm: 8.6, amount: 2600000, status: "CONTRACTED" },
  { id: "m3", route: "Busan → LA", customer: "Choi Yuna", vendor: "Trans-Global Shipping", cbm: 11.3, amount: 2900000, status: "PACKED" },
  { id: "m4", route: "Seoul → Singapore", customer: "Jung Tae-yang", vendor: "Asia Bridge Movers", cbm: 4.2, amount: 1400000, status: "DELIVERED" },
];

const fmt = (n: number) => new Intl.NumberFormat("ko-KR", { style: "currency", currency: "KRW" }).format(n);

export default function AdminDashboard() {
  const toast = useToast();
  const [pendingVendors, setPendingVendors] = useState(INITIAL_PENDING_VENDORS);

  const approveVendor = (id: string) => {
    const v = pendingVendors.find((x) => x.id === id);
    if (!v) return;
    if (!v.licenseUploaded) {
      toast.error("Cannot approve", `${v.name} has not uploaded their license yet.`);
      return;
    }
    setPendingVendors((prev) => prev.filter((x) => x.id !== id));
    toast.success("Vendor approved!", `${v.name} is now active and can receive quote requests.`);
  };

  const rejectVendor = (id: string) => {
    const v = pendingVendors.find((x) => x.id === id);
    setPendingVendors((prev) => prev.filter((x) => x.id !== id));
    toast.error("Vendor rejected", `${v?.name} has been notified of the rejection.`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 pb-16 md:pb-0">
      <Header />

      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-500 text-sm mt-1">Platform overview · {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</p>
          </div>
          <div className="flex gap-2">
            <Link href="/admin/vendors" className="text-sm px-4 py-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors">
              Manage Vendors
            </Link>
            <Link href="/admin/analytics" className="text-sm px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors">
              Analytics
            </Link>
          </div>
        </div>

        {/* KPI Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {KPI.map((k) => (
            <Card key={k.label} padding="sm">
              <div className="flex items-start justify-between mb-2">
                <span className="text-2xl">{k.icon}</span>
              </div>
              <p className={`text-2xl font-bold ${k.color} mb-0.5`}>{k.value}</p>
              <p className="text-xs text-gray-500">{k.label}</p>
              <p className="text-xs text-gray-400 mt-1">{k.change}</p>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left: Pending Vendor Approvals */}
          <div className="lg:col-span-2 space-y-5">
            <Card>
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="font-semibold text-gray-900">Vendor Approvals</h2>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {pendingVendors.length > 0
                      ? `${pendingVendors.length} pending review`
                      : "All vendors reviewed ✓"}
                  </p>
                </div>
                <Link href="/admin/vendors" className="text-xs text-primary hover:underline">View all</Link>
              </div>

              {pendingVendors.length === 0 ? (
                <div className="py-8 text-center text-gray-400">
                  <p className="text-3xl mb-2">✅</p>
                  <p className="text-sm">No pending vendor applications</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {pendingVendors.map((v) => (
                    <div key={v.id} className="flex items-center gap-3 py-3 border-b border-gray-50 last:border-0">
                      <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center font-bold text-gray-600">
                        {v.name.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-semibold text-gray-900 truncate">{v.name}</p>
                          {!v.licenseUploaded && <Badge variant="warning">Missing license</Badge>}
                        </div>
                        <p className="text-xs text-gray-500">{v.email}</p>
                        <div className="flex gap-1 mt-1">
                          {v.routes.map((r) => (
                            <span key={r} className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">{r}</span>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-2 flex-shrink-0">
                        <button
                          onClick={() => approveVendor(v.id)}
                          disabled={!v.licenseUploaded}
                          className="text-xs px-3 py-1.5 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => rejectVendor(v.id)}
                          className="text-xs px-3 py-1.5 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>

            {/* Recent Moves */}
            <Card>
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-semibold text-gray-900">Recent Moves</h2>
                <span className="text-xs text-gray-400">Last 7 days</span>
              </div>
              <div className="divide-y divide-gray-50">
                {RECENT_MOVES.map((m) => (
                  <div key={m.id} className="flex items-center justify-between py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">{m.route}</p>
                        <p className="text-xs text-gray-500">{m.customer} · {m.vendor}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-right flex-shrink-0">
                      <div>
                        <p className="text-xs text-gray-400">{m.cbm} CBM</p>
                        <p className="text-sm font-semibold text-primary">{fmt(m.amount)}</p>
                      </div>
                      <StatusBadge status={m.status} />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-5">
            {/* Disputes */}
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Active Disputes</h3>
                <Link href="/admin/disputes">
                  <span className="w-5 h-5 bg-red-100 text-red-600 text-xs font-bold rounded-full flex items-center justify-center hover:bg-red-200 transition-colors cursor-pointer">
                    {RECENT_DISPUTES.filter((d) => d.status !== "resolved").length}
                  </span>
                </Link>
              </div>
              <div className="space-y-3">
                {RECENT_DISPUTES.map((d) => (
                  <Link key={d.id} href="/admin/disputes">
                    <div className="py-2 border-b border-gray-50 last:border-0 hover:bg-gray-50 -mx-1 px-1 rounded transition-colors cursor-pointer">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <p className="text-xs font-semibold text-gray-800">{d.move}</p>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0 ${
                          d.status === "open" ? "bg-red-100 text-red-600" :
                          d.status === "in_review" ? "bg-yellow-100 text-yellow-700" :
                          "bg-green-100 text-green-700"
                        }`}>
                          {d.status.replace("_", " ")}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{d.issue}</p>
                      <p className="text-xs text-gray-400 mt-1">{d.customer} vs {d.vendor}</p>
                    </div>
                  </Link>
                ))}
              </div>
              <Link href="/admin/disputes" className="block mt-3 text-xs text-primary hover:underline text-center">
                View all disputes →
              </Link>
            </Card>

            {/* Fee Config */}
            <Card>
              <h3 className="font-semibold text-gray-900 mb-4">Platform Fee Config</h3>
              <div className="space-y-3">
                {[
                  { tier: "Standard Vendors", rate: "10%" },
                  { tier: "Premium Vendors", rate: "8%" },
                  { tier: "Enterprise (B2B)", rate: "5%" },
                ].map((f) => (
                  <div key={f.tier} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                    <span className="text-sm text-gray-600">{f.tier}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-primary">{f.rate}</span>
                      <button
                        onClick={() => toast.info("Fee config", "Contact engineering to update platform fee rates.")}
                        className="text-xs text-gray-400 hover:text-primary transition-colors"
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Quick Actions */}
            <Card>
              <h3 className="font-semibold text-gray-900 mb-3">Quick Actions</h3>
              <div className="space-y-2">
                {[
                  { label: "Export GMV Report (CSV)", icon: "📥" },
                  { label: "Send Platform Announcement", icon: "📢" },
                  { label: "Update Country Surcharges", icon: "🌍" },
                  { label: "Review Flagged Reviews", icon: "🚩" },
                ].map((action) => (
                  <button
                    key={action.label}
                    onClick={() => toast.info("Coming soon", `${action.label} will be available in the next release.`)}
                    className="w-full flex items-center gap-2 px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors text-left"
                  >
                    <span>{action.icon}</span>
                    {action.label}
                  </button>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
