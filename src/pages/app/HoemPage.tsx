import { useState } from "react";
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

const transactions = [
  {
    id: 1,
    title: "MTN Data Purchase",
    icon: "cell_tower",
    color: "bg-orange-100 text-orange-600",
    amount: "-₦4,500.00",
    amountColor: "text-red-600",
    date: "Oct 24, 2023 • 09:12 AM",
    status: "Successful",
    statusColor: "bg-green-100 text-green-700",
  },
  {
    id: 2,
    title: "Wallet Funding",
    icon: "add_circle",
    color: "bg-brown/10 text-brown",
    amount: "+₦50,000.00",
    amountColor: "text-green-600",
    date: "Oct 23, 2023 • 04:30 PM",
    status: "Successful",
    statusColor: "bg-green-100 text-green-700",
  },
  {
    id: 3,
    title: "DSTV Premium",
    icon: "tv",
    color: "bg-purple-100 text-purple-600",
    amount: "-₦21,000.00",
    amountColor: "text-red-600",
    date: "Oct 22, 2023 • 11:45 AM",
    status: "Successful",
    statusColor: "bg-green-100 text-green-700",
  },
  {
    id: 4,
    title: "Airtel Airtime",
    icon: "call",
    color: "bg-blue-100 text-blue-600",
    amount: "-₦1,000.00",
    amountColor: "text-red-600",
    date: "Oct 21, 2023 • 02:10 PM",
    status: "Processing",
    statusColor: "bg-yellow-100 text-yellow-700",
  },
  {
    id: 5,
    title: "Ikeja Electric",
    icon: "bolt",
    color: "bg-green-100 text-green-600",
    amount: "-₦10,000.00",
    amountColor: "text-red-600",
    date: "Oct 20, 2023 • 08:00 AM",
    status: "Successful",
    statusColor: "bg-green-100 text-green-700",
  },
];

export default function HomePage() {
  const [showBalance, setShowBalance] = useState(true);

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
              className="text-white/70 hover:text-white transition-colors"
            >
              <span className="material-symbols-outlined text-sm">
                {showBalance ? "visibility_off" : "visibility"}
              </span>
            </button>
          </div>

          <h3 className="text-3xl font-extrabold tracking-tight mt-2">
            {showBalance ? "₦1,240,500.00" : "••••••••"}
          </h3>

          <button className="mt-4 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-medium flex items-center gap-2 transition-all">
            <span className="material-symbols-outlined !text-sm">
              add_circle
            </span>
            Add Funds
          </button>
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
              className="bg-white p-6 rounded-2xl shadow-sm border border-brown/5 flex flex-col items-center gap-3 hover:shadow-md hover:border-brown/20 transition-all group"
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

          <button className="text-sm font-semibold text-brown hover:underline">
            View All
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-brown/5 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50/50 border-b border-brown/5">
              <tr>
                <th className="px-6 py-4 text-xs font-bold uppercase text-text-muted tracking-wider">
                  Transaction
                </th>
                <th className="hidden sm:table-cell px-6 py-4 text-xs font-bold uppercase text-text-muted tracking-wider">
                  Date
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase text-text-muted tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase text-text-muted tracking-wider text-right">
                  Status
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-brown/5">
              {transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`size-8 rounded-full flex items-center justify-center shrink-0 ${tx.color}`}>
                        <span className="material-symbols-outlined !text-sm">
                          {tx.icon}
                        </span>
                      </div>

                      <div>
                        <p className="text-sm font-bold">{tx.title}</p>
                        <p className="text-[10px] text-text-muted sm:hidden">
                          {tx.date}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="hidden sm:table-cell px-6 py-4 text-sm text-text-muted">
                    {tx.date}
                  </td>

                  <td className={`px-6 py-4 text-sm font-bold ${tx.amountColor}`}>
                    {tx.amount}
                  </td>

                  <td className="px-6 py-4 text-right">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${tx.statusColor}`}>
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
