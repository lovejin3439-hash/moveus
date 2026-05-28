"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import { Card } from "@/components/ui/Card";

const MONTHLY_DATA = [
  { month: "Nov", gmv: 142, moves: 31, users: 88 },
  { month: "Dec", gmv: 168, moves: 36, users: 102 },
  { month: "Jan", gmv: 195, moves: 42, users: 119 },
  { month: "Feb", gmv: 178, moves: 39, users: 131 },
  { month: "Mar", gmv: 221, moves: 48, users: 158 },
  { month: "Apr", gmv: 248, moves: 54, users: 176 },
  { month: "May", gmv: 214, moves: 47, users: 193 },
];

const TOP_ROUTES = [
  { route: "Korea → Australia", moves: 142, gmv: 468000000, avgPrice: 3295000 },
  { route: "Korea → USA", moves: 118, gmv: 356000000, avgPrice: 3017000 },
  { route: "Korea → Canada", moves: 87, gmv: 241000000, avgPrice: 2770000 },
  { route: "Korea → UK", moves: 64, gmv: 224000000, avgPrice: 3500000 },
  { route: "Korea → Germany", moves: 52, gmv: 171000000, avgPrice: 3288000 },
];

const TOP_VENDORS = [
  { name: "GlobalMove Korea", moves: 92, gmv: 287000000, rating: 4.8, takeRate: "10%" },
  { name: "Asia Bridge Movers", moves: 78, gmv: 189000000, rating: 4.7, takeRate: "10%" },
  { name: "Pacific Relocations", moves: 61, gmv: 148000000, rating: 4.6, takeRate: "8%" },
  { name: "Euro Cargo Express", moves: 44, gmv: 132000000, rating: 4.5, takeRate: "10%" },
  { name: "Trans-Global Shipping", moves: 38, gmv: 98000000, rating: 4.3, takeRate: "10%" },
];

const fmt = (n: number) => new Intl.NumberFormat("ko-KR", { style: "currency", currency: "KRW", notation: "compact", maximumFractionDigits: 1 }).format(n);
const fmtFull = (n: number) => new Intl.NumberFormat("ko-KR", { style: "currency", currency: "KRW" }).format(n);

const maxGmv = Math.max(...MONTHLY_DATA.map((d) => d.gmv));

export default function AdminAnalyticsPage() {
  const [metric, setMetric] = useState<"gmv" | "moves" | "users">("gmv");

  const metricLabels = { gmv: "GMV (₩ millions)", moves: "Completed Moves", users: "New Users" };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 pb-16 md:pb-0">
      <Header />

      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
              <Link href="/admin" className="hover:text-primary">Admin</Link>
              <span>›</span>
              <span className="text-gray-900">Analytics</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Platform Analytics</h1>
          </div>
          <select className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary bg-white">
            <option>Last 7 months</option>
            <option>Last 12 months</option>
            <option>This year</option>
          </select>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total GMV", value: "₩2.14B", sub: "+18% vs last period" },
            { label: "Platform Revenue", value: "₩214M", sub: "9.2% take rate" },
            { label: "Total Moves", value: "297", sub: "47 currently active" },
            { label: "Avg. Move Value", value: "₩2,900,000", sub: "Per completed move" },
          ].map((s) => (
            <Card key={s.label} padding="sm">
              <p className="text-xl font-bold text-gray-900 mb-0.5">{s.value}</p>
              <p className="text-xs text-gray-500">{s.label}</p>
              <p className="text-xs text-green-600 mt-1 font-medium">{s.sub}</p>
            </Card>
          ))}
        </div>

        {/* Chart Area */}
        <Card className="mb-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-gray-900">{metricLabels[metric]}</h3>
            <div className="flex bg-gray-100 rounded-xl p-1 gap-1">
              {(["gmv", "moves", "users"] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setMetric(m)}
                  className={`px-3 py-1 text-xs font-medium rounded-lg uppercase transition-all ${
                    metric === m ? "bg-white shadow-sm text-gray-900" : "text-gray-500"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* Bar Chart */}
          <div className="flex items-end gap-3 h-48">
            {MONTHLY_DATA.map((d) => {
              const value = d[metric];
              const maxVal = Math.max(...MONTHLY_DATA.map((x) => x[metric]));
              const height = (value / maxVal) * 100;
              return (
                <div key={d.month} className="flex-1 flex flex-col items-center gap-2">
                  <span className="text-xs text-gray-500 font-medium">
                    {metric === "gmv" ? `${value}M` : value}
                  </span>
                  <div className="w-full flex items-end" style={{ height: "140px" }}>
                    <div
                      className="w-full bg-primary rounded-t-lg hover:bg-primary-700 transition-all cursor-pointer"
                      style={{ height: `${height}%`, minHeight: "4px" }}
                    />
                  </div>
                  <span className="text-xs text-gray-400">{d.month}</span>
                </div>
              );
            })}
          </div>
        </Card>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Top Routes */}
          <Card>
            <h3 className="font-semibold text-gray-900 mb-5">Top Routes by GMV</h3>
            <div className="space-y-3">
              {TOP_ROUTES.map((r, i) => (
                <div key={r.route} className="space-y-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 bg-gray-100 text-gray-600 text-xs font-bold rounded flex items-center justify-center">
                        {i + 1}
                      </span>
                      <span className="font-medium text-gray-800">{r.route}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-semibold text-primary">{fmt(r.gmv)}</span>
                      <span className="text-xs text-gray-400 ml-2">{r.moves} moves</span>
                    </div>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${(r.gmv / TOP_ROUTES[0].gmv) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Top Vendors */}
          <Card>
            <h3 className="font-semibold text-gray-900 mb-5">Top Vendors by Revenue</h3>
            <div className="divide-y divide-gray-50">
              {TOP_VENDORS.map((v, i) => (
                <div key={v.name} className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 bg-gray-100 text-gray-600 text-xs font-bold rounded flex items-center justify-center">
                      {i + 1}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-gray-800">{v.name}</p>
                      <p className="text-xs text-gray-400">{v.moves} moves · ⭐ {v.rating}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-primary">{fmt(v.gmv)}</p>
                    <p className="text-xs text-gray-400">Fee: {v.takeRate}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
