import React from "react";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { ThemeSelect } from "@/components/ThemeSelect";
import { TopNavigation } from "@/components/TopNavigation";
import { Button } from "@/components/ui/button";
import { Camera, Maximize2, Trash2 } from "@/components/Icons";
import { useRouter } from "expo-router";
import { Textarea, TextareaInput } from "@/components/ui/textarea";
import { useFormStore } from "@/hooks/useLogForm";
import { KeyboardAvoidingView, Platform, Keyboard } from "react-native";
import { Image } from "expo-image";
import { Record } from "@/components/Record";
import { CustomToast } from "@/components/CustomToast";
import { useToast } from "@/components/ui/toast";
import { InboxService } from "@/api/generated";
import axios from "axios";
import { useAlertDialogStore } from "@/hooks/useCustomAlertDialog";

export default function Capture() {
  const router = useRouter();
  const { isEmpty, setText, text, imageUri, setImageUri, recordingUri, resetForm } = useFormStore();
  const toast = useToast();
  const { openDialog, closeDialog } = useAlertDialogStore();

  const submit = async () => {
    try {
      let audioFile: any = null;
      let imageFile: any = null;
      const formData = new FormData();
      formData.append('content', text || "");
      
      if (imageUri) {
        const fileExtension = imageUri.split('.').pop()?.toLowerCase() || 'jpg';
        const mimeType = fileExtension === 'jpg' ? 'image/jpeg' : `image/${fileExtension}`;
        imageFile = {
          uri: Platform.OS === 'ios' ? imageUri.replace('file://', '') : imageUri,
          name: `image.${fileExtension}`,
          type: mimeType
        } as any;
        formData.append('image', imageFile);
      }

      if (recordingUri) {
        audioFile = {
          uri: Platform.OS === 'ios' ? recordingUri.replace('file://', '') : recordingUri,
          name: 'recording.m4a',
          type: 'audio/m4a'
        } as any;
        formData.append('audio', audioFile);
      }
      
      // tech debt: figure out why the SDK is not working
      // const response = await InboxService.createInboxItemInboxPost({
      //   content: text || "",
      //   audio: audioFile,
      //   image: imageFile
      // });
      const apiUrl = `${process.env.EXPO_PUBLIC_API_URL || ''}/inbox/`;
      const response = await axios.post(apiUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json',
        },
        withCredentials: true,
      });  
      toast.show({
        id: "submit-form-toast",
        placement: "bottom",
        duration: 3000,
        render: () => {
          return (
            <CustomToast
              toastProps={{
                description: "Successfully submitted",
                mainAction: {
                  text: "Undo",
                  onPress: () => {
                    InboxService.deleteInboxItemInboxItemIdDelete(response.data.id);
                    toast.close("submit-form-toast");
                  }
                },
                mainActionTextColor: "destructive"
              }}
            />
          )
        },
      })
      resetForm();
    } catch {
      toast.show({
        id: "submit-form-toast-error",
        placement: "bottom",
        duration: 3000,
        render: () => {
          return (
            <CustomToast
              toastProps={{
                description: "Error submitting. Please try again.",
              }}
            />
          )
        },
      })
      
    }
  }

  const handleDeleteImage = () => {
    openDialog({
      body: "Photo being deleted cannot be recovered!",
      actionText: "Delete",
      actionTextColor: "destructive",
      onAction: () => {
        setImageUri(null);
        closeDialog();
      },
    })
  }

  return (
    <>
      <Box className="flex flex-1 flex-col bg-background" onTouchStart={Keyboard.dismiss}>
        <TopNavigation />

        <KeyboardAvoidingView
          className="flex flex-1 items-center justify-center"
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >

          <Box className="flex flex-1 items-center justify-center gap-10">
            <Text className="text-4xl font-bold text-foreground">Capture your thoughts</Text>

            {imageUri ?
                <Box className="relative h-[150px] w-[200px] items-center justify-center">
                  <Button 
                    onPress={() => router.push("/camera")} 
                    className="bg-transparent w-full h-full overflow-hidden"
                  >
                    <Image 
                      source={{ uri: imageUri }}                     
                      contentFit="contain"
                      placeholder="Loading..."
                      transition={200}
                      style={{ 
                          width: 100,
                          height: 200
                      }} 
                    /> 
                    <Box className="absolute inset-0 flex items-center justify-center">
                      <Box className="bg-gray-500/80 rounded-full p-2">
                        <Maximize2 className="w-6 h-6 " />
                      </Box>
                    </Box>
                  </Button>
                  <Button 
                    onPress={handleDeleteImage}
                    className="absolute right-0 bottom-0 bg-background rounded-full p-0 z-10 w-10 h-10"
                  >
                    <Trash2 className="w-5 h-5 text-secondary" />
                  </Button>
                </Box>
              :
              <Button onPress={() => router.push("/camera")} className="bg-secondary rounded-full w-16 h-16">
                <Camera className="text-secondary-foreground" />
              </Button>
            }

            <Record />

            <Textarea 
              className="h-[150px] border-0 bg-gray-200 w-[80vw] mb-10"
              onTouchStart={(e) => e.stopPropagation()}
            >
              <TextareaInput 
                placeholder="Your text goes here..." 
                onChangeText={(text) => setText(text)} 
                value={text || ""} 
                className="text-secondary-foreground placeholder:text-secondary-foreground"
              />
            </Textarea>


            <Button 
              className={`bg-secondary w-[150px] ${isEmpty() ? "opacity-50" : "opacity-100"}`} 
              disabled={isEmpty()} 
              onPress={submit}
            >
              <Text className="text-secondary-foreground">Submit</Text>
            </Button>

          </Box>

        </KeyboardAvoidingView>
      </Box>
      <ThemeSelect />
    </>
  );
}