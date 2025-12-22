import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as NavigationBar from 'expo-navigation-bar';
import { Slot } from 'expo-router';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';

export default function RootLayout() {
  const [queryClient] = useState(() => new QueryClient());

  useEffect(() => {
    NavigationBar.setButtonStyleAsync('dark');
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Slot />
    </QueryClientProvider>
  );
}