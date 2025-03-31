import { AlertDialog, AlertDialogBackdrop, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter } from "@/components/ui/alert-dialog";
import { Button, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { useAlertDialogStore } from "@/hooks/useCustomAlertDialog";


export function CustomAlertDialog() {
  const { isOpen, title, body, cancelText, actionText, onCancel, onAction, headingSize } = useAlertDialogStore(); 
  
  return (
    <AlertDialog 
      isOpen={isOpen} 
      onClose={onCancel} 
      size={headingSize}
    >
      <AlertDialogBackdrop className="bg-black/90" />
      <AlertDialogContent className="bg-secondary">
        <AlertDialogHeader>
          <Heading className="text-foreground font-semibold" size="md">
            {title}
          </Heading>
        </AlertDialogHeader>
        <AlertDialogBody className="mt-3 mb-4">
          <Text className="text-foreground">
            {body}
          </Text>
        </AlertDialogBody>
        <AlertDialogFooter>
          {cancelText && (
            <Button
              className="border-foreground"
              variant="outline"
              action="secondary"
              onPress={onCancel}
              size="sm"
          >
              <ButtonText className="text-foreground">{cancelText}</ButtonText>
            </Button>
          )}
          <Button size="sm" variant={cancelText ? "link" : "outline"} className="border-foreground" onPress={onAction}>
            <ButtonText className="text-foreground">{actionText}</ButtonText>
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}