import { renderWithQueryClient } from '@/tests/test-utils';
import { fireEvent, screen } from '@testing-library/react-native';
import HomeScreen from '../index';

jest.mock('@/features/posts/hooks/usePosts', () => ({
  usePosts: () => ({
    data: [
      { id: 1, title: 'Bitcoin', content: 'Market', image: '', userId: 1, publishedAt: new Date().toISOString() },
      { id: 2, title: 'React Native', content: 'Performance', image: '', userId: 1, publishedAt: new Date().toISOString() },
    ],
    isLoading: false,
    isError: false,
    error: null,
    refetch: jest.fn(),
    isFetching: false,
  }),
}));

jest.mock('@/features/posts/components/PostCard', () => {
  const React = require('react');
  const { Text } = require('react-native');
  return { PostCard: ({ post }: any) => <Text>{post.title}</Text> };
});

describe('HomeScreen', () => {
  it('filters posts when typing in searchbar', () => {
    renderWithQueryClient(<HomeScreen />);

    expect(screen.getByText('Bitcoin')).toBeTruthy();
    expect(screen.getByText('React Native')).toBeTruthy();

    const input = screen.getByPlaceholderText('Search by title or content...');
    fireEvent.changeText(input, 'bitcoin');

    expect(screen.getByText('Bitcoin')).toBeTruthy();
    expect(screen.queryByText('React Native')).toBeNull();
  });
});
