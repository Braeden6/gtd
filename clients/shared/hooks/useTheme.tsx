import { create } from 'zustand';

export enum Theme {
  Light = 'light',
  Dark = 'dark',
}

export const useTheme = create<{
  theme: Theme;
  toggleTheme: () => void;
  initializeTheme: () => void;
}>((set) => ({
  theme: Theme.Light,
  toggleTheme: () => set((state) => {
    const newTheme = state.theme === Theme.Light ? Theme.Dark : Theme.Light;
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === Theme.Dark);
    return { theme: newTheme };
  }),
  initializeTheme: () => {
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    if (savedTheme === Theme.Dark || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      set({ theme: Theme.Dark });
      document.documentElement.classList.add('dark');
    } else {
      set({ theme: Theme.Light });
      document.documentElement.classList.remove('dark');
    }
  }
}))