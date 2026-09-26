import React, { useEffect, useState } from "react";

const VIDEO_ID = "bzgGANv2eJg";
const SESSION_KEY = "aone_ad_shown";

export default function VideoAdPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const alreadyShown = sessionStorage.getItem(SESSION_KEY);
    if (!alreadyShown) {
      setOpen(true);
      sessionStorage.setItem(SESSION_KEY, "1");
    }
  }, []);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] bg-black/80 flex items-center justify-center p-4"
      onClick={() => setOpen(false)}
    >
      <div
        className="relative w-full max-w-xs"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setOpen(false)}
          aria-label="Close"
          className="absolute -top-10 right-0 text-white text-3xl leading-none w-10 h-10 flex items-center justify-center"
        >
          ✕
        </button>
        <div className="aspect-[9/16] rounded-2xl overflow-hidden bg-black">
          <iframe
            className="w-full h-full"
            src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&mute=1&playsinline=1&controls=1&modestbranding=1&rel=0`}
            title="AONE Restaurant"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}
