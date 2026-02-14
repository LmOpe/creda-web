const serviceCategories = [
  { id: "airtime", name: "Airtime", icon: "call" },
  { id: "data", name: "Data", icon: "cell_tower" },
  { id: "cable-tv", name: "Cable TV", icon: "tv" },
  { id: "electricity", name: "Electricity", icon: "bolt" },
  { id: "education", name: "Education", icon: "school" },
];

export default function HomePage() {
  return (
    <div className="space-y-8">
      {/* WALLET CARD */}
      <div className="relative bg-brown text-white rounded-[2rem] p-6 shadow-2xl shadow-brown/20 overflow-hidden">
        <div className="absolute -right-16 -top-16 w-40 h-40 bg-gold/20 rounded-full blur-2xl" />

        <p className="text-white/70 text-sm mb-1">
          Available Balance
        </p>

        <h2 className="text-3xl font-extrabold tracking-tight">
          ₦1,240,500.00
        </h2>

        <div className="flex gap-3 mt-6">
          <button className="flex-1 h-11 bg-white/10 hover:bg-white/20 rounded-xl text-sm font-semibold transition-all">
            Add Funds
          </button>

          <button className="flex-1 h-11 bg-white text-brown rounded-xl text-sm font-bold transition-all">
            Withdraw
          </button>
        </div>
      </div>

      {/* QUICK SERVICES */}
      <div>
        <h3 className="text-lg font-bold text-text-main mb-4">
          Quick Services
        </h3>

        <div className="grid grid-cols-3 gap-4">
          {serviceCategories.map((service) => (
            <button
              key={service.id}
              className="bg-white rounded-2xl p-4 flex flex-col items-center gap-3 shadow-sm border border-border-soft hover:shadow-md transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-brown/10 flex items-center justify-center text-brown">
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
      </div>
    </div>
  );
}
