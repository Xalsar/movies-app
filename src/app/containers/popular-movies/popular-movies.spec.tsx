import { describe, it, expect, vi, beforeEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { PopularMovies } from "./popular-movies";
import * as usePopularMoviesModule from "./hooks/use-fetch-popular-movies";

vi.mock("~/components/ui/alert", () => ({
  Alert: ({ children, variant }: any) => (
    <div data-testid="alert" data-variant={variant}>
      {children}
    </div>
  ),
  AlertDescription: ({ children }: any) => (
    <div data-testid="alert-description">{children}</div>
  ),
  AlertTitle: ({ children }: any) => (
    <div data-testid="alert-title">{children}</div>
  ),
}));

vi.mock("~/app/components/loading-spinner", () => ({
  LoadingSpinner: ({ children }: any) => (
    <div data-testid="loading-spinner">{children}</div>
  ),
}));

vi.mock("~/app/components/movie-card", () => ({
  MovieCard: ({ title, imageUrl, releaseDate, rating, href }: any) => (
    <div data-testid={`movie-card-${title}`}>
      <a href={href} data-testid={`movie-link-${title}`}>
        {title}
      </a>
      {imageUrl && <img src={imageUrl} alt={title} />}
      <span data-testid={`release-date-${title}`}>{releaseDate}</span>
      <span data-testid={`rating-${title}`}>{rating}</span>
    </div>
  ),
}));

describe("PopularMovies", () => {
  const mockMoviesData = {
    results: [
      {
        id: 1,
        title: "Movie 1",
        poster_path: "/path1.jpg",
        release_date: "2024-01-01",
        vote_average: 8.5,
      },
      {
        id: 2,
        title: "Movie 2",
        poster_path: "/path2.jpg",
        release_date: "2024-02-01",
        vote_average: 7.5,
      },
      {
        id: 3,
        title: "Movie 3",
        poster_path: null,
        release_date: "2024-03-01",
        vote_average: 6.5,
      },
    ],
  };

  beforeEach(() => {
    vi.restoreAllMocks();
    vi.clearAllMocks();
    cleanup();
  });

  it("renders the title", () => {
    vi.spyOn(usePopularMoviesModule, "useFetchPopularMovies").mockReturnValue({
      data: null,
      error: null,
      isLoading: false,
    } as any);

    render(<PopularMovies />);
    expect(screen.getByText("Popular movies")).toBeInTheDocument();
  });

  it("displays loading spinner when data is loading", () => {
    vi.spyOn(usePopularMoviesModule, "useFetchPopularMovies").mockReturnValue({
      data: null,
      error: null,
      isLoading: true,
    } as any);

    render(<PopularMovies />);
    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
    expect(screen.getByText("Loading popular movies...")).toBeInTheDocument();
  });

  it("displays error alert when there is an error", () => {
    vi.spyOn(usePopularMoviesModule, "useFetchPopularMovies").mockReturnValue({
      data: null,
      error: new Error("Failed to fetch"),
      isLoading: false,
    } as any);

    render(<PopularMovies />);
    expect(screen.getByTestId("alert")).toBeInTheDocument();
    expect(screen.getByTestId("alert-title")).toHaveTextContent(
      "Error loading popular movies",
    );
    expect(screen.getByTestId("alert-description")).toHaveTextContent(
      "An unexpected error occurred while fetching popular movies",
    );
  });

  it("renders movie cards when data is available", () => {
    vi.spyOn(usePopularMoviesModule, "useFetchPopularMovies").mockReturnValue({
      data: mockMoviesData,
      error: null,
      isLoading: false,
    } as any);

    render(<PopularMovies />);

    mockMoviesData.results.forEach((movie) => {
      expect(
        screen.getByTestId(`movie-card-${movie.title}`),
      ).toBeInTheDocument();
    });
  });

  it("renders correct number of movie cards", () => {
    vi.spyOn(usePopularMoviesModule, "useFetchPopularMovies").mockReturnValue({
      data: mockMoviesData,
      error: null,
      isLoading: false,
    } as any);

    render(<PopularMovies />);

    const movieCards = screen.getAllByTestId(/^movie-card-/);
    expect(movieCards).toHaveLength(mockMoviesData.results.length);
  });

  it("passes correct props to MovieCard components", () => {
    vi.spyOn(usePopularMoviesModule, "useFetchPopularMovies").mockReturnValue({
      data: mockMoviesData,
      error: null,
      isLoading: false,
    } as any);

    render(<PopularMovies />);

    // Check first movie with poster
    expect(screen.getByTestId("movie-link-Movie 1")).toHaveAttribute(
      "href",
      "/movie/1",
    );
    expect(screen.getByAltText("Movie 1")).toHaveAttribute(
      "src",
      "https://image.tmdb.org/t/p/w500/path1.jpg",
    );
    expect(screen.getByTestId("release-date-Movie 1")).toHaveTextContent(
      "2024-01-01",
    );
    expect(screen.getByTestId("rating-Movie 1")).toHaveTextContent("8.5/10");

    // Check movie without poster
    expect(screen.queryByAltText("Movie 3")).not.toBeInTheDocument();
    expect(screen.getByTestId("movie-link-Movie 3")).toHaveAttribute(
      "href",
      "/movie/3",
    );
  });

  it("constructs correct image URLs for movies with poster_path", () => {
    vi.spyOn(usePopularMoviesModule, "useFetchPopularMovies").mockReturnValue({
      data: mockMoviesData,
      error: null,
      isLoading: false,
    } as any);

    render(<PopularMovies />);

    expect(screen.getByAltText("Movie 1")).toHaveAttribute(
      "src",
      "https://image.tmdb.org/t/p/w500/path1.jpg",
    );
    expect(screen.getByAltText("Movie 2")).toHaveAttribute(
      "src",
      "https://image.tmdb.org/t/p/w500/path2.jpg",
    );
  });

  it("does not render images for movies without poster_path", () => {
    vi.spyOn(usePopularMoviesModule, "useFetchPopularMovies").mockReturnValue({
      data: mockMoviesData,
      error: null,
      isLoading: false,
    } as any);

    render(<PopularMovies />);

    expect(screen.queryByAltText("Movie 3")).not.toBeInTheDocument();
  });

  it("does not display error or loading states when data is loaded successfully", () => {
    vi.spyOn(usePopularMoviesModule, "useFetchPopularMovies").mockReturnValue({
      data: mockMoviesData,
      error: null,
      isLoading: false,
    } as any);

    render(<PopularMovies />);

    expect(screen.queryByTestId("alert")).not.toBeInTheDocument();
    expect(screen.queryByTestId("loading-spinner")).not.toBeInTheDocument();
  });

  it("prioritizes error display over loading state", () => {
    vi.spyOn(usePopularMoviesModule, "useFetchPopularMovies").mockReturnValue({
      data: null,
      error: new Error("Failed to fetch"),
      isLoading: true,
    } as any);

    render(<PopularMovies />);

    expect(screen.getByTestId("alert")).toBeInTheDocument();
    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
  });

  it("handles empty results array", () => {
    vi.spyOn(usePopularMoviesModule, "useFetchPopularMovies").mockReturnValue({
      data: {
        results: [],
      },
      error: null,
      isLoading: false,
    } as any);

    render(<PopularMovies />);

    const movieCards = screen.queryAllByTestId(/^movie-card-/);
    expect(movieCards).toHaveLength(0);
  });
});
