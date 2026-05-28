"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";
import translations, { type Lang } from "./translations";

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
  tArr: (key: string) => string[];
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ko");

  // Restore from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("moveus-lang") as Lang | null;
      if (saved === "en" || saved === "ko") setLangState(saved);
    } catch {}
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem("moveus-lang", l);
    } catch {}
  }, []);

  // Resolve a dot-path key like "home.heroTitle" → string
  const t = useCallback(
    (key: string): string => {
      const keys = key.split(".");
      let value: unknown = translations[lang];
      for (const k of keys) {
        value = (value as Record<string, unknown>)?.[k];
      }
      if (typeof value === "string") return value;
      // Fallback to English
      let fallback: unknown = translations["en"];
      for (const k of keys) {
        fallback = (fallback as Record<string, unknown>)?.[k];
      }
      return typeof fallback === "string" ? fallback : key;
    },
    [lang]
  );

  // For keys that are string arrays
  const tArr = useCallback(
    (key: string): string[] => {
      const keys = key.split(".");
      let value: unknown = translations[lang];
      for (const k of keys) {
        value = (value as Record<string, unknown>)?.[k];
      }
      if (Array.isArray(value)) return value as string[];
      let fallback: unknown = translations["en"];
      for (const k of keys) {
        fallback = (fallback as Record<string, unknown>)?.[k];
      }
      return Array.isArray(fallback) ? (fallback as string[]) : [];
    },
    [lang]
  );

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, tArr }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
