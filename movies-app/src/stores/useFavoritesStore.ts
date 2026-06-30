import { create } from "zustand";
import type { Movie } from "@/types/types";

type FavoritesStore = {
  favorites: Movie[];
  addFavorite: (movie: Movie) => void;
  removeFavorite: (movieId: number) => void;
  isFavorite: (movieId: number) => boolean;
  toggleFavorite: (movie: Movie) => void;
  clearFavorites: () => void;
};

export const useFavoritesStore = create<FavoritesStore>((set, get) => ({
  favorites: [],

  addFavorite: (movie) =>
    set((state) => {
      const alreadyFavorite = state.favorites.some(
        (favorite) => favorite.id === movie.id,
      );

      if (alreadyFavorite) {
        return state;
      }

      return {
        favorites: [...state.favorites, movie],
      };
    }),

  removeFavorite: (movieId) =>
    set((state) => ({
      favorites: state.favorites.filter((movie) => movie.id !== movieId),
    })),

  isFavorite: (movieId) =>
    get().favorites.some((movie) => movie.id === movieId),

  toggleFavorite: (movie) => {
    if (get().isFavorite(movie.id)) {
      get().removeFavorite(movie.id);
      return;
    }

    get().addFavorite(movie);
  },

  clearFavorites: () => set({ favorites: [] }),
}));
