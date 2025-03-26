import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { ThemeSelect } from "@/components/ThemeSelect";
import { TopNavigation } from "@/components/TopNavigation";
import { Button } from "@/components/ui/button";
import { Camera } from "@/components/Icons";
import { useRouter } from "expo-router";

export default function Capture() {
  const router = useRouter();

  return (
    <>
      <Box className="flex flex-1 flex-col bg-background">
        <TopNavigation />

        <Box className="flex flex-1 items-center justify-center gap-10">
          <Text className="text-4xl font-bold text-foreground">Capture your thoughts</Text>
          
          <Button 
            onPress={() => router.push("/camera")} 
            className="bg-secondary rounded-full w-16 h-16"
          >
            <Camera />
          </Button>

          {/* <Record /> */}

          
        </Box>
      </Box>
      <ThemeSelect />
    </>
  );
}
