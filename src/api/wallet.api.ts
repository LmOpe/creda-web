import { apiClient } from "./client";
import type { WalletBalanceResponse } from "./types/wallet.types";

export const walletApi = {
  getBalance: () =>
    apiClient.get<WalletBalanceResponse>("/wallet/balance"),
};
