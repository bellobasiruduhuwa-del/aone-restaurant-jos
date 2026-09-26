import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useSettings } from "../context/SettingsContext";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/menu", label: "Menu" },
  { to: "/reviews", label: "Reviews" },
  { to: "/track", label: "Track Order" },
  { to: "/contact", label: "Contact Us" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { itemCount } = useCart();
  const { settings } = useSettings();

  const linkClass = ({ isActive }) =>
    `text-sm tracking-wide transition-colors ${
      isActive ? "text-jollof font-semibold" : "text-ink/80 hover:text-jollof"
    }`;

  return (
    <header className="sticky top-0 z-40 bg-cream/95 backdrop-blur border-b border-ink/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2 shrink-0" onClick={() => setOpen(false)}>
          <span className="w-9 h-9 rounded-full bg-jollof text-cream flex items-center justify-center font-display font-bold text-sm">
            A1
          </span>
          <span className="font-display font-semibold text-lg text-ink leading-none">
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

        <div className="hidden md:flex items-center gap-4">
          <Link
            to="/cart"
            className="relative flex items-center gap-2 border border-ink/15 rounded-full pl-4 pr-3 py-1.5 text-sm hover:border-jollof transition-colors"
          >
            Cart
            {itemCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-jollof text-cream text-xs flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Link>
        </div>

        <div className="flex items-center gap-1 md:hidden">
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
              className="text-ink"
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
            <div className="w-6 h-0.5 bg-ink mb-1.5" />
            <div className="w-6 h-0.5 bg-ink mb-1.5" />
            <div className="w-6 h-0.5 bg-ink" />
          </button>
        </div>
      </div>

      {open && (
        <nav className="md:hidden border-t border-ink/10 bg-cream px-4 pb-4 flex flex-col gap-3">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={linkClass}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
}
