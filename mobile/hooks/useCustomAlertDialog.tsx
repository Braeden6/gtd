import { create } from 'zustand';

interface AlertDialogProps {
  title: string;
  body: string;
  cancelText?: string;
  actionText: string;
  onCancel?: () => void;
  onAction: () => void;
  headingSize?: "sm" | "md" | "lg" | "full";
}

interface AlertDialogState extends AlertDialogProps {
  isOpen: boolean;
  
  // Actions
  openDialog: (props: AlertDialogProps) => void;
  closeDialog: () => void;
}

const emptyDialog: AlertDialogProps = {
  title: '',
  body: '',
  actionText: '',
  headingSize: 'md',
  onAction: () => {},
}

export const useAlertDialogStore = create<AlertDialogState>((set) => ({
  ...emptyDialog,
  isOpen: false,
  
  openDialog: (props) => set({ 
    isOpen: true,
    ...props
  }),
  
  closeDialog: () => set({ 
    isOpen: false,
    ...emptyDialog
  }),
}));