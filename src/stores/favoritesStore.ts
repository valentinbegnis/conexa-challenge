import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type FavoritesState = {
  favoritePostIds: number[];
  toggleFavorite: (postId: number) => void;
};

export const useFavoritesStore = create(
  persist<FavoritesState>(
    (set) => ({
      favoritePostIds: [],

      toggleFavorite: (postId) =>
        set((state) => ({
          favoritePostIds: state.favoritePostIds.includes(postId)
            ? state.favoritePostIds.filter((id) => id !== postId)
            : [...state.favoritePostIds, postId],
        })),
    }),
    {
      name: 'favorites-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
