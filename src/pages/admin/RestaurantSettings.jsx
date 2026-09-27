import React, { useEffect, useState } from "react";
import { updateSettings } from "../../firebase/settings";
import { uploadToImgbb } from "../../utils/imgbb";
import { hexToRgbTriple, rgbTripleToHex } from "../../utils/color";
import { useSettings } from "../../context/SettingsContext";

export default function RestaurantSettings() {
  const { settings } = useSettings();
  const [form, setForm] = useState(settings);
  const [logoFile, setLogoFile] = useState(null);
  const [directorPhotoFile, setDirectorPhotoFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => setForm(settings), [settings]);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function updateSocial(field, value) {
    setForm((f) => ({ ...f, socialLinks: { ...f.socialLinks, [field]: value } }));
  }

  function updateThemeColor(key, hex) {
    const triple = hexToRgbTriple(hex);
    if (!triple) return;
    setForm((f) => ({ ...f, themeColors: { ...f.themeColors, [key]: triple } }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      let logoUrl = form.logoUrl;
      if (logoFile) {
        logoUrl = await uploadToImgbb(logoFile);
      }
      let directorPhotoUrl = form.directorPhotoUrl;
      if (directorPhotoFile) {
        directorPhotoUrl = await uploadToImgbb(directorPhotoFile);
      }
      await updateSettings({
        brandName: form.brandName,
        businessName: form.businessName,
        slogan: form.slogan,
        address: form.address,
        phone1: form.phone1,
        phone2: form.phone2,
        whatsappNumber: form.whatsappNumber,
        email: form.email,
        openingHours: form.openingHours,
        openTime: form.openTime,
        closeTime: form.closeTime,
        logoUrl,
        directorName: form.directorName,
        directorTitle: form.directorTitle,
        directorPhotoUrl,
        directorMessage: form.directorMessage,
        themeColors: form.themeColors,
        socialLinks: form.socialLinks,
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      console.error(err);
      setError("Couldn't save settings. Check your connection and try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <h1 className="font-display text-3xl mb-8">Restaurant Settings</h1>

      <form onSubmit={handleSubmit} className="bg-white border border-ink/10 rounded-2xl p-6 space-y-5 max-w-2xl">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1.5">Brand name (shown on site)</label>
            <input
              value={form.brandName}
              onChange={(e) => update("brandName", e.target.value)}
              className="w-full border border-ink/15 rounded-xl px-4 py-2.5 focus:border-jollof outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Official business name</label>
            <input
              value={form.businessName}
              onChange={(e) => update("businessName", e.target.value)}
              className="w-full border border-ink/15 rounded-xl px-4 py-2.5 focus:border-jollof outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">Slogan</label>
          <input
            value={form.slogan}
            onChange={(e) => update("slogan", e.target.value)}
            className="w-full border border-ink/15 rounded-xl px-4 py-2.5 focus:border-jollof outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">Address</label>
          <textarea
            rows={2}
            value={form.address}
            onChange={(e) => update("address", e.target.value)}
            className="w-full border border-ink/15 rounded-xl px-4 py-2.5 focus:border-jollof outline-none"
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1.5">Phone 1</label>
            <input
              value={form.phone1}
              onChange={(e) => update("phone1", e.target.value)}
              className="w-full border border-ink/15 rounded-xl px-4 py-2.5 focus:border-jollof outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Phone 2</label>
            <input
              value={form.phone2}
              onChange={(e) => update("phone2", e.target.value)}
              className="w-full border border-ink/15 rounded-xl px-4 py-2.5 focus:border-jollof outline-none"
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1.5">WhatsApp ordering number</label>
            <input
              value={form.whatsappNumber}
              onChange={(e) => update("whatsappNumber", e.target.value)}
              className="w-full border border-ink/15 rounded-xl px-4 py-2.5 focus:border-jollof outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Email (optional)</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              placeholder="Add your official email here"
              className="w-full border border-ink/15 rounded-xl px-4 py-2.5 focus:border-jollof outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">Opening hours (shown to customers)</label>
          <input
            value={form.openingHours}
            onChange={(e) => update("openingHours", e.target.value)}
            className="w-full border border-ink/15 rounded-xl px-4 py-2.5 focus:border-jollof outline-none"
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1.5">Opens at</label>
            <input
              type="time"
              value={form.openTime || "08:00"}
              onChange={(e) => update("openTime", e.target.value)}
              className="w-full border border-ink/15 rounded-xl px-4 py-2.5 focus:border-jollof outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Closes at</label>
            <input
              type="time"
              value={form.closeTime || "00:00"}
              onChange={(e) => update("closeTime", e.target.value)}
              className="w-full border border-ink/15 rounded-xl px-4 py-2.5 focus:border-jollof outline-none"
            />
          </div>
          <p className="sm:col-span-2 text-xs text-ink/40 -mt-2">
            These two control when ordering automatically closes on the site. Use 00:00 for
            midnight. They're separate from the text above, which is just what customers read.
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">Logo</label>
          <input
            type="url"
            placeholder="Paste a logo image URL"
            value={form.logoUrl}
            onChange={(e) => update("logoUrl", e.target.value)}
            className="w-full border border-ink/15 rounded-xl px-4 py-2.5 mb-2 text-sm focus:border-jollof outline-none"
          />
          <p className="text-xs text-ink/40 mb-2">Or pick a photo from your phone to upload directly:</p>
          <input type="file" accept="image/*" onChange={(e) => setLogoFile(e.target.files?.[0] || null)} className="text-sm" />
          {(logoFile || form.logoUrl) && (
            <img
              src={logoFile ? URL.createObjectURL(logoFile) : form.logoUrl}
              alt="Logo preview"
              className="mt-2 w-16 h-16 object-cover rounded-full"
            />
          )}
        </div>

        <div className="border-t border-ink/10 pt-5">
          <p className="text-sm font-medium mb-1">Director / owner (shown on homepage)</p>
          <p className="text-xs text-ink/50 mb-4">
            Leave the photo empty to hide this section from the homepage.
          </p>
          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">Name</label>
              <input
                value={form.directorName || ""}
                onChange={(e) => update("directorName", e.target.value)}
                className="w-full border border-ink/15 rounded-xl px-4 py-2.5 focus:border-jollof outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Title</label>
              <input
                value={form.directorTitle || ""}
                onChange={(e) => update("directorTitle", e.target.value)}
                placeholder="Director"
                className="w-full border border-ink/15 rounded-xl px-4 py-2.5 focus:border-jollof outline-none"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1.5">Short message (optional)</label>
            <textarea
              rows={2}
              value={form.directorMessage || ""}
              onChange={(e) => update("directorMessage", e.target.value)}
              placeholder="A short welcome message from the director"
              className="w-full border border-ink/15 rounded-xl px-4 py-2.5 focus:border-jollof outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Photo</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setDirectorPhotoFile(e.target.files?.[0] || null)}
              className="text-sm"
            />
            {(directorPhotoFile || form.directorPhotoUrl) && (
              <img
                src={directorPhotoFile ? URL.createObjectURL(directorPhotoFile) : form.directorPhotoUrl}
                alt="Director preview"
                className="mt-2 w-20 h-20 object-cover rounded-full"
              />
            )}
          </div>
        </div>

        <div className="border-t border-ink/10 pt-5">
          <p className="text-sm font-medium mb-1">App colors</p>
          <p className="text-xs text-ink/50 mb-4">
            Changes every matching piece of text, button and accent across the whole site —
            customer pages and this dashboard.
          </p>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { key: "jollof", label: "Primary (buttons, prices)" },
              { key: "jollofDark", label: "Primary — hover" },
              { key: "palm", label: "Secondary (accents)" },
              { key: "palmDark", label: "Secondary — hover" },
              { key: "gold", label: "Highlight (featured, stars)" },
              { key: "ink", label: "Main text color" },
              { key: "cream", label: "Page background" },
            ].map(({ key, label }) => (
              <div key={key}>
                <label className="block text-xs font-medium mb-1.5 text-ink/60">{label}</label>
                <input
                  type="color"
                  value={rgbTripleToHex(form.themeColors?.[key])}
                  onChange={(e) => updateThemeColor(key, e.target.value)}
                  className="w-full h-10 border border-ink/15 rounded-lg cursor-pointer"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1.5">Facebook link</label>
            <input
              value={form.socialLinks?.facebook || ""}
              onChange={(e) => updateSocial("facebook", e.target.value)}
              className="w-full border border-ink/15 rounded-xl px-4 py-2.5 focus:border-jollof outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Instagram link</label>
            <input
              value={form.socialLinks?.instagram || ""}
              onChange={(e) => updateSocial("instagram", e.target.value)}
              className="w-full border border-ink/15 rounded-xl px-4 py-2.5 focus:border-jollof outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Twitter / X link</label>
            <input
              value={form.socialLinks?.twitter || ""}
              onChange={(e) => updateSocial("twitter", e.target.value)}
              className="w-full border border-ink/15 rounded-xl px-4 py-2.5 focus:border-jollof outline-none"
            />
          </div>
        </div>

        {error && <p className="text-jollof text-sm">{error}</p>}

        <button
          disabled={saving}
          className="bg-jollof text-cream px-6 py-2.5 rounded-full text-sm hover:bg-jollof-dark disabled:opacity-60"
        >
          {saving ? "Saving…" : saved ? "Saved ✓" : "Save settings"}
        </button>
      </form>
    </div>
  );
}
