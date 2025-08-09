import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { GA_TRACKING_ID } from "@/lib/gtag";
import { Lora, Outfit } from "next/font/google";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

export const metadata = {
  title: {
    default: "PageOn - Best Website Builder for Small Businesses in India | Create Professional Websites in Minutes",
    template: "%s | PageOn - India's #1 Website Builder"
  },
  description: "Create stunning business websites in India with PageOn - No coding required! Perfect for Indian small businesses, startups, local services. Get online in 2 minutes with mobile-optimized, SEO-friendly websites. Trusted by 10,000+ Indian businesses.",
  keywords: [
    "website builder India",
    "small business website India",
    "create website online India",
    "business website maker",
    "Indian website builder",
    "local business website",
    "startup website India",
    "professional website design India",
    "mobile website builder",
    "SEO website builder India",
    "cheap website builder India",
    "best website builder for Indian businesses",
    "website design services India",
    "online business website",
    "digital presence India"
  ],
  authors: [{ name: "PageOn Team" }],
  creator: "PageOn",
  publisher: "PageOn",
  alternates: {
    canonical: "https://pageon.in",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://pageon.in",
    title: "PageOn - Best Website Builder for Indian Small Businesses",
    description: "Create professional websites for your Indian business in minutes. No coding required. Mobile-optimized, SEO-friendly websites trusted by 10,000+ businesses.",
    siteName: "PageOn",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "PageOn - Website Builder for Indian Businesses",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PageOn - Best Website Builder for Indian Small Businesses",
    description: "Create professional websites for your Indian business in minutes. No coding required.",
    images: ["/twitter-image.jpg"],
    creator: "@PageOnIndia",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-site-verification-code",
    yandex: "your-yandex-verification-code",
    bing: "your-bing-verification-code",
  },
  category: "technology",
  classification: "Business Website Builder",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" itemScope itemType="https://schema.org/WebApplication">
      <head>
        {/* SEO Meta Tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#4F46E5" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="PageOn" />
        <meta name="application-name" content="PageOn" />
        <meta name="msapplication-TileColor" content="#4F46E5" />
        <meta name="msapplication-tooltip" content="PageOn - Website Builder for Indian Businesses" />
        
        {/* Favicon and Icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="icon" href="/icon.png" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Preconnect to improve performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        
        {/* Structured Data for Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "PageOn",
              "url": "https://pageon.in",
              "logo": "https://pageon.in/logo.png",
              "sameAs": [
                "https://twitter.com/PageOnIndia",
                "https://www.linkedin.com/company/pageon-india",
                "https://www.facebook.com/PageOnIndia"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+91-7508657479",
                "contactType": "customer service",
                "areaServed": "IN",
                "availableLanguage": ["Hindi", "English"]
              },
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "IN",
                "addressRegion": "India"
              },
              "description": "India's leading website builder for small businesses. Create professional websites in minutes without coding."
            })
          }}
        />
        
        {/* Structured Data for WebApplication */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "PageOn Website Builder",
              "url": "https://pageon.in",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web Browser",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "INR",
                "description": "Free website builder for Indian businesses"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "ratingCount": "1000",
                "bestRating": "5",
                "worstRating": "1"
              },
              "author": {
                "@type": "Organization",
                "name": "PageOn"
              },
              "description": "Professional website builder designed specifically for Indian small businesses and startups."
            })
          }}
        />

        {/* Google Analytics */}
        <script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          strategy="afterInteractive"
        />
        <script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_title: document.title,
              page_location: window.location.href,
              custom_map: {
                'custom_parameter_1': 'user_country',
                'custom_parameter_2': 'user_language'
              }
            });
          `}
        </script>
      </head>
      <body
        className={`${outfit.variable} ${lora.variable} antialiased font-outfit`}
      >
        <ThemeProvider>
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
