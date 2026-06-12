import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";
import Script from "next/script";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const BASE_URL = 'https://www.premiergolfcartssale.com';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Premier Golf Carts | Custom & Street-Legal Golf Carts',
    template: '%s | Premier Golf Carts',
  },
  description: 'Shop premium custom, electric, gas, and street-legal golf carts. Design your own custom build or browse our ready-to-ship inventory. Nationwide delivery available.',
  keywords: ['golf carts', 'custom golf carts', 'electric golf carts', 'street-legal golf carts', 'LSV', 'lifted golf carts', 'golf cart parts'],
  authors: [{ name: 'Premier Golf Carts' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: BASE_URL,
    siteName: 'Premier Golf Carts',
    title: 'Premier Golf Carts | Custom & Street-Legal Golf Carts',
    description: 'Shop premium custom, electric, gas, and street-legal golf carts. Nationwide delivery available.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Premier Golf Carts' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Premier Golf Carts | Custom & Street-Legal Golf Carts',
    description: 'Shop premium custom, electric, gas, and street-legal golf carts. Nationwide delivery available.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable}`}
    >
      <body>
        <Providers>
          <Navbar />
          <main style={{ minHeight: 'calc(100vh - 4.5rem)' }}>
            {children}
          </main>
          <Footer />
        </Providers>
        <Script src="//code.jivosite.com/widget/5bwlRyaS7D" strategy="lazyOnload" />
      </body>
    </html>
  );
}
