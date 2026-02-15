export interface WalletBalanceResponse {
  data: {
    ledgerBalance: number;
    availableBalance: number;
    currency: string;
  };
  success: boolean;
  message: string;
  traceId: string;
  statusCode: number;
}
