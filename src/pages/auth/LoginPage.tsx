import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "../../api/auth.api";
import type { LoginRequest } from "../../api/types/auth.types";
import { useAuthStore } from "../../store/auth.store";

export default function LoginPage() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  const [form, setForm] = useState<LoginRequest>({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);

  const isFormValid =
    isEmailValid && form.password.trim().length > 6 && !loading;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await authApi.login(form);

      if (!response.success) {
        setError(response.message || "Login failed.");
        return;
      }

      const { userResponse, userProfileResponse } = response.data;

      // ✅ Set authenticated state immediately from login response
      setAuth(userResponse, userProfileResponse);

      navigate("/app");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err.status === 401) {
        setError("Invalid email or password.");
      } else if (err.status === 400 && err.errors) {
        const firstError = (Object.values(err.errors)[0] as string[])?.[0];
        setError(firstError || "Validation error.");
      } else {
        setError(err.message || "Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  };

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

        {/* Login Card */}
        <div className="bg-white/80 backdrop-blur-xl border border-white/50 p-8 rounded-[2.5rem] shadow-[0_20px_40px_rgba(74,55,40,0.08)]">
          <h2 className="text-xl font-bold text-text-main mb-6 text-center">
            Welcome back
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
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
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
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
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full h-14 pl-12 pr-12 bg-milk/50 ring-1 ring-border-soft focus:ring-2 focus:ring-brown rounded-2xl transition-all outline-none placeholder:text-text-muted/60 text-text-main font-medium"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-brown transition-colors"
                >
                  <span className="material-symbols-outlined text-xl">
                    {showPassword ? "visibility_off" : "visibility"}
                  </span>
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <button
                type="button"
                onClick={() => navigate("/forgot-password")}
                className="text-sm text-brown font-medium hover:underline"
              >
                Forgot password?
              </button>
            </div>

            {/* Error Display */}
            {error && (
              <div className="text-danger text-sm font-medium text-center">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!isFormValid}
              className={`
    w-full h-14 font-bold rounded-2xl mt-2
    flex items-center justify-center gap-2
    transition-all
    ${
      isFormValid
        ? "bg-brown hover:bg-brown-light text-white shadow-lg shadow-brown/25 active:scale-[0.98]"
        : "bg-brown/40 text-white/70 cursor-not-allowed shadow-none"
    }
  `}
            >
              {loading ? "Signing in..." : "Sign In"}
              {!loading && isFormValid && (
                <span className="material-symbols-outlined text-xl">login</span>
              )}
            </button>
          </form>

          {/* Register Link */}
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
      </div>
    </div>
  );
}
