import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";

export default function AppLayout() {
  const profile = useAuthStore((s) => s.profile);
  // const clearAuth = useAuthStore((s) => s.clearAuth);
  const navigate = useNavigate();
  const location = useLocation();

  // const handleLogout = () => {
  //   clearAuth();
  //   navigate("/login");
  // };

  const initials =
    profile?.firstName?.[0]?.toUpperCase() || "U";

  return (
    <div className="min-h-screen bg-milk pb-24 flex flex-col">

      {/* HEADER */}
      <header className="sticky top-0 z-20 flex items-center justify-between px-5 py-4 bg-white/70 backdrop-blur-md border-b border-brown/5">
        
        {/* LOGO */}
        <div className="flex items-center gap-2">
          <div className="size-8 rounded-lg bg-brown flex items-center justify-center">
            <span className="material-symbols-outlined text-white text-lg">
              account_balance_wallet
            </span>
          </div>
          <span className="font-bold uppercase tracking-tight text-brown">
            Creda
          </span>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4">

          <button className="relative p-2 rounded-full hover:bg-brown/5 transition-colors">
            <span className="material-symbols-outlined text-text-muted">
              notifications
            </span>
            <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Placeholder Avatar */}
          <div className="size-9 rounded-full bg-brown/10 ring-2 ring-brown/20 flex items-center justify-center font-bold text-brown">
            {initials}
          </div>
        </div>
      </header>

      {/* PAGE CONTENT */}
      <main className="flex-1 px-5 py-6">
        <Outlet />
      </main>

      {/* BOTTOM NAV */}
      <nav className="md:hidden fixed bottom-0 w-full bg-white border-t border-brown/10 px-6 py-3 flex justify-between items-center z-50">
        <NavItem
          icon="dashboard"
          label="Home"
          active={location.pathname === "/app"}
          onClick={() => navigate("/app")}
        />

        <NavItem
          icon="wallet"
          label="Wallet"
          active={location.pathname.includes("wallet")}
          onClick={() => navigate("/app/wallet")}
        />

        <NavItem
          icon="grid_view"
          label="Services"
          active={location.pathname.includes("services")}
          onClick={() => navigate("/app/services")}
        />

        <NavItem
          icon="receipt_long"
          label="History"
          active={location.pathname.includes("history")}
          onClick={() => navigate("/app/history")}
        />

        <NavItem
          icon="person"
          label="Profile"
          active={location.pathname.includes("profile")}
          onClick={() => navigate("/app/profile")}
        />
      </nav>
    </div>
  );
}

function NavItem({
  icon,
  label,
  active,
  onClick,
}: {
  icon: string;
  label: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-1 ${
        active ? "text-brown" : "text-text-muted"
      }`}
    >
      <span className="material-symbols-outlined">
        {icon}
      </span>
      <span className={`text-[10px] ${active ? "font-bold" : ""}`}>
        {label}
      </span>
    </button>
  );
}
