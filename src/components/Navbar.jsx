import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useSettings } from "../context/SettingsContext";
import { useLanguage } from "../context/LanguageContext";
import LanguagePicker from "./LanguagePicker";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [showLangPicker, setShowLangPicker] = useState(false);
  const { itemCount } = useCart();
  const { settings } = useSettings();
  const { t } = useLanguage();

  const links = [
    { to: "/", label: t("nav_home") },
    { to: "/about", label: t("nav_about") },
    { to: "/menu", label: t("nav_menu") },
    { to: "/reviews", label: t("nav_reviews") },
    { to: "/track", label: t("nav_track") },
    { to: "/contact", label: t("nav_contact") },
  ];

  const linkClass = ({ isActive }) =>
    `text-sm tracking-wide transition-colors ${
      isActive ? "text-gold font-semibold" : "text-cream/85 hover:text-cream"
    }`;

  const mobileLinkClass = ({ isActive }) =>
    `text-sm tracking-wide transition-colors ${
      isActive ? "text-jollof font-semibold" : "text-ink/80 hover:text-jollof"
    }`;

  return (
    <header className="sticky top-0 z-40 bg-palm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16 relative z-10">
        <Link to="/" className="flex items-center gap-2 shrink-0" onClick={() => setOpen(false)}>
          <span className="w-9 h-9 rounded-full bg-jollof text-cream flex items-center justify-center font-display font-bold text-sm">
            A1
          </span>
          <span className="font-display font-semibold text-lg text-cream leading-none">
            {settings.brandName || "AONE RESTAURANT"}
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} className={linkClass} end={l.to === "/"}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => setShowLangPicker(true)}
            aria-label="Change language"
            title="Change language"
            className="w-9 h-9 rounded-full border border-cream/30 text-cream flex items-center justify-center hover:border-cream/60 transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10Z" />
            </svg>
          </button>
          <Link
            to="/cart"
            className="relative flex items-center gap-2 border border-cream/30 text-cream rounded-full pl-4 pr-3 py-1.5 text-sm hover:border-cream/60 transition-colors"
          >
            {t("nav_cart")}
            {itemCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-jollof text-cream text-xs flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Link>
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <button
            onClick={() => setShowLangPicker(true)}
            aria-label="Change language"
            className="p-2 text-cream"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10Z" />
            </svg>
          </button>
          <Link
            to="/cart"
            className="relative p-2"
            aria-label={`Cart, ${itemCount} item${itemCount === 1 ? "" : "s"}`}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-cream"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            {itemCount > 0 && (
              <span className="absolute top-0 right-0 w-4.5 h-4.5 min-w-[18px] rounded-full bg-jollof text-cream text-[10px] font-bold flex items-center justify-center px-1">
                {itemCount}
              </span>
            )}
          </Link>
          <button
            className="p-2"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <div className="w-6 h-0.5 bg-cream mb-1.5" />
            <div className="w-6 h-0.5 bg-cream mb-1.5" />
            <div className="w-6 h-0.5 bg-cream" />
          </button>
        </div>
      </div>

      {/* Curved bottom edge — pure CSS/SVG shape, no fixed logo or brand asset */}
      {!open && (
        <svg
          className="block w-full h-4 sm:h-5 -mb-px text-cream"
          viewBox="0 0 100 10"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M0,0 Q50,10 100,0 L100,10 L0,10 Z" fill="currentColor" />
        </svg>
      )}

      {open && (
        <nav className="md:hidden border-t border-ink/10 bg-cream px-4 pb-4 flex flex-col gap-3">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={mobileLinkClass}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
      )}

      {showLangPicker && (
        <LanguagePicker standalone onDone={() => setShowLangPicker(false)} />
      )}
    </header>
  );
}
