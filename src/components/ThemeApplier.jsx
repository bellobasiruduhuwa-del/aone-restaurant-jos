import { useEffect } from "react";
import { useSettings } from "../context/SettingsContext";

const VAR_MAP = {
  jollof: "--color-jollof",
  jollofDark: "--color-jollof-dark",
  jollofLight: "--color-jollof-light",
  palm: "--color-palm",
  palmDark: "--color-palm-dark",
  palmLight: "--color-palm-light",
  cream: "--color-cream",
  ink: "--color-ink",
  gold: "--color-gold",
};

export default function ThemeApplier() {
  const { settings } = useSettings();

  useEffect(() => {
    const colors = settings.themeColors;
    if (!colors) return;
    const root = document.documentElement;
    Object.entries(VAR_MAP).forEach(([key, cssVar]) => {
      if (colors[key]) root.style.setProperty(cssVar, colors[key]);
    });
  }, [settings.themeColors]);

  return null;
}
