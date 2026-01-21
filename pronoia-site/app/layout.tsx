import type { Metadata } from "next";
import { Inter, Caveat } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pronoia - Engineered Happiness",
  description: "Philosophy, coding projects, and the practice of attentional responsibility.",
  keywords: ["philosophy", "pronoia", "attention", "engineering", "coding", "blog"],
  authors: [{ name: "Kevin Keeland" }],
  openGraph: {
    title: "Pronoia - Engineered Happiness",
    description: "Philosophy, coding projects, and the practice of attentional responsibility.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${caveat.variable}`}>
      <body className="antialiased bg-white text-primary">
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
