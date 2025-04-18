import React, { useEffect, useState } from "react";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Button, ButtonText } from "@/components/ui/button";
import axios from 'axios';
import * as WebBrowser from 'expo-web-browser';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from "expo-router";
import { ThemeSelect } from "@/components/ThemeSelect";
import { Image } from "@/components/ui/image";
import { Dimensions, useColorScheme } from "react-native";
import { AuthService, InboxService } from "@/api/generated";

export default function Home() {
  const colorScheme = useColorScheme();
  const { saveSessionCookie, getUserInfo, userInfo } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (userInfo) {
      router.push('/capture');
    }
  }, [userInfo]);

  const initiateLogin = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const response = await AuthService.getAuthorizationUrlAuthOauthMobileGoogleAuthorizeGet();
      const authorizationUrl = response.authorization_url;
      const url = new URL(authorizationUrl);
      const state = url.searchParams.get('state');
      const redirectUri = url.searchParams.get('redirect_uri');
      const result = await WebBrowser.openAuthSessionAsync(
        response.authorization_url,
        redirectUri
      );
      // @ts-ignore
      const responseUrl =  new URLSearchParams(result.url.split('?')[1]);
      const responseCode = responseUrl.get('code');
      const responseState = responseUrl.get('state');
      if (!responseCode) {
        throw new Error('No code found');
      }
      if (state !== responseState) {
      throw new Error('State mismatch');
      }

      const finalResponse = await axios.get(
        `${process.env.EXPO_PUBLIC_API_URL}/auth/oauth/mobile/google/callback?code=${responseCode}&state=${responseState}`, 
        { withCredentials: true }
      );
      const cookies = finalResponse.headers['set-cookie'];
      const authCookie = cookies?.find((cookie: string) => cookie.startsWith('gtd_auth='));
      const tokenValue = authCookie?.split(';')[0].replace('gtd_auth=', '');
      if (!tokenValue) {
        throw new Error('No token found');
      }
      await saveSessionCookie(tokenValue);
      await getUserInfo();
    } catch (error) {
      // !!! popup saying "Something went wrong logging in, please try again"
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Box className="flex-1 justify-center items-center pb-40">
        <Text className="text-foreground pb-20 text-lg">A design based on the book called</Text>
        <Box className="pb-10">
          <Box className="flex flex-col gap-8">
            <Text className="text-6xl font-bold text-foreground underline decoration-secondary">Getting</Text>
            <Text className="text-6xl font-bold text-foreground underline decoration-secondary">Things</Text>
            <Text className="text-6xl font-bold text-foreground underline decoration-secondary">Done</Text>
          </Box>
        </Box>

        <Button className="w-[200px] bg-secondary" onPress={initiateLogin} disabled={isLoading}>
          <ButtonText className="text-secondary-foreground">Sign In</ButtonText>
        </Button>
      </Box>

      <Image 
        source={
          colorScheme === 'dark' ? 
            require('@/assets/images/background-dark.png') : 
            require('@/assets/images/background-light.png')
        } 
        style={{ 
          width: '100%',
          height: '100%',
          alignSelf: 'stretch'
        }}
        className="w-full h-[30%] absolute bottom-0"
        resizeMode="cover"
        alt="Background decoration"
      />

      {/* <Text className="text-foreground">{process.env.EXPO_PUBLIC_API_URL}</Text>
      <Text className="text-foreground">{process.env.APP_VARIANT}</Text> */}

      <ThemeSelect />
  </>
  );
}