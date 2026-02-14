/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "../../api/auth.api";
import { useAuthStore } from "../../store/auth.store";
import type { RegisterRequest } from "../../api/types/auth.types";

export default function RegisterPage() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((s) => s.setAuth);

  const [form, setForm] = useState<RegisterRequest>({
    FirstName: "",
    LastName: "",
    Email: "",
    PhoneNumber: "",
    PhoneCountryCode: "234",
    Password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const [loading, setLoading] = useState(false);
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  // -----------------------------
  // Handlers
  // -----------------------------

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    // Clear field error when typing
    setFieldErrors((prev) => ({
      ...prev,
      [e.target.name]: "",
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setGlobalError(null);
    setFieldErrors({});

    if (!agreeTerms) {
      setGlobalError("You must agree to the Terms and Privacy Policy.");
      return;
    }

    setLoading(true);

    try {
      const response = await authApi.register(form);

      if (!response.success) {
        setGlobalError(response.message);
        return;
      }

      const { userResponse, userProfileResponse } = response.data;

      // ✅ Auto-authenticate on successful registration
      setAuth(userResponse, userProfileResponse);

      navigate("/app");
    } catch (err: any) {
      // -----------------------------
      // 400 VALIDATION
      // -----------------------------
      if (err.status === 400 && err.errors) {
        const errors: Record<string, string> = {};

        Object.entries(err.errors).forEach(
          ([key, value]: any) => {
            errors[key] = value[0];
          }
        );

        setFieldErrors(errors);
        setGlobalError("Please correct the highlighted fields.");
      }

      // -----------------------------
      // 409 EMAIL EXISTS
      // -----------------------------
      else if (err.status === 409) {
        setFieldErrors({
          Email: err.detail || "Email already exists.",
        });
      }

      // -----------------------------
      // UNKNOWN
      // -----------------------------
      else {
        setGlobalError(
          err.message || "Something went wrong. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-milk">
      <div className="w-full max-w-md mb-8 flex flex-col items-center">
        <div className="w-12 h-12 bg-brown rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-brown/20">
          <span className="material-symbols-outlined text-white text-3xl">
            account_balance_wallet
          </span>
        </div>

        <h1 className="text-2xl font-extrabold tracking-tight text-text-main">
          Create Account
        </h1>

        <p className="text-text-muted text-sm mt-1">
          Join Creda digital utility platform
        </p>
      </div>

      <div className="w-full max-w-md bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(44,24,16,0.08)] p-8 border border-border-soft">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* First + Last Name */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <input
                name="FirstName"
                placeholder="First Name"
                value={form.FirstName}
                onChange={handleChange}
                className="w-full h-12 px-4 rounded-xl bg-milk/50 border border-border-soft focus:ring-2 focus:ring-brown outline-none"
              />
              {fieldErrors.FirstName && (
                <p className="text-xs text-danger mt-1">
                  {fieldErrors.FirstName}
                </p>
              )}
            </div>

            <div>
              <input
                name="LastName"
                placeholder="Last Name"
                value={form.LastName}
                onChange={handleChange}
                className="w-full h-12 px-4 rounded-xl bg-milk/50 border border-border-soft focus:ring-2 focus:ring-brown outline-none"
              />
              {fieldErrors.LastName && (
                <p className="text-xs text-danger mt-1">
                  {fieldErrors.LastName}
                </p>
              )}
            </div>
          </div>

          {/* Email */}
          <div>
            <input
              name="Email"
              type="email"
              placeholder="Email"
              value={form.Email}
              onChange={handleChange}
              className="w-full h-12 px-4 rounded-xl bg-milk/50 border border-border-soft focus:ring-2 focus:ring-brown outline-none"
            />
            {fieldErrors.Email && (
              <p className="text-xs text-danger mt-1">
                {fieldErrors.Email}
              </p>
            )}
          </div>

          {/* Phone */}
          <div className="flex gap-2">
            <select
              name="PhoneCountryCode"
              value={form.PhoneCountryCode}
              onChange={handleChange}
              className="h-12 px-3 rounded-xl bg-milk/50 border border-border-soft"
            >
              <option value="234">+234</option>
              <option value="1">+1</option>
              <option value="44">+44</option>
            </select>

            <div className="flex-1">
              <input
                name="PhoneNumber"
                placeholder="Phone Number"
                value={form.PhoneNumber}
                onChange={handleChange}
                className="w-full h-12 px-4 rounded-xl bg-milk/50 border border-border-soft focus:ring-2 focus:ring-brown outline-none"
              />
              {fieldErrors.PhoneNumber && (
                <p className="text-xs text-danger mt-1">
                  {fieldErrors.PhoneNumber}
                </p>
              )}
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="relative">
              <input
                name="Password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={form.Password}
                onChange={handleChange}
                className="w-full h-12 px-4 pr-12 rounded-xl bg-milk/50 border border-border-soft focus:ring-2 focus:ring-brown outline-none"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword((prev) => !prev)
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted"
              >
                <span className="material-symbols-outlined">
                  {showPassword
                    ? "visibility_off"
                    : "visibility"}
                </span>
              </button>
            </div>

            {fieldErrors.Password && (
              <p className="text-xs text-danger mt-1">
                {fieldErrors.Password}
              </p>
            )}
          </div>

          {/* Terms */}
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              checked={agreeTerms}
              onChange={() =>
                setAgreeTerms((prev) => !prev)
              }
              className="mt-1"
            />
            <p className="text-xs text-text-muted">
              I agree to the Terms of Service and Privacy
              Policy.
            </p>
          </div>

          {/* Global Error */}
          {globalError && (
            <div className="text-sm text-danger text-center">
              {globalError}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-14 bg-brown text-white font-bold rounded-xl active:scale-[0.98] transition-all disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-border-soft text-center">
          <p className="text-sm text-text-muted">
            Already have an account?
            <button
              onClick={() => navigate("/login")}
              className="font-bold text-text-main ml-1 hover:underline"
            >
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
