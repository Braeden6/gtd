import React from "react";
import { AlertDialog, AlertDialogBackdrop, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter } from "@/components/ui/alert-dialog";
import { Button, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { useAlertDialogStore } from "@/hooks/useCustomAlertDialog";
import { Box } from "@/components/ui/box";
import { Divider } from "./ui/divider";


export function CustomAlertDialog() {
  const { 
    isOpen, 
    title, 
    body, 
    cancelText, 
    actionText, 
    onCancel, 
    onAction, 
    headingSize,
    actionTextColor
  } = useAlertDialogStore(); 
  
  return (
    <AlertDialog 
      isOpen={isOpen} 
      onClose={onCancel} 
      size={headingSize}
    >
      <AlertDialogBackdrop className="bg-black/90" />
      <AlertDialogContent className="bg-popover w-2/3 border-0">
        <AlertDialogHeader>
          {title && (
            <Heading className="text-popover-foreground font-semibold" size="md">
              {title}
            </Heading>
          )}
        </AlertDialogHeader>
        <AlertDialogBody className="mt-3 mb-4">
          <Text className="text-popover-foreground text-center">
            {body}
          </Text>
        </AlertDialogBody>
        <AlertDialogFooter>

          <Box className="flex flex-col items-center justify-center gap-2 w-full -mb-4">
            <Divider className="w-[100vw] bg-popover-foreground" />
            <Button size="sm" variant={cancelText ? "link" : "outline"} className="border-0" onPress={onAction}>
              <ButtonText className={`text-${actionTextColor} w-full text-center`}>{actionText}</ButtonText>
            </Button>
              {cancelText && (
                <>
                  <Divider className="w-[100vw] bg-popover-foreground" />
                  <Button
                    className="border-0"
                    variant="outline"
                    action="secondary"
                    onPress={onCancel}
                    size="sm"
                  >
                    <ButtonText className="text-popover-foreground w-full text-center">{cancelText}</ButtonText>
                  </Button>
              </>
            )}
          </Box>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}