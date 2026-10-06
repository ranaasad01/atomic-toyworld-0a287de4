import type { Metadata } from "next";
import { Nunito, Fredoka } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LocaleProvider from "@/components/LocaleProvider";
import LanguageToggle from "@/components/LanguageToggle";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const fredoka = Fredoka({
  subsets: ["latin"],
  variable: "--font-fredoka",
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  formatDetection: { telephone: false, date: false, email: false, address: false },
  title: "ToyWorld — Where Imagination Comes to Life!",
  description:
    "Shop the best toys for kids of all ages. Educational toys, action figures, dolls, board games, outdoor toys and more at ToyWorld.",
  keywords: ["toys", "kids toys", "educational toys", "action figures", "board games", "toy store"],
  openGraph: {
    title: "ToyWorld — Where Imagination Comes to Life!",
    description: "Shop the best toys for kids of all ages at ToyWorld.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${nunito.variable} ${fredoka.variable}`}>
      <body className="bg-[var(--background)] text-[var(--foreground)] font-nunito antialiased">
        <LocaleProvider>
          <LanguageToggle />
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </LocaleProvider>
      </body>
    </html>
  );
}
