import React from "react";
import { NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useLanguage } from "../context/LanguageContext";

function Icon({ name }) {
  switch (name) {
    case "home":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 10.5 12 3l9 7.5" />
          <path d="M5 9.5V20a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V9.5" />
        </svg>
      );
    case "menu":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      );
    case "cart":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>
      );
    case "contact":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z" />
        </svg>
      );
    case "track":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 21s-7-5.33-7-11a7 7 0 1 1 14 0c0 5.67-7 11-7 11Z" />
          <circle cx="12" cy="10" r="2.5" />
        </svg>
      );
    default:
      return null;
  }
}

export default function BottomTabBar() {
  const { itemCount } = useCart();
  const { t } = useLanguage();

  const TABS = [
    { to: "/", label: t("tab_home"), icon: "home" },
    { to: "/menu", label: t("tab_menu"), icon: "menu" },
    { to: "/cart", label: t("tab_cart"), icon: "cart" },
    { to: "/contact", label: t("tab_contact"), icon: "contact" },
    { to: "/track", label: t("tab_track"), icon: "track" },
  ];

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-ink/10 flex items-stretch md:hidden"
      style={{
        paddingBottom: "env(safe-area-inset-bottom)",
        // Forces the phone's browser to render this bar on its own fast layer,
        // so it stays glued to the bottom instead of visually lagging/scrolling
        // along with the page for a moment during a fast scroll.
        transform: "translateZ(0)",
        WebkitTransform: "translateZ(0)",
        willChange: "transform",
      }}
    >
      {TABS.map((tab) => (
        <NavLink
          key={tab.to}
          to={tab.to}
          end={tab.to === "/"}
          className={({ isActive }) =>
            `flex-1 flex flex-col items-center justify-center gap-0.5 py-2 text-[11px] ${
              isActive ? "text-jollof" : "text-ink/50"
            }`
          }
        >
          <span className="relative">
            <Icon name={tab.icon} />
            {tab.to === "/cart" && itemCount > 0 && (
              <span className="absolute -top-1.5 -right-2 w-4 h-4 min-w-[16px] rounded-full bg-jollof text-cream text-[9px] font-bold flex items-center justify-center px-0.5">
                {itemCount}
              </span>
            )}
          </span>
          {tab.label}
        </NavLink>
      ))}
    </nav>
  );
}
