import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-milk relative overflow-hidden">
      {/* Abstract Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -right-20 -bottom-20 w-[600px] h-[600px] rotate-12 opacity-15 bg-gradient-to-br from-brown to-brown-light rounded-full blur-[120px]" />
        <div className="absolute -left-40 -top-40 w-[800px] h-[800px] -rotate-12 opacity-5 bg-gradient-to-br from-brown to-gold rounded-full blur-[160px]" />
      </div>

      <div className="relative w-full max-w-[440px] z-10">
        {/* Logo + Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-brown rounded-2xl mb-4 shadow-lg shadow-brown/20">
            <span className="material-symbols-outlined text-milk text-3xl">
              account_balance_wallet
            </span>
          </div>

          <h1 className="text-3xl font-extrabold text-text-main tracking-tight">
            Creda
          </h1>
          <p className="text-text-muted mt-2 font-medium">
            Secure your financial future
          </p>
        </div>

        {/* Card */}
        <div className="bg-white/80 backdrop-blur-xl border border-white/50 p-8 rounded-[2.5rem] shadow-[0_20px_40px_rgba(74,55,40,0.08)]">
          <h2 className="text-xl font-bold text-text-main mb-6 text-center">
            Welcome back
          </h2>

          <form className="space-y-5">
            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-text-main ml-1">
                Email Address
              </label>

              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-text-muted text-xl">
                  mail
                </span>

                <input
                  type="email"
                  placeholder="name@company.com"
                  className="w-full h-14 pl-12 pr-4 bg-milk/50 ring-1 ring-border-soft focus:ring-2 focus:ring-brown rounded-2xl transition-all outline-none placeholder:text-text-muted/60 text-text-main font-medium"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-text-main ml-1">
                Password
              </label>

              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-text-muted text-xl">
                  lock
                </span>

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full h-14 pl-12 pr-12 bg-milk/50 ring-1 ring-border-soft focus:ring-2 focus:ring-brown rounded-2xl transition-all outline-none placeholder:text-text-muted/60 text-text-main font-medium"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-brown transition-colors"
                >
                  <span className="material-symbols-outlined text-xl">
                    {showPassword ? "visibility_off" : "visibility"}
                  </span>
                </button>
              </div>
            </div>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between px-1 py-1">
              <label className="flex items-center cursor-pointer group">
                <input type="checkbox" className="sr-only peer" />

                <div className="w-5 h-5 bg-milk border border-border-soft rounded-md peer-checked:bg-brown peer-checked:border-brown transition-all relative">
                  <span className="material-symbols-outlined absolute text-white text-[14px] opacity-0 peer-checked:opacity-100 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    check
                  </span>
                </div>

                <span className="ml-2 text-sm font-medium text-text-muted group-hover:text-text-main transition-colors">
                  Remember me
                </span>
              </label>

              <button
                type="button"
                className="text-sm font-bold text-brown hover:opacity-80 underline decoration-brown/20 underline-offset-4"
              >
                Forgot password?
              </button>
            </div>

            {/* Sign In */}
            <button
              type="submit"
              className="w-full h-14 bg-brown hover:bg-brown-light text-white font-bold rounded-2xl shadow-lg shadow-brown/25 transition-all active:scale-[0.98] mt-4 flex items-center justify-center gap-2"
            >
              <span>Sign In</span>
              <span className="material-symbols-outlined text-xl">
                login
              </span>
            </button>
          </form>

          {/* Register */}
          <div className="mt-8 text-center">
            <p className="text-sm text-text-muted font-medium">
              New to Creda?{" "}
              <button
                onClick={() => navigate("/register")}
                className="text-brown font-bold hover:underline underline-offset-4"
              >
                Create account
              </button>
            </p>
          </div>
        </div>

        {/* Security Badges */}
        <div className="mt-12 flex items-center justify-center gap-6 opacity-40">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">
              verified_user
            </span>
            <span className="text-[10px] uppercase tracking-widest font-bold">
              Encrypted
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">
              security
            </span>
            <span className="text-[10px] uppercase tracking-widest font-bold">
              PCI Compliant
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
