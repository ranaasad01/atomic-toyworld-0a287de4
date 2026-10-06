# AGENTS.md

Project conventions for AI agents and humans editing this codebase.

## Original request
create a toys website

## Goal
Build a vibrant, family-friendly toys e-commerce website with a homepage, shop, product detail, cart, about us, and contact pages.

## Project type
e-commerce

## Design system — match this exactly
- Color tokens: `--brand-primary: #FF6B35`, `--brand-primary-shadow: rgba(255, 107, 53, 0.35)`, `--brand-dark-muted: rgba(26, 26, 46, 0.7)`, `--background: #FAFAF8`, `--foreground: #1A1A2E`, `--card: #FFFFFF`, `--card-hover: #FFFBF8`, `--border: rgba(26, 26, 46, 0.08)`, `--muted: #F5F4F0`, `--muted-foreground: rgba(26, 26, 46, 0.55)`, `--accent: #FF6B35`, `--accent-foreground: #FFFFFF`
- Fonts: Nunito, Fredoka_One

## Existing components — reuse these, don't create near-duplicates
- Footer (components/Footer.tsx)
- LanguageToggle (components/LanguageToggle.tsx)
- LocaleProvider (components/LocaleProvider.tsx)
- Navbar (components/Navbar.tsx)

## Existing i18n namespaces
Every translation key must be namespaced (`hero.title`, never a bare `title`) so two components never collide on the same catalog slot. Reuse one of these, or pick a new, distinct name:
`about`, `cart`, `categories`, `contact`, `featured`, `footer`, `giftFinder`, `hero`, `nav`, `newsletter`, `product`, `productDetail`, `shop`, `story`, `testimonials`, `value`

When editing or adding pages: preserve the design system above, reuse existing components and the shared nav data file, and keep the established structure and tone.
