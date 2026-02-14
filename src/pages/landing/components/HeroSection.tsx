import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/register");
  }

  return (
    <section className="px-6 pt-12 pb-20 text-center relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-brown rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10">
        <span className="inline-block px-4 py-1.5 rounded-full bg-milk-darker border border-brown/5 text-brown-accent text-xs font-bold uppercase tracking-widest mb-6">
          The Premium Standard
        </span>

        <h1 className="text-4xl font-extrabold text-brown leading-[1.1] tracking-tight mb-6">
          Fast, Secure, and <br />
          <span className="text-gold">Reliable</span> Utility Payments
        </h1>

        <p className="text-brown-accent text-base font-medium opacity-80 mb-10 max-w-[320px] mx-auto leading-relaxed">
          Experience the future of digital finance with Creda's ultra-modern utility management.
        </p>

        <div className="flex flex-col gap-4">
          <button onClick={handleGetStarted} className="cursor-pointer w-full bg-brown text-white h-14 rounded-2xl text-base font-bold shadow-xl shadow-brown/20 active:scale-95 transition-transform">
            Get Started
          </button>

          <button className="cursor-pointer w-full bg-white text-brown border border-brown/10 h-14 rounded-2xl text-base font-bold hover:bg-milk-darker transition-colors">
            View Demo
          </button>
        </div>
      </div>
    </section>
  );
}
