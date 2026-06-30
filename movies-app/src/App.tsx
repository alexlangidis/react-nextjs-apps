import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Search from "./components/Search";
import { Spinner } from "./components/ui/spinner";
import MovieCard from "./components/MovieCard";
import FavoritesSummary from "./components/FavoritesSummary";
import { moviesResponseSchema, type Movie } from "./types/types";
import { useDebounce } from "react-use";

const API_BASE_URL = "https://api.themoviedb.org/3";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

const fetchMovies = async (query = ""): Promise<Movie[]> => {
  const endpoint = query
    ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
    : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
  const res = await fetch(endpoint, API_OPTIONS);

  if (!res.ok) {
    throw new Error("Fail to fetch movies...");
  }

  const data = await res.json();
  const parsedData = moviesResponseSchema.parse(data);

  return parsedData.results;
};

function App() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm]);

  const {
    data: moviesList = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["movies", debouncedSearchTerm],
    queryFn: () => fetchMovies(debouncedSearchTerm),
  });

  return (
    <main>
      <div className="pattern" />

      <div className="wrapper">
        <header>
          <img src={"./hero.png"} alt="Hero Banner" />
          <h1>
            Find <span className="text-gradient">Movies</span> You'll Enjoy
            Without the Hassle
          </h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        <FavoritesSummary />

        <section className="all-movies">
          <h2 className="mt-10">All Movies</h2>
          {isLoading && (
            <p className="text-white flex items-center gap-2">
              <Spinner /> Loading...
            </p>
          )}
          {isError && (
            <p className="text-red-500">
              Error fetching movies. Please try again later.
            </p>
          )}
          <ul>
            {moviesList.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}

export default App;
