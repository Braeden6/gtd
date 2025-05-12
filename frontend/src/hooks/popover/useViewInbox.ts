import { InboxItemResponseDTO } from "@/api/generated";
import { create } from 'zustand';

interface ViewInboxState {
    popoverOpen: boolean;
    setPopoverOpen: (open: boolean) => void;
    popoverItem: InboxItemResponseDTO | null;
    setPopoverItem: (item: InboxItemResponseDTO | null) => void;
}

export const useViewInbox = create<ViewInboxState>((set) => ({
    popoverOpen: false,
    setPopoverOpen: (open: boolean) => set({ popoverOpen: open }),
    popoverItem: null,
    setPopoverItem: (item: InboxItemResponseDTO | null) => set({ popoverItem: item }),
}));