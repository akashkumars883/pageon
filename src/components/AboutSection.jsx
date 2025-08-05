"use client";
import { useState, useEffect, useRef } from "react";
import {
  Zap,
  Smartphone,
  Edit3,
  Globe,
  ArrowRight,
  Users,
  CheckCircle,
  Rocket,
  Layers,
  Palette,
} from "lucide-react";

const AboutSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(-1);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: Zap,
      title: "Lightning Fast Setup",
      description: "Create your business website in under 2 minutes through WhatsApp - no coding required.",
      stats: "< 2 min"
    },
    {
      icon: Smartphone,
      title: "Mobile-First Design",
      description: "Get a mobile-optimized website that works perfectly on all devices and platforms.",
      stats: "100% Mobile"
    },
    {
      icon: Rocket,
      title: "Zero Technical Skills",
      description: "We handle all the technical setup while you focus on your business.",
      stats: "0% Tech"
    },
    {
      icon: Users,
      title: "Global Reach",
      description: "Multi-language support to reach customers worldwide.",
      stats: "15+ Languages"
    },
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-white">
      <div className="container mx-auto px-6 max-w-8xl">

        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}>
          <div className="inline-block px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-full mb-6">
            Why Choose Pageon
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
            Build Your Business Website
            <br />
            <span className="text-blue-600">In Under 2 Minutes</span>
          </h2>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Skip the complexity. Just answer a few questions on WhatsApp and watch your website come to life.
          </p>

          {/* Trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-8 mt-8 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-blue-600" />
              <span>10,000+ Websites Created</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-blue-600" />
              <span>4.9/5 Customer Rating</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-blue-600" />
              <span>SSL Secured</span>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className={`transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const isActive = activeFeature === index;

              return (
                <div
                  key={index}
                  className="group cursor-pointer"
                  onMouseEnter={() => setActiveFeature(index)}
                  onMouseLeave={() => setActiveFeature(-1)}
                >
                  <div className={`bg-white border rounded-lg p-6 h-full transition-all duration-300 ${isActive
                      ? "border-blue-600 shadow-lg shadow-blue-100"
                      : "border-gray-200 hover:border-gray-300 hover:shadow-md"
                    }`}>

                    {/* Stats badge */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {feature.stats}
                      </span>
                    </div>

                    {/* Icon */}
                    <div className={`inline-flex p-3 rounded-lg mb-4 transition-colors duration-300 ${isActive ? "bg-blue-600" : "bg-gray-100 group-hover:bg-blue-100"
                      }`}>
                      <Icon className={`w-6 h-6 transition-colors duration-300 ${isActive ? "text-white" : "text-gray-600 group-hover:text-blue-600"
                        }`} />
                    </div>

                    {/* Title */}
                    <h3 className={`font-semibold text-lg mb-2 transition-colors duration-300 ${isActive ? "text-blue-600" : "text-black"
                      }`}>
                      {feature.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {feature.description}
                    </p>

                    {/* Learn more link */}
                    <div className={`flex items-center gap-2 text-sm font-medium transition-all duration-300 ${isActive
                        ? "text-blue-600 translate-x-1"
                        : "text-gray-400 group-hover:text-blue-600"
                      }`}>
                      <span>Learn more</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className={`text-center mt-16 transition-all duration-700 delay-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}>
          <div className="bg-black text-white rounded-lg p-12">
            <h3 className="text-3xl font-bold mb-4">
              Ready to Transform Your Business?
            </h3>

            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Join over <span className="text-blue-400 font-semibold">100+ successful businesses</span> who
              chose the smart way to get online.
            </p>

            {/* Features list */}
            <div className="flex flex-wrap items-center justify-center gap-6 mb-8 text-sm">
              <div className="flex items-center gap-2 text-gray-300">
                <CheckCircle className="w-4 h-4 text-blue-400" />
                <span>2-Minute Setup</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <CheckCircle className="w-4 h-4 text-blue-400" />
                <span>WhatsApp Integration</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <CheckCircle className="w-4 h-4 text-blue-400" />
                <span>Professional Design</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <CheckCircle className="w-4 h-4 text-blue-400" />
                <span>Mobile Optimized</span>
              </div>
            </div>

            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-medium transition-colors duration-300 flex items-center gap-2 mx-auto">
              <Rocket className="w-5 h-5" />
              Start Building Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;