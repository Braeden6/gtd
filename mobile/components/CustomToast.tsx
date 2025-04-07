import React from 'react';
import { Toast, ToastTitle, ToastDescription} from "@/components/ui/toast";
import { Button, ButtonText } from "@/components/ui/button";
import { ToastPlacement } from '@gluestack-ui/toast/lib/types';
import { Divider } from './ui/divider';

interface ToastProps {
    title?: string;
    description: string;
    mainAction?: {
      text: string;
      onPress: () => void;
    };
    mainActionTextColor?: "destructive" | "secondary" | "primary";
    secondaryAction?: {
      text: string;
      onPress: () => void;
    };
    secondaryActionTextColor?: "destructive" | "secondary" | "primary";
    duration?: number;
    placement?: ToastPlacement;
  }

export const CustomToast = ({toastProps}: {toastProps: ToastProps}) => <Toast nativeID="main-toast" className="bg-popover w-[80vw]">
        {toastProps.title && <ToastTitle className="text-popover-foreground text-center">{toastProps.title}</ToastTitle>}
        <ToastDescription className="text-popover-foreground text-center p-2">
            {toastProps.description}
    </ToastDescription>
    {toastProps.mainAction && 
      <>
        <Divider className="w-[100vw] bg-popover-foreground -translate-x-[40px]" />
        <Button onPress={toastProps.mainAction.onPress}>
          <ButtonText className={`text-${toastProps.mainActionTextColor} text-center`}>{toastProps.mainAction.text}</ButtonText>
        </Button>
      </>
    }
    {toastProps.secondaryAction && 
      <>
        <Divider className="w-[100vw] bg-popover-foreground -translate-x-[40px]" />
        <Button onPress={toastProps.secondaryAction.onPress}>
          <ButtonText className={`text-${toastProps.secondaryActionTextColor} text-center`}>{toastProps.secondaryAction.text}</ButtonText>
        </Button>
      </>
    }
  </Toast>