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
      ? `${process.env.NEXT_PUBLIC_API_URL}/search/movie?query=${debouncedSearchTerm}&api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&page=1&include_adult=false`
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
