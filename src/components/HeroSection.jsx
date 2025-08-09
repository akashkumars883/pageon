"use client";
import React, { useState, useEffect } from "react";
import { ArrowRight, CheckCircle, Play, Sparkles, Zap, Globe, Clock, Star } from "lucide-react";

const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeatures, setActiveFeatures] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [currentStat, setCurrentStat] = useState(0);

  // Mock user and auth states for demo
  const user = null;
  const authLoading = false;
  const ADMIN_EMAIL = "ak706908@gmail.com";
  const isAdmin = user?.email === ADMIN_EMAIL;

  const features = [
    { text: "No coding required", icon: Zap },
    { text: "Launch in 5 minutes", icon: Clock },
    { text: "Mobile first design", icon: Globe },
    { text: "SEO optimized", icon: Star },
  ];

  const stats = [
    { number: "10,000+", label: "Active Users" },
    { number: "99.9%", label: "Uptime" },
    { number: "5 min", label: "Setup Time" },
    { number: "24/7", label: "Support" }
  ];

  const handleGetStarted = async () => {
    if (authLoading) return;
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      console.log("Navigating to auth/dashboard...");
    }, 1000);
  };

  const getButtonText = () => {
    if (authLoading || isLoading) return "Loading...";
    if (!user) return "Start Building Now";
    if (isAdmin) return "Go to Admin Dashboard";
    return "Create Your Website";
  };

  useEffect(() => {
    setIsVisible(true);

    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    const featureInterval = setInterval(() => {
      setActiveFeatures((prev) => (prev + 1) % features.length);
    }, 3000);

    const statInterval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length);
    }, 2000);

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(featureInterval);
      clearInterval(statInterval);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating geometric shapes with blur */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl animate-pulse delay-2000"></div>

        {/* Mouse following gradient */}
        <div
          className="absolute w-96 h-96 bg-blue-500/5 rounded-full pointer-events-none transition-all duration-300 blur-2xl"
          style={{
            left: `${mousePosition.x}%`,
            top: `${mousePosition.y}%`,
            transform: 'translate(-50%, -50%)'
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        {/* Trust Badge */}
        <div className="flex items-center justify-center mb-8 sm:mb-12">
          <div
            className={`bg-white border border-gray-200 py-3 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-500 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
          >
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <div className="w-px h-4 bg-gray-300"></div>
              <Sparkles className="w-4 h-4 text-blue-500 animate-pulse" />
              <span className="text-sm font-medium text-gray-700">
                Trusted by 10,000+ Indian businesses
              </span>
            </div>
          </div>
        </div>

        {/* Main Headline */}
        <div className="text-center max-w-6xl mx-auto">
          <div
            className={`mb-6 sm:mb-8 transition-all duration-1000 delay-200 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
          >
            <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold mb-6 leading-[0.95]">
              <span className="text-black">
                India's #1
              </span>
              <br />
              <span className="text-black">
                AI Website Builder
              </span>
              <br />
              <span className="text-black">
                for Small Business
              </span>
            </h1>

            {/* Animated subtitle */}
            <div className="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg animate-bounce">
              <Zap className="w-4 h-4 mr-2" />
              Get Online in 2 Minutes!
            </div>
          </div>

          {/* Description */}
          <div
            className={`max-w-3xl mx-auto mb-10 sm:mb-12 transition-all duration-1000 delay-400 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
          >
            <p className="text-lg sm:text-xl lg:text-2xl leading-relaxed text-gray-600 font-medium">
              Perfect for Indian startups, local services, restaurants & retailers.
              <span className="text-blue-600 font-semibold"> AI-powered</span> websites with
              mobile-first design, WhatsApp integration & SEO optimization.
              <span className="text-black font-semibold"> No coding, no hosting hassles!</span>
            </p>
          </div>

          {/* Feature Pills */}
          <div
            className={`flex flex-wrap justify-center gap-3 mb-10 transition-all duration-1000 delay-500 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
          >
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={index}
                  className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-500 ${index === activeFeatures
                      ? "bg-blue-600 text-white shadow-lg scale-105"
                      : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
                    }`}
                >
                  <IconComponent className="w-4 h-4 mr-2" />
                  {feature.text}
                </div>
              );
            })}
          </div>

          {/* CTA Buttons */}
          <div
            className={`flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-12 transition-all duration-1000 delay-600 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
          >
            <button
              onClick={handleGetStarted}
              disabled={authLoading || isLoading}
              className={`group relative px-8 sm:px-12 py-4 sm:py-5 rounded-2xl text-lg font-semibold transition-all duration-300 flex items-center justify-center overflow-hidden shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 bg-blue-600 text-white hover:bg-blue-700`}
            >
              {/* Animated background */}
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />

              <span className="relative z-10">{getButtonText()}</span>
              {!(authLoading || isLoading) && (
                <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300 relative z-10" />
              )}
              {(authLoading || isLoading) && (
                <div className="ml-3 w-5 h-5 animate-spin rounded-full border-2 border-white/30 border-t-white relative z-10" />
              )}
            </button>

            <button className="group flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95">
              <div className="w-14 h-14 sm:w-16 sm:h-16 border-2 border-gray-300 rounded-2xl flex items-center justify-center mr-4 group-hover:border-blue-500 group-hover:bg-blue-50 transition-all duration-300 shadow-lg">
                <Play className="w-6 h-6 sm:w-7 sm:h-7 ml-1 text-gray-600 group-hover:text-blue-600" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-black text-base sm:text-lg">Watch Demo</div>
                <div className="text-sm text-gray-500">3 min showcase</div>
              </div>
            </button>
          </div>

          {/* Social Proof Indicators */}
          <div
            className={`flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-gray-500 text-sm transition-all duration-1000 delay-800 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
          >
            {[
              "2-minute setup guaranteed",
              "Free forever plan",
              "Hindi & English support",
              "Mobile-optimized"
            ].map((item, index) => (
              <div key={index} className="flex items-center hover:text-blue-600 transition-colors duration-300">
                <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                <span className="font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default HeroSection;