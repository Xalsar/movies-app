"use client";

import { PopularMovies } from "./containers/popular-movies/popular-movies";
import { SearchMovies } from "./containers/search-movies/search-movies";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { TopRatedMovies } from "./containers/top-rated-movies/top-rated-movies";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-7xl py-3">
      <SearchMovies />
      <Tabs defaultValue="popular" className="mt-6">
        <TabsList>
          <TabsTrigger value="popular">Popular Movies</TabsTrigger>
          <TabsTrigger value="top-rated">Top Rated Movies</TabsTrigger>
        </TabsList>
        <TabsContent value="popular">
          <PopularMovies />
        </TabsContent>
        <TabsContent value="top-rated">
          <TopRatedMovies />
        </TabsContent>
      </Tabs>
    </div>
  );
}
