import React, { useState } from "react";
import { updateSettings } from "../../firebase/settings";
import { useSettings } from "../../context/SettingsContext";

export default function DeliverySettings() {
  const { settings } = useSettings();
  const [form, setForm] = useState(settings);
  const [saved, setSaved] = useState(false);
  const [locating, setLocating] = useState(false);

  React.useEffect(() => setForm(settings), [settings]);

  function useMyLocation() {
    if (!navigator.geolocation) {
      alert("Your browser doesn't support location. Type the coordinates manually instead.");
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setForm((f) => ({
          ...f,
          restaurantLat: pos.coords.latitude,
          restaurantLng: pos.coords.longitude,
        }));
        setLocating(false);
      },
      () => {
        alert("Couldn't get your location. Please check location permission and try again.");
        setLocating(false);
      }
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await updateSettings({
      takeawayFee: Number(form.takeawayFee) || 0,
      deliveryFee: Number(form.deliveryFee) || 0,
      deliveryPerKmFee: Number(form.deliveryPerKmFee) || 0,
      restaurantLat: form.restaurantLat === "" ? null : Number(form.restaurantLat),
      restaurantLng: form.restaurantLng === "" ? null : Number(form.restaurantLng),
      deliveryEnabled: form.deliveryEnabled,
      takeawayEnabled: form.takeawayEnabled,
      minimumOrderAmount: Number(form.minimumOrderAmount) || 0,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div>
      <h1 className="font-display text-3xl mb-8">Delivery Settings</h1>

      <form onSubmit={handleSubmit} className="bg-white border border-ink/10 rounded-2xl p-6 space-y-6 max-w-lg">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1.5">Takeaway fee ({settings.currencySymbol})</label>
            <input
              type="number"
              min="0"
              value={form.takeawayFee}
              onChange={(e) => setForm((f) => ({ ...f, takeawayFee: e.target.value }))}
              className="w-full border border-ink/15 rounded-xl px-4 py-2.5 focus:border-jollof outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Base delivery fee ({settings.currencySymbol})</label>
            <input
              type="number"
              min="0"
              value={form.deliveryFee}
              onChange={(e) => setForm((f) => ({ ...f, deliveryFee: e.target.value }))}
              className="w-full border border-ink/15 rounded-xl px-4 py-2.5 focus:border-jollof outline-none"
            />
          </div>
        </div>

        <div className="border-t border-ink/10 pt-5">
          <p className="text-sm font-medium mb-1">Distance-based delivery pricing (optional)</p>
          <p className="text-xs text-ink/50 mb-4">
            Set a per-km rate to charge more for far deliveries. The customer's fee becomes
            base fee + (distance × per-km rate). Leave per-km rate at 0 to keep a flat fee for everyone.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">
                Per-km fee ({settings.currencySymbol}/km)
              </label>
              <input
                type="number"
                min="0"
                value={form.deliveryPerKmFee ?? 0}
                onChange={(e) => setForm((f) => ({ ...f, deliveryPerKmFee: e.target.value }))}
                className="w-full border border-ink/15 rounded-xl px-4 py-2.5 focus:border-jollof outline-none"
              />
            </div>
          </div>

          <p className="text-sm font-medium mb-1.5">Restaurant location</p>
          <p className="text-xs text-ink/50 mb-3">
            Needed to calculate distance to each customer. Easiest way: stand at the restaurant
            and tap the button below.
          </p>
          <button
            type="button"
            onClick={useMyLocation}
            className="text-xs bg-ink/5 hover:bg-ink/10 px-4 py-2 rounded-full mb-3"
          >
            {locating ? "Getting location…" : "📍 Use my current GPS location"}
          </button>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">Latitude</label>
              <input
                type="number"
                step="any"
                value={form.restaurantLat ?? ""}
                onChange={(e) => setForm((f) => ({ ...f, restaurantLat: e.target.value }))}
                className="w-full border border-ink/15 rounded-xl px-4 py-2.5 focus:border-jollof outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Longitude</label>
              <input
                type="number"
                step="any"
                value={form.restaurantLng ?? ""}
                onChange={(e) => setForm((f) => ({ ...f, restaurantLng: e.target.value }))}
                className="w-full border border-ink/15 rounded-xl px-4 py-2.5 focus:border-jollof outline-none"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">
            Minimum order amount ({settings.currencySymbol}, 0 = no minimum)
          </label>
          <input
            type="number"
            min="0"
            value={form.minimumOrderAmount}
            onChange={(e) => setForm((f) => ({ ...f, minimumOrderAmount: e.target.value }))}
            className="w-full border border-ink/15 rounded-xl px-4 py-2.5 focus:border-jollof outline-none"
          />
        </div>

        <div className="flex gap-6">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.deliveryEnabled}
              onChange={(e) => setForm((f) => ({ ...f, deliveryEnabled: e.target.checked }))}
            />
            Delivery enabled
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.takeawayEnabled}
              onChange={(e) => setForm((f) => ({ ...f, takeawayEnabled: e.target.checked }))}
            />
            Takeaway enabled
          </label>
        </div>

        <button className="bg-jollof text-cream px-6 py-2.5 rounded-full text-sm hover:bg-jollof-dark">
          {saved ? "Saved ✓" : "Save settings"}
        </button>
      </form>
    </div>
  );
}
