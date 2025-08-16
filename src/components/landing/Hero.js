"use client";
import { useState, useEffect } from "react";
import { Zap, ArrowRight, Play, Sparkles, CheckCircle } from "lucide-react";

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsVisible(true);

    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative overflow-hidden bg-white min-h-screen">
      {/* SEO Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Pageon AI Website Builder",
            applicationCategory: "WebApplication",
            description:
              "AI-powered website builder for small businesses. Create professional websites in minutes with integrated artificial intelligence technology.",
            url: "https://pageon.com",
            operatingSystem: "Web Browser",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
              description: "Free AI website builder for small businesses",
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.9",
              reviewCount: "2000",
              bestRating: "5",
              worstRating: "1",
            },
            provider: {
              "@type": "Organization",
              name: "Pageon",
              url: "https://pageon.com",
            },
          }),
        }}
      />

      {/* Dynamic gradient background */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(99, 102, 241, 0.1) 0%, transparent 50%)`,
        }}
      />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Colorful floating orbs */}
      <div className="absolute top-[-150px] left-[-150px] w-[400px] h-[400px] bg-gradient-to-br from-purple-400 to-blue-500 rounded-full blur-[120px] opacity-40 pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-gradient-to-br from-pink-400 to-red-500 rounded-full blur-[150px] opacity-35 pointer-events-none animate-pulse delay-1000"></div>
      <div className="absolute top-1/3 right-[-100px] w-[300px] h-[300px] bg-gradient-to-br from-green-400 to-cyan-500 rounded-full blur-[100px] opacity-30 pointer-events-none animate-pulse delay-500"></div>
      <div className="absolute bottom-1/4 left-[-50px] w-[250px] h-[250px] bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full blur-[80px] opacity-25 pointer-events-none animate-pulse delay-700"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full blur-[90px] opacity-20 pointer-events-none animate-pulse delay-300"></div>

      <main
        className="relative min-h-screen flex items-center justify-center px-4 py-20 text-center"
        role="main"
        aria-labelledby="hero-heading"
      >
        <div className="max-w-7xl mx-auto z-10">

          {/* Main Headline */}
          <h1
            id="hero-heading"
            className={`text-6xl md:text-8xl font-black text-black mb-6 leading-[0.9] tracking-tight transition-all duration-1000 delay-200 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            Build Your Business
            <span className="block bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Website
            </span>
            <span className="block text-black text-5xl md:text-7xl font-light">
              No Coding Needed
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className={`text-xl md:text-sm text-gray-700 max-w-4xl mx-auto mb-12 leading-relaxed transition-all duration-1000 delay-400 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            Pageon lets small businesses create stunning, mobile-friendly
            websites directly from WhatsApp — quick, simple, and affordable.
          </p>

          {/* Key Features */}
          <div
            className={`flex flex-wrap items-center justify-center gap-8 mb-12 transition-all duration-1000 delay-500 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            {[
              "No Code Required",
              "AI-Powered",
              "5-Min Setup",
              "Mobile-First",
            ].map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-2 text-gray-700"
              >
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="font-medium">{feature}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div
            className={`flex flex-col sm:flex-row items-center justify-center gap-6 mb-10 transition-all duration-1000 delay-600 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <button className="group relative px-10 py-5 text-xl font-bold bg-black text-white rounded-2xl hover:bg-gray-800 hover:scale-105 transition-all duration-300 shadow-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-black opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative flex items-center gap-3">
                <Zap className="w-6 h-6 text-yellow-400 group-hover:rotate-12 transition-transform duration-300" />
                Try AI Builder Free
              </span>
            </button>

            <button className="group flex items-center gap-3 px-10 py-5 text-xl font-semibold text-black border-2 border-black/20 rounded-2xl hover:border-black hover:bg-black/5 backdrop-blur-sm transition-all duration-300 shadow-2xl">
              <div className="p-2 bg-black/10 rounded-full group-hover:bg-black/20 transition-colors duration-300">
                <Play className="w-5 h-5 fill-black" />
              </div>
              See AI in Action
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
            </button>
          </div>

          {/* Social Proof */}
          <div
            className={`flex flex-col items-center transition-all duration-1000 delay-700 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <p className="text-gray-600 text-xs font-medium">
              Join thousands of businesses already growing with Pageon
            </p>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="w-6 h-10 border-2 border-black/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-black rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </main>
    </section>
  );
}
