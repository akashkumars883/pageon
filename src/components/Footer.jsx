"use client";
import React, { useState } from "react";
import {
  ArrowRight,
  CheckCircle,
  Sparkles,
  Heart,
} from "lucide-react";

const FooterSection = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const footerLinks = {
    Product: [
      { name: "Features", href: "#features" },
      { name: "Templates", href: "#templates" },
      { name: "Pricing", href: "#pricing" },
      { name: "WhatsApp Setup", href: "#setup" },
    ],
    Company: [
      { name: "About Us", href: "#about" },
      { name: "Success Stories", href: "#stories" },
      { name: "Blog", href: "#blog" },
      { name: "Careers", href: "#careers" },
    ],
    Support: [
      { name: "Help Center", href: "#help" },
      { name: "Contact", href: "#contact" },
      { name: "WhatsApp Support", href: "#whatsapp" },
      { name: "Status", href: "#status" },
    ],
    Legal: [
      { name: "Privacy Policy", href: "#privacy" },
      { name: "Terms of Service", href: "#terms" },
      { name: "Cookie Policy", href: "#cookies" },
      { name: "GDPR", href: "#gdpr" },
    ],
  };

  return (
    <footer className="bg-black text-white">
      {/* Newsletter Section */}
      <div className="border-b border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 max-w-7xl">
          <div className="max-w-6xl mx-auto text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="flex items-center bg-white/10 backdrop-blur-sm py-2 px-4 rounded-full">
                <Sparkles className="w-4 h-4 mr-2 text-yellow-400" />
                <span className="text-sm font-medium">Stay Updated</span>
              </div>
            </div>

            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 px-4 sm:px-0">
              Join 10,000+ Indian Business Owners
            </h3>

            <p className="text-base sm:text-lg text-gray-300 mb-8 max-w-2xl mx-auto px-4 sm:px-0">
              Get weekly website tips, digital marketing strategies, and growth hacks specifically for Indian small businesses. From Mumbai to Chennai, learn how successful businesses grow online.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto px-4 sm:px-0">
              <div className="flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full px-6 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                />
              </div>
              <button
                onClick={handleSubscribe}
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                {isSubscribed ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Subscribed!
                  </>
                ) : (
                  <>
                    Subscribe
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </>
                )}
              </button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-blue-400" />
                <span>No spam, ever</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-blue-400" />
                <span>Unsubscribe anytime</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-blue-400" />
                <span>Weekly tips & updates</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-7xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-col md:flex-row items-center gap-6 text-sm text-gray-400">
              <p>&copy; 2025 Pageon. All rights reserved.</p>
              <div className="flex items-center gap-6">
                <a
                  href="#privacy"
                  className="hover:text-white transition-colors duration-300"
                >
                  Privacy
                </a>
                <a
                  href="#terms"
                  className="hover:text-white transition-colors duration-300"
                >
                  Terms
                </a>
                <a
                  href="#cookies"
                  className="hover:text-white transition-colors duration-300"
                >
                  Cookies
                </a>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500 animate-pulse" />
              <span>for small businesses</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
