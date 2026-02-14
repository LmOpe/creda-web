/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { authApi } from "../../api/auth.api";

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const code = searchParams.get("code") || "";

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError(null);
    setMessage(null);

    if (!newPassword) {
      setError("New password is required.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response: any = await authApi.resetPassword({
        code,
        newPassword,
      });

      if (response.success) {
        setMessage("Password reset successfully");

        navigate("/login");
      } else {
        setError("Unable to reset password.");
      }
    } catch (err: any) {
      if (err.status === 404) {
        setError("The verification code is invalid.");
      } else if (err.status === 400 && err.errors?.newPassword) {
        setError(err.errors.newPassword[0]);
      } else if (err.status === 400 && err.errors?.code) {
        setError(err.errors.code[0]);
      } else {
        setError(err.message || "Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-milk relative overflow-hidden">
      {/* Background Glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -right-20 -bottom-20 w-[600px] h-[600px] rotate-12 opacity-15 bg-gradient-to-br from-brown to-brown-light rounded-full blur-[120px]" />
        <div className="absolute -left-40 -top-40 w-[800px] h-[800px] -rotate-12 opacity-5 bg-gradient-to-br from-brown to-gold rounded-full blur-[160px]" />
      </div>

      <div className="relative w-full max-w-[440px] z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-brown rounded-2xl mb-4 shadow-lg shadow-brown/20">
            <span className="material-symbols-outlined text-milk text-3xl">
              account_balance_wallet
            </span>
          </div>

          <h1 className="text-2xl font-extrabold text-text-main">
            Reset Password
          </h1>
          <p className="text-text-muted mt-2">Enter your new password below</p>
        </div>

        <div className="bg-white/80 backdrop-blur-xl border border-white/50 p-8 rounded-[2.5rem] shadow-[0_20px_40px_rgba(74,55,40,0.08)]">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* New Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full h-14 px-4 pr-12 bg-milk/50 ring-1 ring-border-soft focus:ring-2 focus:ring-brown rounded-2xl outline-none"
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted"
              >
                <span className="material-symbols-outlined">
                  {showPassword ? "visibility_off" : "visibility"}
                </span>
              </button>
            </div>

            {/* Confirm Password */}
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full h-14 px-4 bg-milk/50 ring-1 ring-border-soft focus:ring-2 focus:ring-brown rounded-2xl outline-none"
            />

            {error && (
              <div className="text-danger text-sm font-medium text-center">
                {error}
              </div>
            )}

            {message && (
              <div className="text-green-600 text-sm font-medium text-center">
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full h-14 bg-brown text-white font-bold rounded-2xl shadow-lg shadow-brown/25 transition-all active:scale-[0.98] disabled:opacity-60"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => navigate("/login")}
              className="text-sm text-brown font-medium hover:underline"
            >
              Back to Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
