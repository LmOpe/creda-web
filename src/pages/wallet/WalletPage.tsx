/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import TransactionHistory from "../../components/wallet/TransactionHistory";
import { formatCurrency } from "../../utils/format";
import { transactionApi } from "../../api/transaction.api";
import { walletApi } from "../../api/wallet.api";

export default function WalletPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [showBalance, setShowBalance] = useState(false);

const { data: balanceData} = useQuery({
  queryKey: ["wallet-balance"],
  queryFn: walletApi.getBalance,
  initialData: () => queryClient.getQueryData(["wallet-balance"]),
  staleTime: 60 * 1000,  // 1 min
  refetchOnMount: true,  // ensures fetch if cache missing
});

const { data: txData } = useQuery({
  queryKey: ["transactions-history"],
  queryFn: transactionApi.getHistory,
  initialData: () => queryClient.getQueryData(["transactions-history"]),
  staleTime: 60 * 1000,
  refetchOnMount: true,
});


  return (
    <div className="min-h-screen bg-milk-bg pb-24">
      <main className="max-w-lg mx-auto px-4 py-6 space-y-8">
        {/* Wallet Card */}
        <section className="relative overflow-hidden rounded-[2rem] bg-[#3E2723] p-6 sm:p-8 text-white shadow-2xl">
          <div className="flex flex-col items-center text-center">
            <span className="text-sm opacity-70 uppercase tracking-widest mb-2">
              Available Balance
            </span>

            <div className="flex items-center gap-2 mb-6">
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight">
                {showBalance
                  ? formatCurrency(balanceData?.data.availableBalance ?? 0, balanceData?.data.currency)
                  : "••••••••"}
              </h2>
              <button
                onClick={() => setShowBalance((prev) => !prev)}
                className="text-white/70 hover:text-white transition-colors"
              >
                <span className="material-symbols-outlined">
                  {showBalance ? "visibility_off" : "visibility"}
                </span>
              </button>
            </div>

            <button
              onClick={() => navigate("/app/wallet/fund")}
              className="flex items-center justify-center gap-3 w-full rounded-2xl bg-[#D4AF37] py-3 sm:py-4 font-bold text-[#3E2723] active:scale-95 shadow-md shadow-[#D4AF37]/30"
            >
              <span className="material-symbols-outlined">add_circle</span>
              Fund Wallet
            </button>
          </div>
        </section>

        {/* Transaction History */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-brown-dark">History</h3>
            <button
              onClick={() => navigate("/app/wallet/history")}
              className="text-sm font-medium text-brown-medium hover:text-brown-dark"
            >
              View All
            </button>
          </div>

          <TransactionHistory transactions={txData?.data.items ?? []} />
        </section>
      </main>
    </div>
  );
}
