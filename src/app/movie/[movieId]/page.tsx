"use client";

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import Image from "next/image";
import { Button } from "~/components/ui/button";
import { useNavigateToMoviesList } from "./hooks/use-navigate-to-movies-list";
import { useFetchMovieDetails } from "./hooks/use-fetch-movie-details";

import { fromMinutesToHoursAndMinutes } from "~/utils/from-minutes-to-hours-and-minutes";

import { useParams } from "next/navigation";
import { LoadingSpinner } from "~/app/components/loading-spinner";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";

export default function MoviePage() {
  const params = useParams();

  const movieId = params?.movieId as string;

  if (!movieId) {
    return <div>Movie ID is missing.</div>;
  }

  const { navigateToMoviesList } = useNavigateToMoviesList();
  const {
    data: movieDetailsData,
    error: movieDetailsError,
    isLoading: movieDetailsIsLoading,
  } = useFetchMovieDetails(movieId);

  console.log("movieDetailsData", movieDetailsData);

  return (
    <Card className="m-4 mx-auto max-w-7xl">
      <CardHeader>
        <CardTitle className="text-2xl">Movie Title</CardTitle>
      </CardHeader>
      <CardContent className="">
        <Button onClick={navigateToMoviesList}>Go back to main list</Button>
        {movieDetailsError && (
          <Alert variant="destructive">
            <AlertTitle>Error loading movie details</AlertTitle>
            <AlertDescription>
              An unexpected error occurred while fetching movie details. Please
              try again later. Contact support if the problem persists.
            </AlertDescription>
          </Alert>
        )}
        {movieDetailsIsLoading && (
          <LoadingSpinner>Loading movie details...</LoadingSpinner>
        )}
        {movieDetailsData && (
          <div className="flex flex-col items-center gap-3 text-center">
            <Image
              src={`https://image.tmdb.org/t/p/w500${movieDetailsData.poster_path}`}
              alt="Movie poster"
              width={800}
              height={1200}
              className="block"
            />
            <p>
              <span className="font-bold">Release date:</span>{" "}
              {movieDetailsData.release_date}
            </p>
            <p>
              <span className="font-bold">Overview:</span>{" "}
              {movieDetailsData.overview}
            </p>
            <p>
              <span className="font-bold">Genre:</span>{" "}
              {movieDetailsData.genres.map((genre) => genre.name).join(", ")}
            </p>
            <p>
              <span className="font-bold">Rating:</span>{" "}
              {movieDetailsData.vote_average} / 10 from{" "}
              {movieDetailsData.vote_count} votes
            </p>
            <p>
              <span className="font-bold">Runtime:</span>{" "}
              {fromMinutesToHoursAndMinutes(movieDetailsData.runtime)}
            </p>
            <p>
              <span className="font-bold">Languages:</span>{" "}
              {movieDetailsData.spoken_languages
                .map((lang) => lang.english_name)
                .join(", ")}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
