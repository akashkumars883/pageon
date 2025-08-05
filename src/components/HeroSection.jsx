"use client";
import React, { useState, useEffect } from "react";
import { ArrowRight, CheckCircle, Play, Sparkles } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [activeFeatures, setActiveFeatures] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  // Admin email constant (same as in your auth page)
  const ADMIN_EMAIL = "ak706908@gmail.com";

  // Check if current user is admin
  const isAdmin = user?.email === ADMIN_EMAIL;

  const features = [
    "No coding required",
    "Launch in 5 minutes",
    "Mobile first design",
    "SEO optimized",
  ];

  // Handle authentication and redirection
  const handleGetStarted = async () => {
    if (authLoading) return; // Don't proceed if auth is still loading

    setIsLoading(true);

    try {
      if (user) {
        // User is authenticated, redirect based on user type
        if (isAdmin) {
          router.push('/admin');
        } else {
          router.push('/form');
        }
      } else {
        // User is not authenticated, redirect to login
        router.push('/auth');
      }
    } catch (error) {
      console.error('Navigation error:', error);
      // Fallback to login page if navigation fails
      router.push('/auth');
    } finally {
      setIsLoading(false);
    }
  };

  // Get button text based on auth state
  const getButtonText = () => {
    if (authLoading || isLoading) return "Loading...";
    if (!user) return "Get Started";
    if (isAdmin) return "Go to Admin Dashboard";
    return "Start Building Now";
  };

  useEffect(() => {
    setIsVisible(true);

    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    const interval = setInterval(() => {
      setActiveFeatures((prev) => (prev + 1) % features.length);
    }, 3000);

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="min-h-screen pt-20 bg-white flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl mx-auto max-w-8xl w-full py-10 px-8 sm:px-12 lg:px-16 bg-black transition-colors duration-500 shadow-2xl">
        <div className="flex items-center justify-center px-6 py-3 text-white text-sm font-medium">
          <div className="flex items-center justify-center bg-white/15 backdrop-blur-sm py-3 px-6 rounded-full">
            <Sparkles className="w-4 h-4 mr-2 text-yellow-400" />
            <span className="text-center">Trusted by small business</span>
          </div>
        </div>

        {/* Main Content - Centered */}
        <div className="max-w-7xl mx-auto text-center">
          {/* Main Headline */}
          <div
            className={`mb-8 transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : ""
              }`}
          >
            <h1 className="text-4xl sm:text-6xl lg:text-7xl leading-tight mb-6 text-white">
              Turn Your Small Business Into an{" "}
              <span className="text-blue-700">Online Brand</span> Instantly
            </h1>
          </div>
        </div>

        {/* Description */}
        <div
          className={`max-w-xl mx-auto mb-12 sm:mb-16 lg:mb-20 transition-all duration-1000 delay-300 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
        >
          <p className="text-lg lg:text-xl leading-relaxed font-light text-center text-green-50">
            The easiest way for small businesses to go online. No app, no
            hosting, no tech skills required.
          </p>
        </div>

        {/* CTA Buttons */}
        <div
          className={`flex flex-col sm:flex-row items-center justify-center gap-6 mb-20 transition-all duration-1000 delay-500 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
        >
          <button
            onClick={handleGetStarted}
            disabled={authLoading || isLoading}
            className={`w-full sm:w-auto group px-10 py-6 rounded-2xl text-lg font-medium transition-all duration-300 flex items-center justify-center relative overflow-hidden shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${isAdmin
                ? "bg-purple-600 text-white hover:bg-purple-700 hover:scale-105"
                : "bg-white text-blue-800 hover:bg-blue-50 hover:scale-105"
              }`}
          >
            <span className="relative z-10">
              {getButtonText()}
            </span>
            {!(authLoading || isLoading) && (
              <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300 -rotate-45 relative z-10" />
            )}
            {(authLoading || isLoading) && (
              <div className={`ml-3 w-5 h-5 animate-spin rounded-full border-2 relative z-10 ${isAdmin
                  ? "border-purple-200/30 border-t-white"
                  : "border-blue-800/30 border-t-blue-800"
                }`} />
            )}
            <div className={`absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ${isAdmin
                ? "bg-purple-700/30"
                : "bg-blue-100/30"
              }`} />
          </button>

          <button className="w-full sm:w-auto group flex items-center justify-center transition-colors duration-300 text-white hover:text-blue-200">
            <div className="w-16 h-16 border-2 border-white/30 rounded-2xl flex items-center justify-center mr-4 group-hover:border-white/50 group-hover:bg-white/10 transition-all duration-300">
              <Play className="w-6 h-6 ml-0.5" />
            </div>
            <div className="text-left">
              <div className="font-medium">Watch Demo</div>
              <div className="text-sm text-blue-200">3 min video</div>
            </div>
          </button>
        </div>

        {/* Social proof indicators */}
        <div
          className={`flex flex-wrap items-center justify-center gap-8 text-blue-200/80 text-sm transition-all duration-1000 delay-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
        >
          <div className="flex items-center">
            <div className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse" />
            <span>5-minute setup</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse" />
            <span>No credit card required</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse" />
            <span>24/7 support included</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;