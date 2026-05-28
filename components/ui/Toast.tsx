"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { clsx } from "clsx";

type ToastType = "success" | "error" | "info" | "warning";

interface Toast {
  id: string;
  type: ToastType;
  title: string;
  body?: string;
}

interface ToastContextValue {
  toast: (opts: Omit<Toast, "id">) => void;
  success: (title: string, body?: string) => void;
  error: (title: string, body?: string) => void;
  info: (title: string, body?: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const dismiss = useCallback((id: string) =>
    setToasts((prev) => prev.filter((t) => t.id !== id)), []);

  const toast = useCallback((opts: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev.slice(-4), { ...opts, id }]);
    setTimeout(() => dismiss(id), 4000);
  }, [dismiss]);

  const success = useCallback((title: string, body?: string) => toast({ type: "success", title, body }), [toast]);
  const error   = useCallback((title: string, body?: string) => toast({ type: "error",   title, body }), [toast]);
  const info    = useCallback((title: string, body?: string) => toast({ type: "info",    title, body }), [toast]);

  const ICONS: Record<ToastType, string> = {
    success: "✓", error: "✕", info: "ℹ", warning: "⚠",
  };
  const STYLES: Record<ToastType, string> = {
    success: "bg-green-50 border-green-200 text-green-800",
    error:   "bg-red-50 border-red-200 text-red-800",
    info:    "bg-blue-50 border-blue-200 text-blue-800",
    warning: "bg-amber-50 border-amber-200 text-amber-800",
  };
  const ICON_STYLES: Record<ToastType, string> = {
    success: "bg-green-500 text-white",
    error:   "bg-red-500 text-white",
    info:    "bg-blue-500 text-white",
    warning: "bg-amber-500 text-white",
  };

  return (
    <ToastContext.Provider value={{ toast, success, error, info }}>
      {children}
      {/* Toast container */}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={clsx(
              "flex items-start gap-3 w-80 max-w-xs px-4 py-3.5 rounded-2xl border shadow-lg",
              "pointer-events-auto",
              "animate-in slide-in-from-right-5 fade-in duration-300",
              STYLES[t.type]
            )}
          >
            <div className={clsx("w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5", ICON_STYLES[t.type])}>
              {ICONS[t.type]}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold leading-tight">{t.title}</p>
              {t.body && <p className="text-xs mt-0.5 opacity-80 leading-snug">{t.body}</p>}
            </div>
            <button
              onClick={() => dismiss(t.id)}
              className="text-current opacity-40 hover:opacity-70 text-sm leading-none flex-shrink-0 mt-0.5 transition-opacity"
            >✕</button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
