import type { Movie } from "@/types/types";
import { useFavoritesStore } from "@/stores/useFavoritesStore";

type MovieCardProps = {
  movie: Movie;
};

export default function MovieCard({ movie }: MovieCardProps) {
  const isFavorite = useFavoritesStore((state) => state.isFavorite(movie.id));
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);

  return (
    <div className="movie-card">
      <button
        type="button"
        className="mb-3 rounded-md bg-light-100/10 px-3 py-2 text-sm font-semibold text-white transition hover:bg-light-100/20"
        onClick={() => toggleFavorite(movie)}
      >
        {isFavorite ? "Remove favorite" : "Add favorite"}
      </button>

      <img
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
            : "/no-movie.png"
        }
        alt={movie.title}
      />

      <div className="mt-4">
        <h3>{movie.title}</h3>

        <div className="content">
          <div className="rating">
            <img src="star.svg" alt="star icon" />
            <p>{movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}</p>
          </div>
          <span>•</span>
          <p className="lang">{movie.original_language}</p>

          <span>•</span>
          <p className="year">
            {movie.release_date ? movie.release_date.split("-")[0] : "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
}
