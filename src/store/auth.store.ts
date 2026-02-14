import { create } from "zustand";
import type {
  UserResponse,
  UserProfileResponse,
} from "../api/types/auth.types";

interface AuthState {
  user: UserResponse | null;
  profile: UserProfileResponse | null;
  isAuthenticated: boolean;

  setAuth: (
    user: UserResponse,
    profile: UserProfileResponse
  ) => void;

  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  profile: null,
  isAuthenticated: false,

  setAuth: (user, profile) =>
    set({
      user,
      profile,
      isAuthenticated: true,
    }),

  clearAuth: () =>
    set({
      user: null,
      profile: null,
      isAuthenticated: false,
    }),
}));
