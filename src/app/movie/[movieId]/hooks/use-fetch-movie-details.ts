import axios from "axios";
import useSWR from "swr";

import type { MovieDetails } from "~/types/movie-details";

export const useFetchMovieDetails = (movieId: string) => {
  const fetcher = (url: string) =>
    axios(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
        "Content-Type": "application/json;charset=utf-8",
      },
    }).then((res) => res.data);

  const { data, error, isLoading } = useSWR<MovieDetails>(
    `${process.env.NEXT_PUBLIC_API_URL}/movie/${movieId}?language=en-US`,
    fetcher,
  );

  return {
    data,
    error,
    isLoading,
  };
};
