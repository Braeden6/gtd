import { useFormPopup } from "@/hooks/useFormPopup";
import { Button, Card, CardContent, CardFooter, CardHeader, CardTitle, Textarea, InboxService } from "@gtd/shared";
import { Loader2, X } from "lucide-react";
import { useState } from "react";

function SidePanel() {
    const { isOpen, close, text, setText } = useFormPopup();
    const [isLoading, setIsLoading] = useState(false);

    const handleCapture = async () => {
      try {
        setIsLoading(true);
        await InboxService.createInboxItemInboxPost({
            content: text
        })
        setText('');
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    return (
        <>
        {isOpen && (
            <Card className="w-[500px] h-[500px] !bg-black !text-white rounded-lg !p-4 !border">
              <Button 
                onClick={close}
                className="absolute top-4 right-4"
              >
                <X />
              </Button>

              <CardHeader>
                <CardTitle className="text-[14px]">Quick GTD Capture</CardTitle>
              </CardHeader>

              <CardContent className="w-full h-[300px] !mt-4">
                <Textarea
                  placeholder="Add text to capture..."
                  value={text}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setText(e.target.value)}
                  className="w-full h-full !p-2 !text-[14px] !border-2"
                />
              </CardContent>
              
              <CardFooter className="flex justify-center !mt-6 !text-[14px]">
                <Button onClick={handleCapture} disabled={isLoading}>
                  {isLoading ? <Loader2 className="animate-spin" /> : "Capture"}
                </Button>
              </CardFooter>
            </Card>
          )}
        </>
    )
}

export default SidePanel;