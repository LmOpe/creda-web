import { apiClient } from "./client";
import type { TransactionHistoryResponse } from "./types/transaction.types";

export const transactionApi = {
  getHistory: () =>
    apiClient.get<TransactionHistoryResponse>("/transactions/history"),
};