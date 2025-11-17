import axios from "axios";
import useSWR from "swr";

import type { Movie } from "~/types/movie";

export const useFetchFavouriteMovies = () => {
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
    `${process.env.NEXT_PUBLIC_API_URL}/movie/popular?language=en-US&page=1`,
    fetcher,
  );

  return {
    data,
    error,
    isLoading,
  };
};
