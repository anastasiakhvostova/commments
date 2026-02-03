"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Translations = { ua: string; en: string; de: string };
export type Lang = keyof Translations; // "ua" | "en" | "de"

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => Promise<void>;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Lang>("ua");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLang = async () => {
      try {
        const res = await fetch("/api/lang/get");
        const data = await res.json();
        setLangState(data.lang);
      } catch {
        setLangState("ua");
      } finally {
        setLoading(false);
      }
    };
    fetchLang();
  }, []);

  const setLang = async (newLang: Lang) => {
    setLangState(newLang);
    try {
      await fetch("/api/lang/set", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lang: newLang }),
      });
    } catch (err) {
      console.error("Could not save language", err);
    }
  };

  if (loading) return null;

  return <LanguageContext.Provider value={{ lang, setLang }}>{children}</LanguageContext.Provider>;
};

export const useLanguage = (): LanguageContextValue => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
};
