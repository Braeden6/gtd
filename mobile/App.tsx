import './global.css';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import LoginScreen from '@/src/screens/LoginScreen';
import { AuthProvider, useAuth } from '@/src/context/AuthContext';
import QuickCaptureScreen from '@/src/screens/QuickCaptureScreen';
import { RootStackParamList } from '@/src/types/screen';
import React, { useEffect } from 'react';
// import { PortalHost } from '@rn-prixmitives/portal';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GluestackUIProvider } from '@/src/components/ui/gluestack-ui-provider';
import { View } from 'react-native';
import { ThemeProvider, useTheme } from './src/context/ThemeContext';
import { config } from './src/components/ui/gluestack-ui-provider/config';
// import { initializeApi } from './src/lib/api';

const queryClient = new QueryClient();

const Stack = createNativeStackNavigator<RootStackParamList>();

// initializeApi();

function AppNavigator() {
  const { userInfo } = useAuth();
  const { theme } = useTheme();

  console.log('Current theme:', theme); // Add this to debug

  return (
    <SafeAreaProvider>
      <GluestackUIProvider mode={theme}>
        <NavigationContainer>
        <StatusBar 
          style="dark" 
          animated={true}
        />
          <Stack.Navigator
            screenOptions={{
              animation: 'fade',
              header: (props: any) => <></>,
            }}
          >
            {!userInfo ? (
              <Stack.Screen name="Login" component={LoginScreen} />
            ) : (
              <>
                <Stack.Screen name="QuickCapture" component={QuickCaptureScreen } />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </GluestackUIProvider>
    </SafeAreaProvider>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <AppNavigator />
        </AuthProvider>
        </ThemeProvider>
    </QueryClientProvider>
  );
}
