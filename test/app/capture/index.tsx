import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Link } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

const Capture = () => {
  return (
    <Box className=" flex flex-1 items-center justify-center">
      <Text>Capture</Text>
      <Link href="/asdasd">
        <Box className="bg-background-template py-2 px-6 rounded-full items-center flex-column sm:flex-row md:self-start">
          <Text className="text-typography-white font-normal">
            Capture
          </Text>
        </Box>
      </Link>

      <Box className="bg-primary-0 w-[100px] h-[100px] rounded-full">

      </Box>

      {/* <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} /> */}
    </Box>
  );
};

export default Capture;