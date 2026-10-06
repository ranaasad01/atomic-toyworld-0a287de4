"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Star, ShoppingCart, Heart, ChevronLeft, ChevronRight, Check, Truck, Shield, RotateCcw, Plus, Minus, Share2 } from 'lucide-react';
import { Reveal } from "@/components/Reveal";
import { staggerContainer, scaleIn } from "@/lib/motion";
import { cn } from "@/lib/utils";

// ─── Inline mock data ────────────────────────────────────────────────────────

const PRODUCT = {
  id: "toy-001",
  name: "Galaxy Explorer Robot",
  brand: "TechKids Pro",
  ageRange: "6–12 years",
  price: 49.99,
  originalPrice: 69.99,
  rating: 4.7,
  reviewCount: 284,
  badge: "Best Seller",
  description:
    "The Galaxy Explorer Robot is the ultimate STEM companion for curious young minds. Packed with interactive sensors, voice commands, and programmable dance moves, this robot sparks creativity and teaches the basics of coding through play. Its durable ABS plastic body can handle the toughest adventures, while the LED eyes and sound effects bring it to life in any room.",
  images: [
    "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/ab60691dd65e4db7960c5e8a699be35c.jpg",
    "/images/stem-toy.jpg",
    "https://api.dicebear.com/7.x/shapes/svg?seed=action%20figure%20toy",
    "/images/toy-car.jpg",
  ],
  specs: [
    { label: "Material", value: "ABS Plastic (BPA-Free)" },
    { label: "Battery", value: "4 × AA (included)" },
    { label: "Height", value: "32 cm" },
    { label: "Weight", value: "680 g" },
    { label: "Connectivity", value: "Bluetooth 5.0" },
    { label: "App Compatible", value: "iOS & Android" },
  ],
  features: [
    "Voice-activated commands",
    "Programmable dance sequences",
    "Obstacle-avoidance sensors",
    "LED light-up eyes and chest panel",
    "Companion app with 50+ missions",
    "STEM learning curriculum included",
  ],
  inStock: true,
  category: "stem",
};

const RELATED_PRODUCTS = [
  {
    id: "r1",
    name: "Dino Dig Kit",
    price: 29.99,
    originalPrice: 39.99,
    rating: 4.5,
    reviewCount: 132,
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/a7698fe5d6ea4e64b2845a0970bce85f.jpg",
    badge: "New",
  },
  {
    id: "r2",
    name: "Magnetic Tile Set 100pc",
    price: 54.99,
    originalPrice: undefined,
    rating: 4.8,
    reviewCount: 391,
    image: "https://api.dicebear.com/7.x/shapes/svg?seed=splash%20pad",
    badge: undefined,
  },
  {
    id: "r3",
    name: "Junior Chemistry Lab",
    price: 34.99,
    originalPrice: 44.99,
    rating: 4.6,
    reviewCount: 87,
    image: "https://api.dicebear.com/7.x/shapes/svg?seed=robot%20building%20kit",
    badge: "Sale",
  },
  {
    id: "r4",
    name: "Space Shuttle Playset",
    price: 44.99,
    originalPrice: undefined,
    rating: 4.4,
    reviewCount: 210,
    image: "https://api.dicebear.com/7.x/shapes/svg?seed=space%20shuttle%20playset",
    badge: undefined,
  },
  {
    id: "r5",
    name: "Coding Caterpillar",
    price: 24.99,
    originalPrice: 32.99,
    rating: 4.9,
    reviewCount: 503,
    image: "https://api.dicebear.com/7.x/shapes/svg?seed=coding%20caterpillar",
    badge: "Top Rated",
  },
];

const REVIEWS = [
  {
    id: "rev1",
    author: "Sarah M.",
    rating: 5,
    date: "March 12, 2025",
    title: "My son absolutely loves it!",
    body: "We bought this for our 8-year-old and he hasn't put it down. The app missions are genuinely educational and the robot is sturdy enough to survive his bedroom floor.",
    verified: true,
  },
  {
    id: "rev2",
    author: "James T.",
    rating: 4,
    date: "February 28, 2025",
    title: "Great quality, setup takes a moment",
    body: "Build quality is excellent and the LED effects are really impressive. Took about 20 minutes to pair with the app but once connected it worked perfectly.",
    verified: true,
  },
  {
    id: "rev3",
    author: "Priya K.",
    rating: 5,
    date: "January 15, 2025",
    title: "Perfect STEM gift",
    body: "Bought as a birthday gift. The child was coding simple sequences within an hour. Highly recommend for any kid interested in technology.",
    verified: false,
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

const thumbVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: "easeOut" } },
};

function ImageGallery({ images }: { images: string[] }) {
  const [active, setActive] = useState(0);

  const prev = useCallback(() => setActive((i) => (i - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() => setActive((i) => (i + 1) % images.length), [images.length]);

  return (
    <div className="flex flex-col gap-4">
      {/* Main image */}
      <div className="relative overflow-hidden rounded-2xl bg-[hsl(var(--muted))] aspect-square border border-black/5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.12)]">
        <AnimatePresence mode="wait">
          <motion.img
            key={active}
            src={images[active]}
            alt={`Product view ${active + 1}`}
            className="w-full h-full object-cover"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/ab60691dd65e4db7960c5e8a699be35c.jpg";
            }}
          />
        </AnimatePresence>

        {/* Badge */}
        {PRODUCT.badge && (
          <span className="absolute top-4 left-4 bg-[var(--brand-accent)] text-white text-xs font-bold px-3 py-1 rounded-full shadow">
            {PRODUCT.badge}
          </span>
        )}

        {/* Nav arrows */}
        <button
          onClick={prev}
          aria-label="Previous image"
          className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm border border-black/5 flex items-center justify-center shadow hover:bg-white transition-all duration-200"
        >
          <ChevronLeft className="w-4 h-4 text-gray-700" />
        </button>
        <button
          onClick={next}
          aria-label="Next image"
          className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm border border-black/5 flex items-center justify-center shadow hover:bg-white transition-all duration-200"
        >
          <ChevronRight className="w-4 h-4 text-gray-700" />
        </button>

        {/* Dot indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`View image ${i + 1}`}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-200",
                i === active ? "bg-[var(--brand-accent)] w-5" : "bg-white/60"
              )}
            />
          ))}
        </div>
      </div>

      {/* Thumbnails */}
      <motion.div
        className="grid grid-cols-4 gap-2"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {images.map((src, i) => (
          <motion.button
            key={i}
            variants={thumbVariants}
            onClick={() => setActive(i)}
            className={cn(
              "aspect-square rounded-xl overflow-hidden border-2 transition-all duration-200",
              i === active
                ? "border-[var(--brand-accent)] shadow-md"
                : "border-transparent hover:border-[var(--brand-accent)]/40"
            )}
          >
            <img
              src={src}
              alt={`Thumbnail ${i + 1}`}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/ab60691dd65e4db7960c5e8a699be35c.jpg";
              }}
            />
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
}

function StarRating({ rating, count }: { rating: number; count: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={cn(
              "w-4 h-4",
              star <= Math.round(rating)
                ? "fill-[var(--brand-accent)] text-[var(--brand-accent)]"
                : "fill-gray-200 text-gray-200"
            )}
          />
        ))}
      </div>
      <span className="text-sm font-semibold text-[hsl(var(--foreground))]">{rating}</span>
      <span className="text-sm text-[hsl(var(--muted-foreground))]">({count} reviews)</span>
    </div>
  );
}

function QuantitySelector({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex items-center gap-0 rounded-xl border border-[hsl(var(--border))] overflow-hidden w-fit">
      <button
        onClick={() => onChange(Math.max(1, value - 1))}
        aria-label="Decrease quantity"
        className="w-10 h-10 flex items-center justify-center hover:bg-[hsl(var(--muted))] transition-colors"
      >
        <Minus className="w-4 h-4" />
      </button>
      <span className="w-12 text-center text-sm font-semibold border-x border-[hsl(var(--border))] h-10 flex items-center justify-center">
        {value}
      </span>
      <button
        onClick={() => onChange(Math.min(99, value + 1))}
        aria-label="Increase quantity"
        className="w-10 h-10 flex items-center justify-center hover:bg-[hsl(var(--muted))] transition-colors"
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  );
}

type Tab = "description" | "specs" | "reviews";

function ProductTabs() {
  const t = useTranslations();
  const [activeTab, setActiveTab] = useState<Tab>("description");

  const tabs: { id: Tab; label: string }[] = [
    { id: "description", label: t("productDetail.tabs.description") },
    { id: "specs", label: t("productDetail.tabs.specs") },
    { id: "reviews", label: t("productDetail.tabs.reviews") },
  ];

  return (
    <div className="mt-8">
      {/* Tab bar */}
      <div className="flex gap-1 border-b border-[hsl(var(--border))]">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "px-5 py-2.5 text-sm font-medium transition-all duration-200 border-b-2 -mb-px",
              activeTab === tab.id
                ? "border-[var(--brand-accent)] text-[var(--brand-accent)]"
                : "border-transparent text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="pt-6"
        >
          {activeTab === "description" && (
            <div className="space-y-4">
              <p className="text-[hsl(var(--muted-foreground))] leading-relaxed">
                {PRODUCT.description}
              </p>
              <ul className="space-y-2 mt-4">
                {PRODUCT.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-[hsl(var(--foreground))]">
                    <Check className="w-4 h-4 text-[var(--brand-accent)] mt-0.5 shrink-0" />
                    {feat}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === "specs" && (
            <div className="rounded-xl border border-[hsl(var(--border))] overflow-hidden">
              {PRODUCT.specs.map((spec, i) => (
                <div
                  key={i}
                  className={cn(
                    "flex items-center px-5 py-3 text-sm",
                    i % 2 === 0 ? "bg-[hsl(var(--muted))]/40" : "bg-transparent"
                  )}
                >
                  <span className="w-40 font-medium text-[hsl(var(--foreground))]">{spec.label}</span>
                  <span className="text-[hsl(var(--muted-foreground))]">{spec.value}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="space-y-5">
              {/* Summary bar */}
              <div className="flex items-center gap-4 p-4 rounded-xl bg-[hsl(var(--muted))]/40 border border-[hsl(var(--border))]">
                <div className="text-center">
                  <p className="text-4xl font-bold text-[hsl(var(--foreground))]">{PRODUCT.rating}</p>
                  <StarRating rating={PRODUCT.rating} count={PRODUCT.reviewCount} />
                </div>
              </div>

              {/* Review cards */}
              {REVIEWS.map((rev) => (
                <div
                  key={rev.id}
                  className="p-5 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] space-y-2"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-semibold text-sm text-[hsl(var(--foreground))]">{rev.author}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <div className="flex gap-0.5">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star
                              key={s}
                              className={cn(
                                "w-3 h-3",
                                s <= rev.rating
                                  ? "fill-[var(--brand-accent)] text-[var(--brand-accent)]"
                                  : "fill-gray-200 text-gray-200"
                              )}
                            />
                          ))}
                        </div>
                        {rev.verified && (
                          <span className="text-xs text-green-600 font-medium">Verified Purchase</span>
                        )}
                      </div>
                    </div>
                    <span className="text-xs text-[hsl(var(--muted-foreground))] shrink-0">{rev.date}</span>
                  </div>
                  <p className="font-medium text-sm text-[hsl(var(--foreground))]">{rev.title}</p>
                  <p className="text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">{rev.body}</p>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function RelatedProductCard({
  product,
}: {
  product: (typeof RELATED_PRODUCTS)[number];
}) {
  const [wishlisted, setWishlisted] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: "0 12px 32px -8px rgba(0,0,0,0.15)" }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="min-w-[200px] w-[200px] rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_12px_-4px_rgba(0,0,0,0.08)] flex-shrink-0"
    >
      <div className="relative aspect-square bg-[hsl(var(--muted))]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/ab60691dd65e4db7960c5e8a699be35c.jpg";
          }}
        />
        {product.badge && (
          <span className="absolute top-2 left-2 bg-[var(--brand-accent)] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
            {product.badge}
          </span>
        )}
        <button
          onClick={() => setWishlisted((w) => !w)}
          aria-label="Add to wishlist"
          className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow"
        >
          <Heart
            className={cn(
              "w-3.5 h-3.5 transition-colors",
              wishlisted ? "fill-red-500 text-red-500" : "text-gray-400"
            )}
          />
        </button>
      </div>
      <div className="p-3 space-y-1.5">
        <p className="text-xs font-semibold text-[hsl(var(--foreground))] leading-tight line-clamp-2">
          {product.name}
        </p>
        <div className="flex items-center gap-1">
          <Star className="w-3 h-3 fill-[var(--brand-accent)] text-[var(--brand-accent)]" />
          <span className="text-xs text-[hsl(var(--muted-foreground))]">
            {product.rating} ({product.reviewCount})
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-sm font-bold text-[hsl(var(--foreground))]">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-[hsl(var(--muted-foreground))] line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
        <Link
          href="/shop"
          className="block w-full text-center text-xs font-semibold py-1.5 rounded-lg bg-[var(--brand-accent)] text-white hover:opacity-90 transition-opacity mt-1"
        >
          View
        </Link>
      </div>
    </motion.div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function ProductDetailPage() {
  const t = useTranslations();
  const [quantity, setQuantity] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = useCallback(() => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  }, []);

  const discount = PRODUCT.originalPrice
    ? Math.round(((PRODUCT.originalPrice - PRODUCT.price) / PRODUCT.originalPrice) * 100)
    : 0;

  return (
    <main className="min-h-screen bg-[hsl(var(--background))]">
      {/* Breadcrumb */}
      <Reveal>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
          <nav className="flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))]">
            <Link href="/" className="hover:text-[var(--brand-accent)] transition-colors">
              {t("productDetail.breadcrumb.home")}
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/shop" className="hover:text-[var(--brand-accent)] transition-colors">
              {t("productDetail.breadcrumb.shop")}
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[hsl(var(--foreground))] font-medium truncate max-w-[200px]">
              {PRODUCT.name}
            </span>
          </nav>
        </div>
      </Reveal>

      {/* Product hero — image + info */}
      <Reveal>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16">
            {/* Left: image gallery */}
            <ImageGallery images={PRODUCT.images} />

            {/* Right: product info */}
            <div className="flex flex-col gap-5">
              {/* Brand + share */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-[var(--brand-accent)] tracking-wide uppercase">
                  {PRODUCT.brand}
                </span>
                <button
                  aria-label="Share product"
                  className="w-9 h-9 rounded-full border border-[hsl(var(--border))] flex items-center justify-center hover:bg-[hsl(var(--muted))] transition-colors"
                >
                  <Share2 className="w-4 h-4 text-[hsl(var(--muted-foreground))]" />
                </button>
              </div>

              {/* Name */}
              <h1 className="text-3xl sm:text-4xl font-bold text-[hsl(var(--foreground))] tracking-tight text-balance leading-tight">
                {PRODUCT.name}
              </h1>

              {/* Rating */}
              <StarRating rating={PRODUCT.rating} count={PRODUCT.reviewCount} />

              {/* Age range pill */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium px-3 py-1 rounded-full bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] border border-[hsl(var(--border))]">
                  {t("productDetail.info.ageLabel")}: {PRODUCT.ageRange}
                </span>
                <span className="text-xs font-medium px-3 py-1 rounded-full bg-green-50 text-green-700 border border-green-200">
                  {t("productDetail.info.inStock")}
                </span>
              </div>

              {/* Price */}
              <div className="flex items-end gap-3">
                <span className="text-4xl font-bold text-[hsl(var(--foreground))]">
                  ${PRODUCT.price.toFixed(2)}
                </span>
                {PRODUCT.originalPrice && (
                  <>
                    <span className="text-xl text-[hsl(var(--muted-foreground))] line-through mb-0.5">
                      ${PRODUCT.originalPrice.toFixed(2)}
                    </span>
                    <span className="mb-0.5 text-sm font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full border border-green-200">
                      {discount}% {t("productDetail.info.off")}
                    </span>
                  </>
                )}
              </div>

              {/* Short description */}
              <p className="text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">
                {t("productDetail.info.shortDesc")}
              </p>

              {/* Quantity + CTA */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 pt-2">
                <QuantitySelector value={quantity} onChange={setQuantity} />
                <motion.button
                  onClick={handleAddToCart}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className={cn(
                    "flex-1 sm:flex-none flex items-center justify-center gap-2 px-8 py-3 rounded-xl font-semibold text-sm transition-all duration-300",
                    addedToCart
                      ? "bg-green-500 text-white"
                      : "bg-[var(--brand-accent)] text-white hover:opacity-90"
                  )}
                >
                  {addedToCart ? (
                    <>
                      <Check className="w-4 h-4" />
                      {t("productDetail.cta.added")}
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-4 h-4" />
                      {t("productDetail.cta.addToCart")}
                    </>
                  )}
                </motion.button>
                <motion.button
                  onClick={() => setWishlisted((w) => !w)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Add to wishlist"
                  className="w-12 h-12 rounded-xl border border-[hsl(var(--border))] flex items-center justify-center hover:bg-[hsl(var(--muted))] transition-colors"
                >
                  <Heart
                    className={cn(
                      "w-5 h-5 transition-colors",
                      wishlisted ? "fill-red-500 text-red-500" : "text-[hsl(var(--muted-foreground))]"
                    )}
                  />
                </motion.button>
              </div>

              {/* Trust badges */}
              <div className="grid grid-cols-3 gap-3 pt-2 border-t border-[hsl(var(--border))]">
                {[
                  { icon: Truck, label: t("productDetail.trust.freeShipping") },
                  { icon: Shield, label: t("productDetail.trust.safePayment") },
                  { icon: RotateCcw, label: t("productDetail.trust.easyReturns") },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex flex-col items-center gap-1.5 text-center">
                    <div className="w-9 h-9 rounded-full bg-[hsl(var(--muted))] flex items-center justify-center">
                      <Icon className="w-4 h-4 text-[var(--brand-accent)]" />
                    </div>
                    <span className="text-xs text-[hsl(var(--muted-foreground))] leading-tight">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* Tabs: description / specs / reviews */}
      <Reveal>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="bg-[hsl(var(--card))] rounded-2xl border border-[hsl(var(--border))] p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.08)]">
            <ProductTabs />
          </div>
        </section>
      </Reveal>

      {/* You May Also Like */}
      <Reveal>
        <section className="bg-[hsl(var(--muted))]/30 border-t border-[hsl(var(--border))] py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-6">
              <div>
                <p className="text-xs font-semibold text-[var(--brand-accent)] uppercase tracking-widest mb-1">
                  {t("productDetail.related.eyebrow")}
                </p>
                <h2 className="text-2xl font-bold text-[hsl(var(--foreground))] tracking-tight">
                  {t("productDetail.related.heading")}
                </h2>
              </div>
              <Link
                href="/shop"
                className="text-sm font-semibold text-[var(--brand-accent)] hover:underline hidden sm:block"
              >
                {t("productDetail.related.viewAll")}
              </Link>
            </div>

            {/* Horizontal scroll row */}
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
              {RELATED_PRODUCTS.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, delay: i * 0.07, ease: "easeOut" }}
                  className="snap-start"
                >
                  <RelatedProductCard product={product} />
                </motion.div>
              ))}
            </div>

            <div className="mt-4 sm:hidden text-center">
              <Link
                href="/shop"
                className="text-sm font-semibold text-[var(--brand-accent)] hover:underline"
              >
                {t("productDetail.related.viewAll")}
              </Link>
            </div>
          </div>
        </section>
      </Reveal>

      {/* CTA banner */}
      <Reveal>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="relative overflow-hidden rounded-3xl bg-[var(--brand-accent)] px-8 py-12 text-center shadow-[0_4px_32px_-8px_rgba(0,0,0,0.2)]">
            {/* Decorative blobs */}
            <div className="pointer-events-none absolute -top-10 -left-10 w-48 h-48 rounded-full bg-white/10 blur-2xl" />
            <div className="pointer-events-none absolute -bottom-10 -right-10 w-64 h-64 rounded-full bg-white/10 blur-2xl" />

            <p className="text-white/80 text-sm font-semibold uppercase tracking-widest mb-2">
              {t("productDetail.banner.eyebrow")}
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4 text-balance">
              {t("productDetail.banner.heading")}
            </h2>
            <p className="text-white/80 text-base max-w-xl mx-auto mb-8 leading-relaxed">
              {t("productDetail.banner.body")}
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-white text-[var(--brand-accent)] font-bold px-8 py-3 rounded-xl hover:bg-white/90 transition-colors shadow-md"
            >
              {t("productDetail.banner.cta")}
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </Reveal>
    </main>
  );
}