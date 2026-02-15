import { create } from "zustand";

interface SearchState {
  query: string;
  isOpen: boolean;
  results: any[];
  setQuery: (q: string) => void;
  setResults: (r: any[]) => void;
  open: () => void;
  close: () => void;
  reset: () => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  query: "",
  isOpen: false,
  results: [],
  setQuery: (q) => set({ query: q }),
  setResults: (r) => set({ results: r }),
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  reset: () => set({ query: "", results: [], isOpen: false }),
}));
