"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import { Card } from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";

const ALL_VENDORS = [
  { id: "v1", name: "GlobalMove Korea", email: "contact@globalmove.kr", routes: ["USA","Canada","Australia","UK"], rating: 4.8, moves: 520, status: "active", badgeTier: "Premium", licenseOk: true, joinedAt: "2023-03-15" },
  { id: "v2", name: "Pacific Relocations", email: "info@pacific.kr", routes: ["Australia","NZ","Singapore"], rating: 4.6, moves: 310, status: "active", badgeTier: "Standard", licenseOk: true, joinedAt: "2023-08-02" },
  { id: "v3", name: "Euro Cargo Express", email: "ops@eurocargo.kr", routes: ["Germany","France","UK"], rating: 4.5, moves: 188, status: "active", badgeTier: null, licenseOk: true, joinedAt: "2024-01-10" },
  { id: "v4", name: "Asia Bridge Movers", email: "contact@asiabridge.kr", routes: ["Singapore","Vietnam","Thailand"], rating: 4.7, moves: 670, status: "active", badgeTier: "Premium", licenseOk: true, joinedAt: "2022-11-20" },
  { id: "v5", name: "Seoul Global Movers", email: "contact@seoulmovers.kr", routes: ["USA","Canada"], rating: 0, moves: 0, status: "pending", badgeTier: null, licenseOk: true, joinedAt: "2026-05-10" },
  { id: "v6", name: "KoreaShip Express", email: "admin@koreaship.com", routes: ["Japan","Singapore"], rating: 0, moves: 0, status: "pending", badgeTier: null, licenseOk: false, joinedAt: "2026-05-09" },
  { id: "v7", name: "International Home Co.", email: "info@inthome.kr", routes: ["Germany","France","UK"], rating: 0, moves: 0, status: "pending", badgeTier: null, licenseOk: true, joinedAt: "2026-05-08" },
  { id: "v8", name: "OldMove Solutions", email: "old@oldmove.kr", routes: ["USA"], rating: 3.1, moves: 24, status: "suspended", badgeTier: null, licenseOk: false, joinedAt: "2023-06-01" },
];

type FilterStatus = "all" | "active" | "pending" | "suspended";

export default function AdminVendorsPage() {
  const toast = useToast();
  const [vendors, setVendors] = useState(ALL_VENDORS);
  const [filter, setFilter] = useState<FilterStatus>("all");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<string | null>(null);

  const filtered = vendors.filter((v) => {
    const matchStatus = filter === "all" || v.status === filter;
    const matchSearch = v.name.toLowerCase().includes(search.toLowerCase()) || v.email.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const approve = (id: string) => {
    const v = vendors.find((x) => x.id === id);
    setVendors(vendors.map((x) => x.id === id ? { ...x, status: "active" } : x));
    toast.success("Vendor approved", `${v?.name} is now active and can receive quote requests.`);
  };
  const suspend = (id: string) => {
    const v = vendors.find((x) => x.id === id);
    setVendors(vendors.map((x) => x.id === id ? { ...x, status: "suspended" } : x));
    toast.error("Vendor suspended", `${v?.name} has been suspended and cannot receive new requests.`);
  };
  const setBadge = (id: string, tier: string | null) => {
    setVendors(vendors.map((v) => v.id === id ? { ...v, badgeTier: tier } : v));
    toast.success("Badge updated", tier ? `Badge set to ${tier}.` : "Badge removed.");
  };

  const counts = { all: vendors.length, active: vendors.filter((v) => v.status === "active").length, pending: vendors.filter((v) => v.status === "pending").length, suspended: vendors.filter((v) => v.status === "suspended").length };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 pb-16 md:pb-0">
      <Header />
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
              <Link href="/admin" className="hover:text-primary">Admin</Link>
              <span>›</span>
              <span className="text-gray-900">Vendors</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Vendor Management</h1>
          </div>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex gap-2 mb-5">
          {(["all","active","pending","suspended"] as FilterStatus[]).map((f) => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-4 py-2 text-sm font-medium rounded-lg capitalize transition-all flex items-center gap-1.5 ${
                filter === f ? "bg-primary text-white" : "bg-white border border-gray-200 text-gray-600 hover:border-primary"
              }`}>
              {f}
              <span className={`text-xs px-1.5 py-0.5 rounded-full ${filter === f ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"}`}>
                {counts[f]}
              </span>
            </button>
          ))}
          <div className="ml-auto">
            <input type="text" placeholder="Search vendors..." value={search} onChange={(e) => setSearch(e.target.value)}
              className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary w-52" />
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-5">
          {/* Vendor Table */}
          <div className="lg:col-span-2">
            <Card padding="none">
              <div className="divide-y divide-gray-100">
                {filtered.map((vendor) => (
                  <div key={vendor.id}
                    onClick={() => setSelected(selected === vendor.id ? null : vendor.id)}
                    className={`flex items-center gap-4 px-5 py-4 cursor-pointer hover:bg-gray-50 transition-colors ${selected === vendor.id ? "bg-primary-50" : ""}`}>

                    {/* Avatar */}
                    <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center font-bold text-primary flex-shrink-0">
                      {vendor.name.charAt(0)}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <p className="text-sm font-semibold text-gray-900 truncate">{vendor.name}</p>
                        {vendor.badgeTier && <Badge variant="teal">{vendor.badgeTier}</Badge>}
                        {!vendor.licenseOk && <Badge variant="danger">No License</Badge>}
                      </div>
                      <p className="text-xs text-gray-400">{vendor.email} · Joined {new Date(vendor.joinedAt).toLocaleDateString("en-US", { month: "short", year: "numeric" })}</p>
                    </div>

                    {/* Stats */}
                    <div className="hidden sm:flex items-center gap-4 text-xs text-gray-500">
                      {vendor.rating > 0 && <span>⭐ {vendor.rating}</span>}
                      <span>{vendor.moves} moves</span>
                      <div className="flex flex-wrap gap-1">
                        {vendor.routes.slice(0, 2).map((r) => (
                          <span key={r} className="bg-gray-100 px-1.5 py-0.5 rounded">{r}</span>
                        ))}
                      </div>
                    </div>

                    {/* Status */}
                    <div className="flex-shrink-0">
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                        vendor.status === "active" ? "bg-green-100 text-green-700" :
                        vendor.status === "pending" ? "bg-yellow-100 text-yellow-700" :
                        "bg-red-100 text-red-700"
                      }`}>
                        {vendor.status}
                      </span>
                    </div>
                  </div>
                ))}
                {filtered.length === 0 && (
                  <div className="px-5 py-12 text-center text-gray-400 text-sm">No vendors found.</div>
                )}
              </div>
            </Card>
          </div>

          {/* Detail Panel */}
          <div>
            {!selected ? (
              <Card className="text-center py-16 text-gray-400">
                <p className="text-3xl mb-3">🏢</p>
                <p className="text-sm">Select a vendor to manage</p>
              </Card>
            ) : (() => {
              const v = vendors.find((x) => x.id === selected)!;
              return (
                <Card className="space-y-5">
                  <div className="text-center pb-4 border-b border-gray-100">
                    <div className="w-14 h-14 bg-primary-50 rounded-2xl flex items-center justify-center font-bold text-primary text-xl mx-auto mb-3">
                      {v.name.charAt(0)}
                    </div>
                    <h3 className="font-semibold text-gray-900">{v.name}</h3>
                    <p className="text-xs text-gray-400 mt-0.5">{v.email}</p>
                  </div>

                  {/* Details */}
                  <div className="space-y-2 text-sm">
                    {[
                      ["Status", <span className={`font-semibold ${v.status === "active" ? "text-green-600" : v.status === "pending" ? "text-yellow-600" : "text-red-600"}`}>{v.status}</span>],
                      ["Badge", v.badgeTier ?? "—"],
                      ["Rating", v.rating > 0 ? `⭐ ${v.rating}` : "No reviews yet"],
                      ["Moves", v.moves],
                      ["License", v.licenseOk ? "✓ Uploaded" : "✗ Missing"],
                      ["Joined", new Date(v.joinedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })],
                    ].map(([k, val]) => (
                      <div key={String(k)} className="flex justify-between py-1.5 border-b border-gray-50">
                        <span className="text-gray-500">{k}</span>
                        <span className="font-medium text-gray-800">{val as any}</span>
                      </div>
                    ))}
                  </div>

                  {/* Routes */}
                  <div>
                    <p className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">Routes</p>
                    <div className="flex flex-wrap gap-1.5">
                      {v.routes.map((r) => (
                        <span key={r} className="text-xs bg-primary-50 text-primary px-2 py-0.5 rounded-full">{r}</span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-2 pt-2">
                    {v.status === "pending" && (
                      <Button className="w-full" onClick={() => approve(v.id)} disabled={!v.licenseOk}>
                        {v.licenseOk ? "✓ Approve Vendor" : "Cannot Approve (No License)"}
                      </Button>
                    )}
                    {v.status === "active" && (
                      <>
                        <div className="space-y-1">
                          <p className="text-xs font-medium text-gray-500">Badge Tier</p>
                          <div className="flex gap-2">
                            {[null, "Standard", "Premium"].map((tier) => (
                              <button key={String(tier)} onClick={() => setBadge(v.id, tier)}
                                className={`flex-1 text-xs py-1.5 rounded-lg border transition-colors ${
                                  v.badgeTier === tier ? "bg-primary text-white border-primary" : "border-gray-200 text-gray-600 hover:border-primary"
                                }`}>
                                {tier ?? "None"}
                              </button>
                            ))}
                          </div>
                        </div>
                        <Button variant="danger" size="sm" className="w-full" onClick={() => suspend(v.id)}>
                          Suspend Vendor
                        </Button>
                      </>
                    )}
                    {v.status === "suspended" && (
                      <Button variant="outline" className="w-full" onClick={() => approve(v.id)}>
                        Reinstate Vendor
                      </Button>
                    )}
                    <button className="w-full text-xs text-primary hover:underline py-1">
                      View full profile →
                    </button>
                  </div>
                </Card>
              );
            })()}
          </div>
        </div>
      </div>
    </div>
  );
}
