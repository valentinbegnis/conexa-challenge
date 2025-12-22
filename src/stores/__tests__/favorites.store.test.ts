import { useFavoritesStore } from '@/stores/favoritesStore';

describe('favoritesStore', () => {
  beforeEach(() => {
    useFavoritesStore.setState({ favoritePostIds: [] });
  });

  it('adds an id when toggled first time', () => {
    useFavoritesStore.getState().toggleFavorite(10);
    expect(useFavoritesStore.getState().favoritePostIds).toEqual([10]);
  });

  it('removes an id when toggled twice', () => {
    useFavoritesStore.getState().toggleFavorite(10);
    useFavoritesStore.getState().toggleFavorite(10);
    expect(useFavoritesStore.getState().favoritePostIds).toEqual([]);
  });

  it('does not duplicate ids', () => {
    useFavoritesStore.getState().toggleFavorite(10);
    useFavoritesStore.getState().toggleFavorite(10);
    useFavoritesStore.getState().toggleFavorite(10);
    expect(useFavoritesStore.getState().favoritePostIds).toEqual([10]);
  });
});
