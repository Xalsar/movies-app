import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { useFetchPopularMovies } from "./hooks/use-fetch-popular-movies";
import { LoadingSpinner } from "~/app/components/loading-spinner";
import { MovieCard } from "~/app/components/movie-card";
import { AlertCircleIcon } from "lucide-react";

export const PopularMovies = () => {
  const {
    data: popularMoviesData,
    error: popularMoviesError,
    isLoading: popularMoviesIsLoading,
  } = useFetchPopularMovies();

  return (
    <div className="mt-10">
      <h2 className="mb-2 text-2xl font-bold">Popular movies</h2>
      {popularMoviesError && (
        <Alert variant="destructive">
          <AlertCircleIcon />
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
                `${process.env.NEXT_PUBLIC_API_IMAGE_URL}/w500${movie.poster_path}`
              }
              releaseDate={movie.release_date}
              rating={`${movie.vote_average.toFixed(1)}/10`}
              href={`/movie/${movie.id}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
