"use client";

import { clsx } from "clsx";

interface Step {
  label: string;
  description?: string;
}

interface StepIndicatorProps {
  steps: Step[];
  current: number; // 0-indexed
  className?: string;
}

export default function StepIndicator({ steps, current, className }: StepIndicatorProps) {
  return (
    <div className={clsx("flex items-center gap-0", className)}>
      {steps.map((step, i) => {
        const done    = i < current;
        const active  = i === current;
        const future  = i > current;

        return (
          <div key={step.label} className="flex items-center">
            {/* Node */}
            <div className="flex flex-col items-center">
              <div
                className={clsx(
                  "w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold border-2 transition-all duration-300",
                  done   && "bg-primary border-primary text-white shadow-sm",
                  active && "border-primary text-primary bg-white shadow-md scale-110",
                  future && "border-gray-200 text-gray-300 bg-white"
                )}
              >
                {done ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  i + 1
                )}
              </div>
              <div className="hidden sm:block mt-1.5 text-center">
                <p className={clsx(
                  "text-xs font-semibold whitespace-nowrap transition-colors",
                  active ? "text-primary" : done ? "text-gray-700" : "text-gray-300"
                )}>
                  {step.label}
                </p>
                {step.description && (
                  <p className="text-xs text-gray-400 whitespace-nowrap">{step.description}</p>
                )}
              </div>
            </div>

            {/* Connector */}
            {i < steps.length - 1 && (
              <div className={clsx(
                "h-0.5 w-10 sm:w-16 mx-1 transition-all duration-500",
                i < current ? "bg-primary" : "bg-gray-200"
              )} />
            )}
          </div>
        );
      })}
    </div>
  );
}
