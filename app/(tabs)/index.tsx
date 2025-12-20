import { PostCard } from '@/features/posts/components/PostCard';
import { usePosts } from '@/features/posts/hooks/usePosts';
import { useRouter } from 'expo-router';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function HomeScreen() {
  const router = useRouter();
  const { data: posts, isLoading, isError, error } = usePosts();

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
      showsVerticalScrollIndicator={false}
      data={posts}
      keyExtractor={(item) => String(item.id)}
      renderItem={({ item }) => (
        <PostCard
          post={item}
          onPress={() =>
            router.push({
              pathname: '/post/[id]',
              params: { id: item.id },
            })
          }
        />
      )
      }
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
