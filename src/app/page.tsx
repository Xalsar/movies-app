"use client";

import { Button } from "~/components/ui/button";

import { Input } from "~/components/ui/input";

import { MovieCard } from "./components/movie-card";
import { useNavigateToMovieDetails } from "./hooks/use-navigate-to-movie-details";
import { useFetchFavouriteMovies } from "./hooks/use-fetch-favourite-movies";
import { LoadingSpinner } from "./components/loading-spinner";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { useSearchMovies } from "./hooks/use-search-movies";

export default function HomePage() {
  const { navigateToMovieDetails } = useNavigateToMovieDetails();

  const {
    data: popularMoviesData,
    error: popularMoviesError,
    isLoading: popularMoviesIsLoading,
  } = useFetchFavouriteMovies();

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
      <h2 className="mb-3 text-2xl font-bold">Movie searcher</h2>
      <form className="flex gap-3" onSubmit={(e) => e.preventDefault()}>
        <Input
          name="search"
          placeholder="Search for a movie..."
          id="search"
          value={query}
          onChange={handleInputChange}
        />
      </form>
      {!didUserStartSearching && (
        <Alert className="mt-2">
          <AlertTitle>Search for movies</AlertTitle>
          <AlertDescription>
            Use the search bar above to find your favorite movies by title.
          </AlertDescription>
        </Alert>
      )}
      {!searchMoviesIsLoading && noMoviesFound && didUserStartSearching && (
        <Alert className="mt-2">
          <AlertTitle>No search results</AlertTitle>
          <AlertDescription>
            No movies found matching your search criteria. Please try a
            different keyword.
          </AlertDescription>
        </Alert>
      )}
      {searchMoviesError && (
        <Alert variant="destructive">
          <AlertTitle>Error loading search results</AlertTitle>
          <AlertDescription>
            An unexpected error occurred while searching for movies. Please try
            again later. Contact support if the problem persists.
          </AlertDescription>
        </Alert>
      )}
      {searchMoviesIsLoading && (
        <LoadingSpinner>Searching for movies...</LoadingSpinner>
      )}
      <div className="flex flex-wrap items-center justify-evenly">
        {searchMoviesData &&
          searchMoviesData.results.map((movie) => (
            <MovieCard
              key={movie.id}
              title={movie.title}
              imageUrl={
                movie.poster_path &&
                `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              }
              releaseDate={movie.release_date}
              rating={`${movie.vote_average}/10`}
              handleClickViewMoreDetails={() =>
                navigateToMovieDetails(movie.id.toString())
              }
            />
          ))}
      </div>
      <div className="mt-10">
        <h2 className="mb-3 text-2xl font-bold">Popular movies</h2>
        {popularMoviesError && (
          <Alert variant="destructive">
            <AlertTitle>Error loading popular movies</AlertTitle>
            <AlertDescription>
              An unexpected error occurred while fetching popular movies. Please
              try again later. Contact support if the problem persists.
            </AlertDescription>
          </Alert>
        )}
        {popularMoviesIsLoading && (
          <LoadingSpinner>Loading popular movies...</LoadingSpinner>
        )}
        {popularMoviesData && (
          <div className="flex flex-wrap items-center justify-evenly">
            {popularMoviesData.results.map((movie) => (
              <MovieCard
                key={movie.id}
                title={movie.title}
                imageUrl={
                  movie.poster_path &&
                  `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                }
                releaseDate={movie.release_date}
                rating={`${movie.vote_average}/10`}
                handleClickViewMoreDetails={() =>
                  navigateToMovieDetails(movie.id.toString())
                }
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
