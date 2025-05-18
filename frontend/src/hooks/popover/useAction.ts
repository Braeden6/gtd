import { ActionResponse } from "@/api/generated";
import { create } from 'zustand';

export enum PopoverType {
    CREATE = 'create',
    EDIT = 'edit'
}

export interface PopoverState {
    isOpen: boolean;
    type: PopoverType;
    item: Partial<ActionResponse> | null;
}

interface ActionState {
    popover: PopoverState;
    setPopover: (popoverUpdate: Partial<PopoverState>) => void;
}

export const useAction = create<ActionState>((set) => ({
    popover: {
        isOpen: false,
        type: PopoverType.CREATE,
        item: null
    },
    setPopover: (popoverUpdate: Partial<PopoverState>) => 
        set((state) => ({ 
            popover: { ...state.popover, ...popoverUpdate } 
        })),
}));