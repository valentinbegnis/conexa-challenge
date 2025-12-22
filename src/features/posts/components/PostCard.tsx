import { HeartIcon } from '@/components/icons/HeartIcon';
import { useFavoritesStore } from '@/stores/favoritesStore';
import { colors } from '@/theme/colors';
import { formatPublishedDate } from '@/utils/date';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Post } from '../types';

type PostProps = {
  post: Post;
  onPress?: () => void;
  isFavorite?: boolean;
};

export function PostCard({ post, onPress, isFavorite }: PostProps) {
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);

  const handleFavoritePress = (
    event: React.MouseEvent | any
  ) => {
    event.stopPropagation?.();
    toggleFavorite(post.id);
  };

  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.imageContainer}>
        <Image
          source={post.image}
          style={styles.image}
          contentFit='cover'
          transition={200}
        />

        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.5)']}
          style={styles.scrim}
        />

        <LinearGradient
          colors={[colors.primary, colors.primarySoft]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.category}
        >
          <Text style={styles.categoryText}>Featured</Text>
        </LinearGradient>

        <Pressable
          onPress={handleFavoritePress}
          style={styles.favoriteButton}
          hitSlop={10}
        >
          <HeartIcon
            size={18}
            color={colors.white}
            variant={isFavorite ? 'filled' : 'outline'}
          />
        </Pressable>

        <View style={styles.overlay}>
          <Text style={styles.title} numberOfLines={2}>
            {post.title}
          </Text>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.description} numberOfLines={3}>
          {post.content}
        </Text>

        <View style={styles.meta}>
          <Text style={styles.date}>{formatPublishedDate(post.publishedAt)}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 20,
    marginBottom: 20,
    overflow: 'hidden',
    elevation: 4,
  },

  imageContainer: {
    position: 'relative',
  },

  image: {
    width: '100%',
    height: 240,
  },

  scrim: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 120,
  },

  favoriteButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'rgba(0,0,0,0.3)',
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },

  overlay: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 16,
  },

  category: {
    position: 'absolute',
    top: 16,
    left: 16,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },

  categoryText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '600',
  },

  title: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.white,
    lineHeight: 26,
  },

  content: {
    padding: 16,
  },

  description: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: 12,
  },

  meta: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },

  date: {
    fontSize: 13,
    color: colors.textMuted,
  },
});
