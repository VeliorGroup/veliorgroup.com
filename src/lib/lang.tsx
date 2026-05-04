"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { COPY, type Copy, type Lang } from "./copy";

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Copy;
};

const LangCtx = createContext<Ctx | null>(null);

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const saved = (typeof window !== "undefined" ? localStorage.getItem("velior:lang") : null) as Lang | null;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- hydrate from localStorage after mount
    if (saved === "en" || saved === "it" || saved === "sq") setLangState(saved);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem("velior:lang", l);
  };

  return <LangCtx.Provider value={{ lang, setLang, t: COPY[lang] }}>{children}</LangCtx.Provider>;
}

export function useLang(): Ctx {
  const ctx = useContext(LangCtx);
  if (!ctx) throw new Error("useLang must be used inside LangProvider");
  return ctx;
}
