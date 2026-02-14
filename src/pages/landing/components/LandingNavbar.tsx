import { useNavigate } from "react-router-dom";

export default function LandingNavbar() {
  const navigate = useNavigate();

  return (
    <nav className="flex items-center justify-between px-6 py-5 sticky top-0 z-50 bg-milk/80 backdrop-blur-md">
      <div className="flex items-center gap-2">
        <div className="size-8 bg-brown rounded-lg flex items-center justify-center">
          <span className="material-symbols-outlined text-white text-xl">
            account_balance_wallet
          </span>
        </div>
        <span className="text-xl font-bold tracking-tight text-brown uppercase">
          Creda
        </span>
      </div>

      <button
        onClick={() => navigate("/login")}
        className="bg-brown text-white px-5 py-2 rounded-full text-sm font-semibold shadow-lg shadow-brown/10"
      >
        Login
      </button>
    </nav>
  );
}
