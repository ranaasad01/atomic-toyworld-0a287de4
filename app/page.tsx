"use client";

import { motion, type Variants } from "framer-motion";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Star, Truck, ShieldCheck, RotateCcw, Headphones, ArrowRight, Sparkles, Gift, Heart } from 'lucide-react';
import { Reveal } from "@/components/Reveal";
import { staggerContainer, scaleIn, fadeInUp, slideInLeft, slideInRight } from "@/lib/motion";
import { cn } from "@/lib/utils";

// ─── Inline data ────────────────────────────────────────────────────────────

const FEATURED_PRODUCTS = [
  {
    id: "1",
    name: "Galaxy Explorer Robot",
    price: 49.99,
    originalPrice: 64.99,
    rating: 4.8,
    reviewCount: 312,
    badge: "Best Seller",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/ab60691dd65e4db7960c5e8a699be35c.jpg",
    category: "STEM",
    ageGroup: "6+",
  },
  {
    id: "2",
    name: "Rainbow Stacking Rings",
    price: 18.99,
    originalPrice: undefined,
    rating: 4.9,
    reviewCount: 541,
    badge: "New",
    image: "https://api.dicebear.com/7.x/shapes/svg?seed=stacking%20rings%20toy",
    category: "Educational",
    ageGroup: "1+",
  },
  {
    id: "3",
    name: "Dino Adventure Playset",
    price: 34.99,
    originalPrice: 44.99,
    rating: 4.7,
    reviewCount: 228,
    badge: "Sale",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/a7698fe5d6ea4e64b2845a0970bce85f.jpg",
    category: "Action",
    ageGroup: "4+",
  },
  {
    id: "4",
    name: "Cozy Bunny Plush",
    price: 22.99,
    originalPrice: undefined,
    rating: 5.0,
    reviewCount: 189,
    badge: undefined,
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/0c978b48c452445fb21909487899cd65.jpg",
    category: "Dolls",
    ageGroup: "0+",
  },
];

const CATEGORY_CARDS = [
  { id: "action", label: "Action Figures", icon: "🦸", href: "/shop?category=action", color: "from-orange-400/20 to-red-400/20" },
  { id: "educational", label: "Educational", icon: "🧩", href: "/shop?category=educational", color: "from-blue-400/20 to-cyan-400/20" },
  { id: "outdoor", label: "Outdoor & Sports", icon: "⚽", href: "/shop?category=outdoor", color: "from-green-400/20 to-emerald-400/20" },
  { id: "dolls", label: "Dolls & Plush", icon: "🧸", href: "/shop?category=dolls", color: "from-pink-400/20 to-rose-400/20" },
  { id: "games", label: "Board Games", icon: "🎲", href: "/shop?category=games", color: "from-purple-400/20 to-violet-400/20" },
  { id: "stem", label: "STEM Toys", icon: "🔬", href: "/shop?category=stem", color: "from-yellow-400/20 to-amber-400/20" },
];

const TESTIMONIALS = [
  {
    id: "t1",
    name: "Sarah M.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=mom%20avatar",
    rating: 5,
    text: "My daughter absolutely loves her new art kit from ToyZone. The quality is incredible and it arrived the very next day. Will definitely be ordering again!",
    product: "Creative Art Studio Kit",
  },
  {
    id: "t2",
    name: "James R.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=dad%20avatar",
    rating: 5,
    text: "Best toy store online, period. The STEM robot set kept my son busy for weeks. He learned so much while having a blast. Highly recommend to every parent.",
    product: "Galaxy Explorer Robot",
  },
  {
    id: "t3",
    name: "Priya K.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=parent%20avatar",
    rating: 5,
    text: "Fantastic selection and super fast shipping. The packaging was so thoughtful and eco-friendly. ToyZone is now our go-to for every birthday and holiday gift.",
    product: "Dino Adventure Playset",
  },
];

const VALUE_PROPS = [
  { icon: Truck, titleKey: "value.shipping.title", descKey: "value.shipping.desc" },
  { icon: ShieldCheck, titleKey: "value.safety.title", descKey: "value.safety.desc" },
  { icon: RotateCcw, titleKey: "value.returns.title", descKey: "value.returns.desc" },
  { icon: Headphones, titleKey: "value.support.title", descKey: "value.support.desc" },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

function StarRating({ rating, count }: { rating: number; count: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((s) => (
          <Star
            key={s}
            className={cn(
              "h-3.5 w-3.5",
              s <= Math.round(rating)
                ? "fill-[var(--brand-accent)] text-[var(--brand-accent)]"
                : "fill-transparent text-gray-300"
            )}
          />
        ))}
      </div>
      <span className="text-xs text-gray-500">({count})</span>
    </div>
  );
}

function ProductCard({ product }: { product: typeof FEATURED_PRODUCTS[0] }) {
  const t = useTranslations();
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="group relative flex flex-col rounded-2xl bg-white border border-black/5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.10)] overflow-hidden"
    >
      {product.badge && (
        <span className="absolute top-3 left-3 z-10 rounded-full bg-[var(--brand-accent)] px-2.5 py-0.5 text-xs font-bold text-white shadow-sm">
          {product.badge}
        </span>
      )}
      <div className="relative h-52 overflow-hidden bg-[var(--brand-surface)]">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/aff67efdc5634f338aeba6391ab4ac43.jpg";
          }}
        />
      </div>
      <div className="flex flex-col gap-2 p-4">
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-[var(--brand-surface)] px-2 py-0.5 text-[10px] font-semibold text-[var(--brand-primary)] uppercase tracking-wide">
            {product.category}
          </span>
          <span className="text-[10px] text-gray-400">Age {product.ageGroup}</span>
        </div>
        <h3 className="font-bold text-gray-900 leading-snug">{product.name}</h3>
        <StarRating rating={product.rating} count={product.reviewCount} />
        <div className="flex items-center justify-between mt-1">
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg font-extrabold text-gray-900">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-400 line-through">${product.originalPrice.toFixed(2)}</span>
            )}
          </div>
          <motion.button
            whileTap={{ scale: 0.93 }}
            className="rounded-full bg-[var(--brand-accent)] px-3 py-1.5 text-xs font-bold text-white shadow-sm hover:bg-[var(--brand-accent-hover)] transition-colors"
          >
            {t("product.addToCart")}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Hero badge animation ────────────────────────────────────────────────────

const heroBadge: Variants = {
  hidden: { opacity: 0, scale: 0.7, rotate: -8 },
  visible: { opacity: 1, scale: 1, rotate: 0, transition: { duration: 0.55, ease: "easeOut", delay: 0.6 } },
};

const heroHeading: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut", delay: 0.1 } },
};

const heroSub: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut", delay: 0.3 } },
};

const heroCta: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut", delay: 0.45 } },
};

// ─── Page ────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const t = useTranslations();

  return (
    <main className="overflow-x-hidden">
      {/* ── Hero ── */}
      <section
        id="hero"
        className="relative min-h-[92vh] flex items-center bg-[var(--brand-surface)] overflow-hidden"
      >
        {/* Background mesh */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 70% 40%, rgba(255,200,50,0.18) 0%, transparent 70%), radial-gradient(ellipse 50% 50% at 20% 80%, rgba(255,100,80,0.12) 0%, transparent 60%)",
          }}
        />
        {/* Floating blobs */}
        <motion.div
          aria-hidden
          animate={{ y: [0, -18, 0], rotate: [0, 6, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute right-[8%] top-[12%] h-20 w-20 rounded-full bg-[var(--brand-accent)]/20 blur-xl"
        />
        <motion.div
          aria-hidden
          animate={{ y: [0, 14, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="pointer-events-none absolute left-[5%] bottom-[20%] h-28 w-28 rounded-full bg-pink-400/15 blur-2xl"
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center py-24">
          {/* Left copy */}
          <div className="relative z-10">
            <motion.div
              variants={heroBadge}
              initial="hidden"
              animate="visible"
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--brand-accent)]/30 bg-[var(--brand-accent)]/10 px-4 py-1.5"
            >
              <Sparkles className="h-3.5 w-3.5 text-[var(--brand-accent)]" />
              <span className="text-xs font-semibold text-[var(--brand-accent)] uppercase tracking-widest">
                {t("hero.badge")}
              </span>
            </motion.div>

            <motion.h1
              variants={heroHeading}
              initial="hidden"
              animate="visible"
              className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-gray-900 leading-[1.05] text-balance"
            >
              {t("hero.heading.line1")}{" "}
              <span className="relative inline-block text-[var(--brand-accent)]">
                {t("hero.heading.accent")}
                <svg
                  aria-hidden
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 200 12"
                  fill="none"
                >
                  <path
                    d="M2 9 Q50 2 100 8 Q150 14 198 6"
                    stroke="var(--brand-accent)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    fill="none"
                    opacity="0.5"
                  />
                </svg>
              </span>{" "}
              {t("hero.heading.line2")}
            </motion.h1>

            <motion.p
              variants={heroSub}
              initial="hidden"
              animate="visible"
              className="mt-6 text-lg text-gray-600 leading-relaxed max-w-lg text-pretty"
            >
              {t("hero.subtext")}
            </motion.p>

            <motion.div
              variants={heroCta}
              initial="hidden"
              animate="visible"
              className="mt-8 flex flex-wrap gap-4"
            >
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--brand-accent)] px-7 py-3.5 text-base font-bold text-white shadow-[0_4px_20px_rgba(255,160,0,0.35)] hover:bg-[var(--brand-accent-hover)] hover:shadow-[0_6px_28px_rgba(255,160,0,0.45)] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-accent)] focus-visible:ring-offset-2"
              >
                {t("hero.cta.primary")}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-7 py-3.5 text-base font-semibold text-gray-700 hover:border-[var(--brand-accent)] hover:text-[var(--brand-accent)] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-accent)] focus-visible:ring-offset-2"
              >
                {t("hero.cta.secondary")}
              </Link>
            </motion.div>

            {/* Stats row */}
            <motion.div
              variants={heroCta}
              initial="hidden"
              animate="visible"
              className="mt-10 flex flex-wrap gap-6"
            >
              {(
                Array.isArray(t.raw("hero.stats")) ? t.raw("hero.stats") : []
              ).map((stat: { value: string; label: string }, i: number) => (
                <div key={i} className="flex flex-col">
                  <span className="text-2xl font-extrabold text-gray-900">{stat.value}</span>
                  <span className="text-xs text-gray-500 mt-0.5">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right image collage */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            animate="visible"
            className="relative hidden lg:flex items-center justify-center"
          >
            <div className="relative w-full max-w-md">
              {/* Main image */}
              <div className="relative z-10 rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.15)] border-4 border-white">
                <img
                  src="https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/8c86ba1ee8944c20aa5f3454e3475e52.jpg"
                  alt="Children playing with colorful toys"
                  className="w-full h-80 object-cover"
                />
              </div>
              {/* Floating card 1 */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -left-10 top-8 z-20 rounded-2xl bg-white p-3 shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-black/5"
              >
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🎉</span>
                  <div>
                    <p className="text-xs font-bold text-gray-900">{t("hero.floatCard1.title")}</p>
                    <p className="text-[10px] text-gray-500">{t("hero.floatCard1.sub")}</p>
                  </div>
                </div>
              </motion.div>
              {/* Floating card 2 */}
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute -right-8 bottom-10 z-20 rounded-2xl bg-white p-3 shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-black/5"
              >
                <div className="flex items-center gap-2">
                  <span className="text-2xl">⭐</span>
                  <div>
                    <p className="text-xs font-bold text-gray-900">{t("hero.floatCard2.title")}</p>
                    <p className="text-[10px] text-gray-500">{t("hero.floatCard2.sub")}</p>
                  </div>
                </div>
              </motion.div>
              {/* Decorative circle */}
              <div
                aria-hidden
                className="absolute -bottom-6 -right-6 h-40 w-40 rounded-full bg-[var(--brand-accent)]/15 -z-10"
              />
              <div
                aria-hidden
                className="absolute -top-6 -left-6 h-28 w-28 rounded-full bg-pink-300/20 -z-10"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Value Props ── */}
      <section id="value-props" className="bg-white py-12 border-y border-black/5">
        <Reveal>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {VALUE_PROPS.map(({ icon: Icon, titleKey, descKey }) => (
                <motion.div
                  key={titleKey}
                  variants={scaleIn}
                  className="flex flex-col items-center text-center gap-3 p-5 rounded-2xl hover:bg-[var(--brand-surface)] transition-colors duration-300"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--brand-accent)]/10">
                    <Icon className="h-5 w-5 text-[var(--brand-accent)]" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{t(titleKey)}</p>
                    <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{t(descKey)}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </Reveal>
      </section>

      {/* ── Categories ── */}
      <section id="categories" className="py-20 bg-[var(--brand-surface)]">
        <Reveal>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="inline-block rounded-full bg-[var(--brand-accent)]/10 px-4 py-1 text-xs font-bold text-[var(--brand-accent)] uppercase tracking-widest mb-3">
                {t("categories.eyebrow")}
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 text-balance">
                {t("categories.heading")}
              </h2>
              <p className="mt-3 text-gray-500 max-w-xl mx-auto text-pretty">
                {t("categories.subtext")}
              </p>
            </div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4"
            >
              {CATEGORY_CARDS.map((cat) => (
                <motion.div key={cat.id} variants={scaleIn}>
                  <Link
                    href={cat.href}
                    className={cn(
                      "group flex flex-col items-center gap-3 rounded-2xl p-5 border border-black/5 bg-gradient-to-br transition-all duration-300 hover:shadow-[0_8px_32px_rgba(0,0,0,0.10)] hover:-translate-y-1",
                      cat.color,
                      "bg-white"
                    )}
                  >
                    <span className="text-4xl transition-transform duration-300 group-hover:scale-110">
                      {cat.icon}
                    </span>
                    <span className="text-center text-xs font-bold text-gray-800 leading-tight">
                      {cat.label}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </Reveal>
      </section>

      {/* ── Featured Products ── */}
      <section id="featured" className="py-24 bg-white">
        <Reveal>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
              <div>
                <span className="inline-block rounded-full bg-[var(--brand-accent)]/10 px-4 py-1 text-xs font-bold text-[var(--brand-accent)] uppercase tracking-widest mb-3">
                  {t("featured.eyebrow")}
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 text-balance">
                  {t("featured.heading")}
                </h2>
              </div>
              <Link
                href="/shop"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--brand-accent)] hover:gap-3 transition-all duration-200"
              >
                {t("featured.viewAll")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {FEATURED_PRODUCTS.map((product) => (
                <motion.div key={product.id} variants={fadeInUp}>
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </Reveal>
      </section>

      {/* ── Brand Story / Split Section ── */}
      <section id="about" className="py-24 bg-gray-900 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
          {/* Image side */}
          <Reveal className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
              <img
                src="https://api.dicebear.com/7.x/shapes/svg?seed=toy%20store%20interior"
                alt="Colorful toy store interior"
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
            </div>
            {/* Floating stat */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -right-4 rounded-2xl bg-[var(--brand-accent)] px-5 py-4 shadow-[0_8px_32px_rgba(255,160,0,0.4)]"
            >
              <p className="text-2xl font-extrabold text-white">{t("story.statValue")}</p>
              <p className="text-xs text-white/80 mt-0.5">{t("story.statLabel")}</p>
            </motion.div>
          </Reveal>

          {/* Copy side */}
          <Reveal delay={0.15}>
            <div className="text-white">
              <span className="inline-block rounded-full border border-[var(--brand-accent)]/40 bg-[var(--brand-accent)]/10 px-4 py-1 text-xs font-bold text-[var(--brand-accent)] uppercase tracking-widest mb-5">
                {t("story.eyebrow")}
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight text-balance mb-5">
                {t("story.heading")}
              </h2>
              <p className="text-gray-300 leading-relaxed mb-5 text-pretty">
                {t("story.body1")}
              </p>
              <p className="text-gray-400 leading-relaxed mb-8 text-pretty">
                {t("story.body2")}
              </p>
              <div className="flex flex-wrap gap-4">
                {(Array.isArray(t.raw("story.pillars")) ? t.raw("story.pillars") : []).map(
                  (p: { icon: string; label: string }, i: number) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2"
                    >
                      <span>{p.icon}</span>
                      <span className="text-sm font-medium text-white/90">{p.label}</span>
                    </div>
                  )
                )}
              </div>
              <Link
                href="/about"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-[var(--brand-accent)] px-6 py-3 text-sm font-bold text-white hover:bg-[var(--brand-accent-hover)] transition-colors duration-300 shadow-[0_4px_20px_rgba(255,160,0,0.35)]"
              >
                {t("story.cta")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section id="testimonials" className="py-24 bg-[var(--brand-surface)]">
        <Reveal>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <span className="inline-block rounded-full bg-[var(--brand-accent)]/10 px-4 py-1 text-xs font-bold text-[var(--brand-accent)] uppercase tracking-widest mb-3">
                {t("testimonials.eyebrow")}
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 text-balance">
                {t("testimonials.heading")}
              </h2>
            </div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {TESTIMONIALS.map((review, i) => (
                <motion.div
                  key={review.id}
                  variants={fadeInUp}
                  className={cn(
                    "relative rounded-2xl bg-white border border-black/5 p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.08)]",
                    i === 1 && "md:-mt-4 md:shadow-[0_4px_40px_rgba(0,0,0,0.12)]"
                  )}
                >
                  <Heart className="absolute top-5 right-5 h-4 w-4 text-pink-400 fill-pink-400" />
                  <div className="flex mb-3">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="h-4 w-4 fill-[var(--brand-accent)] text-[var(--brand-accent)]" />
                    ))}
                  </div>
                  <p className="text-gray-700 leading-relaxed text-sm mb-5 text-pretty">
                    &ldquo;{review.text}&rdquo;
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t border-black/5">
                    <div className="h-9 w-9 rounded-full overflow-hidden bg-[var(--brand-surface)] flex-shrink-0">
                      <img
                        src={review.avatar}
                        alt={review.name}
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">{review.name}</p>
                      <p className="text-[11px] text-gray-400">Bought: {review.product}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </Reveal>
      </section>

      {/* ── Gift Finder CTA ── */}
      <section id="gift-finder" className="py-24 bg-white">
        <Reveal>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative rounded-3xl bg-gradient-to-br from-[var(--brand-accent)] to-orange-500 overflow-hidden px-8 py-16 text-center shadow-[0_20px_60px_rgba(255,160,0,0.30)]">
              {/* Background pattern */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-10"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px), radial-gradient(circle at 60% 80%, white 1px, transparent 1px)",
                  backgroundSize: "60px 60px",
                }}
              />
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="inline-block mb-5"
              >
                <Gift className="h-14 w-14 text-white mx-auto" />
              </motion.div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight text-balance mb-4">
                {t("giftFinder.heading")}
              </h2>
              <p className="text-white/85 max-w-xl mx-auto leading-relaxed mb-8 text-pretty">
                {t("giftFinder.subtext")}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-base font-bold text-[var(--brand-accent)] hover:bg-gray-50 transition-colors duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.15)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-orange-500"
                >
                  {t("giftFinder.cta.primary")}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full border-2 border-white/50 bg-transparent px-7 py-3.5 text-base font-semibold text-white hover:bg-white/10 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-orange-500"
                >
                  {t("giftFinder.cta.secondary")}
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}