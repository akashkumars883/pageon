"use client";
import React, { useState, useEffect } from "react";

export default function SingleMarquee() {
  const [darkMode, setDarkMode] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const marqueeItems = [
    "Bella Bites Café",
    "UrbanCuts Salon",
    "GreenRoots Grocers",
    "Geetanjali Trends",
    "TechFix Hub",
    "Bliss Yoga Studio",
    "PetVille Clinic",
    "StyleNest Boutique",
  ];

  return (
    <div className="relative max-w-7xl mx-auto py-8 overflow-hidden">
      <div className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent"></div>
      <div className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none bg-gradient-to-l from- to-transparent"></div>

      <div className="overflow-hidden whitespace-nowrap">
        <div className="inline-flex animate-marquee">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="flex items-center">
              {marqueeItems.map((item, i) => (
                <span
                  key={`${index}-${i}`}
                  className="text-4xl font-medium mx-8 hover:scale-105 transition-transform duration-300 cursor-default text-black/40"
                >
                  {item}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }

        .animate-marquee {
          animation: marquee 50s linear infinite;
        }
      `}</style>
    </div>
  );
}
