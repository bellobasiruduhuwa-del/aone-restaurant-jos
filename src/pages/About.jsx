import React from "react";
import { useSettings } from "../context/SettingsContext";
import { useLanguage } from "../context/LanguageContext";

export default function About() {
  const { settings } = useSettings();
  const { t } = useLanguage();

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="font-display text-4xl mb-4">{t("about_title", { brand: settings.brandName })}</h1>
      <p className="text-ink/60 mb-12">{settings.slogan}</p>

      <div className="space-y-10">
        <section>
          <h2 className="font-display text-2xl mb-2 text-jollof">{t("about_our_story")}</h2>
          <p className="text-ink/70 leading-relaxed">
            {settings.brandName} started in Jos, Plateau State, with a simple
            goal: serve Nigerian meals and fast food that taste like home,
            made fast enough for a busy day. [Editable placeholder — replace
            with your real founding story from the Admin Dashboard.]
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl mb-2 text-jollof">{t("about_our_mission")}</h2>
          <p className="text-ink/70 leading-relaxed">
            To serve quality, affordable food quickly and consistently to
            every customer who walks through our doors or orders online.
            [Editable placeholder.]
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl mb-2 text-jollof">{t("about_our_vision")}</h2>
          <p className="text-ink/70 leading-relaxed">
            To become Jos's most trusted name in Nigerian meals and fast
            food, known for consistency and warm service. [Editable placeholder.]
          </p>
        </section>

        <section className="grid sm:grid-cols-3 gap-6 pt-4">
          <div>
            <h3 className="font-display text-lg mb-1 text-palm-dark">{t("about_quality_food")}</h3>
            <p className="text-sm text-ink/60">{t("about_quality_food_body")}</p>
          </div>
          <div>
            <h3 className="font-display text-lg mb-1 text-palm-dark">{t("about_customer_satisfaction")}</h3>
            <p className="text-sm text-ink/60">{t("about_customer_satisfaction_body")}</p>
          </div>
          <div>
            <h3 className="font-display text-lg mb-1 text-palm-dark">{t("about_clean_environment")}</h3>
            <p className="text-sm text-ink/60">{t("about_clean_environment_body")}</p>
          </div>
        </section>
      </div>
    </div>
  );
}
