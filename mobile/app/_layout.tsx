import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useLayoutEffect, useState } from "react";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { useColorScheme } from "@/components/useColorScheme";
import { Slot } from "expo-router";
import "../global.css";
import { AuthProvider } from "@/context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SafeAreaView } from "react-native";

export {
  ErrorBoundary,
} from "expo-router";

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    SFPro: require("../assets/fonts/SF-Pro-Display-Regular.otf"),
    "SFPro-Bold": require("../assets/fonts/SF-Pro-Display-Bold.otf"),
    ...FontAwesome.font,
  });

  const [styleLoaded, setStyleLoaded] = useState(false);

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useLayoutEffect(() => {
    setStyleLoaded(true);
  }, [styleLoaded]);

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <GluestackUIProvider mode={colorScheme === "dark" ? "dark" : "light"}>
          <SafeAreaView className="flex flex-1 justify-center items-center bg-background">
            <Slot />
          </SafeAreaView>
        </GluestackUIProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
