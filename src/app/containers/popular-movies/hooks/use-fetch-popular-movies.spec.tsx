import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useFetchPopularMovies } from "./use-fetch-popular-movies";
import axios from "axios";
import { SWRConfig } from "swr";

vi.mock("axios", () => {
  return {
    default: vi.fn(),
  };
});

process.env.NEXT_PUBLIC_API_URL = "http://mock-api.com/v3";
process.env.NEXT_PUBLIC_API_KEY = "mock-key";

const mockMovieData = {
  page: 1,
  results: [
    { id: 1, title: "Mock Movie 1" } as any,
    { id: 2, title: "Mock Movie 2" } as any,
  ],
  total_pages: 10,
  total_results: 200,
};

const mockedAxios = vi.mocked(axios, true);

const cacheKey =
  "http://mock-api.com/v3/movie/popular?language=en-US&page=1&api_key=mock-key";

describe("useFetchPopularMovies", () => {
  beforeEach(async () => {
    vi.clearAllMocks();

    await new Promise((resolve) => setTimeout(resolve, 50));
  });

  it("should return data on successful fetch", async () => {
    mockedAxios.mockResolvedValueOnce({ data: mockMovieData });

    const { result } = renderHook(() => useFetchPopularMovies(), {
      wrapper: ({ children }) => (
        <SWRConfig value={{ dedupingInterval: 0, provider: () => new Map() }}>
          {children}
        </SWRConfig>
      ),
    });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeUndefined();
    expect(result.current.error).toBeUndefined();

    await waitFor(
      () => {
        expect(result.current.isLoading).toBe(false);
        expect(result.current.data).toEqual(mockMovieData);
        expect(result.current.error).toBeUndefined();
      },
      { timeout: 3000 },
    );

    expect(mockedAxios).toHaveBeenCalledWith(cacheKey, expect.any(Object));
  });

  it("should return error on failed fetch", async () => {
    const mockError = new Error("API failed");

    mockedAxios.mockRejectedValueOnce(mockError);

    const { result } = renderHook(() => useFetchPopularMovies(), {
      wrapper: ({ children }) => (
        <SWRConfig value={{ dedupingInterval: 0, provider: () => new Map() }}>
          {children}
        </SWRConfig>
      ),
    });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeUndefined();
    expect(result.current.error).toBeUndefined();

    await waitFor(
      () => {
        expect(result.current.isLoading).toBe(false);
        expect(result.current.data).toBeUndefined();
        expect(result.current.error).toEqual(mockError);
      },
      { timeout: 3000 },
    );
  });
});
