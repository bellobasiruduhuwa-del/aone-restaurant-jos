import React from "react";

/** Placeholder shown in product grids while Firestore data is still loading. */
export default function SkeletonCard() {
  return (
    <div className="border border-ink/10 rounded-2xl overflow-hidden bg-white flex flex-col animate-pulse">
      <div className="aspect-[4/3] bg-ink/10" />
      <div className="p-3 sm:p-4 flex flex-col gap-2">
        <div className="h-2.5 w-14 bg-ink/10 rounded" />
        <div className="h-4 w-3/4 bg-ink/10 rounded" />
        <div className="h-3 w-full bg-ink/10 rounded hidden sm:block" />
        <div className="h-8 w-full bg-ink/10 rounded-full mt-2" />
      </div>
    </div>
  );
}
