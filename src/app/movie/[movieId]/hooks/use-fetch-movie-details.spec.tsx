import { renderHook, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import axios from "axios";
import { SWRConfig } from "swr";

import { useFetchMovieDetails } from "./use-fetch-movie-details";
import type { MovieDetails } from "~/types/movie-details";

vi.mock("axios");
const mockedAxios = vi.mocked(axios);

const MOCK_API_URL = "https://api.example.com";
const MOCK_API_KEY = "test-api-key";

vi.stubEnv("NEXT_PUBLIC_API_URL", MOCK_API_URL);
vi.stubEnv("NEXT_PUBLIC_API_KEY", MOCK_API_KEY);

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <SWRConfig value={{ dedupingInterval: 0, provider: () => new Map() }}>
    {children}
  </SWRConfig>
);

const mockMovieDetails = {
  id: 123,
  title: "Test Movie",
  overview: "A test movie overview",
  release_date: "2025-01-01",
  poster_path: "/test-poster.jpg",
  backdrop_path: "/test-backdrop.jpg",
  vote_average: 8.5,
  vote_count: 1000,
  runtime: 120,
  genres: [{ id: 1, name: "Action" }],
};

describe("useFetchMovieDetails", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should return data on successful fetch", async () => {
    const movieId = "123";
    mockedAxios.mockResolvedValueOnce({ data: mockMovieDetails });

    const { result } = renderHook(() => useFetchMovieDetails(movieId), {
      wrapper,
    });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeUndefined();
    expect(result.current.error).toBeUndefined();
    expect(result.current.isNotFoundError).toBeFalsy();

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data).toEqual(mockMovieDetails);
    expect(result.current.error).toBeUndefined();
    expect(result.current.isNotFoundError).toBeFalsy();
  });

  it("should handle 404 errors correctly", async () => {
    const movieId = "999";
    const notFoundError = {
      response: {
        status: 404,
        data: { message: "Movie not found" },
      },
    };

    mockedAxios.mockRejectedValueOnce(notFoundError);

    const { result } = renderHook(() => useFetchMovieDetails(movieId), {
      wrapper,
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data).toBeUndefined();
    expect(result.current.error).toBeDefined();
    expect(result.current.isNotFoundError).toBe(true);
  });

  it("should handle non-404 errors correctly", async () => {
    const movieId = "123";
    const serverError = {
      response: {
        status: 500,
        data: { message: "Internal server error" },
      },
    };

    mockedAxios.mockRejectedValueOnce(serverError);

    const { result } = renderHook(() => useFetchMovieDetails(movieId), {
      wrapper,
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data).toBeUndefined();
    expect(result.current.error).toBeDefined();
    expect(result.current.isNotFoundError).toBe(false);
  });

  it("should handle network errors without response object", async () => {
    const movieId = "123";
    const networkError = new Error("Network error");

    mockedAxios.mockRejectedValueOnce(networkError);

    const { result } = renderHook(() => useFetchMovieDetails(movieId), {
      wrapper,
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data).toBeUndefined();
    expect(result.current.error).toBeDefined();
    expect(result.current.isNotFoundError).toBe(false);
  });

  it("should fetch different movies when movieId changes", async () => {
    const movieId1 = "123";
    const movieId2 = "456";

    const mockMovieDetails2 = {
      ...mockMovieDetails,
      id: 456,
      title: "Another Test Movie",
    };

    mockedAxios.mockResolvedValueOnce({ data: mockMovieDetails });

    const { result, rerender } = renderHook(
      ({ id }) => useFetchMovieDetails(id),
      {
        wrapper,
        initialProps: { id: movieId1 },
      },
    );

    await waitFor(() => {
      expect(result.current.data).toEqual(mockMovieDetails);
    });

    // Change movieId
    mockedAxios.mockResolvedValueOnce({ data: mockMovieDetails2 });
    rerender({ id: movieId2 });

    await waitFor(() => {
      expect(result.current.data).toEqual(mockMovieDetails2);
    });

    expect(mockedAxios).toHaveBeenCalledTimes(2);
  });
});
