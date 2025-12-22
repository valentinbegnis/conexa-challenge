import { AppHeader } from '@/components/header/AppHeader';
import { LogoutIcon } from '@/components/icons/LogoutIcon';
import { UsersIcon } from '@/components/icons/UsersIcon';
import { useAuthStore } from '@/features/auth/store/authStore';
import { useUsers } from '@/features/users/hooks/useUsers';
import { colors } from '@/theme/colors';
import { Pressable, StyleSheet } from 'react-native';

export function UsersHeader() {
  const { data: users, isLoading, isError } = useUsers();
  const logout = useAuthStore((s) => s.logout);

  let subtitle = 'Loading members…';
  if (isError) subtitle = 'Members unavailable';
  if (!isLoading && users) subtitle = `${users.length} active members`;

  return (
    <AppHeader
      icon={<UsersIcon size={20} color={colors.white} />}
      title="Community"
      subtitle={subtitle}
      rightAction={
        <Pressable
          onPress={logout}
          hitSlop={10}
          accessibilityRole="button"
          accessibilityLabel="Log out"
          style={styles.logoutButton}
        >
          <LogoutIcon size={20} color='#ef4343' />
        </Pressable>
      }
    />
  );
}

const styles = StyleSheet.create({
  logoutButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center'
  }
});