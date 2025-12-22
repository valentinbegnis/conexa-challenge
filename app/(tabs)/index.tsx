import { EmptyState } from '@/components/ui/EmptyState';
import { HomeHeader } from '@/features/posts/components/HomeHeader';
import { PostCard } from '@/features/posts/components/PostCard';
import { usePosts } from '@/features/posts/hooks/usePosts';
import { Post } from '@/features/posts/types';
import { useFavoritesStore } from '@/stores/favoritesStore';
import { colors } from '@/theme/colors';
import { useRouter } from 'expo-router';
import { useCallback, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function HomeScreen() {
  const router = useRouter();
  const [query, setQuery] = useState('');

  const {
    data: posts,
    isLoading,
    isError,
    error,
    refetch,
    isRefetching,
  } = usePosts();

  const favoritePostIds = useFavoritesStore(
    (state) => state.favoritePostIds
  );

  const filteredPosts = useMemo(() => {
    if (!query.trim()) return posts;

    const q = query.toLowerCase();
    return posts?.filter(
      (post) =>
        post.title.toLowerCase().includes(q) ||
        post.content.toLowerCase().includes(q)
    );
  }, [posts, query]);

  const handlePressPost = useCallback(
    (id: number) => {
      router.push({
        pathname: '/post/[id]',
        params: { id },
      });
    },
    [router]
  );

  const renderItem = useCallback(
    ({ item }: { item: Post }) => (
      <View style={styles.itemWrapper}>
        <PostCard
          post={item}
          isFavorite={favoritePostIds.includes(item.id)}
          onPress={() => handlePressPost(item.id)}
        />
      </View>
    ),
    [favoritePostIds, handlePressPost]
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
        <Text>{error.message}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={filteredPosts}
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
          <HomeHeader value={query} onChangeText={setQuery} />
        </View>
      }
      ListEmptyComponent={
        <EmptyState
          iconName='search'
          title='No results found'
          subtitle='Try adjusting your search'
        />
      }
    />
  )
}

const styles = StyleSheet.create({
  headerWrapper: {
    marginBottom: 24,
  },

  itemWrapper: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

