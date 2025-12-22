import { useFavoritesStore } from '@/stores/favoritesStore';
import { renderWithQueryClient } from '@/tests/test-utils';
import { screen } from '@testing-library/react-native';
import FavoritesScreen from '../favorites';

jest.mock('@/features/posts/hooks/usePosts', () => ({
  usePosts: () => ({
    data: [
      { id: 1, title: 'Hello', content: 'World', image: '', userId: 1, publishedAt: new Date().toISOString() },
      { id: 2, title: 'React', content: 'Native', image: '', userId: 1, publishedAt: new Date().toISOString() },
    ],
    isLoading: false,
    isError: false,
    error: null,
  }),
}));

describe('FavoritesScreen', () => {
  beforeEach(() => {
    useFavoritesStore.setState({ favoritePostIds: [] });
  });

  it('shows EmptyState when no favorites', () => {
    renderWithQueryClient(<FavoritesScreen />);
    expect(screen.getByText('No favorites yet')).toBeTruthy();
  });

  it('renders only favorite posts', () => {
    useFavoritesStore.setState({ favoritePostIds: [2] });

    renderWithQueryClient(<FavoritesScreen />);
    expect(screen.queryByText('Hello')).toBeNull();
    expect(screen.getByText('React')).toBeTruthy();
  });
});
