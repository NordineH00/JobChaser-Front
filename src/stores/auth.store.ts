import { create } from "zustand";
import { persist } from "zustand/middleware";

export type User = {
  id: string;
  email: string;
  pseudo?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  avatarUrl?: string | null;
};

type AuthState = {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;

  // actions
  setSession: (user: User, accessToken: string) => void;   // login
  setAccessToken: (accessToken: string) => void;            // refresh
  setUser: (user: User) => void;                           // maj profil
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      isAuthenticated: false,

      setSession: (user, accessToken) => {
        set({
          user,
          accessToken,
          isAuthenticated: true,
        });
      },

      setAccessToken: (accessToken) => {
        set({
          accessToken,
          isAuthenticated: true,
        });
      },

      setUser: (user) => set({ user }),

      logout: () =>
        set({
          user: null,
          accessToken: null,
          isAuthenticated: false,
        }),
    }),
    { name: "auth" }
  )
);
