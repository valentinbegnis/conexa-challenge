import FontAwesome from '@expo/vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';

import { usePost } from '@/features/posts/hooks/usePost';
import { useUsers } from '@/features/users/hooks/useUsers';
import { formatPublishedDate } from '@/utils/date';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function PostDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const postId = Number(id);

  const { data: post, isLoading: postsLoading, isError: postsError } = usePost(postId);
  const { data: users, isLoading: usersLoading, isError: usersError } = useUsers();
  const author = users?.find(u => u.id === post?.userId);

  if (postsLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (postsError || !post) {
    return (
      <View style={styles.center}>
        <Text>Post not found</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.hero}>
        <Image source={{ uri: post.image }} style={styles.image} />

        <LinearGradient
          colors={[
            'transparent',
            '#f9fafb3c',
            '#F9FAFB',
          ]}
          locations={[0, 0.5, 1]}
          style={styles.bottomFade}
        />

        <View style={[
          styles.headerActions,
          { top: insets.top + 8 },
        ]}>
          <Pressable onPress={() => router.back()} style={styles.iconButton}>
            <FontAwesome name="long-arrow-left" size={20} color="#14181f" />
          </Pressable>

          <View style={styles.rightActions}>
            <Pressable style={styles.iconButton}>
              <FontAwesome name="share-alt" size={20} color="#14181f" />
            </Pressable>
            <Pressable style={styles.iconButton}>
              <FontAwesome name="heart-o" size={20} color="#14181f" />
            </Pressable>
          </View>
        </View>
      </View>

      <View style={styles.card}>
        <View style={styles.metaRow}>
          <LinearGradient
            colors={['#ff6600', '#ffa01aff']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.category}
          >
            <Text style={styles.categoryText}>Featured</Text>
          </LinearGradient>

          <View style={styles.readTime}>
            <FontAwesome name="clock-o" size={14} color="#6B7280" />
            <Text style={styles.readTimeText}>5 min read</Text>
          </View>
        </View>

        <Text style={styles.title}>{post.title}</Text>

        <View style={styles.authorRow}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {author?.firstname?.[0] ?? 'A'}
            </Text>
          </View>

          <View>
            {usersLoading && (
              <Text style={styles.authorSkeleton}>Loading author...</Text>
            )}

            {usersError && (
              <Text style={styles.authorFallback}>Unknown author</Text>
            )}

            {!usersLoading && !usersError && author && (
              <Text style={styles.authorName}>
                {author
                  ? `${author.firstname} ${author.lastname}`
                  : 'Unknown'}
              </Text>
            )}

            <Text style={styles.date}>
              {formatPublishedDate(post.publishedAt)}
            </Text>
          </View>
        </View>

        <View style={styles.divider} />
        <Text style={styles.body}>{post.content}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  hero: {
    height: 420,
    position: 'relative',
    overflow: 'hidden'
  },

  scroll: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },

  scrollContent: {
    paddingBottom: 32,
  },

  image: {
    width: '100%',
    height: '100%',
  },

  blur: {
    ...StyleSheet.absoluteFillObject,
  },

  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
  },

  bottomFade: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 140,
  },

  headerActions: {
    position: 'absolute',
    left: 16,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  rightActions: {
    flexDirection: 'row',
    gap: 12,
  },

  iconButton: {
    backgroundColor: '#FFFFFF',
    width: 40,
    height: 40,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },

  card: {
    marginTop: -60,
    marginHorizontal: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 10,
  },

  authorSkeleton: {
    fontSize: 14,
    color: '#9CA3AF',
  },

  authorFallback: {
    fontSize: 14,
    color: '#6B7280',
    fontStyle: 'italic',
  },

  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },

  category: {
    backgroundColor: '#F97316',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },

  categoryText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },

  readTime: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  readTimeText: {
    fontSize: 12,
    color: '#6B7280',
  },

  title: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 16,
    color: '#111827',
  },

  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F97316',
    alignItems: 'center',
    justifyContent: 'center',
  },

  avatarText: {
    color: '#fff',
    fontWeight: '700',
  },

  authorName: {
    fontWeight: '600',
    fontSize: 14,
  },

  date: {
    fontSize: 12,
    color: '#6B7280',
  },

  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 24,
  },

  body: {
    fontSize: 15,
    lineHeight: 24,
    color: '#374151',
  },
});
