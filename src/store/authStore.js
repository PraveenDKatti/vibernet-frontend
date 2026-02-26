import { create } from "zustand";
import * as authApi from "../api/auth.api";
import client from "../api/client";

const useAuthStore = create((set, get) => ({
  // 🔹 state
  user: null,
  isAuthenticated: false,
  loading: true,
  error: null,

  // 🔹 actions
  checkAuth: async () => {
    try {
      const response = await client.get("/users/current-user");
      set({ user: response.data.data, isAuthenticated: true, loading: false });
    } catch (error) {
      set({ user: null, isAuthenticated: false, loading: false });
    }finally{
      set({loading:false})
    }
  },

  login: async (credentials) => {
    set({ loading: true, error: null });

    try {
      if (!credentials.email || !credentials.password) throw new Error("Email and password are required")
      
      const response = await authApi.login(credentials)

      set({
        user: response.data,
        isAuthenticated: true,
        loading: false,
      });

      return response;
    } catch (err) {
      set({
        error: err.message || "Login failed",
        loading: false,
      });
      throw err;
    }
  },

  register: async (payload) => {
    set({ loading: true, error: null });

    try {
      if ([...payload.entries()].some(([key, value]) => !value)) throw new Error("All text fields and images are required");
      const response = await authApi.register(payload);

      set({
        user: response.data,
        isAuthenticated: true,
        loading: false,
      });

      return response;
    } catch (err) {
      set({
        error: err.message || "Registration failed",
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
      const response = await authApi.refresh();

      set({
        user: response.data,
        isAuthenticated: true,
      });

      return response;
    } catch {
      set({
        user: null,
        isAuthenticated: false,
      });
    }
  },
}));


export default useAuthStore