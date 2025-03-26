import React, { useEffect, useState } from "react";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Button, ButtonText } from "@/components/ui/button";
import axios from 'axios';
import * as WebBrowser from 'expo-web-browser';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from "expo-router";
import { QueryClient } from "@tanstack/react-query";
import { ThemeSelect } from "@/components/ThemeSelect";


const queryClient = new QueryClient();

export default function Home() {
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
      const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/auth/oauth/mobile/authentik/authorize?scopes=fastapi-users%3Aoauth-state`);
      const authUrl = response.data.authorization_url;

      const urlParams = new URLSearchParams(authUrl.split('?')[1]);
      const state = urlParams.get('state');
      const redirectUrl = urlParams.get('redirect_url');
      const result = await WebBrowser.openAuthSessionAsync(
        authUrl + '&scope=' + encodeURIComponent('openid profile email'),
        redirectUrl,
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
        `${process.env.EXPO_PUBLIC_API_URL}/auth/oauth/authentik/callback?code=${responseCode}&state=${responseState}`, 
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
      <Box className="flex-1 justify-center items-center">
        <Box className="pb-10">
          <Box className="flex flex-col gap-8">
            <Text className="text-4xl font-bold text-foreground underline decoration-secondary">Getting</Text>
            <Text className="text-4xl font-bold text-foreground underline decoration-secondary">Things</Text>
            <Text className="text-4xl font-bold text-foreground underline decoration-secondary">Done</Text>
          </Box>
        </Box>

        <Button className="w-[200px] bg-secondary" onPress={initiateLogin} disabled={isLoading}>
          <ButtonText className="text-secondary-foreground">Sign In</ButtonText>
        </Button>
      </Box>

      <ThemeSelect />
  </>
  );
}