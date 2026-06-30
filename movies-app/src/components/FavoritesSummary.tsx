import { useFavoritesStore } from "@/stores/useFavoritesStore";

export default function FavoritesSummary() {
  const favorites = useFavoritesStore((state) => state.favorites);
  const clearFavorites = useFavoritesStore((state) => state.clearFavorites);

  if (favorites.length === 0) {
    return (
      <section className="mt-10 rounded-lg bg-light-100/5 p-4 text-light-200">
        No favorites yet.
      </section>
    );
  }

  return (
    <section className="mt-10 rounded-lg bg-light-100/5 p-4">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-lg">Favorites ({favorites.length})</h2>
        <button
          type="button"
          className="rounded-md bg-light-100/10 px-3 py-2 text-sm font-semibold text-white transition hover:bg-light-100/20"
          onClick={clearFavorites}
        >
          Clear
        </button>
      </div>

      <ul className="mt-4 flex flex-col gap-2">
        {favorites.map((movie) => (
          <li key={movie.id} className="text-light-200">
            {movie.title}
          </li>
        ))}
      </ul>
    </section>
  );
}
