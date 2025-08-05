"use client";
import AboutSection from "@/components/AboutSection";
import BusinessType from "@/components/BusinessType";
import FooterSection from "@/components/Footer";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import { pageview } from "@/lib/gtag";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function LandingPage() {
  const pathname = usePathname();

  useEffect(() => {
    pageview(pathname);
  }, [pathname]);

  return (
    <div className="">
      <Header />
      <HeroSection />
      <AboutSection />
      <BusinessType />
      <FooterSection />
    </div>
  );
}
