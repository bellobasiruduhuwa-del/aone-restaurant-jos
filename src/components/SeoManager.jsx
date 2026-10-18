import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Keeps the browser-tab title, description, canonical link and robots tag
// correct on every page. The home page keeps the exact values written in
// index.html; other pages get their own unique title + description.
// Purely additive: it only edits <head> tags, nothing visible on screen.

const SITE = "https://www.aonerestaurantjos.com.ng";
const NAME = "AONE Restaurant & Fast Food Jos";

const PAGES = {
  "/": {
    title: `${NAME} | Official Website`,
    description:
      "Order Nigerian meals, fast food, drinks and snacks online from AONE Restaurant & Fast Food on Bauchi Road, Jos. Dine-in, takeaway or delivery.",
  },
  "/menu": {
    title: `Menu | ${NAME}`,
    description:
      "Browse the AONE Restaurant menu in Jos: Nigerian meals, fast food, snacks and drinks. Add to cart and order online for pickup or delivery.",
  },
  "/about": {
    title: `About Us | ${NAME}`,
    description:
      "Learn about AONE Restaurant & Fast Food, serving quality Nigerian meals and friendly service on Bauchi Road, Jos, Plateau State.",
  },
  "/contact": {
    title: `Contact & Location | ${NAME}`,
    description:
      "Find AONE Restaurant & Fast Food at Daffo House, Bauchi Road, Jos. Call, WhatsApp or visit us for dine-in, takeaway and delivery.",
  },
  "/reviews": {
    title: `Customer Reviews | ${NAME}`,
    description:
      "Read what customers say about AONE Restaurant & Fast Food in Jos, and share your own experience.",
  },
};

// Pages that should not appear in Google (private or per-customer).
const NOINDEX_PREFIXES = ["/admin", "/cart", "/checkout", "/track"];

function setMeta(selector, create, value) {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  return el;
}

export default function SeoManager() {
  const { pathname } = useLocation();

  useEffect(() => {
    try {
      const path = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
      const noindex = NOINDEX_PREFIXES.some((p) => path === p || path.startsWith(p + "/"));
      const page = PAGES[path];
      const isProduct = path.startsWith("/menu/");

      const title = page
        ? page.title
        : isProduct
        ? `Menu Item | ${NAME}`
        : noindex
        ? `${NAME}`
        : `Page not found | ${NAME}`;
      const description = page
        ? page.description
        : PAGES["/menu"].description;

      document.title = title;

      const desc = setMeta('meta[name="description"]', () => {
        const m = document.createElement("meta");
        m.setAttribute("name", "description");
        return m;
      });
      desc.setAttribute("content", description);

      const canonical = setMeta('link[rel="canonical"]', () => {
        const l = document.createElement("link");
        l.setAttribute("rel", "canonical");
        return l;
      });
      canonical.setAttribute("href", path === "/" ? `${SITE}/` : `${SITE}${path}`);

      const robots = setMeta('meta[name="robots"]', () => {
        const m = document.createElement("meta");
        m.setAttribute("name", "robots");
        return m;
      });
      robots.setAttribute(
        "content",
        noindex || (!page && !isProduct)
          ? "noindex, nofollow"
          : "index, follow, max-image-preview:large"
      );
    } catch {
      /* cosmetic only — never break the app over a meta tag */
    }
  }, [pathname]);

  return null;
}
