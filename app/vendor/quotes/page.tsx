"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import { Card } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Input";
import PageHeader from "@/components/ui/PageHeader";
import EmptyState from "@/components/ui/EmptyState";
import { useToast } from "@/components/ui/Toast";
import { clsx } from "clsx";

interface QuoteRequest {
  id: string;
  customer: string;
  origin: string;
  destination: string;
  estimatedCbm: number;
  items: number;
  packingWindow: string;
  notes?: string;
  receivedAt: string;
  quoted: boolean;
}

const MOCK_REQUESTS: QuoteRequest[] = [
  { id: "r1", customer: "Kim Min-jun", origin: "Seoul", destination: "Sydney, AU", estimatedCbm: 12.4, items: 23, packingWindow: "Jun 5–15", notes: "Piano included, needs special handling", receivedAt: "30 min ago", quoted: false },
  { id: "r2", customer: "Park Soo-yeon", origin: "Incheon", destination: "Vancouver, CA", estimatedCbm: 15.8, items: 31, packingWindow: "Jun 10–20", receivedAt: "2 hrs ago", quoted: false },
  { id: "r3", customer: "Lee Ji-ho", origin: "Busan", destination: "London, UK", estimatedCbm: 6.1, items: 14, packingWindow: "May 28–Jun 3", receivedAt: "5 hrs ago", quoted: false },
  { id: "r4", customer: "Choi Yuna", origin: "Seoul", destination: "New York, US", estimatedCbm: 11.3, items: 20, packingWindow: "Jun 15–25", receivedAt: "1 day ago", quoted: true },
];

const FLAG: Record<string, string> = {
  AU: "🇦🇺", CA: "🇨🇦", UK: "🇬🇧", US: "🇺🇸",
};
const getFlag = (dest: string) => {
  const code = dest.split(", ").pop() ?? "";
  return FLAG[code] ?? "🌍";
};

export default function VendorQuotesPage() {
  const toast = useToast();
  const [requests, setRequests] = useState(MOCK_REQUESTS);
  const [activeRequest, setActiveRequest] = useState<string | null>(null);
  const [quoteForm, setQuoteForm] = useState({
    fclPrice: "", lclPrice: "", date1: "", date2: "", date3: "", appealPoints: "", companyIntro: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [filter, setFilter] = useState<"all" | "pending" | "quoted">("pending");

  const filtered = requests.filter((r) => {
    if (filter === "pending") return !r.quoted;
    if (filter === "quoted") return r.quoted;
    return true;
  });

  const pendingCount = requests.filter((r) => !r.quoted).length;

  const handleSubmitQuote = async (reqId: string) => {
    if (!quoteForm.fclPrice && !quoteForm.lclPrice) {
      toast.error("Price required", "Enter at least one price (FCL or LCL).");
      return;
    }
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1000));
    setRequests(requests.map((r) => r.id === reqId ? { ...r, quoted: true } : r));
    setActiveRequest(null);
    setQuoteForm({ fclPrice: "", lclPrice: "", date1: "", date2: "", date3: "", appealPoints: "", companyIntro: "" });
    setSubmitting(false);
    toast.success("Quote submitted!", "The customer will be notified shortly.");
  };

  const fmt = (n: number) => new Intl.NumberFormat("ko-KR").format(n);

  const activeReq = requests.find((r) => r.id === activeRequest);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 pb-16 md:pb-0">
      <Header />

      <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <PageHeader
          title="Quote Requests"
          subtitle={pendingCount > 0 ? `${pendingCount} requests waiting for your quote` : "All caught up! No pending requests."}
          badge={pendingCount > 0 ? { label: `${pendingCount} New`, color: "orange" } : { label: "All done", color: "green" }}
          actions={
            <div className="flex bg-gray-100 rounded-xl p-1 gap-1">
              {(["all", "pending", "quoted"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={clsx(
                    "px-3 py-1.5 text-sm font-medium rounded-lg capitalize transition-all",
                    filter === f ? "bg-white shadow-sm text-gray-900" : "text-gray-500 hover:text-gray-700"
                  )}
                >
                  {f}
                </button>
              ))}
            </div>
          }
        />

        <div className="grid lg:grid-cols-5 gap-5">
          {/* Request List */}
          <div className="lg:col-span-2 space-y-3">
            {filtered.length === 0 ? (
              <Card>
                <EmptyState
                  icon={filter === "quoted" ? "✅" : "📬"}
                  title={filter === "quoted" ? "No quoted yet" : "No pending requests"}
                  description={filter === "quoted" ? "Submitted quotes will appear here." : "New quote requests will appear here when customers submit them."}
                  size="sm"
                />
              </Card>
            ) : (
              filtered.map((req) => (
                <button
                  key={req.id}
                  onClick={() => setActiveRequest(activeRequest === req.id ? null : req.id)}
                  className={clsx(
                    "w-full text-left rounded-xl transition-all duration-200",
                    activeRequest === req.id ? "ring-2 ring-primary shadow-md" : "hover:shadow-sm"
                  )}
                >
                  <Card className={clsx(activeRequest === req.id && "border-primary")}>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="text-lg leading-none">{getFlag(req.destination)}</span>
                        <p className="font-semibold text-gray-900 text-sm truncate">
                          {req.origin} → {req.destination}
                        </p>
                      </div>
                      {req.quoted ? (
                        <span className="text-xs text-green-700 font-medium bg-green-50 border border-green-200 px-2 py-0.5 rounded-full flex-shrink-0 ml-2">
                          ✓ Quoted
                        </span>
                      ) : (
                        <span className="text-xs text-orange-700 font-medium bg-orange-50 border border-orange-200 px-2 py-0.5 rounded-full flex-shrink-0 ml-2 animate-pulse">
                          New
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mb-3">
                      <span className="font-medium text-gray-700">{req.customer}</span> · {req.receivedAt}
                    </p>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="bg-gray-50 rounded-lg px-2.5 py-2">
                        <p className="text-gray-400 mb-0.5">Volume</p>
                        <p className="font-semibold text-gray-800">{req.estimatedCbm} CBM</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg px-2.5 py-2">
                        <p className="text-gray-400 mb-0.5">Window</p>
                        <p className="font-semibold text-gray-800">{req.packingWindow}</p>
                      </div>
                    </div>
                    {req.notes && (
                      <div className="mt-2.5 bg-amber-50 border border-amber-100 rounded-lg px-2.5 py-1.5 text-xs text-amber-700 flex items-start gap-1.5">
                        <span>📝</span>
                        <span className="line-clamp-1">{req.notes}</span>
                      </div>
                    )}
                  </Card>
                </button>
              ))
            )}
          </div>

          {/* Quote Form */}
          <div className="lg:col-span-3">
            {!activeReq ? (
              <Card className="h-full min-h-[300px] flex items-center justify-center">
                <EmptyState
                  icon="📋"
                  title="Select a request"
                  description="Click a quote request on the left to review details and submit your pricing."
                  size="md"
                />
              </Card>
            ) : (
              <div className="animate-in fade-in slide-in-from-right-5 duration-200">
                <Card>
                  {/* Request summary */}
                  <div className="mb-5 pb-5 border-b border-gray-100">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xl">{getFlag(activeReq.destination)}</span>
                      <h3 className="font-bold text-gray-900">{activeReq.origin} → {activeReq.destination}</h3>
                    </div>
                    <p className="text-sm text-gray-500 mb-4">Customer: <span className="font-medium text-gray-700">{activeReq.customer}</span></p>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      {[
                        ["📦 Volume", `${activeReq.estimatedCbm} CBM`],
                        ["🗂 Items",   `${activeReq.items} items`],
                        ["📅 Window",  activeReq.packingWindow],
                      ].map(([k, v]) => (
                        <div key={k} className="bg-gray-50 rounded-xl p-2.5">
                          <p className="text-gray-400 mb-0.5">{k}</p>
                          <p className="font-semibold text-gray-800">{v}</p>
                        </div>
                      ))}
                    </div>
                    {activeReq.notes && (
                      <div className="mt-3 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2.5 text-xs text-amber-700 flex gap-2">
                        <span>⚠️</span>
                        <span>{activeReq.notes}</span>
                      </div>
                    )}
                  </div>

                  {/* Quote form */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-gray-800">Your Quote</h4>

                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { key: "fclPrice", label: "FCL Price (KRW)", placeholder: "3,200,000" },
                        { key: "lclPrice", label: "LCL Price (KRW)", placeholder: "1,800,000" },
                      ].map(({ key, label, placeholder }) => (
                        <div key={key} className="space-y-1">
                          <label className="text-xs font-medium text-gray-600">{label}</label>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">₩</span>
                            <input
                              type="number"
                              placeholder={placeholder}
                              value={quoteForm[key as keyof typeof quoteForm]}
                              onChange={(e) => setQuoteForm({ ...quoteForm, [key]: e.target.value })}
                              className="pl-7 w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all bg-gray-50 focus:bg-white"
                            />
                          </div>
                          {quoteForm[key as keyof typeof quoteForm] && (
                            <p className="text-xs text-gray-500 font-medium">
                              ₩{fmt(Number(quoteForm[key as keyof typeof quoteForm]))}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1.5">Available Packing Dates</label>
                      <div className="grid grid-cols-3 gap-2">
                        {["date1", "date2", "date3"].map((d) => (
                          <input
                            key={d}
                            type="date"
                            value={quoteForm[d as keyof typeof quoteForm]}
                            onChange={(e) => setQuoteForm({ ...quoteForm, [d]: e.target.value })}
                            className="w-full px-2 py-2 text-xs border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-gray-50 focus:bg-white transition-all"
                          />
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1.5">
                        Appeal Points <span className="text-gray-400 font-normal">(comma-separated)</span>
                      </label>
                      <textarea
                        rows={2}
                        placeholder="Dedicated manager, Full insurance, Free packing materials"
                        value={quoteForm.appealPoints}
                        onChange={(e) => setQuoteForm({ ...quoteForm, appealPoints: e.target.value })}
                        className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-gray-50 focus:bg-white transition-all resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1.5">
                        Company Introduction <span className="text-gray-400 font-normal">(optional)</span>
                      </label>
                      <textarea
                        rows={2}
                        placeholder="Brief intro about your company and why you're the best choice..."
                        value={quoteForm.companyIntro}
                        onChange={(e) => setQuoteForm({ ...quoteForm, companyIntro: e.target.value })}
                        className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-gray-50 focus:bg-white transition-all resize-none"
                      />
                    </div>

                    <Button
                      className="w-full"
                      size="lg"
                      loading={submitting}
                      onClick={() => handleSubmitQuote(activeReq.id)}
                    >
                      Submit Quote →
                    </Button>
                  </div>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
