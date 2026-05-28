"use client";

import { clsx } from "clsx";

const STAGES = [
  { key: "QUOTING",    en: "Quote",      ko: "견적",    subEn: "Requested",     subKo: "요청됨",      icon: "📋" },
  { key: "CONTRACTED", en: "Contract",   ko: "계약",    subEn: "Signed",        subKo: "계약 완료",   icon: "✍️" },
  { key: "PACKED",     en: "Packed",     ko: "포장",    subEn: "& Collected",   subKo: "& 수거",      icon: "📦" },
  { key: "IN_TRANSIT", en: "In Transit", ko: "운송 중",  subEn: "On the water",  subKo: "해상 운송",   icon: "🚢" },
  { key: "ARRIVED",    en: "Arrived",    ko: "도착",    subEn: "At destination", subKo: "목적지 도착", icon: "⚓" },
  { key: "DELIVERED",  en: "Delivered",  ko: "배달완료", subEn: "Completed",     subKo: "완료",        icon: "🏠" },
];

interface TrackingEvent {
  id: string;
  status: string;
  location?: string | null;
  note?: string | null;
  timestamp: string;
}

interface StatusTrackerProps {
  currentStatus: string;
  events?: TrackingEvent[];
  lang?: string;
}

export default function StatusTracker({ currentStatus, events = [], lang = "en" }: StatusTrackerProps) {
  const currentIndex = STAGES.findIndex((s) => s.key === currentStatus);
  const progressPct = currentIndex === 0 ? 0 : (currentIndex / (STAGES.length - 1)) * 100;
  const cur = STAGES[currentIndex];

  return (
    <div className="space-y-6">
      {/* Progress Header */}
      <div className="flex items-center justify-between mb-1">
        <div>
          <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">
            {lang === "ko" ? "현재 상태" : "Current Status"}
          </p>
          <p className="text-base font-bold text-gray-900 mt-0.5">
            {cur?.icon} {lang === "ko" ? cur?.ko : cur?.en} — {lang === "ko" ? cur?.subKo : cur?.subEn}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-400">Progress</p>
          <p className="text-lg font-bold text-primary">{Math.round(progressPct)}%</p>
        </div>
      </div>

      {/* Overall progress bar */}
      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-400 via-primary to-primary-700 rounded-full transition-all duration-700 ease-out"
          style={{ width: `${progressPct}%` }}
        />
      </div>

      {/* Stage Nodes */}
      <div className="relative mt-4 px-2">
        {/* Connector track */}
        <div className="absolute top-5 left-6 right-6 h-0.5 bg-gray-100">
          <div
            className="h-full bg-gradient-to-r from-blue-400 via-primary to-primary-700 transition-all duration-700 ease-out"
            style={{ width: `${progressPct}%` }}
          />
        </div>

        <div className="relative flex justify-between">
          {STAGES.map((stage, i) => {
            const done   = i < currentIndex;
            const active = i === currentIndex;
            const future = i > currentIndex;

            return (
              <div key={stage.key} className="flex flex-col items-center gap-2" style={{ flex: "1" }}>
                {/* Node */}
                <div className={clsx(
                  "relative w-10 h-10 rounded-full flex items-center justify-center z-10 transition-all duration-300 border-2",
                  done   && "bg-primary border-primary shadow-sm",
                  active && "bg-white border-primary shadow-lg scale-110",
                  future && "bg-white border-gray-200"
                )}>
                  {done ? (
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <span className={clsx("text-base leading-none", future && "opacity-30")}>
                      {stage.icon}
                    </span>
                  )}
                  {/* Active pulse ring */}
                  {active && (
                    <span className="absolute inset-0 rounded-full border-2 border-primary animate-ping opacity-30" />
                  )}
                </div>

                {/* Labels */}
                <div className="text-center">
                  <p className={clsx(
                    "text-xs font-semibold leading-tight",
                    active ? "text-primary" : done ? "text-gray-700" : "text-gray-300"
                  )}>
                    {lang === "ko" ? stage.ko : stage.en}
                  </p>
                  <p className={clsx(
                    "text-[10px] leading-tight hidden sm:block",
                    active ? "text-primary/70" : done ? "text-gray-400" : "text-gray-200"
                  )}>
                    {lang === "ko" ? stage.subKo : stage.subEn}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Event Timeline */}
      {events.length > 0 && (
        <div className="mt-2">
          <div className="flex items-center gap-2 mb-3">
            <p className="text-sm font-semibold text-gray-700">
              {lang === "ko" ? "추적 이력" : "Tracking History"}
            </p>
            <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
              {events.length} {lang === "ko" ? "건" : "events"}
            </span>
          </div>
          <div className="relative space-y-0">
            {/* Vertical line */}
            <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-gray-100" />

            {[...events].reverse().map((event, i) => (
              <div
                key={event.id}
                className={clsx(
                  "flex items-start gap-3 pl-0 py-2.5",
                  "animate-in fade-in slide-in-from-bottom-4 duration-300"
                )}
                style={{ animationDelay: `${i * 50}ms` }}
              >
                {/* Dot */}
                <div className={clsx(
                  "w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 z-10 mt-0.5",
                  i === 0 ? "bg-primary" : "bg-gray-200"
                )}>
                  {i === 0 && (
                    <div className="w-2 h-2 rounded-full bg-white" />
                  )}
                </div>

                <div className="flex-1 min-w-0 bg-white rounded-xl border border-gray-100 px-3 py-2.5 shadow-sm">
                  <div className="flex items-start justify-between gap-2">
                    <p className={clsx(
                      "text-sm font-semibold",
                      i === 0 ? "text-primary" : "text-gray-700"
                    )}>
                      {event.status.replace(/_/g, " ")}
                    </p>
                    <span className="text-xs text-gray-400 flex-shrink-0 mt-0.5">
                      {new Date(event.timestamp).toLocaleDateString("en-US", {
                        month: "short", day: "numeric",
                      })}
                    </span>
                  </div>
                  {event.location && (
                    <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                      <span>📍</span> {event.location}
                    </p>
                  )}
                  {event.note && (
                    <p className="text-xs text-gray-600 mt-1">{event.note}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
