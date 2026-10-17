import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { LANGUAGES } from "../i18n/translations";
import { t as translate } from "../i18n/translations";

/**
 * Full-screen language gate. Shown over everything else the very first
 * time someone opens the site (before they can reach any page), and
 * again later if they tap "change language" from the nav. Once a
 * choice is made it's remembered (localStorage) so returning visitors
 * on the same phone/browser don't see it again.
 */
export default function LanguagePicker({ standalone = false, onDone }) {
  const { language, setLanguage } = useLanguage();

  function choose(code) {
    setLanguage(code);
    onDone?.();
  }

  return (
    <div className="fixed inset-0 z-[200] bg-cream flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <span className="w-14 h-14 rounded-full bg-jollof text-cream flex items-center justify-center font-display font-bold text-lg mx-auto mb-4">
            A1
          </span>
          <h1 className="font-display text-2xl mb-2">
            {translate("choose_language_title", language || "en")}
          </h1>
          <p className="text-ink/50 text-sm">
            {translate("choose_language_subtitle", language || "en")}
          </p>
        </div>

        <div className="space-y-3">
          {LANGUAGES.map((l) => (
            <button
              key={l.code}
              onClick={() => choose(l.code)}
              className="w-full flex items-center justify-between border border-ink/15 rounded-2xl px-5 py-4 text-left hover:border-jollof hover:bg-jollof/5 transition-colors"
            >
              <span className="font-display text-lg">{l.nativeName}</span>
              {l.nativeName !== l.englishName && (
                <span className="text-xs text-ink/40">{l.englishName}</span>
              )}
            </button>
          ))}
        </div>

        {standalone && (
          <button onClick={onDone} className="w-full text-center text-sm text-ink/40 mt-6 hover:text-jollof">
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}
