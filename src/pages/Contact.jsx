import React from "react";
import { useSettings } from "../context/SettingsContext";
import { useLanguage } from "../context/LanguageContext";
import { toWhatsAppNumber } from "../utils/format";

export default function Contact() {
  const { settings } = useSettings();
  const { t } = useLanguage();
  const waHref = `https://wa.me/${toWhatsAppNumber(settings.whatsappNumber)}`;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="font-display text-4xl mb-8">{t("contact_title")}</h1>

      <div className="grid sm:grid-cols-2 gap-8">
        <div className="border border-ink/10 rounded-2xl p-6 bg-white">
          <h2 className="font-display text-lg mb-3 text-jollof">{t("contact_visit")}</h2>
          <p className="text-ink/70 text-sm mb-1">{settings.address}</p>
          <p className="text-ink/70 text-sm">{t("contact_open_daily", { hours: settings.openingHours })}</p>
        </div>

        <div className="border border-ink/10 rounded-2xl p-6 bg-white">
          <h2 className="font-display text-lg mb-3 text-jollof">{t("contact_call_whatsapp")}</h2>
          <p className="text-ink/70 text-sm mb-1">{settings.phone1}</p>
          <p className="text-ink/70 text-sm mb-4">{settings.phone2}</p>
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-palm text-cream px-5 py-2.5 rounded-full text-sm hover:bg-palm-dark transition-colors"
          >
            {t("contact_chat_whatsapp")}
          </a>
        </div>

        {settings.email && (
          <div className="border border-ink/10 rounded-2xl p-6 bg-white sm:col-span-2">
            <h2 className="font-display text-lg mb-2 text-jollof">{t("contact_email")}</h2>
            <p className="text-ink/70 text-sm">{settings.email}</p>
          </div>
        )}
      </div>
    </div>
  );
}
