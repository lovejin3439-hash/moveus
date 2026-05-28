"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import { Card } from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import StatusTracker from "@/components/features/StatusTracker";
import PageHeader from "@/components/ui/PageHeader";
import { useToast } from "@/components/ui/Toast";
import { MOCK_TRACKING_EVENTS } from "@/lib/mock-data";

export default function VendorJobDetailPage() {
  const toast = useToast();
  const [confirmingPacking, setConfirmingPacking] = useState(false);
  const [packingConfirmed, setPackingConfirmed] = useState(false);
  const [finalCbm, setFinalCbm] = useState("13.1");
  const [loading, setLoading] = useState(false);

  const job = {
    id: "m1",
    status: "CONTRACTED",
    origin: "Seoul, Korea",
    destination: "Sydney, Australia",
    estimatedCbm: 12.4,
    quotePrice: 3200000,
    packingDate: "2026-06-05",
    customer: {
      name: "Kim Min-jun",
      email: "minjun@example.com",
      phone: "+82-10-1234-5678",
    },
    documents: [
      { type: "Passport Copy", uploaded: true },
      { type: "Visa", uploaded: true },
      { type: "Inventory List", uploaded: true },
    ],
    items: [
      { name: "Sofa (3-seat)", size: "L", cbm: 1.6, qty: 1 },
      { name: "Bed Frame (Double)", size: "M", cbm: 1.0, qty: 1 },
      { name: "Wardrobe", size: "M", cbm: 0.9, qty: 2 },
      { name: "Dining Table", size: "M", cbm: 0.5, qty: 1 },
      { name: "Cardboard Box (Large)", size: "L", cbm: 0.1, qty: 30 },
    ],
  };

  const fmt = (n: number) =>
    new Intl.NumberFormat("ko-KR", { style: "currency", currency: "KRW" }).format(n);

  const variance = Math.abs(Number(finalCbm) - job.estimatedCbm) / job.estimatedCbm;
  const withinTolerance = variance <= 0.1;

  const handleConfirmPacking = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setPackingConfirmed(true);
    setConfirmingPacking(false);
    setLoading(false);
    toast.success(
      "Packing confirmed! 🎉",
      `Payment of ${fmt(job.quotePrice)} has been triggered. Settlement in 3 business days.`
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 pb-16 md:pb-0">
      <Header />

      <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <PageHeader
          title={`${job.origin} → ${job.destination}`}
          subtitle={`Customer: ${job.customer.name} · Packing: ${new Date(job.packingDate).toLocaleDateString("en-US", { month: "long", day: "numeric" })}`}
          breadcrumbs={[
            { label: "Dashboard", href: "/vendor/dashboard" },
            { label: `Job #${job.id}` },
          ]}
          badge={{ label: packingConfirmed ? "Packed" : job.status, color: packingConfirmed ? "green" : "orange" }}
          actions={
            !packingConfirmed && !confirmingPacking ? (
              <Button onClick={() => setConfirmingPacking(true)} size="md">
                Confirm Packing
              </Button>
            ) : undefined
          }
        />

        {/* Packing Confirmation Panel */}
        {confirmingPacking && !packingConfirmed && (
          <div className="mb-6 rounded-2xl border-2 border-primary-200 bg-primary-50 p-5 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex items-start gap-3 mb-4">
              <span className="text-2xl">📦</span>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Confirm Packing Completion</h3>
                <p className="text-sm text-gray-600">
                  This triggers automatic payment of{" "}
                  <strong className="text-primary">{fmt(job.quotePrice)}</strong> from the customer&apos;s card.
                </p>
              </div>
            </div>
            <div className="flex items-end gap-4 mb-4">
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Final CBM</label>
                <input
                  type="number"
                  step="0.1"
                  value={finalCbm}
                  onChange={(e) => setFinalCbm(e.target.value)}
                  className="w-28 px-3 py-2.5 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                />
              </div>
              <div className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm ${withinTolerance ? "bg-green-50 text-green-700 border border-green-200" : "bg-amber-50 text-amber-700 border border-amber-200"}`}>
                <span>{withinTolerance ? "✓" : "⚠️"}</span>
                <span className="font-medium">
                  {withinTolerance
                    ? `Within ±10% of ${job.estimatedCbm} CBM`
                    : `Exceeds ±10% — customer approval required`}
                </span>
              </div>
            </div>
            <div className="flex gap-3">
              <Button loading={loading} onClick={handleConfirmPacking}>
                Confirm & Trigger Payment
              </Button>
              <Button variant="outline" onClick={() => setConfirmingPacking(false)}>
                Cancel
              </Button>
            </div>
          </div>
        )}

        {/* Success Banner */}
        {packingConfirmed && (
          <div className="mb-6 rounded-2xl border border-green-200 bg-green-50 p-5 flex items-center gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <p className="font-bold text-green-800">Packing confirmed — payment triggered!</p>
              <p className="text-sm text-green-600 mt-0.5">{fmt(job.quotePrice)} charged to customer. Your settlement: {fmt(job.quotePrice * 0.9)} within 3 business days.</p>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left: Tracking + Items */}
          <div className="lg:col-span-2 space-y-5">
            <Card>
              <h3 className="font-bold text-gray-900 mb-5 flex items-center gap-2">
                <span className="w-6 h-6 bg-primary-50 rounded-lg flex items-center justify-center text-xs">🗺️</span>
                Shipment Status
              </h3>
              <StatusTracker
                currentStatus={packingConfirmed ? "PACKED" : job.status}
                events={MOCK_TRACKING_EVENTS.slice(0, packingConfirmed ? 2 : 1)}
              />
            </Card>

            <Card>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900 flex items-center gap-2">
                  <span className="w-6 h-6 bg-amber-50 rounded-lg flex items-center justify-center text-xs">📦</span>
                  Customer&apos;s Item List
                </h3>
                <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                  {job.items.length} types · {job.estimatedCbm} CBM est.
                </span>
              </div>
              <div className="divide-y divide-gray-50">
                {job.items.map((item, i) => (
                  <div key={i} className="flex items-center justify-between py-3 text-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-gray-100 rounded-xl text-xs flex items-center justify-center font-bold text-gray-500">
                        ×{item.qty}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{item.name}</p>
                        <p className="text-xs text-gray-400">Size: {item.size}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-800">{(item.cbm * item.qty).toFixed(2)} CBM</p>
                      <p className="text-xs text-gray-400">{item.cbm} × {item.qty}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
                <span className="text-sm text-gray-500">Total Estimated</span>
                <span className="font-bold text-primary text-lg">{job.estimatedCbm} CBM</span>
              </div>
            </Card>
          </div>

          {/* Right: Sidebar */}
          <div className="space-y-4">
            {/* Customer */}
            <Card>
              <h3 className="text-sm font-bold text-gray-700 mb-4 flex items-center gap-2">
                <span>👤</span> Customer Info
              </h3>
              <div className="space-y-3 text-sm">
                {[
                  ["Name",  job.customer.name],
                  ["Email", job.customer.email],
                  ["Phone", job.customer.phone],
                ].map(([k, v]) => (
                  <div key={k}>
                    <p className="text-xs text-gray-400 mb-0.5">{k}</p>
                    <p className="font-medium text-gray-800 break-all">{v}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Documents */}
            <Card>
              <h3 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                <span>📄</span> Documents
              </h3>
              <div className="space-y-2.5">
                {job.documents.map((doc) => (
                  <div key={doc.type} className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${doc.uploaded ? "bg-green-50" : "bg-gray-100"}`}>
                        {doc.uploaded
                          ? <svg className="w-3 h-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                          : <span className="text-gray-300 text-xs">○</span>
                        }
                      </div>
                      <span className={doc.uploaded ? "text-gray-700" : "text-gray-400"}>{doc.type}</span>
                    </div>
                    {doc.uploaded && (
                      <button className="text-xs text-primary hover:underline font-medium">View</button>
                    )}
                  </div>
                ))}
              </div>
            </Card>

            {/* Payment */}
            <Card>
              <h3 className="text-sm font-bold text-gray-700 mb-4 flex items-center gap-2">
                <span>💰</span> Payment Summary
              </h3>
              <div className="space-y-2.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Quote Price</span>
                  <span className="font-medium">{fmt(job.quotePrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Platform Fee (10%)</span>
                  <span className="text-red-500">−{fmt(job.quotePrice * 0.1)}</span>
                </div>
                <div className="h-px bg-gray-100" />
                <div className="flex justify-between items-center">
                  <span className="font-bold text-gray-900">Your Settlement</span>
                  <span className="font-extrabold text-primary text-base">{fmt(job.quotePrice * 0.9)}</span>
                </div>
                <p className="text-xs text-gray-400 bg-gray-50 rounded-lg px-3 py-2">
                  💸 Paid within 3 business days after packing confirmation.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
