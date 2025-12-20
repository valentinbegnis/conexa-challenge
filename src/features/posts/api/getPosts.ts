import { Post } from '../types';

const POSTS_URL = 'https://jsonplaceholder.org/posts';

type PostDTO = {
  id: number;
  title: string;
  content: string;
  image: string;
  thumbnail: string;
  publishedAt: string;
  userId: number;
};

export async function getPosts(): Promise<Post[]> {
  const response = await fetch(POSTS_URL);

  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }

  const data: PostDTO[] = await response.json();

  return data.map((post) => ({
    id: post.id,
    title: post.title,
    content: post.content,
    image: post.image,
    thumbnail: post.thumbnail,
    publishedAt: post.publishedAt,
    userId: post.userId,
  }));
}
