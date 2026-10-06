"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { navLinks, BRAND_NAME, BRAND_TAGLINE, BRAND_EMAIL, BRAND_PHONE, BRAND_ADDRESS } from "@/lib/data";
import { Mail, Phone, MapPin, Heart, Globe as Facebook, MessageCircle as Twitter, Camera as Instagram, Play as Youtube } from 'lucide-react';
import { staggerContainer, fadeInUp } from "@/lib/motion";

export default function Footer() {
  const pathname = usePathname();
  const t = useTranslations();
  const navT = t.raw("nav") as Record<string, string>;
  const footerT = t.raw("footer") as Record<string, string>;

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.startsWith("#") && pathname === "/") {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const getLinkHref = (href: string) => {
    if (href.startsWith("#")) {
      return pathname === "/" ? href : "/" + href;
    }
    return href;
  };

  const socialLinks = [
    { icon: Facebook, label: "Facebook", href: "#" },
    { icon: Twitter, label: "Twitter", href: "#" },
    { icon: Instagram, label: "Instagram", href: "#" },
    { icon: Youtube, label: "YouTube", href: "#" },
  ];

  return (
    <footer className="bg-[var(--brand-dark)] text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10"
        >
          {/* Brand Column */}
          <motion.div variants={fadeInUp} className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4 group">
              <div className="w-9 h-9 rounded-2xl bg-[var(--brand-primary)] flex items-center justify-center text-white font-bold text-lg">
                🧸
              </div>
              <span className="font-fredoka text-2xl text-white tracking-wide">
                {BRAND_NAME}
              </span>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              {BRAND_TAGLINE} Bringing joy and wonder to children of all ages since 2010.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-[var(--brand-primary)] flex items-center justify-center transition-colors duration-200"
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={fadeInUp}>
            <h3 className="font-fredoka text-lg text-white mb-5 tracking-wide">
              {footerT["quickLinks"] ?? "Quick Links"}
            </h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    href={getLinkHref(link.href)}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="text-white/60 hover:text-[var(--brand-yellow)] text-sm font-medium transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-primary)] group-hover:bg-[var(--brand-yellow)] transition-colors duration-200" />
                    {navT[link.key] ?? link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Categories */}
          <motion.div variants={fadeInUp}>
            <h3 className="font-fredoka text-lg text-white mb-5 tracking-wide">
              {footerT["categories"] ?? "Categories"}
            </h3>
            <ul className="space-y-3">
              {[
                { label: footerT["catAction"] ?? "Action Figures", href: "/shop" },
                { label: footerT["catEducational"] ?? "Educational Toys", href: "/shop" },
                { label: footerT["catOutdoor"] ?? "Outdoor & Sports", href: "/shop" },
                { label: footerT["catDolls"] ?? "Dolls & Plush", href: "/shop" },
                { label: footerT["catBoardGames"] ?? "Board Games", href: "/shop" },
                { label: footerT["catStem"] ?? "STEM Toys", href: "/shop" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-white/60 hover:text-[var(--brand-yellow)] text-sm font-medium transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-green)] group-hover:bg-[var(--brand-yellow)] transition-colors duration-200" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={fadeInUp}>
            <h3 className="font-fredoka text-lg text-white mb-5 tracking-wide">
              {footerT["contactUs"] ?? "Contact Us"}
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-[var(--brand-primary)] mt-0.5 shrink-0" />
                <span className="text-white/60 text-sm leading-relaxed">{BRAND_ADDRESS}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-[var(--brand-primary)] shrink-0" />
                <a
                  href={`#`}
                  className="text-white/60 hover:text-[var(--brand-yellow)] text-sm transition-colors duration-200"
                >
                  {BRAND_PHONE}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-[var(--brand-primary)] shrink-0" />
                <a
                  href={`#`}
                  className="text-white/60 hover:text-[var(--brand-yellow)] text-sm transition-colors duration-200"
                >
                  {BRAND_EMAIL}
                </a>
              </li>
            </ul>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/40 text-xs">
            {footerT["copyright"] ?? `© ${new Date().getFullYear()} ${BRAND_NAME}. All rights reserved.`}
          </p>
          <p className="text-white/40 text-xs flex items-center gap-1">
            {footerT["madeWith"] ?? "Made with"}
            <Heart size={12} className="text-[var(--brand-primary)] fill-[var(--brand-primary)]" />
            {footerT["forKids"] ?? "for kids everywhere"}
          </p>
        </div>
      </div>
    </footer>
  );
}