/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "../../api/auth.api";

type Props = {
  title: string;
  description: string;
  intent: "EmailVerification" | "PasswordReset";
};

export default function RequestCodePage({ title, description, intent }: Props) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [fieldError, setFieldError] = useState<string | null>(null);

  const isFormValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && !loading;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setFieldError(null);

    setLoading(true);

    try {
      const response = await authApi.requestCode({
        email,
        intent,
      });

      if (response.success) {
        setMessage(response.message);
      } else {
        setFieldError("Something went wrong. Please try again.");
      }
    } catch (err: any) {
      if (err.status === 400 && err.errors?.email) {
        setFieldError(err.errors.email[0]);
      } else {
        setFieldError(err.message || "Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-milk">
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

      <div className="w-full max-w-md bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(44,24,16,0.08)] p-8 border border-border-soft text-center">
        <h1 className="text-2xl font-bold text-text-main mb-4">{title}</h1>

        <p className="text-text-muted mb-6">{description}</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-12 px-4 rounded-xl bg-milk/50 border border-border-soft focus:ring-2 focus:ring-brown outline-none"
          />

          {fieldError && <p className="text-xs text-danger">{fieldError}</p>}

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
            {loading ? "Sending..." : "Send Link"}
          </button>
        </form>

        {message && <p className="text-sm text-text-main mt-4">{message}</p>}

        <button
          onClick={() => navigate("/login")}
          className="mt-6 text-sm text-brown hover:underline"
        >
          Back to Login
        </button>
      </div>
    </div>
  );
}
