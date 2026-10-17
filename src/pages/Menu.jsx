import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { subscribeToProducts } from "../firebase/products";
import { subscribeToCategories } from "../firebase/categories";
import { useSettings } from "../context/SettingsContext";
import { toWhatsAppNumber } from "../utils/format";
import FoodCard from "../components/FoodCard";
import SkeletonCard from "../components/SkeletonCard";

const SORT_OPTIONS = [
  { value: "popular", label: "Most popular" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "name", label: "Name A–Z" },
];

export default function Menu() {
  const { settings } = useSettings();
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [sort, setSort] = useState("popular");
  const [loading, setLoading] = useState(true);

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

  // Deep-link support: /menu?category=Drinks preselects that category,
  // e.g. when arriving from the homepage category circles.
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
        // "popular": featured first, then newest (createdAt already desc from query)
        list.sort((a, b) => Number(b.featured) - Number(a.featured));
    }

    return list;
  }, [products, search, activeCategory, sort]);

  const categoryNames = ["All", ...categories.map((c) => c.name)];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="font-display text-4xl mb-2">Our Menu</h1>
      <p className="text-ink/60 mb-8">
        Search, filter, and add your favourites to the cart.
      </p>

      <div className="flex flex-col lg:flex-row gap-6 mb-8">
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search for food…"
          className="w-full lg:max-w-sm border border-ink/15 rounded-full px-5 py-2.5 text-sm focus:border-jollof outline-none"
        />

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border border-ink/15 rounded-full px-5 py-2.5 text-sm bg-white lg:ml-auto"
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              Sort: {o.label}
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
            {cat}
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
        <p className="text-ink/50 text-sm py-16 text-center">
          No dishes match your search yet. Try a different keyword or category.
        </p>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
          {filtered.map((p) => (
            <FoodCard key={p.id} product={p} />
          ))}
        </div>
      )}

      <div className="mt-10 bg-palm/5 border border-palm/15 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <p className="font-display text-xl text-palm-dark mb-1">Fast Delivery & Take Away</p>
          <p className="text-sm text-ink/60">
            Order ahead and we'll have it ready — delivered to you or packed for pickup.
          </p>
        </div>
        <a
          href={`https://wa.me/${toWhatsAppNumber(settings.whatsappNumber)}?text=${encodeURIComponent(
            `Hello ${settings.brandName}, I'd like to place an order.`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 bg-palm text-cream px-6 py-3 rounded-full text-sm font-medium hover:bg-palm-dark transition-colors whitespace-nowrap"
        >
          Order on WhatsApp
        </a>
      </div>
    </div>
  );
}
