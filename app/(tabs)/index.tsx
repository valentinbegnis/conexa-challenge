import { PostCard } from '@/features/posts/components/PostCard';
import { usePosts } from '@/features/posts/hooks/usePosts';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  const { data, isLoading, isError, error, refetch } = usePosts();

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.center}>
        <Text>{error.message}</Text>
      </View>
    );
  }

  return (
    <FlatList
      contentContainerStyle={styles.list}
      data={data}
      keyExtractor={(item) => String(item.id)}
      renderItem={({ item }) => <PostCard post={item} />}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    padding: 16,
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
