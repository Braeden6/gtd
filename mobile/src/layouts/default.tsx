import React from 'react';
import { View } from 'react-native';

type LayoutProps = {
  children: React.ReactNode;
};

export default function DefaultLayout({ children }: LayoutProps) {
  return (
      <View className="flex-1 bg-white">
        <View className="flex-1 pt-16">
          {children}
        </View>
      </View>
  );
}
