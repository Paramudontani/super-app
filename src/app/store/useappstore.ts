import { create } from 'zustand';

export type CategoryType = 'hotels' | 'esim' | 'taxis' | 'tours' | 'cars';

interface AppState {
  currentCategory: CategoryType;
  currency: string;
  searchQuery: string;
  setCategory: (category: CategoryType) => void;
  setCurrency: (currency: string) => void;
  setSearchQuery: (query: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  currentCategory: 'hotels',
  currency: 'THB',
  searchQuery: '',
  setCategory: (category) => set({ currentCategory: category }),
  setCurrency: (currency) => set({ currency }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
}));
