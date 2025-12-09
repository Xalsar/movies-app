import { LoadingSpinner } from "~/app/components/loading-spinner";
import { useFetchTopRatedMovies } from "./hooks/use-fetch-top-rated-movies";
import { MovieCard } from "~/app/components/movie-card";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";

export const TopRatedMovies = () => {
  const { data, error, isLoading } = useFetchTopRatedMovies();

  if (isLoading) {
    return <LoadingSpinner>Loading top rated movies...</LoadingSpinner>;
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircleIcon />
        <AlertTitle>Error loading top rated movies</AlertTitle>
        <AlertDescription>
          An unexpected error occurred while fetching top rated movies. Please
          try again later. Contact support if the problem persists.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="flex flex-wrap items-center justify-evenly">
      {data?.results.map((movie) => (
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
  );
};
