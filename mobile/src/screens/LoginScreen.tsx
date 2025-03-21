import { View, TouchableOpacity, Text } from 'react-native';
import axios from 'axios';
import DefaultLayout from '../layouts/default';
import * as WebBrowser from 'expo-web-browser';
import { useAuth } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types/screen';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { API_URL } from '@env';
import { useState } from 'react';
import { Button, ButtonText } from '../components/ui/button'
import { useTheme } from '../context/ThemeContext';
// import { Button } from '../components/ui/button'

const Login: React.FC = () => {
  const { saveSessionCookie, getUserInfo, userInfo } = useAuth();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [isLoading, setIsLoading] = useState(false);
  const { toggleTheme, isDarkMode } = useTheme();

  const initiateLogin = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${API_URL}/auth/oauth/mobile/authentik/authorize?scopes=fastapi-users%3Aoauth-state`);
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
        `${API_URL}/auth/oauth/authentik/callback?code=${responseCode}&state=${responseState}`, 
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
      // navigation.navigate('QuickCapture');
    } catch (error) {
      // !!! popup saying "Something went wrong logging in, please try again"
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DefaultLayout>
      <View className="flex-1 items-center p-6 pt-12 bg-white">
        <View className="items-center relative">


        <Button className='bg-test-0 dark:bg-test-1 m-20' onPress={() => {
              toggleTheme();
              console.log(isDarkMode);
            }}>
              <ButtonText>
                asd
              </ButtonText>
            </Button>

        <Button onPress={initiateLogin} disabled={isLoading}>
          <ButtonText>Login</ButtonText>
        </Button>
          {/* <Button>asd</Button> */}
        </View>

        

      </View>
    </DefaultLayout>
  );
};

export default Login;