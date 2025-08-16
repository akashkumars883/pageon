import Navbar from "@/components/Navbar";
import "./globals.css";
import { Ovo, Outfit } from "next/font/google";

// Ovo font
const ovo = Ovo({
  weight: "400", // Only one weight available for Ovo
  subsets: ["latin"],
  variable: "--font-ovo",
  display: "swap", // Better for performance and SEO
});

// Outfit font
const outfit = Outfit({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

// SEO Metadata
export const metadata = {
  title: "Pageon - Website Builder for Small Businesses",
  description:
    "Create stunning, responsive websites for small businesses in minutes using Pageon. No coding required.",
  keywords: [
    "website builder",
    "small business website",
    "no-code website",
    "responsive websites",
    "Pageon",
  ],
  authors: [{ name: "Pageon Team", url: "https://pageon.com" }],
  openGraph: {
    title: "Pageon - Build Websites for Small Businesses",
    description:
      "Easily create, customize, and publish business websites with Pageon in minutes.",
    url: "https://pageon.com",
    siteName: "Pageon",
    images: [
      {
        url: "/og-image.jpg", // Add this image to /public folder
        width: 1200,
        height: 630,
        alt: "Pageon Website Builder Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pageon - Build Websites for Small Businesses",
    description: "Launch your business website with Pageon in minutes.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${ovo.variable} ${outfit.variable}`}>
      <body className="font-outfit bg-white text-gray-900">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
