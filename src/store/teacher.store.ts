// src/store/teacher.store.ts
import { create } from "zustand";
import type { Address } from "./coaching.store";

export interface Teacher {
  id: string;

  name : string;
  contactNumber : string;

  subjects?: string[];
  languages?: string[];
  address : Address;
}

interface TeacherStore {
  teacher: Teacher | null;

  setTeacher: (teacher: Teacher) => void;

  updateTeacher: (teacher: Partial<Teacher>) => void;

  clearTeacher: () => void;
}

export const useTeacherStore = create<TeacherStore>((set) => ({
  teacher: null,

  setTeacher: (teacher) =>
    set({
      teacher,
    }),

  updateTeacher: (updatedTeacher) =>
    set((state) => ({
      teacher: state.teacher
        ? {
            ...state.teacher,
            ...updatedTeacher,
          }
        : null,
    })),

  clearTeacher: () =>
    set({
      teacher: null,
    }),
}));