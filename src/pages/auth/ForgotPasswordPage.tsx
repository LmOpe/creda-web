import RequestCodePage from "./RequestCodePage";

export default function ForgotPasswordPage() {
  return (
    <RequestCodePage
      title="Forgot Password"
      description="Enter your email and we'll send you a password reset link."
      intent="PasswordReset"
    />
  );
}
