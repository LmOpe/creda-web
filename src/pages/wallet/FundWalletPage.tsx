/* eslint-disable @typescript-eslint/no-explicit-any */
// pages/wallet/FundWalletPage.tsx
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useLocation } from "react-router-dom";
import { apiClient, type ApiError } from "../../api/client";
interface FundWalletResponse {
  data: {
    reference: string;
    authorizationUrl: string;
    amount: number;
  };
  success: boolean;
  message: string;
}

export default function FundWalletPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const prefilledAmount = (location.state as any)?.amount || "";

  const [amount, setAmount] = useState<string>(prefilledAmount);
  const [error, setError] = useState<string | null>(null);

  const fundMutation = useMutation({
    mutationFn: (payload: { amount: number }) =>
      apiClient.post<FundWalletResponse>("/wallet/fund", payload),
    onSuccess: (data) => {
      window.location.href = data.data.authorizationUrl;
    },
    onError: (err: ApiError) => {
      if (err.errors?.amount) {
        setError(err.errors.amount[0]);
      } else {
        setError(err.message);
      }
    },
  });

  const handleSubmit = () => {
    setError(null);

    const numericAmount = Number(amount);

    if (!numericAmount || numericAmount < 100) {
      setError("Minimum funding amount is NGN 100");
      return;
    }

    fundMutation.mutate({ amount: numericAmount });
  };

  return (
    <div className="min-h-screen bg-[#FDFCF8] p-6">
      <div className="max-w-lg mx-auto space-y-6">
        <button onClick={() => navigate(-1)} className="text-sm">
          ← Back
        </button>

        <h1 className="text-2xl font-bold text-[#3E2723]">
          Fund Wallet
        </h1>

        <div className="space-y-2">
          <label className="text-sm font-medium">Amount (NGN)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full rounded-xl border p-4"
            placeholder="Enter amount"
          />
          {error && (
            <p className="text-sm text-red-600">{error}</p>
          )}
        </div>

        <button
          onClick={handleSubmit}
          disabled={fundMutation.isPending}
          className="w-full rounded-2xl bg-[#D4AF37] py-4 font-bold text-[#3E2723] active:scale-95"
        >
          {fundMutation.isPending ? "Processing..." : "Continue to Payment"}
        </button>
      </div>
    </div>
  );
}
