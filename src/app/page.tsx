"use client";

import { Button } from "~/components/ui/button";

import { Input } from "~/components/ui/input";

import { MovieCard } from "./components/movie-card";
import { useNavigateToMovieDetails } from "./hooks/use-navigate-to-movie-details";
import { useFetchFavouriteMovies } from "./hooks/use-fetch-favourite-movies";
import { LoadingSpinner } from "./components/loading-spinner";

export default function HomePage() {
  const { navigateToMovieDetails } = useNavigateToMovieDetails();

  const {
    data: popularMoviesData,
    error: popularMoviesError,
    isLoading: popularMoviesIsLoading,
  } = useFetchFavouriteMovies();

  return (
    <div className="mx-auto max-w-7xl py-3">
      {/* <form className="flex gap-3">
        <Input name="search" placeholder="Search for a movie..." id="search" />
        <Button>Search</Button>
      </form>
      <div className="flex flex-wrap items-center justify-evenly">
        <MovieCard
          title="Mock title"
          imageUrl="https://picsum.photos/200/300"
          releaseDate="01/01/2024"
          rating="4/5"
          handleClickViewMoreDetails={() => navigateToMovieDetails("1")}
        />{" "}
        <MovieCard
          title="Mock title"
          imageUrl="https://picsum.photos/200/300"
          releaseDate="01/01/2024"
          rating="4/5"
          handleClickViewMoreDetails={() => navigateToMovieDetails("2")}
        />{" "}
        <MovieCard
          title="Mock title"
          imageUrl="https://picsum.photos/200/300"
          releaseDate="01/01/2024"
          rating="4/5"
          handleClickViewMoreDetails={() => navigateToMovieDetails("1")}
        />{" "}
        <MovieCard
          title="Mock title"
          imageUrl="https://picsum.photos/200/300"
          releaseDate="01/01/2024"
          rating="4/5"
          handleClickViewMoreDetails={() => navigateToMovieDetails("2")}
        />{" "}
        <MovieCard
          title="Mock title"
          imageUrl="https://picsum.photos/200/300"
          releaseDate="01/01/2024"
          rating="4/5"
          handleClickViewMoreDetails={() => navigateToMovieDetails("1")}
        />{" "}
        <MovieCard
          title="Mock title"
          imageUrl="https://picsum.photos/200/300"
          releaseDate="01/01/2024"
          rating="4/5"
          handleClickViewMoreDetails={() => navigateToMovieDetails("2")}
        />{" "}
      </div> */}
      <div className="mt-10">
        <h2 className="mb-3 text-3xl font-bold">Popular movies</h2>
        {popularMoviesIsLoading && (
          <LoadingSpinner>Loading popular movies...</LoadingSpinner>
        )}
        {popularMoviesData && (
          <div className="flex flex-wrap items-center justify-evenly">
            {popularMoviesData.results.map((movie) => (
              <MovieCard
                key={movie.id}
                title={movie.title}
                imageUrl={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
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
