"use client";

import { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, X, ChevronDown, Star, ShoppingCart, Heart, ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import { categories, type Product } from "@/lib/data";
import { fadeInUp, staggerContainer, scaleIn } from "@/lib/motion";
import { Reveal } from "@/components/Reveal";

// ─── Local constants ──────────────────────────────────────────────────────────

const AGE_GROUPS = [
  { value: "0-3", label: "Babies & Toddlers (0–3)" },
  { value: "4-8", label: "Kids (4–8)" },
  { value: "9-12", label: "Tweens (9–12)" },
  { value: "13+", label: "Teens (13+)" },
];

const BRANDS = [
  "LEGO",
  "Hasbro",
  "Mattel",
  "Fisher-Price",
  "Melissa & Doug",
  "VTech",
  "Playmobil",
  "Hot Wheels",
];

const SORT_OPTIONS = [
  { value: "popular", label: "Most Popular" },
  { value: "newest", label: "Newest First" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
];

const PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "LEGO Classic Creative Brick Box",
    price: 49.99,
    originalPrice: 64.99,
    rating: 4.8,
    reviewCount: 2341,
    category: "educational",
    ageGroup: "4-8",
    brand: "LEGO",
    image: "https://api.dicebear.com/7.x/shapes/svg?seed=lego%20bricks",
    badge: "Best Seller",
    description: "Spark creativity with 790 classic LEGO bricks in 33 colors.",
    inStock: true,
  },
  {
    id: "p2",
    name: "Barbie Dreamhouse Playset",
    price: 199.99,
    originalPrice: 249.99,
    rating: 4.7,
    reviewCount: 1876,
    category: "dolls",
    ageGroup: "4-8",
    brand: "Mattel",
    image: "https://api.dicebear.com/7.x/shapes/svg?seed=barbie%20dreamhouse%20playset",
    badge: "Sale",
    description: "A 3-story, 8-room dollhouse with elevator and pool.",
    inStock: true,
  },
  {
    id: "p3",
    name: "Nerf Elite 2.0 Commander",
    price: 34.99,
    rating: 4.6,
    reviewCount: 987,
    category: "action",
    ageGroup: "9-12",
    brand: "Hasbro",
    image: "https://api.dicebear.com/7.x/shapes/svg?seed=nerf%20gun",
    badge: "New",
    description: "6-dart rotating drum blaster with customizable attachments.",
    inStock: true,
  },
  {
    id: "p4",
    name: "Melissa & Doug Wooden Puzzle Set",
    price: 24.99,
    rating: 4.9,
    reviewCount: 3102,
    category: "educational",
    ageGroup: "0-3",
    brand: "Melissa & Doug",
    image: "https://api.dicebear.com/7.x/shapes/svg?seed=wooden%20puzzle",
    description: "Set of 4 chunky wooden puzzles for early learners.",
    inStock: true,
  },
  {
    id: "p5",
    name: "Hot Wheels Ultimate Garage",
    price: 89.99,
    originalPrice: 109.99,
    rating: 4.5,
    reviewCount: 654,
    category: "action",
    ageGroup: "4-8",
    brand: "Hot Wheels",
    image: "https://api.dicebear.com/7.x/shapes/svg?seed=garage",
    badge: "Sale",
    description: "5-level parking garage with elevator and 2 cars included.",
    inStock: true,
  },
  {
    id: "p6",
    name: "VTech KidiZoom Smartwatch DX3",
    price: 59.99,
    rating: 4.4,
    reviewCount: 812,
    category: "stem",
    ageGroup: "4-8",
    brand: "VTech",
    image: "https://api.dicebear.com/7.x/shapes/svg?seed=kids%20smartwatch",
    badge: "New",
    description: "Kid-safe smartwatch with dual cameras and fun games.",
    inStock: true,
  },
  {
    id: "p7",
    name: "Catan Board Game",
    price: 44.99,
    rating: 4.8,
    reviewCount: 5421,
    category: "games",
    ageGroup: "13+",
    brand: "Hasbro",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/e4159206f14b4b18b5ab8c4cf3d650b5.jpg",
    description: "Award-winning strategy game for the whole family.",
    inStock: true,
  },
  {
    id: "p8",
    name: "Fisher-Price Laugh & Learn Puppy",
    price: 29.99,
    rating: 4.7,
    reviewCount: 2198,
    category: "dolls",
    ageGroup: "0-3",
    brand: "Fisher-Price",
    image: "https://api.dicebear.com/7.x/shapes/svg?seed=stuffed%20puppy",
    description: "Interactive plush puppy that teaches letters, numbers, and songs.",
    inStock: true,
  },
  {
    id: "p9",
    name: "Playmobil City Life School",
    price: 74.99,
    originalPrice: 89.99,
    rating: 4.5,
    reviewCount: 431,
    category: "educational",
    ageGroup: "4-8",
    brand: "Playmobil",
    image: "https://api.dicebear.com/7.x/shapes/svg?seed=school",
    badge: "Sale",
    description: "Complete school playset with 2 figures and 50+ accessories.",
    inStock: false,
  },
  {
    id: "p10",
    name: "LEGO Technic Bugatti Chiron",
    price: 349.99,
    rating: 4.9,
    reviewCount: 1203,
    category: "stem",
    ageGroup: "13+",
    brand: "LEGO",
    image: "https://api.dicebear.com/7.x/shapes/svg?seed=lego%20car",
    badge: "Premium",
    description: "3,599-piece engineering masterpiece with working gearbox.",
    inStock: true,
  },
  {
    id: "p11",
    name: "Razor A Kick Scooter",
    price: 49.99,
    rating: 4.6,
    reviewCount: 3876,
    category: "outdoor",
    ageGroup: "9-12",
    brand: "Hasbro",
    image: "https://api.dicebear.com/7.x/shapes/svg?seed=kick%20scooter",
    description: "Lightweight aluminum scooter with rear fender brake.",
    inStock: true,
  },
  {
    id: "p12",
    name: "Snap Circuits Jr. Electronics Kit",
    price: 39.99,
    originalPrice: 49.99,
    rating: 4.7,
    reviewCount: 1654,
    category: "stem",
    ageGroup: "9-12",
    brand: "Melissa & Doug",
    image: "https://api.dicebear.com/7.x/shapes/svg?seed=electronics%20kit",
    badge: "Best Seller",
    description: "Build 100+ electronics projects with color-coded snap parts.",
    inStock: true,
  },
];

const ITEMS_PER_PAGE = 9;

// ─── Utility ──────────────────────────────────────────────────────────────────

function cn(...classes: (string | undefined | false | null)[]) {
  return classes.filter(Boolean).join(" ");
}

function StarRating({ rating, count }: { rating: number; count: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((s) => (
          <Star
            key={s}
            className={cn(
              "h-3.5 w-3.5",
              s <= Math.round(rating)
                ? "fill-[var(--brand-accent)] text-[var(--brand-accent)]"
                : "fill-gray-200 text-gray-200"
            )}
          />
        ))}
      </div>
      <span className="text-xs text-gray-500">({count.toLocaleString("en-US")})</span>
    </div>
  );
}

// ─── Product Card ─────────────────────────────────────────────────────────────

function ProductCard({ product, index }: { product: Product; index: number }) {
  const [wished, setWished] = useState(false);

  return (
    <motion.div
      variants={scaleIn}
      custom={index}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="group relative flex flex-col rounded-2xl border border-black/5 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.10)] overflow-hidden"
    >
      {/* Badge */}
      {product.badge && (
        <span className="absolute top-3 left-3 z-10 rounded-full bg-[var(--brand-accent)] px-2.5 py-0.5 text-xs font-bold text-white shadow-sm">
          {product.badge}
        </span>
      )}

      {/* Wishlist */}
      <button
        onClick={() => setWished((w) => !w)}
        aria-label="Add to wishlist"
        className="absolute top-3 right-3 z-10 rounded-full bg-white/80 p-1.5 shadow-sm backdrop-blur-sm transition-colors hover:bg-white"
      >
        <Heart
          className={cn(
            "h-4 w-4 transition-colors",
            wished ? "fill-red-500 text-red-500" : "text-gray-400"
          )}
        />
      </button>

      {/* Image */}
      <Link href={`/products/${product.id}`} className="block overflow-hidden bg-gray-50">
        <img
          src={product.image}
          alt={product.name}
          className="h-52 w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </Link>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <Link href={`/products/${product.id}`} className="flex-1">
            <h3 className="text-sm font-semibold text-gray-900 leading-snug hover:text-[var(--brand-accent)] transition-colors line-clamp-2">
              {product.name}
            </h3>
          </Link>
        </div>

        <StarRating rating={product.rating} count={product.reviewCount} />

        <div className="flex items-center gap-2 mt-auto pt-1">
          <span className="text-base font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
          {product.originalPrice && (
            <span className="ml-auto text-xs font-semibold text-green-600 bg-green-50 px-1.5 py-0.5 rounded-full">
              {Math.round((1 - product.price / product.originalPrice) * 100)}% off
            </span>
          )}
        </div>

        {!product.inStock && (
          <p className="text-xs text-red-500 font-medium">Out of stock</p>
        )}

        <button
          disabled={!product.inStock}
          className={cn(
            "mt-1 flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-colors",
            product.inStock
              ? "bg-[var(--brand-accent)] text-white hover:bg-[var(--brand-accent)]/90"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          )}
        >
          <ShoppingCart className="h-4 w-4" />
          {product.inStock ? "Add to Cart" : "Unavailable"}
        </button>
      </div>
    </motion.div>
  );
}

// ─── Filter Sidebar ───────────────────────────────────────────────────────────

interface FilterState {
  categories: string[];
  ageGroups: string[];
  brands: string[];
  priceRange: [number, number];
  inStockOnly: boolean;
}

const DEFAULT_FILTERS: FilterState = {
  categories: [],
  ageGroups: [],
  brands: [],
  priceRange: [0, 400],
  inStockOnly: false,
};

function FilterSidebar({
  filters,
  onChange,
  onReset,
}: {
  filters: FilterState;
  onChange: (f: FilterState) => void;
  onReset: () => void;
}) {
  function toggle<K extends keyof FilterState>(
    key: K,
    value: string
  ) {
    const arr = filters[key] as string[];
    const next = arr.includes(value)
      ? arr.filter((v) => v !== value)
      : [...arr, value];
    onChange({ ...filters, [key]: next });
  }

  const activeCount =
    filters.categories.length +
    filters.ageGroups.length +
    filters.brands.length +
    (filters.inStockOnly ? 1 : 0) +
    (filters.priceRange[0] > 0 || filters.priceRange[1] < 400 ? 1 : 0);

  return (
    <aside className="w-full space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-gray-900 flex items-center gap-2">
          <Filter className="h-4 w-4" /> Filters
          {activeCount > 0 && (
            <span className="rounded-full bg-[var(--brand-accent)] px-2 py-0.5 text-xs font-bold text-white">
              {activeCount}
            </span>
          )}
        </h2>
        {activeCount > 0 && (
          <button
            onClick={onReset}
            className="text-xs text-[var(--brand-accent)] hover:underline font-medium"
          >
            Reset all
          </button>
        )}
      </div>

      {/* In Stock */}
      <div>
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={(e) => onChange({ ...filters, inStockOnly: e.target.checked })}
            className="rounded border-gray-300 text-[var(--brand-accent)] focus:ring-[var(--brand-accent)]"
          />
          <span className="text-sm font-medium text-gray-700">In Stock Only</span>
        </label>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="mb-3 text-sm font-semibold text-gray-900">Price Range</h3>
        <div className="space-y-2">
          <input
            type="range"
            min={0}
            max={400}
            value={filters.priceRange[1]}
            onChange={(e) =>
              onChange({ ...filters, priceRange: [filters.priceRange[0], Number(e.target.value)] })
            }
            className="w-full accent-[var(--brand-accent)]"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>${filters.priceRange[0]}</span>
            <span>${filters.priceRange[1]}</span>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div>
        <h3 className="mb-3 text-sm font-semibold text-gray-900">Category</h3>
        <div className="space-y-2">
          {categories.map((cat) => (
            <label key={cat.id} className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={filters.categories.includes(cat.id)}
                onChange={() => toggle("categories", cat.id)}
                className="rounded border-gray-300 text-[var(--brand-accent)] focus:ring-[var(--brand-accent)]"
              />
              <span className="text-sm text-gray-700">{cat.name}</span>
              <span className="ml-auto text-xs text-gray-400">{cat.count}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Age Groups */}
      <div>
        <h3 className="mb-3 text-sm font-semibold text-gray-900">Age Group</h3>
        <div className="space-y-2">
          {AGE_GROUPS.map((ag) => (
            <label key={ag.value} className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={filters.ageGroups.includes(ag.value)}
                onChange={() => toggle("ageGroups", ag.value)}
                className="rounded border-gray-300 text-[var(--brand-accent)] focus:ring-[var(--brand-accent)]"
              />
              <span className="text-sm text-gray-700">{ag.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Brands */}
      <div>
        <h3 className="mb-3 text-sm font-semibold text-gray-900">Brand</h3>
        <div className="space-y-2">
          {BRANDS.map((brand) => (
            <label key={brand} className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={filters.brands.includes(brand)}
                onChange={() => toggle("brands", brand)}
                className="rounded border-gray-300 text-[var(--brand-accent)] focus:ring-[var(--brand-accent)]"
              />
              <span className="text-sm text-gray-700">{brand}</span>
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function ShopPage() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("popular");
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [page, setPage] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  const filtered = useMemo(() => {
    let list = [...PRODUCTS];

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q)
      );
    }

    if (filters.categories.length) {
      list = list.filter((p) => filters.categories.includes(p.category));
    }
    if (filters.ageGroups.length) {
      list = list.filter((p) => filters.ageGroups.includes(p.ageGroup));
    }
    if (filters.brands.length) {
      list = list.filter((p) => filters.brands.includes(p.brand));
    }
    if (filters.inStockOnly) {
      list = list.filter((p) => p.inStock);
    }
    list = list.filter(
      (p) => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    );

    switch (sort) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        list.reverse();
        break;
    }

    return list;
  }, [search, filters, sort]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const resetFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
    setPage(1);
  }, []);

  const currentSortLabel = SORT_OPTIONS.find((o) => o.value === sort)?.label ?? "Sort";

  return (
    <div className="min-h-screen bg-[var(--brand-bg)]">
      {/* ── Hero Banner ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[var(--brand-primary)] to-[var(--brand-secondary)] py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <Reveal>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-3">
              Explore Our Shop
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-lg text-white/80 max-w-xl mx-auto mb-8">
              Discover thousands of toys for every age, interest, and budget.
            </p>
          </Reveal>
          {/* Search */}
          <Reveal delay={0.2}>
            <div className="relative max-w-lg mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search toys, brands…"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                className="w-full rounded-2xl border-0 bg-white py-3.5 pl-12 pr-10 text-gray-900 shadow-lg placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 hover:bg-gray-100"
                >
                  <X className="h-4 w-4 text-gray-400" />
                </button>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Body ── */}
      <div className="container mx-auto px-4 py-10">
        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
              <FilterSidebar
                filters={filters}
                onChange={(f) => { setFilters(f); setPage(1); }}
                onReset={resetFilters}
              />
            </div>
          </div>

          {/* Main */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-gray-500">
                Showing <span className="font-semibold text-gray-900">{filtered.length}</span> products
              </p>
              <div className="flex items-center gap-2">
                {/* Mobile filter button */}
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-medium shadow-sm hover:bg-gray-50"
                >
                  <SlidersHorizontal className="h-4 w-4" /> Filters
                </button>

                {/* Sort dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setSortOpen((o) => !o)}
                    className="flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-medium shadow-sm hover:bg-gray-50"
                  >
                    {currentSortLabel} <ChevronDown className="h-4 w-4" />
                  </button>
                  <AnimatePresence>
                    {sortOpen && (
                      <motion.ul
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        className="absolute right-0 z-20 mt-1 w-48 rounded-xl border border-black/5 bg-white py-1 shadow-lg"
                      >
                        {SORT_OPTIONS.map((opt) => (
                          <li key={opt.value}>
                            <button
                              onClick={() => { setSort(opt.value); setSortOpen(false); setPage(1); }}
                              className={cn(
                                "w-full px-4 py-2 text-left text-sm hover:bg-gray-50",
                                sort === opt.value && "font-semibold text-[var(--brand-accent)]"
                              )}
                            >
                              {opt.label}
                            </button>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Grid */}
            {paginated.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <span className="text-5xl mb-4">🔍</span>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">No products found</h3>
                <p className="text-gray-500 text-sm">Try adjusting your filters or search term.</p>
                <button
                  onClick={resetFilters}
                  className="mt-4 rounded-xl bg-[var(--brand-accent)] px-4 py-2 text-sm font-semibold text-white hover:bg-[var(--brand-accent)]/90"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <motion.div
                key={page + sort + JSON.stringify(filters) + search}
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
              >
                {paginated.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} />
                ))}
              </motion.div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-10 flex items-center justify-center gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="rounded-xl border border-gray-200 bg-white p-2 shadow-sm disabled:opacity-40 hover:bg-gray-50"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={cn(
                      "rounded-xl border px-3.5 py-1.5 text-sm font-medium shadow-sm transition-colors",
                      p === page
                        ? "border-[var(--brand-accent)] bg-[var(--brand-accent)] text-white"
                        : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                    )}
                  >
                    {p}
                  </button>
                ))}
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="rounded-xl border border-gray-200 bg-white p-2 shadow-sm disabled:opacity-40 hover:bg-gray-50"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Mobile Filter Drawer ── */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed inset-y-0 left-0 z-50 w-80 overflow-y-auto bg-white p-6 shadow-xl lg:hidden"
            >
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-900">Filters</h2>
                <button onClick={() => setSidebarOpen(false)} className="rounded-full p-1 hover:bg-gray-100">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <FilterSidebar
                filters={filters}
                onChange={(f) => { setFilters(f); setPage(1); }}
                onReset={() => { resetFilters(); setSidebarOpen(false); }}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
