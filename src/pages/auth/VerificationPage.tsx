/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { authApi } from "../../api/auth.api";
import type {
  VerificationStatus,
  VerifyCodeError,
  VerifyCodeSuccess,
} from "../../api/types/auth.types";

export default function VerificationPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [status, setStatus] = useState<VerificationStatus>("pending");
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState(true);

  const searchParams = new URLSearchParams(location.search);
  const code = searchParams.get("code") || "";
  const intent = searchParams.get("intent") || "";

  useEffect(() => {
    const verify = async () => {
      try {
        const response = (await authApi.verifyCode({ code, intent })) as any;

        // TypeScript knows this is success type
        const data = response as VerifyCodeSuccess;
        if (data.success) {
          setStatus("success");
          setMessage(data.message || "Email verified successfully");

          if (intent === "PasswordReset") {
            navigate(`/reset-password?code=${code}`);
            return;
          }

          setTimeout(() => navigate("/login"), 3000);
        } else {
          setStatus("failed");
          setMessage("Verification failed.");
        }
      } catch (err: any) {
        const errorData = err as VerifyCodeError;

        if (errorData?.status === 409) {
          setStatus("failed");
          setMessage(
            errorData.message ||
              "This verification code has already been used.",
          );
        } else {
          setStatus("failed");
          setMessage(
            errorData?.message || "Something went wrong. Please try again.",
          );
        }
      } finally {
        setLoading(false);
      }
    };

    if (code && intent) verify();
    else {
      setStatus("failed");
      setMessage("Invalid verification link.");
      setLoading(false);
    }
  }, [code, intent, navigate]);

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
        {loading && <p className="text-text-muted">Verifying...</p>}

        {!loading && status === "success" && (
          <>
            <h1 className="text-2xl font-bold text-text-main mb-4">
              {message}
            </h1>
            <p className="text-text-muted mb-6">
              Redirecting to login in 3 seconds...
            </p>
            <button
              onClick={() => navigate("/login")}
              className="w-full h-14 bg-brown text-white font-bold rounded-xl active:scale-[0.98] transition-all"
            >
              Go to Login Now
            </button>
          </>
        )}

        {!loading && status === "failed" && (
          <>
            <h1 className="text-2xl font-bold text-danger mb-4">{message}</h1>
            <div className="flex flex-col gap-4">
              <button
                onClick={() => navigate("/request-verification")}
                className="w-full h-14 bg-brown text-white font-bold rounded-xl active:scale-[0.98] transition-all"
              >
                Request New Verification Link
              </button>
              <button
                onClick={() => navigate("/login")}
                className="w-full h-14 border border-brown text-brown font-bold rounded-xl active:scale-[0.98] transition-all"
              >
                Continue to Login
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
