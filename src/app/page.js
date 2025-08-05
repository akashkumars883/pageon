import AboutSection from "@/components/AboutSection";
import BusinessType from "@/components/BusinessType";
import FooterSection from "@/components/Footer";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";


export default function LandingPage() {
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
