import { Outlet, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";

export default function AppLayout() {
  const profile = useAuthStore((s) => s.profile);
  const clearAuth = useAuthStore((s) => s.clearAuth);
  const navigate = useNavigate();

  const handleLogout = () => {
    clearAuth();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-milk pb-24">
      {/* HEADER */}
      <div className="px-5 pt-6 pb-4 sticky top-0 bg-milk/80 backdrop-blur-md z-20">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-text-muted">
              Welcome back
            </p>
            <h1 className="text-xl font-extrabold text-text-main">
              Hi, {profile?.firstName || "User"}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-full hover:bg-brown/5 transition-colors">
              <span className="material-symbols-outlined text-text-muted">
                notifications
              </span>
            </button>

            <button
              onClick={handleLogout}
              className="p-2 rounded-full hover:bg-red-50 transition-colors text-red-600"
            >
              <span className="material-symbols-outlined">
                logout
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* PAGE CONTENT */}
      <div className="px-5">
        <Outlet />
      </div>

      {/* BOTTOM NAV */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border-soft px-6 py-3 flex justify-between items-center md:hidden">
        <NavItem icon="dashboard" label="Home" />
        <NavItem icon="wallet" label="Wallet" />
        <div className="-mt-8">
          <button className="w-14 h-14 bg-brown rounded-full text-white shadow-lg flex items-center justify-center">
            <span className="material-symbols-outlined text-3xl">
              add
            </span>
          </button>
        </div>
        <NavItem icon="grid_view" label="Services" />
        <NavItem icon="receipt_long" label="History" />
      </div>
    </div>
  );
}

function NavItem({
  icon,
  label,
}: {
  icon: string;
  label: string;
}) {
  return (
    <button className="flex flex-col items-center text-text-muted">
      <span className="material-symbols-outlined">
        {icon}
      </span>
      <span className="text-[10px]">{label}</span>
    </button>
  );
}
