import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { subscribeToProducts } from "../firebase/products";
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
  const [reviews, setReviews] = useState([]);
  const { settings } = useSettings();

  useEffect(() => {
    const unsubscribe = subscribeToProducts(setProducts, () => setProducts([]));
    const unsubReviews = subscribeToReviews(setReviews, () => setReviews([]));
    return () => {
      unsubscribe();
      unsubReviews();
    };
  }, []);

  const featured = products.filter((p) => p.featured).slice(0, 4);
  const popular = products.slice(0, 8);

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-b from-jollof/[0.06] to-transparent">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center">
          <h1 className="font-display text-4xl sm:text-5xl leading-[1.1] mb-5">
            Welcome to {settings.brandName}
          </h1>
          <p className="text-lg text-ink/70 mb-2">{settings.slogan}</p>
          <p className="text-ink/60 mb-8 max-w-md mx-auto">
            Enjoy delicious Nigerian meals, fast food, drinks, and special tea
            at {settings.brandName}, Jos.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/menu"
              className="bg-jollof text-cream px-7 py-3 rounded-full font-medium hover:bg-jollof-dark transition-colors"
            >
              Order Now
            </Link>
            <Link
              to="/menu"
              className="border border-ink/20 px-7 py-3 rounded-full font-medium hover:border-ink/50 transition-colors"
            >
              View Menu
            </Link>
          </div>
        </div>
      </section>

      {/* Featured */}
      {featured.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
          <h2 className="font-display text-2xl mb-6">Featured today</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
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
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
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
