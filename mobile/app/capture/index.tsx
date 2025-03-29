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

export default function Capture() {
  const router = useRouter();
  const { isEmpty, setText, text, imageUri, setImageUri } = useFormStore();

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
                    onPress={() => setImageUri(null)}
                    className="absolute right-0 bottom-0 bg-background rounded-full p-0 z-10"
                  >
                    <Trash2 className="w-5 h-5 text-secondary" />
                  </Button>
                </Box>
              :
              <Button onPress={() => router.push("/camera")} className="bg-secondary rounded-full w-16 h-16">
                <Camera />
              </Button>
            }

            <Record />

            <Textarea 
              className="h-[200px] border-secondary w-[80vw] mb-10"
              onTouchStart={(e) => e.stopPropagation()}
            >
              <TextareaInput 
                placeholder="Your text goes here..." 
                onChangeText={(text) => setText(text)} 
                value={text || ""} 
                className="text-foreground placeholder:text-foreground"
              />
            </Textarea>


            <Button 
              className={`bg-secondary w-[150px] ${isEmpty() ? "opacity-50" : "opacity-100"}`} 
              disabled={isEmpty()} 
              onPress={() => console.log("submit")}
            >
              <Text>Submit</Text>
            </Button>

          </Box>

        </KeyboardAvoidingView>
      </Box>
      <ThemeSelect />
    </>
  );
}