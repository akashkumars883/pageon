"use client";
import { useState, useEffect } from "react";
import { Menu, X, Sparkles, Zap } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 w-full z-50 px-3 sm:px-4 lg:px-6 py-3 sm:py-4 transition-all duration-300" role="banner">
      <div className="max-w-7xl mx-auto">
        <nav
          className={`flex items-center justify-between px-4 sm:px-6 py-3 rounded-xl sm:rounded-2xl border backdrop-blur-xl relative transition-all duration-300 ${
            scrolled 
              ? 'border-black/20 bg-white/90 shadow-lg' 
              : 'border-black/10 bg-white/70'
          }`}
          style={{
            boxShadow: scrolled 
              ? "0 10px 40px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.8)" 
              : "0 8px 32px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.5)",
          }}
        >
          {/* Colorful Glow Orbs */}
          <div className="absolute -top-4 -left-4 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-purple-400/40 to-blue-500/40 rounded-full blur-2xl pointer-events-none animate-pulse"></div>
          <div className="absolute -bottom-2 -right-2 w-14 h-14 sm:w-18 sm:h-18 bg-gradient-to-br from-pink-400/30 to-red-500/30 rounded-full blur-xl pointer-events-none animate-pulse delay-1000"></div>

          {/* Logo */}
          <div className="flex items-center space-x-2 text-lg sm:text-xl lg:text-2xl font-bold tracking-wide hover:scale-105 transition-transform duration-200 z-10">
            <div className="relative">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-purple-600" />
              <div className="absolute inset-0 bg-purple-400 opacity-40 blur-sm animate-pulse"></div>
            </div>
            <span className="text-black font-black">Pageon</span>
          </div>

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex items-center space-x-6 xl:space-x-8 font-medium text-sm xl:text-base">
            {["Features", "Pricing", "About", "Contact"].map((item, index) => (
              <li key={item}>
                <button
                  className="text-gray-700 hover:text-black relative group transition-all duration-300 py-2 px-1"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-blue-600 group-hover:w-full transition-all duration-300"></span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-100/50 to-blue-100/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                </button>
              </li>
            ))}
          </ul>

          {/* Desktop Right Buttons */}
          <div className="hidden md:flex items-center space-x-3 lg:space-x-4 z-10">
            <button className="px-3 lg:px-4 py-2 lg:py-3 text-sm lg:text-base font-medium text-gray-700 hover:text-black transition-colors duration-300">
              Login
            </button>
            <button className="group relative px-4 lg:px-6 py-2 lg:py-3 text-sm lg:text-base font-bold text-white rounded-xl lg:rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-r from-black via-gray-800 to-black"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-cyan-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative flex items-center space-x-2">
                <span>Get Started</span>
                <Zap className="w-3 h-3 lg:w-4 lg:h-4 text-yellow-400 group-hover:rotate-12 transition-transform duration-300" />
              </span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden relative z-10">
            <button
              className="p-2 sm:p-3 rounded-lg sm:rounded-xl border border-black/20 hover:bg-black/5 transition-all duration-300 hover:scale-105 backdrop-blur-sm"
              onClick={() => setMenuOpen(true)}
              style={{
                background: "rgba(255, 255, 255, 0.8)",
              }}
            >
              <Menu size={20} className="text-black sm:w-6 sm:h-6" />
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-white/95 backdrop-blur-2xl"
            onClick={() => setMenuOpen(false)}
          >
            {/* Background Orbs for Mobile Menu */}
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-br from-purple-400/30 to-blue-500/30 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/3 right-1/4 w-40 h-40 bg-gradient-to-br from-pink-400/25 to-red-500/25 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 right-1/3 w-24 h-24 bg-gradient-to-br from-green-400/20 to-cyan-500/20 rounded-full blur-2xl animate-pulse delay-500"></div>
          </div>

          {/* Menu Content */}
          <div className="relative flex flex-col items-center justify-center h-full px-6 sm:px-8">
            {/* Close Button */}
            <button
              className="absolute top-6 sm:top-8 right-6 sm:right-8 p-2 sm:p-3 rounded-xl border border-black/20 hover:bg-black/5 transition-all duration-300 hover:rotate-90 backdrop-blur-sm"
              onClick={() => setMenuOpen(false)}
              style={{ background: "rgba(255, 255, 255, 0.9)" }}
            >
              <X size={22} className="text-black sm:w-6 sm:h-6" />
            </button>

            {/* Logo */}
            <div className="mb-8 sm:mb-12 flex items-center space-x-3 text-2xl sm:text-3xl font-black">
              <div className="relative">
                <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" />
                <div className="absolute inset-0 bg-purple-400 opacity-40 blur-sm animate-pulse"></div>
              </div>
              <span className="text-black">Pageon</span>
            </div>

            {/* Navigation Links */}
            <ul className="flex flex-col space-y-6 sm:space-y-8 text-center text-xl sm:text-2xl font-semibold mb-8 sm:mb-12">
              {["Features", "Pricing", "About", "Contact"].map((item, index) => (
                <li key={item}>
                  <button
                    className="relative text-black hover:text-purple-600 transition-all duration-300 hover:scale-110 py-2 px-4 rounded-xl group"
                    onClick={() => setMenuOpen(false)}
                  >
                    <span className="relative z-10">{item}</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-100/50 to-blue-100/50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                </li>
              ))}
            </ul>

            {/* Mobile Auth Buttons */}
            <div className="flex flex-col space-y-4 w-full max-w-xs">
              <button
                className="px-6 py-3 sm:py-4 text-base sm:text-lg font-medium text-black hover:text-purple-600 border-2 border-black/20 rounded-xl sm:rounded-2xl hover:bg-black/5 hover:border-black/40 transition-all duration-300 backdrop-blur-sm"
                style={{ background: "rgba(255, 255, 255, 0.9)" }}
                onClick={() => setMenuOpen(false)}
              >
                Login
              </button>
              <button
                className="group relative px-6 py-3 sm:py-4 text-base sm:text-lg font-bold text-white rounded-xl sm:rounded-2xl hover:scale-105 transition-all duration-300 shadow-2xl overflow-hidden"
                onClick={() => setMenuOpen(false)}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-black via-gray-800 to-black"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/30 via-blue-600/30 to-cyan-600/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative flex items-center justify-center space-x-2">
                  <span>Get Started Free</span>
                  <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 group-hover:rotate-12 transition-transform duration-300" />
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}