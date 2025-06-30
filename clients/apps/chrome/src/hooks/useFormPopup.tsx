import { create } from "zustand";

interface FormPopupStore {
    isOpen: boolean;
    open: () => void;
    close: () => void;
    text: string;
    setText: (text: string) => void;
    addText: (text: string) => void;
}

export const useFormPopup = create<FormPopupStore>((set) => ({
    isOpen: false,
    text: "",
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
    setText: (text: string) => set({ text }),
    addText: (text: string) => set((state) => ({ text: state.text + text })),
}));