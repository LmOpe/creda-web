import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { walletApi } from "../../api/wallet.api";
import { transactionApi } from "../../api/transaction.api";
import { formatCurrency, formatDate } from "../../utils/format";

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
  const transactions =
    txData?.data.items.slice(0, 5) ?? [];

  return (
    <div className="space-y-6 pb-24">

      {/* BALANCE CARD */}
      <div className="relative overflow-hidden bg-brown rounded-[2rem] p-8 text-white shadow-2xl shadow-brown/20">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <span className="material-symbols-outlined !text-9xl">
            payments
          </span>
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

          <h3 className="text-3xl font-extrabold tracking-tight mt-2">
            {balanceLoading
              ? "Loading..."
              : showBalance
              ? formatCurrency(
                  balance?.availableBalance ?? 0,
                  balance?.currency
                )
              : "••••••••"}
          </h3>
        </div>
      </div>

      {/* QUICK SERVICES */}
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

      {/* RECENT TRANSACTIONS */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <span className="w-1 h-5 bg-gold rounded-full"></span>
            Recent Transactions
          </h3>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-brown/5 overflow-hidden">
          {txLoading ? (
            <div className="p-6 text-sm text-text-muted">
              Loading transactions...
            </div>
          ) : transactions.length === 0 ? (
            <div className="p-6 text-sm text-text-muted">
              No transactions yet
            </div>
          ) : (
            <table className="w-full text-left">
              <tbody className="divide-y divide-brown/5">
                {transactions.map((tx) => {
                  const isCredit = tx.type === "credit";

                  return (
                    <tr key={tx.id}>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`size-8 rounded-full flex items-center justify-center ${
                              isCredit
                                ? "bg-green-100 text-green-600"
                                : "bg-orange-100 text-orange-600"
                            }`}
                          >
                            <span className="material-symbols-outlined !text-sm">
                              {isCredit
                                ? "add_circle"
                                : "call_made"}
                            </span>
                          </div>

                          <div>
                            <p className="text-sm font-bold">
                              {tx.description}
                            </p>
                            <p className="text-[10px] text-text-muted">
                              {formatDate(tx.createdAt)}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td
                        className={`px-6 py-4 text-sm font-bold ${
                          isCredit
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {isCredit ? "+" : "-"}
                        {formatCurrency(tx.amount)}
                      </td>

                      <td className="px-6 py-4 text-right">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                            tx.status === "Posted"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {tx.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </section>
    </div>
  );
}
