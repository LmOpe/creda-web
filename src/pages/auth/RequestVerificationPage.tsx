import RequestCodePage from "./RequestCodePage";


export default function RequestVerificationPage() {
  return (
    <RequestCodePage
      title="Request Verification Link"
      description="Enter your email to receive a new verification link."
      intent="EmailVerification"
    />
  );
}
