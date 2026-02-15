import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landing/LandingPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import VerificationPage from "./pages/auth/VerificationPage";
import RequestVerificationPage from "./pages/auth/RequestVerificationPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";

import AppLayout from "./layouts/AppLayout";
import ProtectedRoute from "./routes/ProtectedRoute";
import HomePage from "./pages/app/HomePage";
import { useEffect } from "react";
import { useAuthStore } from "./store/auth.store";

export default function App() {
  const hydrateAuth = useAuthStore((s) => s.hydrateAuth);
  const isHydrated = useAuthStore((s) => s.isHydrated);

  useEffect(() => {
    hydrateAuth();
  }, []);

  if (!isHydrated) {
    return (
      <div className="h-screen flex items-center justify-center bg-milk">
        <span className="text-brown font-semibold">
          Loading...
        </span>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/verify" element={<VerificationPage />} />
        <Route path="/request-verification" element={<RequestVerificationPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />

        {/* Protected App Area */}
        <Route
          path="/app"
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<HomePage />} />
          {/* Future nested routes */}
          {/* <Route path="wallet" element={<WalletPage />} /> */}
          {/* <Route path="services" element={<ServicesPage />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
