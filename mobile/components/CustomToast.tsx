import React from 'react';
import { Toast, ToastTitle, ToastDescription} from "@/components/ui/toast";
import { Button, ButtonText } from "@/components/ui/button";
import { ToastPlacement } from '@gluestack-ui/toast/lib/types';

interface ToastProps {
    title?: string;
    description: string;
    mainAction?: {
      text: string;
      onPress: () => void;
    };
    secondaryAction?: {
      text: string;
      onPress: () => void;
    };
    duration?: number;
    placement?: ToastPlacement;
  }

export const CustomToast = ({toastProps}: {toastProps: ToastProps}) => <Toast nativeID="main-toast" className="bg-secondary">
        {toastProps.title && <ToastTitle>{toastProps.title}</ToastTitle>}
        <ToastDescription>
            {toastProps.description}
    </ToastDescription>
    {toastProps.mainAction && <Button onPress={toastProps.mainAction.onPress}>
      <ButtonText>{toastProps.mainAction.text}</ButtonText>
    </Button>}
    {toastProps.secondaryAction && <Button onPress={toastProps.secondaryAction.onPress}>
      <ButtonText>{toastProps.secondaryAction.text}</ButtonText>
    </Button>}
  </Toast>