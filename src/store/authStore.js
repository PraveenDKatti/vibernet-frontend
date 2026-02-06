import { create } from "zustand";
import * as authApi from "../api/auth.api";

export const useAuthStore = create((set, get) => ({
  // 🔹 state
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,

  // 🔹 actions
  login: async (credentials) => {
    set({ loading: true, error: null });

    try {
      const data = await authApi.login(credentials);

      set({
        user: data.user,
        isAuthenticated: true,
        loading: false,
      });

      return data;
    } catch (err) {
      set({
        error: err.response?.data?.message || "Login failed",
        loading: false,
      });
      throw err;
    }
  },

  register: async (payload) => {
    set({ loading: true, error: null });

    try {
      const data = await authApi.register(payload);

      set({
        user: data.user,
        isAuthenticated: true,
        loading: false,
      });

      return data;
    } catch (err) {
      set({
        error: err.response?.data?.message || "Registration failed",
        loading: false,
      });
      throw err;
    }
  },

  logout: async () => {
    set({ loading: true });

    try {
      await authApi.logout();
    } finally {
      // even if API fails, clear local state
      set({
        user: null,
        isAuthenticated: false,
        loading: false,
      });
    }
  },

  refresh: async () => {
    try {
      const data = await authApi.refresh();

      set({
        user: data.user,
        isAuthenticated: true,
      });

      return data;
    } catch {
      set({
        user: null,
        isAuthenticated: false,
      });
    }
  },
}));
