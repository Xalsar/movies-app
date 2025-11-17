"use client";

import { PopularMovies } from "./containers/popular-movies/popular-movies";
import { SearchMovies } from "./containers/search-movies/search-movies";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-7xl py-3">
      <SearchMovies />
      <PopularMovies />
    </div>
  );
}
