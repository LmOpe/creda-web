import LandingNavbar from "./components/LandingNavbar";
import HeroSection from "./components/HeroSection";
import ServicesSection from "./components/ServicesSection";
import WhyChooseSection from "./components/WhyChooseSection";
import LandingFooter from "./components/LandingFooter";
import { useAuthStore } from "../../store/auth.store";
import { Navigate } from "react-router-dom";

export default function LandingPage() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  if (isAuthenticated) {
    return <Navigate to="/app" replace />;
  }

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
