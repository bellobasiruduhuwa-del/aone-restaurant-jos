import React, { createContext, useContext, useMemo, useState } from "react";
import { t as translate, DEFAULT_LANGUAGE } from "../i18n/translations";

const LanguageContext = createContext(null);
const STORAGE_KEY = "aone_language";

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

  const value = useMemo(() => {
    const activeLang = language || DEFAULT_LANGUAGE;
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
