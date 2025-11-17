import useSWR from "swr";

import { useState } from "react";
import axios from "axios";

import { useDebounce } from "~/utils/use-debouncer";

import type { Movie } from "~/types/movie";

export const useSearchMovies = () => {
  const [query, setQuery] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const debouncedSearchTerm = useDebounce(query, 300);

  const fetcher = (url: string) =>
    axios(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
        "Content-Type": "application/json;charset=utf-8",
      },
    }).then((res) => res.data);
  const { data, error, isLoading } = useSWR<{
    page: number;
    results: Array<Movie>;
    total_pages: number;
    total_results: number;
  }>(
    debouncedSearchTerm
      ? `https://api.themoviedb.org/3/search/movie?query=${debouncedSearchTerm}`
      : null,
    fetcher,
  );

  const didUserStartSearching = debouncedSearchTerm.length > 0;
  const noMoviesFound = data?.results.length === 0;

  return {
    query,
    handleInputChange,
    data,
    error,
    isLoading,
    didUserStartSearching,
    noMoviesFound,
  };
};
