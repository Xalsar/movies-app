"use client";

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { useFetchMovieDetails } from "./hooks/use-fetch-movie-details";
import Link from "next/link";

import { fromMinutesToHoursAndMinutes } from "~/utils/from-minutes-to-hours-and-minutes";

import { useParams } from "next/navigation";
import { LoadingSpinner } from "~/app/components/loading-spinner";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";

import { ArrowLeft } from "lucide-react";

export default function MoviePage() {
  const params = useParams();

  const movieId = params?.movieId as string;

  if (!movieId) {
    return <div>Movie ID is missing.</div>;
  }

  const {
    data: movieDetailsData,
    error: movieDetailsError,
    isLoading: movieDetailsIsLoading,
  } = useFetchMovieDetails(movieId);

  return (
    <Card className="m-4 mx-auto max-w-7xl">
      {movieDetailsData && (
        <CardHeader>
          <CardTitle className="text-2xl">{movieDetailsData.title}</CardTitle>
        </CardHeader>
      )}
      <CardContent className="">
        <Link
          href="/"
          className="text-primary mb-4 flex gap-1 align-middle underline"
        >
          <ArrowLeft size={15} className="mt-1" />{" "}
          <span className="block">Back to movies list</span>
        </Link>
        {movieDetailsError && (
          <Alert variant="destructive" className="mt-2">
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
          <div className="flex flex-col items-center gap-3">
            <img
              src={`${process.env.NEXT_PUBLIC_API_IMAGE_URL}/w500${movieDetailsData.poster_path}`}
              alt={`${movieDetailsData.title} poster`}
            />
            <div className="max-w-3xl">
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
          </div>
        )}
      </CardContent>
    </Card>
  );
}
