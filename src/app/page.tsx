"use client";

import { Input } from "~/components/ui/input";

import { MovieCard } from "./components/movie-card";
import { LoadingSpinner } from "./components/loading-spinner";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { useSearchMovies } from "./containers/search-movies/hooks/use-search-movies";
import { PopularMovies } from "./containers/popular-movies/popular-movies";
import { SearchMovies } from "./containers/search-movies/search-movies";

export default function HomePage() {
  const {
    query,
    handleInputChange,
    data: searchMoviesData,
    error: searchMoviesError,
    isLoading: searchMoviesIsLoading,
    noMoviesFound,
    didUserStartSearching,
  } = useSearchMovies();

  return (
    <div className="mx-auto max-w-7xl py-3">
      <SearchMovies />
      <PopularMovies />
    </div>
  );
}
