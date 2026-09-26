import React, { useEffect, useState } from "react";
import { subscribeToReviews, deleteReview } from "../../firebase/reviews";

function Stars({ rating }) {
  if (!rating) return null;
  return <span className="text-gold text-sm">{"★".repeat(rating)}</span>;
}

export default function AdminReviews() {
  const [all, setAll] = useState([]);

  useEffect(() => {
    const unsub = subscribeToReviews(setAll, () => setAll([]));
    return unsub;
  }, []);

  async function handleDelete(item) {
    if (!window.confirm(`Delete this ${item.parentId ? "reply" : "review"} from "${item.name}"?`)) return;
    try {
      await deleteReview(item.id);
    } catch (err) {
      alert("Couldn't delete. Please try again.");
    }
  }

  const reviews = all.filter((r) => !r.parentId);
  const repliesFor = (id) => all.filter((r) => r.parentId === id);

  return (
    <div>
      <h1 className="font-display text-3xl mb-2">Reviews</h1>
      <p className="text-ink/60 mb-8 text-sm">
        Anyone can post a review or reply on your site. Delete anything that breaks your rules —
        spam, abuse, or anything inappropriate.
      </p>

      {reviews.length === 0 && (
        <p className="text-ink/40 text-sm">No reviews yet.</p>
      )}

      <div className="space-y-4">
        {reviews.map((r) => (
          <div key={r.id} className="bg-white border border-ink/10 rounded-2xl p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-medium">{r.name}</p>
                <Stars rating={r.rating} />
              </div>
              <button
                onClick={() => handleDelete(r)}
                className="text-xs text-jollof hover:text-jollof-dark"
              >
                Delete
              </button>
            </div>
            <p className="text-sm text-ink/70 mt-2">{r.message}</p>

            {repliesFor(r.id).length > 0 && (
              <div className="mt-3 pl-4 border-l-2 border-ink/10 space-y-3">
                {repliesFor(r.id).map((reply) => (
                  <div key={reply.id} className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-medium">{reply.name}</p>
                      <p className="text-sm text-ink/70">{reply.message}</p>
                    </div>
                    <button
                      onClick={() => handleDelete(reply)}
                      className="text-xs text-jollof hover:text-jollof-dark shrink-0"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
