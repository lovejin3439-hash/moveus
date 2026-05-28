"use client";

import { Card } from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { clsx } from "clsx";

interface QuoteCardProps {
  quote: {
    id: string;
    vendorId: string;
    vendor: {
      companyName: string;
      rating: number;
      reviewCount: number;
      badgeTier?: string | null;
    };
    fclPrice?: number | null;
    lclPrice?: number | null;
    availableDates: string[];
    appealPoints?: string | null;
    selected?: boolean;
  };
  onSelect?: (quoteId: string) => void;
  selected?: boolean;
  recommended?: boolean;
}

export default function QuoteCard({ quote, onSelect, selected, recommended }: QuoteCardProps) {
  const fmt = (n: number) =>
    new Intl.NumberFormat("ko-KR", { style: "currency", currency: "KRW" }).format(n);

  const stars = Array.from({ length: 5 }, (_, i) => i < Math.round(quote.vendor.rating));

  return (
    <div className={clsx(
      "relative rounded-2xl border bg-white transition-all duration-200",
      selected
        ? "border-primary ring-2 ring-primary ring-offset-2 shadow-lg"
        : "border-gray-200 hover:border-primary/30 hover:shadow-md",
    )}>
      {/* Recommended badge */}
      {recommended && (
        <div className="absolute -top-3 left-5 z-10">
          <span className="inline-flex items-center gap-1 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
            ⭐ Recommended
          </span>
        </div>
      )}

      <div className="p-5 sm:p-6">
        {/* Vendor header */}
        <div className="flex items-start justify-between mb-4 gap-3">
          <div className="flex items-start gap-3 min-w-0">
            <div className="w-11 h-11 bg-primary-50 rounded-xl flex items-center justify-center text-primary font-extrabold text-base flex-shrink-0 border border-primary-100">
              {quote.vendor.companyName.charAt(0)}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-0.5">
                <h3 className="font-bold text-gray-900 text-base">{quote.vendor.companyName}</h3>
                {quote.vendor.badgeTier && (
                  <Badge variant="teal">{quote.vendor.badgeTier}</Badge>
                )}
              </div>
              <div className="flex items-center gap-1.5">
                <div className="flex gap-0.5">
                  {stars.map((filled, i) => (
                    <span key={i} className={`text-xs ${filled ? "text-yellow-400" : "text-gray-200"}`}>★</span>
                  ))}
                </div>
                <span className="text-sm font-semibold text-gray-800">{quote.vendor.rating.toFixed(1)}</span>
                <span className="text-xs text-gray-400">({quote.vendor.reviewCount} reviews)</span>
              </div>
            </div>
          </div>
          {selected && (
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          )}
        </div>

        {/* Price section */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {quote.fclPrice && (
            <div className={clsx(
              "rounded-xl p-3.5 border",
              selected ? "bg-primary-50 border-primary-200" : "bg-gray-50 border-transparent"
            )}>
              <p className="text-xs text-gray-500 mb-1 font-medium">FCL (Full Container)</p>
              <p className={clsx("font-extrabold text-lg", selected ? "text-primary" : "text-gray-900")}>
                {fmt(quote.fclPrice)}
              </p>
            </div>
          )}
          {quote.lclPrice && (
            <div className="bg-gray-50 rounded-xl p-3.5 border border-transparent">
              <p className="text-xs text-gray-500 mb-1 font-medium">LCL (Shared Container)</p>
              <p className="font-extrabold text-lg text-gray-900">{fmt(quote.lclPrice)}</p>
            </div>
          )}
        </div>

        {/* Appeal points */}
        {quote.appealPoints && (
          <div className="mb-4">
            <p className="text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">Why choose us</p>
            <div className="flex flex-wrap gap-1.5">
              {quote.appealPoints.split(",").map((point, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1 text-xs text-primary bg-primary-50 px-2.5 py-1 rounded-full border border-primary-100 font-medium"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  {point.trim()}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Available dates */}
        {quote.availableDates.length > 0 && (
          <div className="mb-5">
            <p className="text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">Available Packing Dates</p>
            <div className="flex flex-wrap gap-1.5">
              {quote.availableDates.map((d, i) => (
                <span
                  key={i}
                  className="text-xs bg-white border border-gray-200 text-gray-700 px-2.5 py-1 rounded-full font-medium hover:border-primary hover:text-primary transition-colors cursor-default"
                >
                  📅 {new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        {onSelect && (
          <button
            onClick={() => onSelect(quote.id)}
            className={clsx(
              "w-full py-3 rounded-xl text-sm font-bold transition-all duration-200",
              selected
                ? "bg-primary-50 text-primary border-2 border-primary"
                : "bg-primary text-white hover:bg-primary-700 shadow-sm hover:shadow-md"
            )}
          >
            {selected ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                Vendor Selected
              </span>
            ) : (
              "Select This Vendor →"
            )}
          </button>
        )}
      </div>
    </div>
  );
}
