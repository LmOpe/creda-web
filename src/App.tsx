import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landing/LandingPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import VerificationPage from "./pages/auth/VerificationPage";
import RequestVerificationPage from "./pages/auth/RequestVerificationPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/verify" element={<VerificationPage />} />
        <Route path="/request-verification" element={<RequestVerificationPage />} />

        {/* Future Authenticated App */}
        {/* <Route path="/app/*" element={<AppLayout />} /> */}
      </Routes>
    </BrowserRouter>
  );
}
