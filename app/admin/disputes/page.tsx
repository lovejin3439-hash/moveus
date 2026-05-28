"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import { Card } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Input";

type DisputeStatus = "open" | "in_review" | "resolved" | "closed";

const DISPUTES = [
  { id: "d1", move: "Seoul → Sydney", customer: "Kim Min-jun", customerEmail: "minjun@demo.com", vendor: "GlobalMove Korea", issue: "Final CBM confirmed at 15.2, 23% over the estimated 12.4. Customer disputes the overcharge.", amount: 3200000, extraCharge: 384000, status: "open" as DisputeStatus, createdAt: "2026-05-08", priority: "high", messages: [{ from: "customer", text: "The vendor confirmed 15.2 CBM but I clearly had under 13 CBM. This is excessive.", time: "May 8, 9:15 AM" }, { from: "vendor", text: "Final packing photos confirm 15.2 CBM. Customer added last-minute items.", time: "May 8, 2:30 PM" }] },
  { id: "d2", move: "Busan → LA", customer: "Park Soo-yeon", customerEmail: "sooyeon@demo.com", vendor: "Trans-Global Shipping", issue: "2 boxes reported missing upon delivery. Customer claims ₩450,000 worth of electronics.", amount: 2900000, extraCharge: 450000, status: "in_review" as DisputeStatus, createdAt: "2026-05-05", priority: "high", messages: [{ from: "customer", text: "Box #12 and #18 are missing. I photographed all boxes before pickup.", time: "May 5, 11:00 AM" }, { from: "admin", text: "We have opened an investigation with the vendor. Please share the box photos.", time: "May 6, 10:00 AM" }] },
  { id: "d3", move: "Seoul → London", customer: "Lee Ji-ho", customerEmail: "jiho@demo.com", vendor: "Euro Cargo Express", issue: "Delivery was 3 weeks late without notification. Customer missed their apartment move-in date.", amount: 2100000, extraCharge: 0, status: "resolved" as DisputeStatus, createdAt: "2026-04-28", priority: "medium", messages: [{ from: "customer", text: "The delay cost me ₩300,000 in temporary accommodation. I want partial compensation.", time: "Apr 28" }, { from: "admin", text: "Vendor agreed to compensate ₩150,000. Resolved.", time: "May 2" }] },
  { id: "d4", move: "Incheon → Vancouver", customer: "Choi Yuna", customerEmail: "yuna@demo.com", vendor: "Pacific Relocations", issue: "Vendor cancelled 2 days before packing date without prior notice or penalty.", amount: 2600000, extraCharge: 0, status: "open" as DisputeStatus, createdAt: "2026-05-10", priority: "medium", messages: [{ from: "customer", text: "I had already arranged everything. This is unacceptable.", time: "May 10" }] },
];

const STATUS_COLOR: Record<DisputeStatus, string> = {
  open: "bg-red-100 text-red-700",
  in_review: "bg-yellow-100 text-yellow-700",
  resolved: "bg-green-100 text-green-700",
  closed: "bg-gray-100 text-gray-500",
};

const fmt = (n: number) => new Intl.NumberFormat("ko-KR", { style: "currency", currency: "KRW" }).format(n);

export default function AdminDisputesPage() {
  const [disputes, setDisputes] = useState(DISPUTES);
  const [active, setActive] = useState<string | null>(null);
  const [reply, setReply] = useState("");
  const [filter, setFilter] = useState<"all" | DisputeStatus>("all");

  const filtered = disputes.filter((d) => filter === "all" || d.status === filter);
  const activeDispute = disputes.find((d) => d.id === active);

  const updateStatus = (id: string, status: DisputeStatus) =>
    setDisputes(disputes.map((d) => d.id === id ? { ...d, status } : d));

  const sendReply = (id: string) => {
    if (!reply.trim()) return;
    setDisputes(disputes.map((d) => d.id === id ? { ...d, messages: [...d.messages, { from: "admin", text: reply, time: "Now" }] } : d));
    setReply("");
  };

  const counts = { all: disputes.length, open: disputes.filter((d) => d.status === "open").length, in_review: disputes.filter((d) => d.status === "in_review").length, resolved: disputes.filter((d) => d.status === "resolved").length };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 pb-16 md:pb-0">
      <Header />
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">

        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
              <Link href="/admin" className="hover:text-primary">Admin</Link> <span>›</span>
              <span className="text-gray-900">Disputes</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Dispute Resolution</h1>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">{counts.open} open · {counts.in_review} in review</span>
          </div>
        </div>

        {/* Filter */}
        <div className="flex gap-2 mb-5">
          {(["all","open","in_review","resolved"] as const).map((f) => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all flex items-center gap-1.5 ${
                filter === f ? "bg-primary text-white" : "bg-white border border-gray-200 text-gray-600 hover:border-primary"
              }`}>
              {f.replace("_", " ")}
              <span className={`text-xs px-1.5 py-0.5 rounded-full ${filter === f ? "bg-white/20" : "bg-gray-100 text-gray-500"}`}>
                {counts[f as keyof typeof counts] ?? disputes.filter((d) => d.status === f).length}
              </span>
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-5 gap-5">
          {/* List */}
          <div className="lg:col-span-2 space-y-3">
            {filtered.map((d) => (
              <div key={d.id} onClick={() => setActive(d.id)}
                className={`bg-white border rounded-xl p-4 cursor-pointer hover:shadow-md transition-all ${active === d.id ? "border-primary ring-2 ring-primary ring-offset-1" : "border-gray-200"}`}>
                <div className="flex items-start justify-between mb-2">
                  <p className="text-sm font-semibold text-gray-900">{d.move}</p>
                  <div className="flex gap-1.5 ml-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${d.priority === "high" ? "bg-red-50 text-red-600" : "bg-yellow-50 text-yellow-600"}`}>
                      {d.priority}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_COLOR[d.status]}`}>
                      {d.status.replace("_", " ")}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mb-2">{d.customer} vs {d.vendor}</p>
                <p className="text-xs text-gray-600 line-clamp-2">{d.issue}</p>
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-50">
                  <span className="text-xs text-gray-400">{d.createdAt}</span>
                  {d.extraCharge > 0 && <span className="text-xs font-semibold text-red-600">Disputed: {fmt(d.extraCharge)}</span>}
                </div>
              </div>
            ))}
          </div>

          {/* Detail */}
          <div className="lg:col-span-3">
            {!activeDispute ? (
              <Card className="text-center py-20 text-gray-400">
                <p className="text-4xl mb-3">⚖️</p>
                <p className="text-sm">Select a dispute to review</p>
              </Card>
            ) : (
              <div className="space-y-4">
                <Card>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-900">{activeDispute.move}</h3>
                      <p className="text-xs text-gray-500 mt-0.5">Opened {activeDispute.createdAt}</p>
                    </div>
                    <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${STATUS_COLOR[activeDispute.status]}`}>
                      {activeDispute.status.replace("_", " ")}
                    </span>
                  </div>

                  <div className="grid sm:grid-cols-3 gap-3 mb-4 text-sm">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-gray-400 mb-0.5">Customer</p>
                      <p className="font-medium">{activeDispute.customer}</p>
                      <p className="text-xs text-gray-400">{activeDispute.customerEmail}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-gray-400 mb-0.5">Vendor</p>
                      <p className="font-medium">{activeDispute.vendor}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-gray-400 mb-0.5">Move Amount</p>
                      <p className="font-semibold text-primary">{fmt(activeDispute.amount)}</p>
                      {activeDispute.extraCharge > 0 && <p className="text-xs text-red-500">Disputed: {fmt(activeDispute.extraCharge)}</p>}
                    </div>
                  </div>

                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm text-amber-700 mb-4">
                    <p className="font-semibold mb-1">Issue Description</p>
                    <p className="leading-relaxed">{activeDispute.issue}</p>
                  </div>

                  {/* Status Actions */}
                  <div className="flex flex-wrap gap-2">
                    {activeDispute.status === "open" && (
                      <Button size="sm" onClick={() => updateStatus(activeDispute.id, "in_review")}>
                        Start Review
                      </Button>
                    )}
                    {activeDispute.status === "in_review" && (
                      <>
                        <Button size="sm" onClick={() => updateStatus(activeDispute.id, "resolved")}>
                          Mark Resolved
                        </Button>
                        <Button size="sm" variant="secondary" onClick={() => updateStatus(activeDispute.id, "closed")}>
                          Close (No Action)
                        </Button>
                      </>
                    )}
                    {(activeDispute.status === "resolved" || activeDispute.status === "closed") && (
                      <Button size="sm" variant="outline" onClick={() => updateStatus(activeDispute.id, "open")}>
                        Reopen
                      </Button>
                    )}
                  </div>
                </Card>

                {/* Messages */}
                <Card>
                  <h4 className="font-semibold text-gray-900 mb-4">Message Thread</h4>
                  <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
                    {activeDispute.messages.map((msg, i) => (
                      <div key={i} className={`flex gap-3 ${msg.from === "admin" ? "flex-row-reverse" : ""}`}>
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                          msg.from === "customer" ? "bg-blue-100 text-blue-700" :
                          msg.from === "vendor" ? "bg-orange-100 text-orange-700" :
                          "bg-primary text-white"
                        }`}>
                          {msg.from === "customer" ? "C" : msg.from === "vendor" ? "V" : "A"}
                        </div>
                        <div className={`flex-1 max-w-xs ${msg.from === "admin" ? "items-end" : ""}`}>
                          <div className={`rounded-2xl px-3 py-2 text-sm ${
                            msg.from === "admin" ? "bg-primary text-white" :
                            msg.from === "customer" ? "bg-gray-100 text-gray-800" :
                            "bg-orange-50 text-gray-800 border border-orange-100"
                          }`}>
                            {msg.text}
                          </div>
                          <p className={`text-xs text-gray-400 mt-1 ${msg.from === "admin" ? "text-right" : ""}`}>
                            {msg.from} · {msg.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {activeDispute.status !== "resolved" && activeDispute.status !== "closed" && (
                    <div className="space-y-2 pt-3 border-t border-gray-100">
                      <Textarea
                        rows={2}
                        placeholder="Write an admin message (visible to both parties)..."
                        value={reply}
                        onChange={(e) => setReply(e.target.value)}
                      />
                      <Button size="sm" onClick={() => sendReply(activeDispute.id)} disabled={!reply.trim()}>
                        Send Message
                      </Button>
                    </div>
                  )}
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
