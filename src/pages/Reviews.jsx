import React, { useEffect, useMemo, useState } from "react";
import { subscribeToReviews, createReview, createReply } from "../firebase/reviews";

function timeAgo(ts) {
  if (!ts?.toDate) return "";
  const diffMs = Date.now() - ts.toDate().getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

function Stars({ rating }) {
  if (!rating) return null;
  return (
    <span className="text-gold text-sm">
      {"★".repeat(rating)}
      <span className="text-ink/20">{"★".repeat(5 - rating)}</span>
    </span>
  );
}

function ReplyForm({ parentId, onDone }) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  async function submit(e) {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    setSaving(true);
    try {
      await createReply({ name, message, parentId });
      setName("");
      setMessage("");
      onDone?.();
    } catch (err) {
      console.error(err);
      alert("Couldn't post your reply. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={submit} className="mt-3 flex flex-col gap-2">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your name"
        className="border border-ink/15 rounded-lg px-3 py-1.5 text-sm outline-none focus:border-jollof"
      />
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Write a reply…"
        rows={2}
        className="border border-ink/15 rounded-lg px-3 py-1.5 text-sm outline-none focus:border-jollof"
      />
      <button
        type="submit"
        disabled={saving}
        className="self-start text-xs bg-ink/5 hover:bg-ink/10 px-3 py-1.5 rounded-full disabled:opacity-60"
      >
        {saving ? "Posting…" : "Post reply"}
      </button>
    </form>
  );
}

function ReviewThread({ review, replies }) {
  const [showReply, setShowReply] = useState(false);

  return (
    <div className="border border-ink/10 rounded-2xl p-5 bg-white">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-medium">{review.name}</p>
          <p className="text-xs text-ink/40">{timeAgo(review.createdAt)}</p>
        </div>
        <Stars rating={review.rating} />
      </div>
      <p className="text-sm text-ink/70 mt-2">{review.message}</p>

      <button
        onClick={() => setShowReply((s) => !s)}
        className="text-xs text-jollof mt-3 hover:underline"
      >
        {showReply ? "Cancel" : "Reply"}
      </button>
      {showReply && <ReplyForm parentId={review.id} onDone={() => setShowReply(false)} />}

      {replies.length > 0 && (
        <div className="mt-4 pl-4 border-l-2 border-ink/10 space-y-3">
          {replies.map((r) => (
            <div key={r.id}>
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">{r.name}</p>
                <p className="text-xs text-ink/40">{timeAgo(r.createdAt)}</p>
              </div>
              <p className="text-sm text-ink/70">{r.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Reviews() {
  const [all, setAll] = useState([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(5);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const unsub = subscribeToReviews(setAll, () => setAll([]));
    return unsub;
  }, []);

  const topLevel = useMemo(() => all.filter((r) => !r.parentId), [all]);
  const repliesFor = (id) =>
    all.filter((r) => r.parentId === id).sort((a, b) => (a.createdAt?.seconds || 0) - (b.createdAt?.seconds || 0));

  async function submitReview(e) {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    setSaving(true);
    try {
      await createReview({ name, message, rating });
      setName("");
      setMessage("");
      setRating(5);
    } catch (err) {
      console.error(err);
      alert("Couldn't post your review. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="font-display text-3xl mb-2">Customer Reviews</h1>
      <p className="text-ink/60 mb-8">
        Share your experience, or reply to what others are saying — just like a normal discussion.
      </p>

      <form onSubmit={submitReview} className="bg-white border border-ink/10 rounded-2xl p-6 mb-10 space-y-3">
        <h2 className="font-display text-lg mb-1">Leave a review</h2>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className="w-full border border-ink/15 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-jollof"
        />
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="What did you think?"
          rows={3}
          className="w-full border border-ink/15 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-jollof"
        />
        <div className="flex items-center gap-2">
          <span className="text-sm text-ink/60">Rating:</span>
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setRating(n)}
              className={`text-lg ${n <= rating ? "text-gold" : "text-ink/20"}`}
              aria-label={`${n} star`}
            >
              ★
            </button>
          ))}
        </div>
        <button
          type="submit"
          disabled={saving}
          className="bg-jollof text-cream px-6 py-2.5 rounded-full text-sm hover:bg-jollof-dark disabled:opacity-60"
        >
          {saving ? "Posting…" : "Post review"}
        </button>
      </form>

      <div className="space-y-5">
        {topLevel.length === 0 && (
          <p className="text-ink/50 text-sm text-center py-8">
            No reviews yet — be the first to share your experience!
          </p>
        )}
        {topLevel.map((r) => (
          <ReviewThread key={r.id} review={r} replies={repliesFor(r.id)} />
        ))}
      </div>
    </div>
  );
}
