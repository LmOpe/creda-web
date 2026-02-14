function ServiceCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-brown/5 flex flex-col gap-4">
      <div className="size-12 rounded-2xl bg-milk flex items-center justify-center text-gold">
        <span className="material-symbols-outlined text-3xl">{icon}</span>
      </div>
      <div>
        <h3 className="font-bold text-brown">{title}</h3>
        <p className="text-xs text-brown-accent opacity-60">
          {description}
        </p>
      </div>
    </div>
  );
}

export default function ServicesSection() {
  return (
    <section className="px-6 py-12 bg-milk-darker rounded-t-[40px] shadow-[0_-10px_40px_rgba(0,0,0,0.02)]">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-extrabold text-brown">
          Our Services
        </h2>
        <span className="text-sm font-medium text-gold">
          See All
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <ServiceCard icon="wifi" title="Data" description="High-speed bundles" />
        <ServiceCard icon="phone_iphone" title="Airtime" description="Instant recharge" />
        <ServiceCard icon="bolt" title="Electricity" description="Pay bills easily" />
        <ServiceCard icon="tv" title="Cable TV" description="Stay connected" />
      </div>
    </section>
  );
}
