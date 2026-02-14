import LandingNavbar from "./components/LandingNavbar";
import HeroSection from "./components/HeroSection";
import ServicesSection from "./components/ServicesSection";
import WhyChooseSection from "./components/WhyChooseSection";
import LandingFooter from "./components/LandingFooter";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-milk text-brown font-inter">
      <LandingNavbar />
      <main>
        <HeroSection />
        <ServicesSection />
        <WhyChooseSection />
      </main>
      <LandingFooter />
    </div>
  );
}
