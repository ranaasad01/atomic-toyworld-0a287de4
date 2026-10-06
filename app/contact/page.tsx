"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, MessageSquare, Sparkles } from 'lucide-react';
import { Reveal } from "@/components/Reveal";
import { fadeInUp, staggerContainer, scaleIn } from "@/lib/motion";
type BRAND = any;
const BRAND: any = new Proxy([], { get: (t: any, k) => (k in t ? t[k] : "") });

const CONTACT_INFO = [
  {
    id: "email",
    icon: Mail,
    label: "Email Us",
    value: "hello@example.com",
    detail: "We reply within 24 hours",
    color: "bg-[var(--accent)]/10 text-[var(--accent)]",
  },
  {
    id: "phone",
    icon: Phone,
    label: "Call Us",
    value: "555-0100",
    detail: "Mon–Fri, 9am–6pm PST",
    color: "bg-purple-100 text-purple-600",
  },
  {
    id: "address",
    icon: MapPin,
    label: "Visit Us",
    value: "123 Rainbow Road",
    detail: "Fun City, CA 90210",
    color: "bg-pink-100 text-pink-600",
  },
  {
    id: "hours",
    icon: Clock,
    label: "Store Hours",
    value: "Mon–Sat: 9am–8pm",
    detail: "Sunday: 10am–6pm",
    color: "bg-orange-100 text-orange-600",
  },
];

const FAQ_ITEMS = [
  {
    id: "returns",
    question: "What is your return policy?",
    answer: "We offer a 30-day hassle-free return policy on all items. Products must be in original packaging and unused condition. Simply contact us and we'll arrange a pickup.",
  },
  {
    id: "shipping",
    question: "How long does shipping take?",
    answer: "Standard shipping takes 3–5 business days. Express shipping (1–2 days) is available at checkout. Orders over $50 qualify for free standard shipping.",
  },
  {
    id: "safety",
    question: "Are your toys safety certified?",
    answer: "Absolutely. Every product in our store meets or exceeds ASTM and CPSC safety standards. We only carry toys that have passed rigorous testing for all age groups.",
  },
  {
    id: "gift",
    question: "Do you offer gift wrapping?",
    answer: "Yes! Gift wrapping is available for $4.99 per item. You can add a personalized message card at no extra charge. Select the option at checkout.",
  },
  {
    id: "bulk",
    question: "Can I place a bulk or school order?",
    answer: "We love working with schools, daycares, and event planners. Contact us directly for bulk pricing and we'll put together a custom quote within 48 hours.",
  },
];

const TOPICS = [
  "Order Status",
  "Returns & Exchanges",
  "Product Question",
  "Bulk / School Order",
  "Gift Wrapping",
  "Other",
];

interface FormState {
  name: string;
  email: string;
  topic: string;
  message: string;
}

export default function ContactPage() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    topic: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  }

  return (
    <main className="min-h-screen bg-[var(--background)]">
      {/* Hero */}
      <Reveal>
        <section className="relative overflow-hidden bg-[var(--accent)] py-20 md:py-28">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-16 -right-16 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
          </div>
          <div className="relative mx-auto max-w-4xl px-6 text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-sm font-semibold text-black"
            >
              <Sparkles className="h-4 w-4" />
              We&apos;re here to help
            </motion.div>
            <motion.h1
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className="text-4xl font-extrabold tracking-tight text-black md:text-6xl"
            >
              Get in Touch
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.1 }}
              className="mt-4 text-lg text-black/70 md:text-xl"
            >
              Questions about an order, a product, or just want to say hi? Our friendly team is ready to help.
            </motion.p>
          </div>
        </section>
      </Reveal>

      {/* Contact Info Cards */}
      <Reveal>
        <section className="mx-auto max-w-6xl px-6 py-16">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
          >
            {CONTACT_INFO.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.id}
                  variants={scaleIn}
                  custom={i}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="flex flex-col items-center rounded-2xl border border-black/5 bg-white p-6 text-center shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.10)]"
                >
                  <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${item.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">{item.label}</p>
                  <p className="mt-1 font-bold text-gray-900">{item.value}</p>
                  <p className="mt-0.5 text-sm text-gray-500">{item.detail}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </section>
      </Reveal>

      {/* Form + Map split */}
      <Reveal>
        <section className="mx-auto max-w-6xl px-6 pb-20">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-5">
            {/* Form */}
            <div className="lg:col-span-3">
              <div className="rounded-3xl border border-black/5 bg-white p-8 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.12)]">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent)]/10">
                    <MessageSquare className="h-5 w-5 text-[var(--accent)]" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Send a Message</h2>
                    <p className="text-sm text-gray-500">We&apos;ll get back to you within 24 hours</p>
                  </div>
                </div>

                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="flex flex-col items-center py-12 text-center"
                  >
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Message Sent!</h3>
                    <p className="mt-2 text-gray-500">
                      Thanks for reaching out. A member of the {BRAND.name} team will be in touch soon.
                    </p>
                    <button
                      onClick={() => { setSubmitted(false); setForm({ name: "", email: "", topic: "", message: "" }); }}
                      className="mt-6 rounded-full bg-[var(--accent)] px-6 py-2.5 text-sm font-semibold text-black transition-all duration-200 hover:opacity-90"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-sm font-semibold text-gray-700" htmlFor="name">
                          Your Name
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Jane Smith"
                          className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all focus:border-[var(--accent)] focus:bg-white focus:ring-2 focus:ring-[var(--accent)]/20"
                        />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-sm font-semibold text-gray-700" htmlFor="email">
                          Email Address
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={form.email}
                          onChange={handleChange}
                          placeholder="hello@example.com"
                          className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all focus:border-[var(--accent)] focus:bg-white focus:ring-2 focus:ring-[var(--accent)]/20"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-semibold text-gray-700" htmlFor="topic">
                        Topic
                      </label>
                      <select
                        id="topic"
                        name="topic"
                        required
                        value={form.topic}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition-all focus:border-[var(--accent)] focus:bg-white focus:ring-2 focus:ring-[var(--accent)]/20"
                      >
                        <option value="">Select a topic...</option>
                        {TOPICS.map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-semibold text-gray-700" htmlFor="message">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Tell us how we can help..."
                        className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all focus:border-[var(--accent)] focus:bg-white focus:ring-2 focus:ring-[var(--accent)]/20"
                      />
                    </div>

                    <motion.button
                      type="submit"
                      disabled={loading}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex w-full items-center justify-center gap-2 rounded-full bg-[var(--accent)] py-3.5 text-sm font-bold text-black shadow-[0_4px_14px_rgba(0,0,0,0.15)] transition-all duration-200 hover:opacity-90 disabled:opacity-60"
                    >
                      {loading ? (
                        <>
                          <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          Send Message
                        </>
                      )}
                    </motion.button>
                  </form>
                )}
              </div>
            </div>

            {/* Side panel */}
            <div className="flex flex-col gap-6 lg:col-span-2">
              {/* Map placeholder */}
              <div className="relative overflow-hidden rounded-3xl border border-black/5 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.10)]">
                <img
                  src="https://api.dicebear.com/7.x/shapes/svg?seed=toy%20store%20interior"
                  alt="ToyZone store front"
                  className="h-52 w-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
                <div className="p-6">
                  <h3 className="font-bold text-gray-900">Our Flagship Store</h3>
                  <p className="mt-1 text-sm text-gray-500">123 Rainbow Road, Fun City, CA 90210</p>
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-[var(--accent)]/10 px-4 py-1.5 text-xs font-semibold text-[var(--accent)] transition-colors hover:bg-[var(--accent)]/20"
                  >
                    <MapPin className="h-3.5 w-3.5" />
                    Get Directions
                  </a>
                </div>
              </div>

              {/* Quick links */}
              <div className="rounded-3xl border border-black/5 bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.10)]">
                <h3 className="mb-4 font-bold text-gray-900">Quick Contacts</h3>
                <div className="space-y-3">
                  <a
                    href={`#`}
                    className="flex items-center gap-3 rounded-xl bg-gray-50 px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-[var(--accent)]/10 hover:text-[var(--accent)]"
                  >
                    <Mail className="h-4 w-4 shrink-0" />
                    {BRAND.email}
                  </a>
                  <a
                    href={`#`}
                    className="flex items-center gap-3 rounded-xl bg-gray-50 px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-[var(--accent)]/10 hover:text-[var(--accent)]"
                  >
                    <Phone className="h-4 w-4 shrink-0" />
                    {BRAND.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* FAQ */}
      <Reveal>
        <section className="bg-gray-50 py-20">
          <div className="mx-auto max-w-3xl px-6">
            <div className="mb-10 text-center">
              <span className="inline-block rounded-full bg-[var(--accent)]/10 px-4 py-1 text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
                FAQ
              </span>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl">
                Frequently Asked Questions
              </h2>
              <p className="mt-3 text-gray-500">
                Can&apos;t find what you&apos;re looking for? Send us a message above.
              </p>
            </div>

            <div className="space-y-3">
              {FAQ_ITEMS.map((faq) => (
                <motion.div
                  key={faq.id}
                  layout
                  className="overflow-hidden rounded-2xl border border-black/5 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                    className="flex w-full items-center justify-between px-6 py-4 text-left"
                    aria-expanded={openFaq === faq.id}
                  >
                    <span className="font-semibold text-gray-900">{faq.question}</span>
                    <motion.span
                      animate={{ rotate: openFaq === faq.id ? 45 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="ml-4 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--accent)]/10 text-[var(--accent)]"
                    >
                      <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5" stroke="currentColor" strokeWidth="2">
                        <path d="M8 3v10M3 8h10" strokeLinecap="round" />
                      </svg>
                    </motion.span>
                  </button>
                  {openFaq === faq.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="px-6 pb-5"
                    >
                      <p className="text-sm leading-relaxed text-gray-600">{faq.answer}</p>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* CTA Banner */}
      <Reveal>
        <section className="mx-auto max-w-6xl px-6 py-20">
          <div className="relative overflow-hidden rounded-3xl bg-[var(--accent)] px-8 py-14 text-center md:px-16">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -left-12 -top-12 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
              <div className="absolute -bottom-12 -right-12 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
            </div>
            <div className="relative">
              <p className="text-4xl">🎉</p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-black md:text-4xl">
                Still have questions?
              </h2>
              <p className="mt-3 text-black/70">
                Our toy experts are standing by. Call us or drop into the store any day of the week.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <a
                  href={`#`}
                  className="inline-flex items-center gap-2 rounded-full bg-black px-7 py-3 text-sm font-bold text-white shadow-lg transition-all duration-200 hover:bg-black/80"
                >
                  <Phone className="h-4 w-4" />
                  Call Now
                </a>
                <a
                  href={`#`}
                  className="inline-flex items-center gap-2 rounded-full border-2 border-black bg-transparent px-7 py-3 text-sm font-bold text-black transition-all duration-200 hover:bg-black/10"
                >
                  <Mail className="h-4 w-4" />
                  Email Us
                </a>
              </div>
            </div>
          </div>
        </section>
      </Reveal>
    </main>
  );
}