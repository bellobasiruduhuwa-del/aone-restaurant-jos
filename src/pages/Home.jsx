import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { subscribeToProducts } from "../firebase/products";
import { subscribeToCategories } from "../firebase/categories";
import { subscribeToReviews } from "../firebase/reviews";
import { useSettings } from "../context/SettingsContext";
import FoodCard from "../components/FoodCard";

const BENEFITS = [
  { title: "Made fresh, daily", body: "Every pot is cooked to order from ingredients sourced around Jos." },
  { title: "Fast in and out", body: "Dine-in, takeaway, or delivery — order ahead on WhatsApp and skip the wait." },
  { title: "Real Nigerian flavour", body: "Jollof, swallow, pepper soup, and combos made the way you actually want them." },
];

export default function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [reviews, setReviews] = useState([]);
  const { settings } = useSettings();

  useEffect(() => {
    const unsubscribe = subscribeToProducts(setProducts, () => setProducts([]));
    const unsubCategories = subscribeToCategories(setCategories, () => setCategories([]));
    const unsubReviews = subscribeToReviews(setReviews, () => setReviews([]));
    return () => {
      unsubscribe();
      unsubCategories();
      unsubReviews();
    };
  }, []);

  const featured = products.filter((p) => p.featured).slice(0, 4);
  const popular = products.slice(0, 8);

  const categoryCards = categories.map((c) => ({
    id: c.id,
    name: c.name,
    imageUrl: products.find((p) => p.category === c.name && p.imageUrl)?.imageUrl || null,
  }));

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-jollof/[0.08] via-jollof/[0.03] to-transparent">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full bg-jollof/10 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-20 -left-16 w-64 h-64 rounded-full bg-palm/10 blur-3xl"
        />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-20 text-center">
          {settings.slogan && (
            <span className="inline-block text-xs sm:text-sm tracking-wide uppercase text-jollof font-medium bg-jollof/10 rounded-full px-4 py-1 mb-4">
              {settings.slogan}
            </span>
          )}
          <h1 className="font-display text-3xl sm:text-5xl leading-[1.15] mb-4 text-balance">
            Delicious Meals, Made With Love.
          </h1>
          <p className="text-ink/60 text-base sm:text-lg mb-7 max-w-md mx-auto">
            Enjoy delicious, fresh and affordable meals from{" "}
            {settings.brandName || "AONE Restaurant Jos"}.
          </p>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            <Link
              to="/menu"
              className="bg-jollof text-cream px-6 sm:px-7 py-3 rounded-full font-medium text-sm sm:text-base hover:bg-jollof-dark transition-colors"
            >
              Order Now
            </Link>
            <Link
              to="/menu"
              className="border border-ink/20 px-6 sm:px-7 py-3 rounded-full font-medium text-sm sm:text-base hover:border-ink/50 transition-colors"
            >
              View Menu
            </Link>
          </div>
          <img
            src="https://images.unsplash.com/photo-1665332195309-9d75071138f0?auto=format&fit=crop&w=1200&q=70"
            alt="A plate of jollof rice with grilled fish and vegetables"
            width="1200"
            height="700"
            fetchpriority="high"
            className="mt-9 w-full max-w-xl mx-auto h-48 sm:h-64 md:h-72 object-cover rounded-2xl shadow-lg"
          />
        </div>
      </section>

      {/* Categories */}
      {categoryCards.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
          <h2 className="font-display text-2xl mb-5">Browse by category</h2>
          <div className="flex gap-5 overflow-x-auto pb-2 -mx-1 px-1">
            {categoryCards.map((c) => (
              <Link
                key={c.id}
                to={`/menu?category=${encodeURIComponent(c.name)}`}
                className="flex flex-col items-center gap-2 shrink-0 w-20 text-center group"
              >
                <span className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden bg-palm/10 border border-palm/15 flex items-center justify-center group-hover:border-palm/40 transition-colors">
                  {c.imageUrl ? (
                    <img src={c.imageUrl} alt={c.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="font-display text-lg text-palm-dark">
                      {c.name.charAt(0)}
                    </span>
                  )}
                </span>
                <span className="text-xs text-ink/70 line-clamp-2">{c.name}</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Director */}
      {settings.directorPhotoUrl && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
          <div className="bg-white border border-ink/10 rounded-2xl p-5 sm:p-7 flex flex-col sm:flex-row items-center gap-5 sm:gap-6 text-center sm:text-left">
            <img
              src={settings.directorPhotoUrl}
              alt={settings.directorName || "Director"}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover shrink-0 border-4 border-jollof/10"
            />
            <div className="min-w-0">
              <p className="font-display text-lg sm:text-xl text-balance leading-snug">
                {settings.directorName}
              </p>
              <p className="text-sm text-jollof font-medium mb-2">
                {settings.directorTitle || "Director General"}
              </p>
              {settings.directorMessage && (
                <p className="text-ink/70 text-sm sm:text-[15px] leading-relaxed">
                  &ldquo;{settings.directorMessage}&rdquo;
                </p>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Featured */}
      {featured.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
          <h2 className="font-display text-2xl mb-6">Featured today</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
            {featured.map((p) => (
              <FoodCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Popular */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-2xl">Popular right now</h2>
          <Link to="/menu" className="text-sm text-jollof hover:underline">
            See full menu
          </Link>
        </div>
        {popular.length === 0 ? (
          <p className="text-ink/50 text-sm">
            The menu will appear here as soon as products are added from the Admin Dashboard.
          </p>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
            {popular.map((p) => (
              <FoodCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </section>

      {/* Benefits */}
      <section className="bg-palm/5 py-16 mt-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 grid sm:grid-cols-3 gap-8">
          {BENEFITS.map((b) => (
            <div key={b.title}>
              <h3 className="font-display text-xl mb-2 text-palm-dark">{b.title}</h3>
              <p className="text-sm text-ink/60">{b.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-2xl">What customers say</h2>
          <Link to="/reviews" className="text-sm text-jollof hover:underline">
            See all reviews
          </Link>
        </div>
        {reviews.filter((r) => !r.parentId).length === 0 ? (
          <div className="text-center py-10 border border-dashed border-ink/15 rounded-2xl">
            <p className="text-ink/50 text-sm mb-3">No reviews yet — be the first to share yours!</p>
            <Link to="/reviews" className="text-jollof text-sm font-medium hover:underline">
              Leave a review
            </Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-3 gap-6">
            {reviews
              .filter((r) => !r.parentId)
              .slice(0, 3)
              .map((r) => (
                <div key={r.id} className="border border-ink/10 rounded-2xl p-6 bg-white">
                  {r.rating && (
                    <p className="text-gold text-sm mb-2">{"★".repeat(r.rating)}</p>
                  )}
                  <p className="text-ink/70 text-sm mb-4">&ldquo;{r.message}&rdquo;</p>
                  <p className="text-sm font-medium">{r.name}</p>
                </div>
              ))}
          </div>
        )}
      </section>
    </div>
  );
}
