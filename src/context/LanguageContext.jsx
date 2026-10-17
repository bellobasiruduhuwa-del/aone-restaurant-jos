import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { t as translate, DEFAULT_LANGUAGE } from "../i18n/translations";

const LanguageContext = createContext(null);
const STORAGE_KEY = "aone_language";

// Arabic is read right-to-left. Setting dir="rtl" on <html> flips text
// direction and native browser behaviour (cursor position, text alignment,
// form inputs) automatically. It does NOT mirror this app's own layout —
// buttons, icons and spacing stay left-to-right — but it's a real,
// worthwhile improvement for Arabic readers with zero risk to the other
// six languages, which are unaffected.
const RTL_LANGUAGES = ["ar"];

function loadStoredLanguage() {
  try {
    return localStorage.getItem(STORAGE_KEY) || null;
  } catch {
    return null;
  }
}

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(loadStoredLanguage);

  const setLanguage = (code) => {
    setLanguageState(code);
    try {
      localStorage.setItem(STORAGE_KEY, code);
    } catch {
      // Private browsing / storage blocked — language just won't persist.
    }
  };

  const clearLanguage = () => {
    setLanguageState(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  };

  const activeLang = language || DEFAULT_LANGUAGE;

  useEffect(() => {
    try {
      document.documentElement.dir = RTL_LANGUAGES.includes(activeLang) ? "rtl" : "ltr";
    } catch {
      /* ignore — purely cosmetic */
    }
  }, [activeLang]);

  const value = useMemo(() => {
    return {
      language: activeLang,
      languageChosen: Boolean(language),
      setLanguage,
      clearLanguage,
      t: (key, vars) => translate(key, activeLang, vars),
    };
  }, [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
  return ctx;
}
