import React, { useMemo, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useSettings } from "../context/SettingsContext";
import { useLanguage } from "../context/LanguageContext";
import { createOrder } from "../firebase/orders";
import { buildWhatsAppOrderUrl } from "../utils/whatsapp";
import { formatNaira, isValidNigerianPhone } from "../utils/format";
import { isOpenNow } from "../utils/hours";
import { distanceKm } from "../utils/distance";

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart();
  const { settings } = useSettings();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const restaurantOpen = isOpenNow(settings.openTime, settings.closeTime);

  const ORDER_TYPES = [
    { value: "Dine-in", label: t("checkout_dine_in") },
    { value: "Takeaway", label: t("checkout_takeaway") },
    { value: "Delivery", label: t("checkout_delivery") },
  ];

  const [form, setForm] = useState({
    customerName: "",
    phone: "",
    address: "",
    orderType: "Delivery",
    notes: "",
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [customerDistanceKm, setCustomerDistanceKm] = useState(null);
  const [locatingCustomer, setLocatingCustomer] = useState(false);
  const [locationDenied, setLocationDenied] = useState(false);

  const distancePricingAvailable =
    Number(settings.deliveryPerKmFee) > 0 &&
    settings.restaurantLat != null &&
    settings.restaurantLng != null;

  function useMyLocationForDelivery() {
    if (!navigator.geolocation) {
      setLocationDenied(true);
      return;
    }
    setLocatingCustomer(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const km = distanceKm(
          settings.restaurantLat,
          settings.restaurantLng,
          pos.coords.latitude,
          pos.coords.longitude
        );
        setCustomerDistanceKm(km);
        setLocatingCustomer(false);
      },
      () => {
        setLocationDenied(true);
        setLocatingCustomer(false);
      }
    );
  }

  const fees = useMemo(() => {
    const takeawayFee = form.orderType === "Takeaway" && settings.takeawayEnabled ? settings.takeawayFee : 0;
    let deliveryFee = 0;
    if (form.orderType === "Delivery" && settings.deliveryEnabled) {
      if (distancePricingAvailable && customerDistanceKm != null) {
        deliveryFee =
          Number(settings.deliveryFee) + Math.round(customerDistanceKm * Number(settings.deliveryPerKmFee));
      } else {
        deliveryFee = settings.deliveryFee;
      }
    }
    return { takeawayFee, deliveryFee };
  }, [form.orderType, settings, customerDistanceKm, distancePricingAvailable]);

  const total = subtotal + fees.takeawayFee + fees.deliveryFee;

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <p className="text-ink/60 mb-6">{t("checkout_empty")}</p>
        <Link to="/menu" className="text-jollof hover:underline">
          {t("checkout_go_menu")}
        </Link>
      </div>
    );
  }

  function updateField(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
  }

  function validate() {
    const next = {};
    if (!form.customerName.trim()) next.customerName = t("checkout_error_name");
    if (!form.phone.trim()) next.phone = t("checkout_error_phone_required");
    else if (!isValidNigerianPhone(form.phone)) next.phone = t("checkout_error_phone_invalid");
    if (form.orderType === "Delivery" && !form.address.trim()) {
      next.address = t("checkout_error_address");
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!restaurantOpen) return;
    if (!validate()) return;

    setSubmitting(true);
    setSubmitError("");

    const orderPayload = {
      customerName: form.customerName.trim(),
      phone: form.phone.trim(),
      address: form.address.trim(),
      orderType: form.orderType,
      notes: form.notes.trim(),
      items: items.map((i) => ({
        productId: i.productId,
        name: i.name,
        price: i.price,
        quantity: i.quantity,
      })),
      subtotal,
      takeawayFee: fees.takeawayFee,
      deliveryFee: fees.deliveryFee,
      total,
    };

    try {
      const orderId = await createOrder(orderPayload);
      const waUrl = buildWhatsAppOrderUrl({
        whatsappNumber: settings.whatsappNumber,
        orderId,
        currencySymbol: settings.currencySymbol,
        ...orderPayload,
      });
      clearCart();
      window.open(waUrl, "_blank", "noopener,noreferrer");
      navigate("/", { state: { orderPlaced: true, orderId } });
    } catch (err) {
      console.error(err);
      setSubmitError(t("checkout_submit_error"));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="font-display text-3xl mb-8">{t("checkout_title")}</h1>

      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-1.5" htmlFor="customerName">
            {t("checkout_full_name")}
          </label>
          <input
            id="customerName"
            value={form.customerName}
            onChange={(e) => updateField("customerName", e.target.value)}
            className="w-full border border-ink/15 rounded-xl px-4 py-2.5 focus:border-jollof outline-none"
          />
          {errors.customerName && <p className="text-jollof text-sm mt-1">{errors.customerName}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5" htmlFor="phone">
            {t("checkout_phone")}
          </label>
          <input
            id="phone"
            type="tel"
            placeholder={t("checkout_phone_placeholder")}
            value={form.phone}
            onChange={(e) => updateField("phone", e.target.value)}
            className="w-full border border-ink/15 rounded-xl px-4 py-2.5 focus:border-jollof outline-none"
          />
          {errors.phone && <p className="text-jollof text-sm mt-1">{errors.phone}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">{t("checkout_order_type")}</label>
          <div className="flex gap-3">
            {ORDER_TYPES.map((type) => (
              <button
                type="button"
                key={type.value}
                onClick={() => updateField("orderType", type.value)}
                className={`px-4 py-2 rounded-full text-sm border transition-colors ${
                  form.orderType === type.value
                    ? "bg-jollof text-cream border-jollof"
                    : "border-ink/15 text-ink/70 hover:border-ink/40"
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>

        {form.orderType !== "Dine-in" && (
          <div>
            <label className="block text-sm font-medium mb-1.5" htmlFor="address">
              {form.orderType === "Delivery" ? t("checkout_delivery_address") : t("checkout_pickup_notes")}
            </label>
            <textarea
              id="address"
              rows={2}
              value={form.address}
              onChange={(e) => updateField("address", e.target.value)}
              className="w-full border border-ink/15 rounded-xl px-4 py-2.5 focus:border-jollof outline-none"
            />
            {errors.address && <p className="text-jollof text-sm mt-1">{errors.address}</p>}

            {form.orderType === "Delivery" && distancePricingAvailable && (
              <div className="mt-3 bg-ink/5 rounded-xl px-4 py-3 text-sm">
                {customerDistanceKm != null ? (
                  <p className="text-ink/70">
                    {t("checkout_distance_fee", {
                      km: customerDistanceKm.toFixed(1),
                      fee: formatNaira(fees.deliveryFee, settings.currencySymbol),
                    })}
                  </p>
                ) : (
                  <>
                    <p className="text-ink/60 mb-2">{t("checkout_share_location")}</p>
                    <button
                      type="button"
                      onClick={useMyLocationForDelivery}
                      className="text-xs bg-white border border-ink/15 hover:border-jollof px-4 py-1.5 rounded-full"
                    >
                      {locatingCustomer ? t("checkout_getting_location") : t("checkout_use_my_location")}
                    </button>
                    {locationDenied && (
                      <p className="text-xs text-ink/40 mt-2">{t("checkout_location_denied")}</p>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium mb-1.5" htmlFor="notes">
            {t("checkout_notes_label")}
          </label>
          <textarea
            id="notes"
            rows={2}
            value={form.notes}
            onChange={(e) => updateField("notes", e.target.value)}
            className="w-full border border-ink/15 rounded-xl px-4 py-2.5 focus:border-jollof outline-none"
          />
        </div>

        <div className="border border-ink/10 rounded-2xl p-5 space-y-2 bg-white">
          <div className="flex justify-between text-sm text-ink/70">
            <span>{t("checkout_subtotal")}</span>
            <span>{formatNaira(subtotal, settings.currencySymbol)}</span>
          </div>
          {fees.takeawayFee > 0 && (
            <div className="flex justify-between text-sm text-ink/70">
              <span>{t("checkout_takeaway_fee")}</span>
              <span>{formatNaira(fees.takeawayFee, settings.currencySymbol)}</span>
            </div>
          )}
          {fees.deliveryFee > 0 && (
            <div className="flex justify-between text-sm text-ink/70">
              <span>{t("checkout_delivery_fee")}</span>
              <span>{formatNaira(fees.deliveryFee, settings.currencySymbol)}</span>
            </div>
          )}
          <div className="flex justify-between font-display text-lg pt-2 border-t border-ink/10">
            <span>{t("checkout_total")}</span>
            <span className="text-jollof">{formatNaira(total, settings.currencySymbol)}</span>
          </div>
        </div>

        {submitError && <p className="text-jollof text-sm">{submitError}</p>}
        {!restaurantOpen && (
          <p className="text-sm bg-ink/5 text-ink/70 rounded-xl px-4 py-3 text-center">
            {t("checkout_closed_message", { hours: settings.openingHours || "—" })}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting || !restaurantOpen}
          className="w-full bg-palm text-cream py-3.5 rounded-full font-medium hover:bg-palm-dark transition-colors disabled:opacity-60"
        >
          {!restaurantOpen ? t("checkout_currently_closed") : submitting ? t("checkout_placing_order") : t("checkout_submit")}
        </button>
        <p className="text-xs text-ink/40 text-center">{t("checkout_footnote")}</p>
      </form>
    </div>
  );
}
