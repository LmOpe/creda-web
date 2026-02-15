import type { TransactionItem } from "../../api/types/transaction.types";
import { formatCurrency, formatDate } from "../../utils/format";

interface TransactionHistoryProps {
  transactions: TransactionItem[];
  isLoading?: boolean;
  limit?: number;
}

export default function TransactionHistory({
  transactions,
  isLoading = false,
  limit,
}: TransactionHistoryProps) {
  if (isLoading) return <p>Loading...</p>;

  const txs = limit ? transactions.slice(0, limit) : transactions;

  if (txs.length === 0)
    return <div className="p-6 text-sm text-gray-500">No transactions yet</div>;

  return (
    <div className="space-y-3">
      {txs.map((tx) => {
        const isCredit = tx.type === "credit";

        const description = isCredit
          ? "Wallet Top-up"
          : tx.details?.serviceCategory
          ? `${tx.details.serviceCategory} Bill`
          : "Service Payment";

        const statusColor =
          tx.status === "Posted"
            ? "bg-green-100 text-green-700"
            : tx.status === "pending"
            ? "bg-yellow-100 text-yellow-700"
            : "bg-red-100 text-red-700";

        const iconBg =
          tx.status === "Posted"
            ? "bg-green-100/50 text-green-700"
            : tx.status === "pending"
            ? "bg-orange-100/50 text-orange-700"
            : "bg-red-100/50 text-red-700";

        const iconName = isCredit
          ? "south_west"
          : tx.type === "debit"
          ? "north_east"
          : "swap_horiz";

        return (
          <div
            key={tx.id}
            className="glass-card rounded-2xl p-4 flex items-center justify-between group"
          >
            <div className="flex items-center gap-4">
              <div
                className={`flex size-12 items-center justify-center rounded-xl ${iconBg}`}
              >
                <span className="material-symbols-outlined">{iconName}</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-brown-dark">{description}</span>
                <span className="text-xs text-brown-light">
                  {formatDate(tx.createdAt)}
                </span>
              </div>
            </div>

            <div className="flex flex-col items-end">
              <span
                className={`font-bold ${
                  isCredit ? "text-green-600" : "text-brown-dark"
                }`}
              >
                {isCredit ? "+" : "-"}{formatCurrency(tx.amount)}
              </span>
              <span
                className={`mt-1 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${statusColor}`}
              >
                {tx.status}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
