"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { Trash2, Plus, Minus, ShoppingCart, Tag, ArrowRight, Package } from 'lucide-react';
import { Reveal } from "@/components/Reveal";
import { staggerContainer, fadeInUp } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface CartItem {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  category: string;
  quantity: number;
}

const INITIAL_ITEMS: CartItem[] = [
  {
    id: "1",
    name: "Adventure Hero Action Set",
    brand: "PlayMax",
    price: 34.99,
    image: "https://api.dicebear.com/7.x/shapes/svg?seed=action%20figure%20toy",
    category: "Action Figures",
    quantity: 2,
  },
  {
    id: "2",
    name: "Rainbow Stacking Rings",
    brand: "BrainBuild",
    price: 19.99,
    image: "https://api.dicebear.com/7.x/shapes/svg?seed=stacking%20rings%20toy",
    category: "Educational",
    quantity: 1,
  },
  {
    id: "3",
    name: "Deluxe Puzzle Adventure",
    brand: "MindSpark",
    price: 27.49,
    image: "https://api.dicebear.com/7.x/shapes/svg?seed=deluxe%20puzzle%20adventure",
    category: "Board Games",
    quantity: 1,
  },
];

const SHIPPING_THRESHOLD = 50;
const SHIPPING_COST = 5.99;

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function CartPage() {
  const t = useTranslations();
  const [items, setItems] = useState<CartItem[]>(INITIAL_ITEMS);
  const [discountCode, setDiscountCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState<{ code: string; amount: number } | null>(null);
  const [discountError, setDiscountError] = useState("");

  const updateQuantity = (id: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );

  const shipping = subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const discountAmount = appliedDiscount ? appliedDiscount.amount : 0;
  const grandTotal = Math.max(0, subtotal + shipping - discountAmount);

  const handleApplyDiscount = () => {
    const code = discountCode.trim().toUpperCase();
    if (code === "TOYZONE10") {
      setAppliedDiscount({ code, amount: subtotal * 0.1 });
      setDiscountError("");
    } else if (code === "PLAY5") {
      setAppliedDiscount({ code, amount: 5 });
      setDiscountError("");
    } else {
      setDiscountError(t("cart.discount.error"));
      setAppliedDiscount(null);
    }
  };

  const isEmpty = items.length === 0;

  return (
    <main className="min-h-screen bg-[var(--background)] pt-8 pb-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <Reveal>
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-2">
              <ShoppingCart className="w-7 h-7 text-[var(--accent)]" />
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[var(--foreground)]">
                {t("cart.title")}
              </h1>
            </div>
            <p className="text-[hsl(var(--muted-foreground))] text-base">
              {isEmpty
                ? t("cart.emptySubtitle")
                : t("cart.subtitle", { count: items.reduce((s, i) => s + i.quantity, 0) })}
            </p>
          </div>
        </Reveal>

        {isEmpty ? (
          /* ── Empty State ── */
          <Reveal>
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="relative mb-8">
                <div className="w-40 h-40 rounded-full bg-[var(--accent)]/10 flex items-center justify-center">
                  <img
                    src="https://api.dicebear.com/7.x/shapes/svg?seed=box"
                    alt="Empty toy box"
                    className="w-24 h-24 object-contain rounded-full"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = "none";
                    }}
                  />
                  <ShoppingCart className="w-16 h-16 text-[var(--accent)] absolute" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-[var(--foreground)] mb-3">
                {t("cart.empty.heading")}
              </h2>
              <p className="text-[hsl(var(--muted-foreground))] max-w-sm mb-8 leading-relaxed">
                {t("cart.empty.body")}
              </p>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-8 py-3.5 text-sm font-bold text-black transition-all duration-300 hover:opacity-90 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
              >
                {t("cart.empty.cta")}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Reveal>
        ) : (
          /* ── Two-Column Layout ── */
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 items-start">
            {/* ── Left: Cart Items ── */}
            <div>
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="flex flex-col gap-4"
              >
                {items.map((item) => (
                  <motion.div
                    key={item.id}
                    variants={cardVariants}
                    layout
                    className="group flex gap-4 rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_-4px_rgba(0,0,0,0.08)] transition-shadow hover:shadow-[0_2px_4px_rgba(0,0,0,0.06),0_8px_24px_-8px_rgba(0,0,0,0.12)]"
                  >
                    {/* Thumbnail */}
                    <div className="relative flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden bg-[var(--accent)]/5 border border-[hsl(var(--border))]">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const el = e.currentTarget as HTMLImageElement;
                          el.src = "https://api.dicebear.com/7.x/shapes/svg?seed=box";
                        }}
                      />
                    </div>

                    {/* Info */}
                    <div className="flex flex-1 flex-col justify-between min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="text-xs font-medium text-[var(--accent)] uppercase tracking-wide mb-0.5">
                            {item.brand}
                          </p>
                          <h3 className="font-bold text-[var(--foreground)] text-sm sm:text-base leading-snug truncate">
                            {item.name}
                          </h3>
                          <p className="text-xs text-[hsl(var(--muted-foreground))] mt-0.5">
                            {item.category}
                          </p>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          aria-label={t("cart.item.remove")}
                          className="flex-shrink-0 p-1.5 rounded-lg text-[hsl(var(--muted-foreground))] hover:text-red-500 hover:bg-red-50 transition-colors duration-200"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        {/* Quantity Stepper */}
                        <div className="flex items-center gap-1 rounded-full border border-[hsl(var(--border))] bg-[var(--background)] px-1 py-1">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            aria-label={t("cart.item.decrease")}
                            className="w-7 h-7 rounded-full flex items-center justify-center text-[var(--foreground)] hover:bg-[var(--accent)]/10 transition-colors"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-8 text-center text-sm font-bold text-[var(--foreground)]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            aria-label={t("cart.item.increase")}
                            className="w-7 h-7 rounded-full flex items-center justify-center text-[var(--foreground)] hover:bg-[var(--accent)]/10 transition-colors"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Line Total */}
                        <div className="text-right">
                          <p className="text-base font-extrabold text-[var(--foreground)]">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                          {item.quantity > 1 && (
                            <p className="text-xs text-[hsl(var(--muted-foreground))]">
                              ${item.price.toFixed(2)} {t("cart.item.each")}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Free Shipping Banner */}
              <Reveal delay={0.1}>
                <div
                  className={cn(
                    "mt-6 rounded-2xl px-5 py-4 flex items-center gap-3 border",
                    shipping === 0
                      ? "bg-green-50 border-green-200"
                      : "bg-[var(--accent)]/5 border-[var(--accent)]/20"
                  )}
                >
                  <Package
                    className={cn(
                      "w-5 h-5 flex-shrink-0",
                      shipping === 0 ? "text-green-600" : "text-[var(--accent)]"
                    )}
                  />
                  <p
                    className={cn(
                      "text-sm font-medium",
                      shipping === 0 ? "text-green-700" : "text-[var(--foreground)]"
                    )}
                  >
                    {shipping === 0
                      ? t("cart.shipping.free")
                      : t("cart.shipping.threshold", {
                          amount: (SHIPPING_THRESHOLD - subtotal).toFixed(2),
                        })}
                  </p>
                </div>
              </Reveal>

              {/* Continue Shopping */}
              <Reveal delay={0.15}>
                <div className="mt-6">
                  <Link
                    href="/shop"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)] hover:underline underline-offset-4 transition-colors"
                  >
                    <ArrowRight className="w-4 h-4 rotate-180" />
                    {t("cart.continueShopping")}
                  </Link>
                </div>
              </Reveal>
            </div>

            {/* ── Right: Order Summary ── */}
            <Reveal>
              <div className="lg:sticky lg:top-28">
                <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.12)]">
                  <h2 className="text-lg font-extrabold text-[var(--foreground)] mb-6">
                    {t("cart.summary.title")}
                  </h2>

                  {/* Line Items */}
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-[hsl(var(--muted-foreground))]">
                        {t("cart.summary.subtotal")}
                      </span>
                      <span className="font-semibold text-[var(--foreground)]">
                        ${subtotal.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[hsl(var(--muted-foreground))]">
                        {t("cart.summary.shipping")}
                      </span>
                      <span
                        className={cn(
                          "font-semibold",
                          shipping === 0 ? "text-green-600" : "text-[var(--foreground)]"
                        )}
                      >
                        {shipping === 0 ? t("cart.summary.freeLabel") : `$${shipping.toFixed(2)}`}
                      </span>
                    </div>
                    {appliedDiscount && (
                      <div className="flex justify-between text-sm">
                        <span className="text-green-600 font-medium flex items-center gap-1">
                          <Tag className="w-3.5 h-3.5" />
                          {appliedDiscount.code}
                        </span>
                        <span className="font-semibold text-green-600">
                          -{`$${discountAmount.toFixed(2)}`}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Divider */}
                  <div className="border-t border-[hsl(var(--border))] mb-5" />

                  {/* Grand Total */}
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-base font-bold text-[var(--foreground)]">
                      {t("cart.summary.total")}
                    </span>
                    <span className="text-2xl font-extrabold text-[var(--foreground)]">
                      ${grandTotal.toFixed(2)}
                    </span>
                  </div>

                  {/* Discount Code */}
                  <div className="mb-6">
                    <label className="block text-xs font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wide mb-2">
                      {t("cart.discount.label")}
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={discountCode}
                        onChange={(e) => setDiscountCode(e.target.value)}
                        placeholder={t("cart.discount.placeholder")}
                        className="flex-1 rounded-xl border border-[hsl(var(--border))] bg-[var(--background)] px-3 py-2.5 text-sm text-[var(--foreground)] placeholder:text-[hsl(var(--muted-foreground))] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition-all"
                        onKeyDown={(e) => e.key === "Enter" && handleApplyDiscount()}
                      />
                      <button
                        onClick={handleApplyDiscount}
                        className="rounded-xl bg-[var(--foreground)] text-[var(--background)] px-4 py-2.5 text-sm font-bold hover:opacity-80 transition-opacity"
                      >
                        {t("cart.discount.apply")}
                      </button>
                    </div>
                    {discountError && (
                      <p className="mt-1.5 text-xs text-red-500">{discountError}</p>
                    )}
                    {appliedDiscount && (
                      <p className="mt-1.5 text-xs text-green-600 font-medium">
                        {t("cart.discount.applied")}
                      </p>
                    )}
                    <p className="mt-2 text-xs text-[hsl(var(--muted-foreground))]">
                      {t("cart.discount.hint")}
                    </p>
                  </div>

                  {/* Checkout CTA */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full rounded-full bg-[var(--accent)] py-4 text-base font-extrabold text-black flex items-center justify-center gap-2 shadow-[0_4px_16px_-4px_rgba(0,0,0,0.2)] hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2"
                  >
                    {t("cart.checkout.cta")}
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>

                  {/* Trust Badges */}
                  <div className="mt-5 flex items-center justify-center gap-4 text-xs text-[hsl(var(--muted-foreground))]">
                    <span className="flex items-center gap-1">🔒 {t("cart.trust.secure")}</span>
                    <span className="flex items-center gap-1">↩️ {t("cart.trust.returns")}</span>
                  </div>
                </div>

                {/* Promo Note */}
                <Reveal delay={0.1}>
                  <div className="mt-4 rounded-2xl bg-[var(--accent)]/8 border border-[var(--accent)]/20 px-5 py-4">
                    <p className="text-xs font-semibold text-[var(--foreground)] mb-1">
                      🎉 {t("cart.promo.heading")}
                    </p>
                    <p className="text-xs text-[hsl(var(--muted-foreground))] leading-relaxed">
                      {t("cart.promo.body")}
                    </p>
                  </div>
                </Reveal>
              </div>
            </Reveal>
          </div>
        )}
      </div>
    </main>
  );
}