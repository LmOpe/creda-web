/* eslint-disable @typescript-eslint/no-explicit-any */
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export interface ApiError {
  status: number;
  title?: string;
  message: string;
  errors?: Record<string, string[]>;
}

let isRefreshing = false;
let refreshPromise: Promise<void> | null = null;
let failedQueue: {
  resolve: () => void;
  reject: (error: any) => void;
}[] = [];

function processQueue(error: any = null) {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve();
    }
  });

  failedQueue = [];
}

async function refreshToken(): Promise<void> {
  const response = await fetch(`${BASE_URL}/auth/refresh`, {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Refresh failed");
  }
}

async function request<T>(
  endpoint: string,
  options: RequestInit,
  retry = false
): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  if (response.status !== 401) {
    const data = await response.json();

    if (!response.ok) {
      const error: ApiError = {
        status: response.status,
        title: data.title,
        message: data.detail || data.message || "Something went wrong",
        errors: data.errors,
      };

      throw error;
    }

    return data;
  }

  if (retry) {
    const { useAuthStore } = await import("../store/auth.store");
    useAuthStore.getState().clearAuth();
    window.location.href = "/login";
    throw new Error("Session expired");
  }

  if (isRefreshing) {
    return new Promise<T>((resolve, reject) => {
      failedQueue.push({
        resolve: async () => {
          try {
            const result = await request<T>(endpoint, options, true);
            resolve(result);
          } catch (err) {
            reject(err);
          }
        },
        reject,
      });
    });
  }

  isRefreshing = true;

  try {
    refreshPromise = refreshToken();
    await refreshPromise;

    processQueue();
    return await request<T>(endpoint, options, true);
  } catch (err) {
    processQueue(err);

    const { useAuthStore } = await import("../store/auth.store");
    useAuthStore.getState().clearAuth();
    window.location.href = "/login";

    throw err;
  } finally {
    isRefreshing = false;
    refreshPromise = null;
  }
}

export const apiClient = {
  get: <T>(endpoint: string) =>
    request<T>(endpoint, { method: "GET" }),

  post: <T>(endpoint: string, body: unknown) =>
    request<T>(endpoint, {
      method: "POST",
      body: JSON.stringify(body),
    }),

  put: <T>(endpoint: string, body: unknown) =>
    request<T>(endpoint, {
      method: "PUT",
      body: JSON.stringify(body),
    }),

  delete: <T>(endpoint: string) =>
    request<T>(endpoint, { method: "DELETE" }),
};
