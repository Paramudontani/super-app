import { create } from 'zustand';

export type CategoryType = 'hotels' | 'esim' | 'taxis' | 'tours' | 'cars';

interface AppState {
  currentCategory: CategoryType;
  currency: string;
  setCategory: (category: CategoryType) => void;
  setCurrency: (currency: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  currentCategory: 'hotels',
  currency: 'THB',
  setCategory: (category) => set({ currentCategory: category }),
  setCurrency: (currency) => set({ currency }),
}));