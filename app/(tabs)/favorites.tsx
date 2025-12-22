import { AppHeader } from '@/components/header/AppHeader';
import { HeartIcon } from '@/components/icons/HeartIcon';
import { EmptyState } from '@/components/ui/EmptyState';
import { PostCard } from '@/features/posts/components/PostCard';
import { usePosts } from '@/features/posts/hooks/usePosts';
import { Post } from '@/features/posts/types';
import { useFavoritesStore } from '@/stores/favoritesStore';
import { colors } from '@/theme/colors';
import { useRouter } from 'expo-router';
import { useCallback, useMemo } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function FavoritesScreen() {
  const router = useRouter();

  const { data: posts, isLoading, error, isError } = usePosts();

  const favoritePostIds = useFavoritesStore(
    (state) => state.favoritePostIds
  );

  const favoritePosts = useMemo(() => {
    if (!posts?.length || !favoritePostIds.length) return [];
    return posts.filter((post) => favoritePostIds.includes(post.id));
  }, [posts, favoritePostIds]);

  const handlePressPost = useCallback(
    (id: number) => {
      router.push({
        pathname: '/post/[id]',
        params: { id, from: 'favorites' },
      });
    },
    [router]
  );

  const renderItem = useCallback(
    ({ item }: { item: Post }) => (
      <View style={styles.itemWrapper}>
        <PostCard
          post={item}
          isFavorite
          onPress={() => handlePressPost(item.id)}
        />
      </View>
    ),
    [handlePressPost]
  );

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
      data={favoritePosts}
      keyExtractor={(item) => String(item.id)}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={
        <View style={styles.headerWrapper}>
          <AppHeader
            icon={<HeartIcon size={20} color={colors.white} />}
            title="Favorites"
            subtitle="Your saved articles"
          />
        </View>
      }
      ListEmptyComponent={
        <EmptyState
          iconName='heart-o'
          title='No favorites yet'
          subtitle='Tap the heart icon on any article to save it here for later reading'
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
    paddingBottom: 8,
  },

  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

