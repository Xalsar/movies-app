import { Input } from "~/components/ui/input";
import { useSearchMovies } from "./hooks/use-search-movies";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { LoadingSpinner } from "~/app/components/loading-spinner";
import { MovieCard } from "~/app/components/movie-card";
import { Search } from "lucide-react";

export const SearchMovies = () => {
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
    <>
      <h2 className="mb-2 text-2xl font-bold">Movie searcher</h2>
      <form
        className="relative flex gap-3"
        onSubmit={(e) => e.preventDefault()}
      >
        <Search
          className="absolute top-1/2 right-3 -translate-y-1/2 transform text-slate-500"
          size={20}
        />
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
        <Alert variant="destructive" className="mt-2">
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
                `${process.env.NEXT_PUBLIC_API_IMAGE_URL}/w500${movie.poster_path}`
              }
              releaseDate={movie.release_date}
              rating={`${movie.vote_average}/10`}
              href={`/movie/${movie.id}`}
            />
          ))}
      </div>
    </>
  );
};
