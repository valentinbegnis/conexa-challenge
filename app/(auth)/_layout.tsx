import { useAuthStore } from '@/features/auth/store/authStore';
import { Redirect, Stack } from 'expo-router';

export default function AuthLayout() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const hasHydrated = useAuthStore.persist.hasHydrated();

  if (!hasHydrated) return null;
  if (isAuthenticated) return <Redirect href="/(tabs)" />;

  return <Stack screenOptions={{ headerShown: false }} />;
}