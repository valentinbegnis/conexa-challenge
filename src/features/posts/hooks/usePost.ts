import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Post } from '../types';

export function usePost(id: number) {
  const queryClient = useQueryClient();

  return useQuery<Post | undefined>({
    queryKey: ['post', id],
    queryFn: async () => {
      const posts = queryClient.getQueryData<Post[]>(['posts']);
      return posts?.find((p) => p.id === id);
    },
    enabled: Number.isFinite(id),
  });
}
