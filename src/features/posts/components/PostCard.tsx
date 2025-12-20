import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Post } from '../types';

type Props = {
  post: Post;
  onPress?: () => void;
};

export function PostCard({ post, onPress }: Props) {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Image source={{ uri: post.thumbnail }} style={styles.image} />

      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {post.title}
        </Text>

        <Text style={styles.snippet} numberOfLines={3}>
          {post.content}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
    elevation: 2,
  },

  image: {
    width: 100,
    height: 100,
  },

  content: {
    flex: 1,
    padding: 12,
  },

  title: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },

  snippet: {
    fontSize: 13,
    color: '#6B7280',
  },
});
