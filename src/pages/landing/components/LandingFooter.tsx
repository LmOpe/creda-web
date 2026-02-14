export default function LandingFooter() {
  return (
    <footer className="p-10 bg-brown text-milk rounded-t-[40px]">
      <div className="flex flex-col gap-8">
        <div className="flex items-center gap-2">
          <div className="size-6 bg-gold rounded flex items-center justify-center">
            <span className="material-symbols-outlined text-white text-sm">
              account_balance_wallet
            </span>
          </div>
          <span className="text-lg font-bold tracking-tight uppercase">
            Creda
          </span>
        </div>

        <p className="text-milk-darker opacity-60 text-sm leading-relaxed">
          The most reliable utility payment platform for the modern era.
        </p>

        <div className="h-px w-full bg-white/10"></div>

        <div className="flex justify-between items-center text-xs opacity-40">
          <p>© 2024 Creda Digital</p>
          <div className="flex gap-4">
            <span>Privacy</span>
            <span>Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
