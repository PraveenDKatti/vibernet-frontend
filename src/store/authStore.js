import { create } from "zustand";
import * as authApi from "../api/auth.api";
import client from "../api/client";

const useAuthStore = create((set, get) => ({
  // 🔹 state
  user: null,
  isAuthenticated: false,
  initializing: true,

  // 🔹 actions
  checkAuth: async () => {
    try {
      const response = await client.get("/users/current-user");
      set({ user: response.data.data, isAuthenticated: true });
    } catch (error) {
      set({ user: null, isAuthenticated: false });
    }finally{
      set({initializing:false})
    }
  },

  login: async (credentials) => {
    if (!credentials.email || !credentials.password)
      throw new Error("Email and password are required")
    const response = await authApi.login(credentials)
    set({ user: response.data.user, isAuthenticated: true });
    return response;
  },

  register: async (payload) => {
    if ([...payload.entries()].some(([_, value]) => !value)) 
      throw new Error("All text fields and images are required");
    const response = await authApi.register(payload);
    return response;
  },

  logout: async () => {
    try {
      await authApi.logout();
    } 
    finally {
      // even if API fails, clear local state
      set({ user: null, isAuthenticated: false });
    }
  },

  refresh: async () => {
    try {
      const response = await authApi.refresh();
      set({ user: response.data, isAuthenticated: true });
      return response;
    } 
    catch {
      set({ user: null, isAuthenticated: false });
    }
  },
}));


export default useAuthStore