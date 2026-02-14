import { apiClient } from "./client";
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
} from "./types/auth.types";

export const authApi = {
  login: (payload: LoginRequest) =>
    apiClient.post<LoginResponse>("/auth/login", payload),

  register: (payload: RegisterRequest) =>
    apiClient.post<LoginResponse>("/auth/register", payload),

  verifyCode: (payload: { code: string; intent: string }) =>
    apiClient.post("/auth/verify-code", payload),

  requestCode: (payload: { email: string; intent: string }) =>
    apiClient.post<{ success: boolean; message: string }>(
      "/auth/request-code",
      payload,
    ),
};
