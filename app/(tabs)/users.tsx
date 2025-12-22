import { EmptyState } from '@/components/ui/EmptyState';
import { UserCard } from '@/features/users/components/UserCard';
import { UsersHeader } from '@/features/users/components/UsersHeader';
import { useUsers } from '@/features/users/hooks/useUsers';
import { User } from '@/features/users/types';
import { colors } from '@/theme/colors';
import { useCallback } from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function UsersScreen() {
  const {
    data: users,
    isLoading,
    isError,
    error,
    refetch,
    isRefetching,
  } = useUsers();

  const renderItem = useCallback(
    ({ item }: { item: User }) => (
      <View style={styles.itemWrapper}>
        <UserCard user={item} />
      </View>
    ),
    []
  );


  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.center}>
        <Text>{error?.message}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={users}
      keyExtractor={(item) => String(item.id)}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={isRefetching}
          onRefresh={refetch}
        />
      }
      ListHeaderComponent={
        <View style={styles.headerWrapper}>
          <UsersHeader />
        </View>
      }
      ListEmptyComponent={
        <EmptyState
          iconName="users"
          title="No users found"
          subtitle="There are no active users available at the moment"
        />
      }
    />
  );
}

const styles = StyleSheet.create({
  headerWrapper: {
    marginBottom: 24,
  },

  itemWrapper: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },

  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
