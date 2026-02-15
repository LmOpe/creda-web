import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";
import { useEffect } from "react";
interface Props {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: Props) {
  const hydrateAuth = useAuthStore((s) => s.hydrateAuth);
  const isHydrated = useAuthStore((s) => s.isHydrated);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  useEffect(() => {
    hydrateAuth();
  }, [hydrateAuth]);

  if (!isHydrated) {
    return (
      <div className="h-screen flex items-center justify-center bg-milk">
        <span className="text-brown font-semibold">Loading...</span>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
