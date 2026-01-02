import { create } from "zustand";
import toast from "react-hot-toast";
import api from "../api/axios";

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  isCheckingAuth: false,

  // CHECK AUTH
  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const res = await api.get("/auth/me");
      set({
        user: res.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  // LOGIN
  login: async (email, password) => {
    try {
      const res = await api.post("/auth/login", { email, password });
      set({
        user: res.data.user,
        isAuthenticated: true,
      });
      toast.success(`Welcome back, ${res.data.user.username}! 👋`);
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Login failed";

      if (error.response?.status === 401) {
        toast.error("Invalid email or password");
      } else if (error.response?.status === 404) {
        toast.error("Account not found");
      } else {
        toast.error(`${errorMessage}`);
      }

      throw error;
    }
  },

  // SIGNUP
  signup: async (username, email, password) => {
    try {
      const res = await api.post("/auth/signup", { username, email, password });
      set({
        user: res.data.user,
        isAuthenticated: true,
      });
      toast.success(`Welcome ${username}! 🎉 Your account has been created`);
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Signup failed";

      // Check for specific errors
      if (errorMessage.toLowerCase().includes("email")) {
        toast.error("Email already exists! Try logging in instead");
      } else if (errorMessage.toLowerCase().includes("username")) {
        toast.error("Username already taken! Try another one");
      } else if (error.response?.status === 400) {
        toast.error(`${errorMessage}`);
      } else {
        toast.error("Registration failed. Please try again");
      }

      throw error;
    }
  },

  // LOGOUT
  logout: async () => {
    try {
      await api.post("/auth/logout");
      set({
        user: null,
        isAuthenticated: false,
      });
      toast.success("Logged out successfully 👋");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed");
    }
  },
}));
