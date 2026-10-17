import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { subscribeToProducts } from "../firebase/products";
import { subscribeToCategories } from "../firebase/categories";
import { useSettings } from "../context/SettingsContext";
import { useLanguage } from "../context/LanguageContext";
import { toWhatsAppNumber } from "../utils/format";
import FoodCard from "../components/FoodCard";
import SkeletonCard from "../components/SkeletonCard";

export default function Menu() {
  const { settings } = useSettings();
  const { t } = useLanguage();
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [sort, setSort] = useState("popular");
  const [loading, setLoading] = useState(true);

  const SORT_OPTIONS = [
    { value: "popular", label: t("menu_sort_popular") },
    { value: "price-asc", label: t("menu_sort_price_asc") },
    { value: "price-desc", label: t("menu_sort_price_desc") },
    { value: "name", label: t("menu_sort_name") },
  ];

  useEffect(() => {
    const unsubProducts = subscribeToProducts(
      (data) => {
        setProducts(data);
        setLoading(false);
      },
      () => {
        setProducts([]);
        setLoading(false);
      }
    );
    const unsubCategories = subscribeToCategories(setCategories, () => setCategories([]));
    return () => {
      unsubProducts();
      unsubCategories();
    };
  }, []);

  useEffect(() => {
    const catParam = searchParams.get("category");
    if (catParam) setActiveCategory(catParam);
  }, [searchParams]);

  const filtered = useMemo(() => {
    let list = [...products];

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (p) =>
          p.name?.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q) ||
          p.category?.toLowerCase().includes(q)
      );
    }

    if (activeCategory !== "All") {
      list = list.filter((p) => p.category === activeCategory);
    }

    switch (sort) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "name":
        list.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        list.sort((a, b) => Number(b.featured) - Number(a.featured));
    }

    return list;
  }, [products, search, activeCategory, sort]);

  const categoryNames = ["All", ...categories.map((c) => c.name)];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="font-display text-4xl mb-2">{t("menu_title")}</h1>
      <p className="text-ink/60 mb-8">{t("menu_subtitle")}</p>

      <div className="flex flex-col lg:flex-row gap-6 mb-8">
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t("menu_search_placeholder")}
          className="w-full lg:max-w-sm border border-ink/15 rounded-full px-5 py-2.5 text-sm focus:border-jollof outline-none"
        />

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border border-ink/15 rounded-full px-5 py-2.5 text-sm bg-white lg:ml-auto"
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {t("menu_sort_prefix")}
              {o.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-4 mb-6 -mx-1 px-1">
        {categoryNames.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm border transition-colors ${
              activeCategory === cat
                ? "bg-jollof text-cream border-jollof"
                : "border-ink/15 text-ink/70 hover:border-ink/40"
            }`}
          >
            {cat === "All" ? t("menu_all") : cat}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <p className="text-ink/50 text-sm py-16 text-center">{t("menu_no_match")}</p>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
          {filtered.map((p) => (
            <FoodCard key={p.id} product={p} />
          ))}
        </div>
      )}

      <div className="mt-10 bg-palm/5 border border-palm/15 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <p className="font-display text-xl text-palm-dark mb-1">{t("menu_banner_title")}</p>
          <p className="text-sm text-ink/60">{t("menu_banner_body")}</p>
        </div>
        <a
          href={`https://wa.me/${toWhatsAppNumber(settings.whatsappNumber)}?text=${encodeURIComponent(
            `Hello ${settings.brandName}, I'd like to place an order.`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 bg-palm text-cream px-6 py-3 rounded-full text-sm font-medium hover:bg-palm-dark transition-colors whitespace-nowrap"
        >
          {t("menu_order_whatsapp")}
        </a>
      </div>
    </div>
  );
}
