import { useQuery } from '@tanstack/react-query';
import { getPosts } from '../api/getPosts';
import { Post } from '../types';

export function usePosts() {
  return useQuery<Post[]>({
    queryKey: ['posts'],
    queryFn: getPosts,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
