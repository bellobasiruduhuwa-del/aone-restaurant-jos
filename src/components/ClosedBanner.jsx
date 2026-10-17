import React, { useEffect, useState } from "react";
import { useSettings } from "../context/SettingsContext";
import { useLanguage } from "../context/LanguageContext";
import { isOpenNow } from "../utils/hours";

export default function ClosedBanner() {
  const { settings } = useSettings();
  const { t } = useLanguage();
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setTick((t) => t + 1), 60000);
    return () => clearInterval(timer);
  }, []);

  const open = isOpenNow(settings.openTime, settings.closeTime);
  if (open) return null;

  return (
    <div className="bg-ink text-cream text-sm text-center py-2.5 px-4">
      {t("closed_banner", { hours: settings.openingHours || "—" })}
    </div>
  );
}
