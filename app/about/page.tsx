"use client";

import { motion, type Variants } from "framer-motion";
import { useTranslations } from "next-intl";
import { Reveal } from "@/components/Reveal";
import { fadeInUp, staggerContainer, scaleIn, slideInLeft, slideInRight } from "@/lib/motion";
import { Shield, Sparkles, Leaf, Star } from 'lucide-react';

const TIMELINE = [
  {
    year: "2005",
    title: "The Spark",
    description:
      "Founded in a small garage in San Diego, ToyZone started with a single shelf of hand-picked educational toys and a big dream to make childhood magical.",
    image: "https://api.dicebear.com/7.x/shapes/svg?seed=toy%20store%20interior",
  },
  {
    year: "2010",
    title: "Growing Up",
    description:
      "We opened our first brick-and-mortar store and launched our online shop, reaching families across California and beyond.",
    image: "https://api.dicebear.com/7.x/shapes/svg?seed=splash%20pad",
  },
  {
    year: "2015",
    title: "Going Green",
    description:
      "We committed to stocking only eco-certified toys and partnered with sustainable manufacturers, reducing our carbon footprint by 40%.",
    image: "https://api.dicebear.com/7.x/shapes/svg?seed=green%20planet",
  },
  {
    year: "2020",
    title: "Global Reach",
    description:
      "ToyZone began shipping to 30+ countries, bringing joy to children on every continent and earning our first international safety certification.",
    image: "https://api.dicebear.com/7.x/shapes/svg?seed=world%20map",
  },
  {
    year: "2024",
    title: "Today",
    description:
      "With over 2,000 products, a passionate team of 85, and millions of happy families, we continue to believe that the right toy can change a child's world.",
    image: "https://api.dicebear.com/7.x/shapes/svg?seed=happy%20children",
  },
];

const VALUES = [
  {
    icon: Shield,
    color: "bg-blue-100 text-blue-600",
    title: "Safety First",
    description:
      "Every product in our catalog passes rigorous safety testing. We partner only with manufacturers who meet or exceed international safety standards, so parents can shop with complete peace of mind.",
  },
  {
    icon: Sparkles,
    color: "bg-yellow-100 text-yellow-600",
    title: "Imagination Driven",
    description:
      "We believe play is the work of childhood. Our curators hand-pick toys that spark creativity, encourage storytelling, and let kids lead the adventure — no batteries required for wonder.",
  },
  {
    icon: Leaf,
    color: "bg-green-100 text-green-600",
    title: "Planet Friendly",
    description:
      "From recycled packaging to sustainably sourced materials, we take our responsibility to the planet seriously. Because the children we serve today will inherit the world tomorrow.",
  },
];

const TEAM = [
  {
    name: "Maria Santos",
    role: "Founder & CEO",
    bio: "A former kindergarten teacher with a passion for developmental play, Maria started ToyZone to give every child access to toys that truly matter. She still personally reviews every new product line.",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=woman%20portrait",
    fun: "Collects vintage tin robots",
  },
  {
    name: "James Okafor",
    role: "Head of Product Curation",
    bio: "James spent 10 years as a child psychologist before joining ToyZone. He leads our expert panel that evaluates every toy for developmental value, safety, and sheer fun factor.",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=man%20portrait",
    fun: "Builds LEGO sets every Sunday",
  },
  {
    name: "Priya Nair",
    role: "Sustainability Director",
    bio: "Priya holds a master's degree in environmental science and has transformed ToyZone's supply chain. Under her leadership, 90% of our packaging is now compostable or recyclable.",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=woman%20smiling",
    fun: "Grows her own vegetables",
  },
  {
    name: "Leo Chen",
    role: "Chief Technology Officer",
    bio: "Leo built ToyZone's digital platform from the ground up. He's obsessed with making online toy shopping as delightful as walking into a great toy store — fast, intuitive, and full of discovery.",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=man%20smiling",
    fun: "Amateur robotics enthusiast",
  },
];

const STATS = [
  { value: "19", unit: "Years", label: "In Business" },
  { value: "2,000+", unit: "Products", label: "Carefully Curated" },
  { value: "1.4M+", unit: "Families", label: "Made Happy" },
  { value: "35", unit: "Countries", label: "Shipped Worldwide" },
];

const connectorVariant: Variants = {
  hidden: { scaleY: 0 },
  visible: { scaleY: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function AboutPage() {
  const t = useTranslations();

  return (
    <main className="overflow-x-hidden">
      {/* ── Hero ── */}
      <Reveal>
        <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-[var(--accent)]">
          {/* decorative blobs */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-white/20 blur-3xl" />
            <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-white/20 blur-3xl" />
          </div>

          <div className="relative z-10 mx-auto max-w-4xl px-6 py-24 text-center">
            <motion.div
              variants={scaleIn}
              initial="hidden"
              animate="visible"
              className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/20 px-5 py-2 text-sm font-semibold text-white backdrop-blur-sm"
            >
              <Star className="h-4 w-4 fill-white" />
              {t("about.hero.badge")}
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.1 }}
              className="text-5xl font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl text-balance"
            >
              {t("about.hero.title")}
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.22 }}
              className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/85 text-pretty"
            >
              {t("about.hero.subtitle")}
            </motion.p>

            {/* illustrated toy row */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="mt-12 flex justify-center gap-6 text-5xl"
            >
              {["🧸", "🚀", "🎨", "🧩", "🦕", "🎲"].map((emoji, i) => (
                <motion.span
                  key={i}
                  variants={scaleIn}
                  whileHover={{ scale: 1.3, rotate: 10 }}
                  className="cursor-default select-none"
                >
                  {emoji}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </section>
      </Reveal>

      {/* ── Our Story Timeline ── */}
      <Reveal>
        <section className="bg-[hsl(var(--background))] py-24 md:py-32">
          <div className="mx-auto max-w-5xl px-6">
            <div className="mb-16 text-center">
              <span className="inline-block rounded-full bg-[var(--accent)]/10 px-4 py-1.5 text-sm font-semibold text-[var(--accent)]">
                {t("about.story.eyebrow")}
              </span>
              <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-[hsl(var(--foreground))] sm:text-5xl">
                {t("about.story.title")}
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-[hsl(var(--muted-foreground))] leading-relaxed">
                {t("about.story.subtitle")}
              </p>
            </div>

            <div className="relative">
              {/* vertical line */}
              <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-[hsl(var(--border))] md:block" />

              <div className="flex flex-col gap-16">
                {TIMELINE.map((item, i) => {
                  const isLeft = i % 2 === 0;
                  return (
                    <Reveal key={item.year} delay={i * 0.08}>
                      <div
                        className={`relative flex flex-col gap-6 md:flex-row md:items-center ${
                          isLeft ? "md:flex-row" : "md:flex-row-reverse"
                        }`}
                      >
                        {/* content card */}
                        <div className="flex-1">
                          <div
                            className={`rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.10)] ${
                              isLeft ? "md:mr-10" : "md:ml-10"
                            }`}
                          >
                            <span className="inline-block rounded-full bg-[var(--accent)] px-3 py-1 text-xs font-bold text-black mb-3">
                              {item.year}
                            </span>
                            <h3 className="text-xl font-bold text-[hsl(var(--foreground))]">
                              {item.title}
                            </h3>
                            <p className="mt-2 text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">
                              {item.description}
                            </p>
                          </div>
                        </div>

                        {/* center dot */}
                        <div className="absolute left-1/2 top-1/2 hidden h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-[var(--accent)] bg-[hsl(var(--background))] md:block" />

                        {/* image */}
                        <div className="flex-1">
                          <div
                            className={`overflow-hidden rounded-2xl border border-[hsl(var(--border))] shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.10)] ${
                              isLeft ? "md:ml-10" : "md:mr-10"
                            }`}
                          >
                            <img
                              src={item.image}
                              alt={item.title}
                              className="h-48 w-full object-cover"
                            />
                          </div>
                        </div>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* ── Values Grid ── */}
      <Reveal>
        <section className="bg-[hsl(var(--muted))] py-24 md:py-32">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-14 text-center">
              <span className="inline-block rounded-full bg-[var(--accent)]/10 px-4 py-1.5 text-sm font-semibold text-[var(--accent)]">
                {t("about.values.eyebrow")}
              </span>
              <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-[hsl(var(--foreground))] sm:text-5xl">
                {t("about.values.title")}
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-[hsl(var(--muted-foreground))] leading-relaxed">
                {t("about.values.subtitle")}
              </p>
            </div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="grid gap-8 sm:grid-cols-3"
            >
              {VALUES.map((val, i) => {
                const Icon = val.icon;
                return (
                  <motion.div
                    key={val.title}
                    variants={fadeInUp}
                    whileHover={{ y: -6, transition: { duration: 0.25 } }}
                    className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-8 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.10)] flex flex-col items-center text-center"
                  >
                    <div className={`mb-5 flex h-16 w-16 items-center justify-center rounded-2xl ${val.color}`}>
                      <Icon className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-bold text-[hsl(var(--foreground))]">{val.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">
                      {val.description}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>
      </Reveal>

      {/* ── Team Spotlights ── */}
      <Reveal>
        <section className="bg-[hsl(var(--background))] py-24 md:py-32">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-14 text-center">
              <span className="inline-block rounded-full bg-[var(--accent)]/10 px-4 py-1.5 text-sm font-semibold text-[var(--accent)]">
                {t("about.team.eyebrow")}
              </span>
              <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-[hsl(var(--foreground))] sm:text-5xl">
                {t("about.team.title")}
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-[hsl(var(--muted-foreground))] leading-relaxed">
                {t("about.team.subtitle")}
              </p>
            </div>

            <div className="flex flex-col gap-20">
              {TEAM.map((member, i) => {
                const isLeft = i % 2 === 0;
                return (
                  <Reveal key={member.name} delay={0.05}>
                    <div
                      className={`flex flex-col gap-10 md:flex-row md:items-center ${
                        isLeft ? "" : "md:flex-row-reverse"
                      }`}
                    >
                      {/* photo */}
                      <motion.div
                        variants={isLeft ? slideInLeft : slideInRight}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-80px" }}
                        className="flex-shrink-0 md:w-72"
                      >
                        <div className="relative overflow-hidden rounded-3xl border border-[hsl(var(--border))] shadow-[0_1px_2px_rgba(0,0,0,0.04),0_16px_40px_-12px_rgba(0,0,0,0.14)]">
                          <img
                            src={member.image}
                            alt={member.name}
                            className="h-80 w-full object-cover"
                          />
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-5">
                            <p className="text-xs font-semibold text-white/80 uppercase tracking-widest">
                              Fun fact
                            </p>
                            <p className="text-sm font-medium text-white">{member.fun}</p>
                          </div>
                        </div>
                      </motion.div>

                      {/* bio */}
                      <motion.div
                        variants={isLeft ? slideInRight : slideInLeft}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-80px" }}
                        className="flex-1"
                      >
                        <span className="inline-block rounded-full bg-[var(--accent)]/10 px-3 py-1 text-xs font-semibold text-[var(--accent)] mb-3">
                          {member.role}
                        </span>
                        <h3 className="text-3xl font-extrabold tracking-tight text-[hsl(var(--foreground))]">
                          {member.name}
                        </h3>
                        <p className="mt-4 text-base leading-relaxed text-[hsl(var(--muted-foreground))]">
                          {member.bio}
                        </p>
                        <div className="mt-6 flex gap-3">
                          {["🎯", "💡", "🌱"].map((emoji, ei) => (
                            <span
                              key={ei}
                              className="flex h-10 w-10 items-center justify-center rounded-full bg-[hsl(var(--muted))] text-lg"
                            >
                              {emoji}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      </Reveal>

      {/* ── Stats Banner ── */}
      <Reveal>
        <section className="bg-[hsl(var(--foreground))] py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-12 text-center">
              <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                {t("about.stats.title")}
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-white/70 leading-relaxed">
                {t("about.stats.subtitle")}
              </p>
            </div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="grid grid-cols-2 gap-6 sm:grid-cols-4"
            >
              {STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  variants={scaleIn}
                  whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                  className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-sm"
                >
                  <div className="text-4xl font-extrabold text-[var(--accent)] tracking-tight">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-sm font-semibold text-white/90">{stat.unit}</div>
                  <div className="mt-1 text-xs text-white/55 uppercase tracking-widest">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </Reveal>

      {/* ── CTA ── */}
      <Reveal>
        <section className="bg-[hsl(var(--background))] py-24 md:py-32">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <span className="text-5xl">🎉</span>
            <h2 className="mt-6 text-4xl font-extrabold tracking-tight text-[hsl(var(--foreground))] sm:text-5xl text-balance">
              {t("about.cta.title")}
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-[hsl(var(--muted-foreground))] leading-relaxed text-pretty">
              {t("about.cta.subtitle")}
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <motion.a
                href="/shop"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-8 py-3.5 text-base font-bold text-black shadow-[0_4px_20px_rgba(0,0,0,0.15)] transition-all duration-300 hover:brightness-105"
              >
                {t("about.cta.shop")}
              </motion.a>
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-8 py-3.5 text-base font-semibold text-[hsl(var(--foreground))] transition-all duration-300 hover:bg-[hsl(var(--muted))]"
              >
                {t("about.cta.contact")}
              </motion.a>
            </div>
          </div>
        </section>
      </Reveal>
    </main>
  );
}