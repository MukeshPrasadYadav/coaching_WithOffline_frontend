// src/store/auth.store.ts
import { create } from "zustand";
import { api } from "../api/Client";

export const Role = {
  ADMIN: "ADMIN",
  STUDENT: "STUDENT",
  TEACHER: "TEACHER",
  PARENT: "PARENT",
} as const;

export const Permission = {
  ADD_STUDENT: "ADD_STUDENT",
  REMOVE_STUDENT: "REMOVE_STUDENT",
  ADD_PARENT: "ADD_PARENT",
  REMOVE_PARENT: "REMOVE_PARENT",
  PAY_FEE: "PAY_FEE",
  ADD_TEACHER: "ADD_TEACHER",
  REMOVE_TEACHER: "REMOVE_TEACHER",
  ADD_BATCH: "ADD_BATCH",
  REMOVE_BATCH: "REMOVE_BATCH",
  UPDATE_BATCH: "UPDATE_BATCH",
  ADD_COACHING: "ADD_COACHING",
  REMOVE_COACHING: "REMOVE_COACHING",
  UPDATE_COACHING: "UPDATE_COACHING",
  VISIT: "VISIT",
} as const;

export type Role = (typeof Role)[keyof typeof Role];
export type Permission = (typeof Permission)[keyof typeof Permission];

export interface User {
  id: string;
  name: string;
  email: string;
  contactInfo: string;
  role: Role;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;

  setUser: (user: User | null) => void;
  logout: () => Promise<void>;

  hasRole: (role: Role) => boolean;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,

  setUser: (user) =>
    set({
      user,
      isAuthenticated: !!user,
    }),

  logout: async () => {
    try {
      await api.post("/auth/signout");
    } finally {
      set({
        user: null,
        isAuthenticated: false,
      });
    }
  },

  hasRole: (role) => get().user?.role.includes(role) ?? false,

  
}));