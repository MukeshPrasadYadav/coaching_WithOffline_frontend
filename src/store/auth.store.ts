// src/store/auth.store.ts
import { create } from "zustand";
import type { Address } from "./coaching.store";

export const Role = {
  ADMIN: "ADMIN",
  STUDENT: "STUDENT",
  TEACHER: "TEACHER",
  PARENT: "PARENT",
} as const;

export const Gender = {
  MALE : "MALE",
  FEMALE : "FEMALE",
  OTHERS : "OTHERS"
} as const;

  

export type Role = (typeof Role)[keyof typeof Role];
export type Gender = (typeof Gender)[keyof typeof Gender];


export interface User {
  id: string;
  name: string;
  email: string;
  contactNumber: string;
  role: Role;
  address :Address;
  isProfileCompleted : boolean;
  gender : Gender | null;
  dob : string;
  motherName ?: string;
  fatherName ?: string;
  parentName ?: string;
  parentPhone ?: string;
  parentEmail ?: string;
  degress ?: string[];
  experience ?: number;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;

  setUser: (user: User | null) => void;
  
  clearAuth: () => void;

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

 clearAuth() {
     set({
      user : null,
      isAuthenticated : false
     })
 },

  hasRole: (role) => get().user?.role === role,

  
}));