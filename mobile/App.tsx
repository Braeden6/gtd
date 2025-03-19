import './global.css';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import LoginScreen from './src/screens/LoginScreen';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import QuickCaptureScreen from './src/screens/QuickCaptureScreen';
import { RootStackParamList } from './src/types/screen';
import React from 'react';
import { PortalHost } from '@rn-primitives/portal';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { initializeApi } from './src/lib/api';

const queryClient = new QueryClient();

const Stack = createNativeStackNavigator<RootStackParamList>();

// initializeApi();

function AppNavigator() {
  const { userInfo } = useAuth();

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="dark" />
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
      <PortalHost />
    </SafeAreaProvider>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AppNavigator />
      </AuthProvider>
    </QueryClientProvider>
  );
}
