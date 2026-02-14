export default function WhyChooseSection() {
  return (
    <section className="px-6 py-16 text-center">
      <h3 className="text-xs font-bold uppercase tracking-widest text-gold mb-10">
        Why Choose Creda
      </h3>

      <div className="flex flex-col gap-10">
        <div className="flex flex-col items-center">
          <span className="material-symbols-outlined text-4xl text-brown mb-3">
            speed
          </span>
          <h4 className="font-bold text-lg">Instant Delivery</h4>
          <p className="text-sm text-brown-accent opacity-70">
            Services delivered in seconds
          </p>
        </div>

        <div className="flex flex-col items-center">
          <span className="material-symbols-outlined text-4xl text-brown mb-3">
            support_agent
          </span>
          <h4 className="font-bold text-lg">24/7 Premium Support</h4>
          <p className="text-sm text-brown-accent opacity-70">
            Dedicated experts at your service
          </p>
        </div>
      </div>
    </section>
  );
}
