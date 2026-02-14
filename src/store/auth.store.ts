import { create } from "zustand";
import type {
  UserResponse,
  UserProfileResponse,
} from "../api/types/auth.types";
import { authApi } from "../api/auth.api";
const { getCurrentUser } = authApi;

interface AuthState {
  user: UserResponse | null;
  profile: UserProfileResponse | null;
  isAuthenticated: boolean;
  isHydrated: boolean;

  setAuth: (user: UserResponse, profile: UserProfileResponse) => void;

  clearAuth: () => void;
  hydrateAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  profile: null,
  isAuthenticated: false,
  isHydrated: false,
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

  hydrateAuth: async () => {
    try {
      const res = await getCurrentUser();

      set({
        user: res.data.userResponse,
        profile: res.data.userProfileResponse,
        isAuthenticated: true,
        isHydrated: true,
      });
    } catch {
      set({
        user: null,
        profile: null,
        isAuthenticated: false,
        isHydrated: true,
      });
    }
  },
}));
