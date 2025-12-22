import { PostCard } from '@/features/posts/components/PostCard';
import { usePosts } from '@/features/posts/hooks/usePosts';
import { useFavoritesStore } from '@/stores/favoritesStore';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from 'expo-router';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function FavoritesScreen() {
  const router = useRouter();

  const { data: posts, isLoading, isError } = usePosts();
  const favoritePostIds = useFavoritesStore(
    (state) => state.favoritePostIds
  );

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (isError || !posts) {
    return (
      <View style={styles.center}>
        <Text>Failed to load favorites</Text>
      </View>
    );
  }

  const favoritePosts = posts.filter((post) =>
    favoritePostIds.includes(post.id)
  );

  // 🧡 EMPTY STATE
  if (favoritePosts.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <View style={styles.emptyIcon}>
          <FontAwesome name="heart-o" size={32} color="#F97316" />
        </View>

        <Text style={styles.emptyTitle}>No favorites yet</Text>
        <Text style={styles.emptySubtitle}>
          Tap the heart icon on any article to save it here for later reading
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      contentContainerStyle={styles.list}
      showsVerticalScrollIndicator={false}
      data={favoritePosts}
      keyExtractor={(item) => String(item.id)}
      renderItem={({ item }) => (
        <PostCard
          post={item}
          isFavorite
          onPress={() =>
            router.push({
              pathname: '/post/[id]',
              params: { id: item.id },
            })
          }
        />
      )}
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

  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },

  emptyIcon: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#FFF1E6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },

  emptySubtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
  },
});

