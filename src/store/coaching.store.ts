// src/store/coaching.store.ts
// src/coaching/store/coachingStore.ts

import { create } from "zustand";

// src/coaching/types/coaching.ts

export type CoachingStatus = "OPEN" | "CLOSED";

export interface Address {
  country: string;
    state: string;
    area: string;
    city: string;
    pinCode: string;
    postOffice: string;
    building: string;
    houseNo: string;
}

export interface CoachingInfo{
  name : string;
  ownerName : string;
  ownerEmail : string;
  ownerContactNumber : string;
}

export interface Coaching {
  id: string;
  name: string;
  ownerName: string;
  ownerEmail: string;
  ownerContactNumber: string;
  status: CoachingStatus;
  address: Address;
  reasonForRemoving?: string | null;

  totalStudents?: number;
  totalTeachers?: number;
  totalBatches?: number;
}

interface CoachingState {
  coaching: Coaching | null;

  hasCoaching: boolean;

  setCoaching: (coaching: Coaching | null) => void;

  updateCoaching: (data: Partial<Coaching>) => void;

  clearCoaching: () => void;
}

export const useCoachingStore = create<CoachingState>((set) => ({
  coaching: null,

  hasCoaching: false,

  setCoaching: (coaching) =>
    set({
      coaching,
      hasCoaching: coaching !== null,
    }),
    
  updateCoaching: (data) =>
    set((state) => ({
      coaching: state.coaching
        ? {
            ...state.coaching,
            ...data,
          }
        : null,
    })),




  clearCoaching: () =>
    set({
      coaching: null,
      hasCoaching: false,
    }),
}));