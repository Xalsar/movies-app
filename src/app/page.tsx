"use client";

import { Button } from "~/components/ui/button";

import { Input } from "~/components/ui/input";

import { MovieCard } from "./components/movie-card";
import { useNavigateToMovieDetails } from "./hooks/use-navigate-to-movie-details";

export default function HomePage() {
  const { navigateToMovieDetails } = useNavigateToMovieDetails();

  return (
    <div className="mx-auto max-w-7xl py-3">
      <form className="flex gap-3">
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
      </div>
      <div className="mt-10">
        <h2 className="mb-3 text-3xl font-bold">Popular movies</h2>
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
        </div>
      </div>
    </div>
  );
}
