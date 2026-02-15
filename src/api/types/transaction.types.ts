export interface TransactionItem {
  id: string;
  type: "debit" | "credit";
  reference: string;
  amount: number;
  status: "Posted" | "Pending" | string;
  description: string;
  createdAt: string;
  completedAt: string | null;
  details: {
    serviceCategory: string | null;
    serviceProvider: string | null;
    serviceName: string | null;
  };
}

export interface TransactionHistoryResponse {
  data: {
    items: TransactionItem[];
    pageNumber: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
  };
  success: boolean;
  message: string;
  traceId: string;
  statusCode: number;
}
