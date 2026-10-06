"use client";

import { motion, type Variants } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
type BRAND = any;
const BRAND: any = new Proxy([], { get: (t: any, k) => (k in t ? t[k] : "") });
import { Heart, Star, Shield, Sparkles, Users, Award, ArrowRight, Check } from 'lucide-react';

const heroVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const heroImageVariants: Variants = {
  hidden: { opacity: 0, scale: 0.92, x: 32 },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: { duration: 0.7, ease: "easeOut", delay: 0.15 },
  },
};

const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

const TEAM_MEMBERS = [
  {
    name: "Sarah Mitchell",
    role: "Founder & CEO",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah%20Mitchell",
    bio: "Former child psychologist turned entrepreneur. Sarah founded ToyZone after 12 years studying how play shapes development.",
  },
  {
    name: "James Okafor",
    role: "Head of Product",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=James%20Okafor",
    bio: "With a background in industrial design, James ensures every toy we carry meets our rigorous safety and quality standards.",
  },
  {
    name: "Priya Sharma",
    role: "Chief Learning Officer",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya%20Sharma",
    bio: "Priya curates our educational toy collection, drawing on her decade of experience as a Montessori educator.",
  },
  {
    name: "Carlos Rivera",
    role: "Community Director",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos%20Rivera",
    bio: "Carlos builds partnerships with schools and nonprofits to bring quality toys to children in underserved communities.",
  },
];

const MILESTONES = [
  { year: "2012", event: "ToyZone opens its first store in San Francisco" },
  { year: "2015", event: "Launched online shop, reaching families across the US" },
  { year: "2018", event: "Introduced the Safe Play Certification program" },
  { year: "2020", event: "Donated 50,000 toys to children in need during the pandemic" },
  { year: "2022", event: "Expanded to 12 states with 30+ retail partners" },
  { year: "2024", event: "Crossed 1 million happy customers worldwide" },
];

const VALUES = [
  {
    icon: Shield,
    title: "Safety First",
    description:
      "Every product passes our 47-point safety checklist before it ever reaches a child's hands.",
  },
  {
    icon: Sparkles,
    title: "Spark Imagination",
    description:
      "We choose toys that open worlds, not close them. Open-ended play is at the heart of everything we stock.",
  },
  {
    icon: Heart,
    title: "Play for All",
    description:
      "Inclusive play matters. Our range celebrates every child, every ability, and every background.",
  },
  {
    icon: Star,
    title: "Quality Over Quantity",
    description:
      "We'd rather carry 10 exceptional toys than 100 forgettable ones. Curation is our superpower.",
  },
];

const STATS = [
  { value: "1M+", label: "Happy Customers" },
  { value: "5,000+", label: "Curated Products" },
  { value: "47", label: "Safety Checks" },
  { value: "12", label: "Years of Joy" },
];

export default function AboutUsPage() {
  const t = useTranslations();

  return (
    <main className="bg-[hsl(var(--background))] text-[hsl(var(--foreground))] overflow-x-hidden">
      {/* ── Hero ── */}
      <section className="relative pt-24 pb-20 md:pt-32 md:pb-28 overflow-hidden">
        {/* Background glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full opacity-20"
          style={{
            background:
              "radial-gradient(ellipse at center, var(--accent) 0%, transparent 70%)",
          }}
        />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              variants={heroVariants}
              initial="hidden"
              animate="visible"
            >
              <span className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)]/15 border border-[var(--accent)]/30 px-4 py-1.5 text-sm font-semibold text-[var(--accent)] mb-6">
                <Heart className="w-4 h-4" />
                {t("about.hero.eyebrow")}
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[hsl(var(--foreground))] leading-[1.1] mb-6">
                {t("about.hero.title")}
              </h1>
              <p className="text-lg text-[hsl(var(--muted-foreground))] leading-relaxed max-w-lg mb-8">
                {t("about.hero.description")}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] text-black font-bold px-6 py-3 text-sm hover:opacity-90 transition-all duration-300 shadow-[0_4px_16px_rgba(0,0,0,0.12)]"
                >
                  {t("about.hero.cta")}
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--card))] text-[hsl(var(--foreground))] font-semibold px-6 py-3 text-sm hover:border-[var(--accent)] transition-all duration-300"
                >
                  {t("about.hero.secondary")}
                </Link>
              </div>
            </motion.div>

            <motion.div
              variants={heroImageVariants}
              initial="hidden"
              animate="visible"
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.15)] border border-[hsl(var(--border))]">
                <Image
                  src="https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/2ba4ef2466fa4a04aaa5499c1bb645cc.jpg"
                  alt="Colorful toys arranged playfully"
                  width={600}
                  height={480}
                  className="w-full h-[380px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.4, ease: "easeOut" }}
                className="absolute -bottom-5 -left-5 bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-2xl px-5 py-3 shadow-[0_4px_20px_rgba(0,0,0,0.12)]"
              >
                <p className="text-2xl font-extrabold text-[hsl(var(--foreground))]">12+</p>
                <p className="text-xs text-[hsl(var(--muted-foreground))] font-medium">{t("about.hero.badge")}</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Stats Bar ── */}
      <Reveal>
        <section className="py-14 bg-[var(--accent)]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
            >
              {STATS.map((stat) => (
                <motion.div key={stat.label} variants={cardVariant}>
                  <p className="text-4xl font-extrabold text-black tracking-tight">
                    {stat.value}
                  </p>
                  <p className="text-sm font-semibold text-black/70 mt-1">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </Reveal>

      {/* ── Our Story ── */}
      <Reveal>
        <section className="py-24 md:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="relative order-2 lg:order-1">
                <div className="rounded-3xl overflow-hidden border border-[hsl(var(--border))] shadow-[0_4px_24px_rgba(0,0,0,0.08)]">
                  <Image
                    src="https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/40884dfc8d1b44dd9b6871c07e0a543f.jpg"
                    alt="Children playing with toys"
                    width={560}
                    height={440}
                    className="w-full h-[360px] object-cover"
                  />
                </div>
                <div className="absolute -top-6 -right-6 w-28 h-28 rounded-2xl bg-[var(--accent)]/20 border border-[var(--accent)]/30 flex items-center justify-center text-5xl shadow-sm">
                  🧸
                </div>
              </div>

              <div className="order-1 lg:order-2">
                <span className="text-xs font-bold uppercase tracking-widest text-[var(--accent)] mb-3 block">
                  {t("about.story.eyebrow")}
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[hsl(var(--foreground))] mb-6 text-balance">
                  {t("about.story.title")}
                </h2>
                <p className="text-[hsl(var(--muted-foreground))] leading-relaxed mb-4">
                  {t("about.story.p1")}
                </p>
                <p className="text-[hsl(var(--muted-foreground))] leading-relaxed mb-6">
                  {t("about.story.p2")}
                </p>
                <ul className="space-y-3">
                  {(
                    Array.isArray(t.raw("about.story.bullets"))
                      ? t.raw("about.story.bullets")
                      : []
                  ).map((item: string, i: number) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-[var(--accent)]/20 flex items-center justify-center">
                        <Check className="w-3 h-3 text-[var(--accent)]" />
                      </span>
                      <span className="text-sm text-[hsl(var(--muted-foreground))]">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* ── Values ── */}
      <Reveal>
        <section className="py-24 md:py-32 bg-[hsl(var(--card))]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <div className="text-center mb-16">
              <span className="text-xs font-bold uppercase tracking-widest text-[var(--accent)] mb-3 block">
                {t("about.values.eyebrow")}
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[hsl(var(--foreground))] mb-4 text-balance">
                {t("about.values.title")}
              </h2>
              <p className="text-[hsl(var(--muted-foreground))] max-w-xl mx-auto leading-relaxed">
                {t("about.values.subtitle")}
              </p>
            </div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              {VALUES.map((val) => {
                const Icon = val.icon;
                return (
                  <motion.div
                    key={val.title}
                    variants={cardVariant}
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    className="flex gap-5 p-6 rounded-2xl bg-[hsl(var(--background))] border border-[hsl(var(--border))] shadow-[0_1px_4px_rgba(0,0,0,0.04),0_6px_20px_-6px_rgba(0,0,0,0.08)] transition-all duration-300"
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[var(--accent)]/15 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-[var(--accent)]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[hsl(var(--foreground))] mb-1">
                        {val.title}
                      </h3>
                      <p className="text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">
                        {val.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>
      </Reveal>

      {/* ── Timeline ── */}
      <Reveal>
        <section className="py-24 md:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="text-center mb-16">
              <span className="text-xs font-bold uppercase tracking-widest text-[var(--accent)] mb-3 block">
                {t("about.timeline.eyebrow")}
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[hsl(var(--foreground))] mb-4 text-balance">
                {t("about.timeline.title")}
              </h2>
            </div>

            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-[hsl(var(--border))] -translate-x-1/2" />

              <div className="space-y-10">
                {MILESTONES.map((m, i) => (
                  <Reveal key={m.year} delay={i * 0.06}>
                    <div
                      className={`relative flex items-start gap-6 md:gap-0 ${
                        i % 2 === 0
                          ? "md:flex-row"
                          : "md:flex-row-reverse"
                      }`}
                    >
                      {/* Content */}
                      <div
                        className={`flex-1 ${
                          i % 2 === 0
                            ? "md:pr-12 md:text-right pl-16 md:pl-0"
                            : "md:pl-12 md:text-left pl-16 md:pl-0"
                        }`}
                      >
                        <div
                          className={`inline-block bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-2xl px-5 py-4 shadow-[0_2px_12px_rgba(0,0,0,0.06)] ${
                            i % 2 === 0 ? "md:ml-auto" : ""
                          }`}
                        >
                          <span className="text-xs font-bold text-[var(--accent)] block mb-1">
                            {m.year}
                          </span>
                          <p className="text-sm font-medium text-[hsl(var(--foreground))]">
                            {m.event}
                          </p>
                        </div>
                      </div>

                      {/* Dot */}
                      <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[var(--accent)] border-2 border-[hsl(var(--background))] shadow-sm flex-shrink-0 mt-4" />

                      {/* Spacer for alternating layout */}
                      <div className="hidden md:block flex-1" />
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* ── Team ── */}
      <Reveal>
        <section className="py-24 md:py-32 bg-[hsl(var(--card))]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <div className="text-center mb-16">
              <span className="text-xs font-bold uppercase tracking-widest text-[var(--accent)] mb-3 block">
                {t("about.team.eyebrow")}
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[hsl(var(--foreground))] mb-4 text-balance">
                {t("about.team.title")}
              </h2>
              <p className="text-[hsl(var(--muted-foreground))] max-w-xl mx-auto leading-relaxed">
                {t("about.team.subtitle")}
              </p>
            </div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {TEAM_MEMBERS.map((member) => (
                <motion.div
                  key={member.name}
                  variants={cardVariant}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  className="group rounded-2xl bg-[hsl(var(--background))] border border-[hsl(var(--border))] overflow-hidden shadow-[0_1px_4px_rgba(0,0,0,0.04),0_6px_20px_-6px_rgba(0,0,0,0.08)] transition-all duration-300"
                >
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-[hsl(var(--foreground))] text-base">
                      {member.name}
                    </h3>
                    <p className="text-xs font-semibold text-[var(--accent)] mb-2">
                      {member.role}
                    </p>
                    <p className="text-xs text-[hsl(var(--muted-foreground))] leading-relaxed">
                      {member.bio}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </Reveal>

      {/* ── Awards & Trust ── */}
      <Reveal>
        <section className="py-24 md:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[var(--accent)] mb-3 block">
                  {t("about.awards.eyebrow")}
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[hsl(var(--foreground))] mb-6 text-balance">
                  {t("about.awards.title")}
                </h2>
                <p className="text-[hsl(var(--muted-foreground))] leading-relaxed mb-8">
                  {t("about.awards.description")}
                </p>
                <div className="space-y-4">
                  {(
                    Array.isArray(t.raw("about.awards.items"))
                      ? t.raw("about.awards.items")
                      : []
                  ).map(
                    (
                      award: { icon: string; title: string; body: string },
                      i: number
                    ) => (
                      <div
                        key={i}
                        className="flex items-start gap-4 p-4 rounded-xl bg-[hsl(var(--card))] border border-[hsl(var(--border))]"
                      >
                        <span className="text-2xl flex-shrink-0">{award.icon}</span>
                        <div>
                          <p className="font-bold text-sm text-[hsl(var(--foreground))]">
                            {award.title}
                          </p>
                          <p className="text-xs text-[hsl(var(--muted-foreground))] mt-0.5">
                            {award.body}
                          </p>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>

              <div className="relative">
                <div className="rounded-3xl overflow-hidden border border-[hsl(var(--border))] shadow-[0_4px_24px_rgba(0,0,0,0.08)]">
                  <Image
                    src="https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/a913224fcb2b4288887945f17e124e58.jpg"
                    alt="Award trophy"
                    width={560}
                    height={440}
                    className="w-full h-[380px] object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-[var(--accent)] rounded-2xl px-6 py-4 shadow-[0_4px_20px_rgba(0,0,0,0.15)]">
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-black" />
                    <span className="font-extrabold text-black text-sm">
                      {t("about.awards.badge")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* ── CTA ── */}
      <Reveal>
        <section className="py-24 md:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl text-center">
            <div className="rounded-3xl bg-[hsl(var(--card))] border border-[hsl(var(--border))] p-12 shadow-[0_4px_32px_rgba(0,0,0,0.08)] relative overflow-hidden">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-10"
                style={{
                  background:
                    "radial-gradient(ellipse at 50% 0%, var(--accent) 0%, transparent 65%)",
                }}
              />
              <span className="text-4xl mb-4 block">🎉</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[hsl(var(--foreground))] mb-4 text-balance">
                {t("about.cta.title")}
              </h2>
              <p className="text-[hsl(var(--muted-foreground))] leading-relaxed mb-8 max-w-lg mx-auto">
                {t("about.cta.description")}
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] text-black font-bold px-8 py-3.5 text-sm hover:opacity-90 transition-all duration-300 shadow-[0_4px_16px_rgba(0,0,0,0.12)]"
                >
                  {t("about.cta.primary")}
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--border))] bg-transparent text-[hsl(var(--foreground))] font-semibold px-8 py-3.5 text-sm hover:border-[var(--accent)] transition-all duration-300"
                >
                  {t("about.cta.secondary")}
                </Link>
              </div>
            </div>
          </div>
        </section>
      </Reveal>
    </main>
  );
}