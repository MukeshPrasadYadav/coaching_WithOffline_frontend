// src/store/teacher.store.ts
import { create } from "zustand";

export interface Teacher {
  subjects?: string[];
  languages?: string[];
  fee : number
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