import { formatPublishedDate } from '@/utils/date';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Post } from '../types';

type Props = {
  post: Post;
  onPress?: () => void;
  isFavorite?: boolean;
};

export function PostCard({ post, onPress, isFavorite }: Props) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: post.image }} style={styles.image} />

        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.5)']}
          style={styles.scrim}
        />

        <LinearGradient
          colors={['#ff6600', '#ffa01aff']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.category}
        >
          <Text style={styles.categoryText}>
            Featured
          </Text>
        </LinearGradient>

        <View style={styles.favoriteButton}>
          <FontAwesome
            name={isFavorite ? 'heart' : 'heart-o'}
            size={16}
            color="#fff"
          />
        </View>

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
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginBottom: 20,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
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
    backgroundColor: 'rgba(0,0,0,0.45)',
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
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },

  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    lineHeight: 26,
  },

  content: {
    padding: 16,
  },

  description: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 12,
  },

  meta: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },

  author: {
    fontSize: 13,
    color: '#374151',
    fontWeight: '600',
  },

  date: {
    fontSize: 13,
    color: '#9CA3AF',
  },
});
