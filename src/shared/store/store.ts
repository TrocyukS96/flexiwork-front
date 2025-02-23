import { create } from "zustand";
import { devtools } from 'zustand/middleware';

interface StoreState {
  isLoading: boolean;
  errorText: string | null;
  setLoading: (isLoading: boolean) => void;
  setError: (errorText: string | null) => void;
}

// Создаем хранилище
export const useStore = create<StoreState>()(
    devtools(
      (set) => ({
        isLoading: false,
        errorText: null,
        setLoading: (isLoading) => set({ isLoading }),
        setError: (errorText) => set({ errorText }),
        clearError: () => set({ errorText: null }),
      }),
      { name: 'globalStore' } // Имя для DevTools
    )
  );

