import { UserCard } from '@/features/users/components/UserCard';
import { useUsers } from '@/features/users/hooks/useUsers';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function UsersScreen() {
  const { data: users, isLoading, isError } = useUsers();

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (isError || !users) {
    return (
      <View style={styles.center}>
        <Text>Failed to load users</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={users}
      keyExtractor={(item) => String(item.id)}
      contentContainerStyle={styles.list}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => <UserCard user={item} />}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    padding: 16,
  },

  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
