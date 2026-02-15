import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { walletApi } from "../../api/wallet.api";
import { transactionApi } from "../../api/transaction.api";
import { formatCurrency } from "../../utils/format";
import Skeleton from "../../components/ui/Skeleton";
import TransactionHistory from "../../components/wallet/TransactionHistory";

const serviceCategories = [
  {
    id: "data",
    name: "Buy Data",
    icon: "cell_tower",
    color: "bg-orange-100 text-orange-600",
  },
  {
    id: "airtime",
    name: "Airtime",
    icon: "call",
    color: "bg-blue-100 text-blue-600",
  },
  {
    id: "cable",
    name: "Cable TV",
    icon: "tv",
    color: "bg-purple-100 text-purple-600",
  },
  {
    id: "electricity",
    name: "Electricity",
    icon: "bolt",
    color: "bg-green-100 text-green-600",
  },
];

export default function HomePage() {
  const [showBalance, setShowBalance] = useState(false);

  const { data: balanceData, isLoading: balanceLoading } = useQuery({
    queryKey: ["wallet-balance"],
    queryFn: walletApi.getBalance,
  });

  const { data: txData, isLoading: txLoading } = useQuery({
    queryKey: ["transactions-history"],
    queryFn: transactionApi.getHistory,
  });

  const balance = balanceData?.data;

  return (
    <div className="space-y-6 pb-24">
      {/* ================= BALANCE CARD ================= */}
      <div className="relative overflow-hidden bg-brown rounded-[2rem] p-8 text-white shadow-2xl shadow-brown/20">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <span className="material-symbols-outlined !text-9xl">payments</span>
        </div>

        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <p className="text-white/70 text-sm font-medium">
              Available Balance
            </p>

            <button
              onClick={() => setShowBalance(!showBalance)}
              className="text-white/70 hover:text-white"
            >
              <span className="material-symbols-outlined text-sm">
                {showBalance ? "visibility_off" : "visibility"}
              </span>
            </button>
          </div>

          <div className="mt-3">
            {balanceLoading ? (
              <Skeleton className="h-10 w-40 bg-white/20" />
            ) : (
              <h3 className="text-3xl font-extrabold tracking-tight">
                {showBalance
                  ? formatCurrency(
                      balance?.availableBalance ?? 0,
                      balance?.currency,
                    )
                  : "••••••••"}
              </h3>
            )}
          </div>

          <button className="mt-6 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-medium flex items-center gap-2 transition-all">
            <span className="material-symbols-outlined !text-sm">
              add_circle
            </span>
            Add Funds
          </button>
        </div>
      </div>

      {/* ================= QUICK SERVICES ================= */}
      <section>
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <span className="w-1 h-5 bg-gold rounded-full"></span>
          Quick Services
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {serviceCategories.map((service) => (
            <button
              key={service.id}
              className="bg-white p-6 rounded-2xl shadow-sm border border-brown/5 flex flex-col items-center gap-3 hover:shadow-md transition-all group"
            >
              <div
                className={`size-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform ${service.color}`}
              >
                <span className="material-symbols-outlined">
                  {service.icon}
                </span>
              </div>

              <span className="text-sm font-semibold text-text-main">
                {service.name}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* ================= RECENT TRANSACTIONS ================= */}
      <section>
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <span className="w-1 h-5 bg-gold rounded-full"></span>
          Recent Transactions
        </h3>

        <TransactionHistory
          transactions={txData?.data.items ?? []}
          limit={5}
          isLoading={txLoading}
        />
      </section>
    </div>
  );
}
