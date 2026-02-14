import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landing/LandingPage";
import LoginPage from "./pages/auth/LoginPage";

function RegisterPage() {
  return <div className="p-6">Register Page</div>;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Future Authenticated App */}
        {/* <Route path="/app/*" element={<AppLayout />} /> */}
      </Routes>
    </BrowserRouter>
  );
}
