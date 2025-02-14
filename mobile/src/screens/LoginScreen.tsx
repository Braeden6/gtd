import React from 'react';
import { View, TouchableOpacity, Text, ActivityIndicator, Image } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useAuthRequest } from '../utils/auth';
import DefaultLayout from '../layouts/default';
import { t } from '../translations';

export default function LoginScreen() {
  const { login } = useAuth();
  const { isLoading, startAuth } = useAuthRequest();

  const handleLogin = async () => {
    const tokens = await startAuth();
    if (tokens) {
      await login(tokens);
    }
  };

  return (
    <DefaultLayout>
      <View className="flex-1 items-center p-6 pt-12 bg-white">
        <View className="items-center relative">
          <TouchableOpacity
            onPress={handleLogin}
            disabled={isLoading}
            className={`absolute top-14 w-48 bg-[#8AD4FF] py-2 px-4 rounded-xl ${
              isLoading ? 'opacity-70' : ''
            }`}
          >
            {isLoading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-black text-center font-semibold text-lg">
                {t('common.signIn')}
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </DefaultLayout>
  );
}