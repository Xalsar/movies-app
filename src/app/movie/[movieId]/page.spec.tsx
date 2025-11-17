import { describe, it, expect, vi, beforeEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import MoviePage from "./page";
import * as useFetchMovieDetailsModule from "./hooks/use-fetch-movie-details";
import { fromMinutesToHoursAndMinutes } from "~/utils/from-minutes-to-hours-and-minutes";

vi.stubEnv("NEXT_PUBLIC_API_IMAGE_URL", "https://image.tmdb.org/t/p");

// Use vi.hoisted to create mock functions that can be used in vi.mock
const { mockUseParams } = vi.hoisted(() => ({
  mockUseParams: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  useParams: mockUseParams,
}));

vi.mock("~/components/ui/card", () => ({
  Card: ({ children, className }: any) => (
    <div data-testid="card" className={className}>
      {children}
    </div>
  ),
  CardContent: ({ children, className }: any) => (
    <div data-testid="card-content" className={className}>
      {children}
    </div>
  ),
  CardHeader: ({ children }: any) => (
    <div data-testid="card-header">{children}</div>
  ),
  CardTitle: ({ children, className }: any) => (
    <h1 data-testid="card-title" className={className}>
      {children}
    </h1>
  ),
}));

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

vi.mock("next/link", () => ({
  default: ({ children, href, className }: any) => (
    <a href={href} className={className} data-testid="back-link">
      {children}
    </a>
  ),
}));

vi.mock("lucide-react", () => ({
  AlertCircleIcon: () => <div data-testid="alert-circle-icon" />,
  ArrowLeft: ({ size, className }: any) => (
    <div data-testid="arrow-left-icon" data-size={size} className={className} />
  ),
}));

vi.mock("~/utils/from-minutes-to-hours-and-minutes", () => ({
  fromMinutesToHoursAndMinutes: vi.fn((minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  }),
}));

describe("MoviePage", () => {
  const mockMovieDetails = {
    id: 1,
    title: "Inception",
    overview: "A mind-bending thriller about dreams within dreams.",
    release_date: "2010-07-16",
    poster_path: "/inception-poster.jpg",
    genres: [
      { id: 1, name: "Action" },
      { id: 2, name: "Science Fiction" },
      { id: 3, name: "Thriller" },
    ],
    vote_average: 8.8,
    vote_count: 35000,
    runtime: 148,
    spoken_languages: [
      { english_name: "English", iso_639_1: "en" },
      { english_name: "French", iso_639_1: "fr" },
    ],
  };

  beforeEach(() => {
    vi.restoreAllMocks();
    vi.clearAllMocks();
    cleanup();

    // Set default mock return value for useParams
    mockUseParams.mockReturnValue({ movieId: "1" });
  });

  it("renders the card container", () => {
    vi.spyOn(
      useFetchMovieDetailsModule,
      "useFetchMovieDetails",
    ).mockReturnValue({
      data: null,
      error: null,
      isLoading: false,
      isNotFoundError: false,
    } as any);

    render(<MoviePage />);
    expect(screen.getByTestId("card")).toBeInTheDocument();
    expect(screen.getByTestId("card-content")).toBeInTheDocument();
  });

  it("renders back to movies list link", () => {
    vi.spyOn(
      useFetchMovieDetailsModule,
      "useFetchMovieDetails",
    ).mockReturnValue({
      data: null,
      error: null,
      isLoading: false,
      isNotFoundError: false,
    } as any);

    render(<MoviePage />);
    const backLink = screen.getByTestId("back-link");
    expect(backLink).toBeInTheDocument();
    expect(backLink).toHaveAttribute("href", "/");
    expect(screen.getByText("Back to movies list")).toBeInTheDocument();
    expect(screen.getByTestId("arrow-left-icon")).toBeInTheDocument();
  });

  it("displays loading spinner when data is loading", () => {
    vi.spyOn(
      useFetchMovieDetailsModule,
      "useFetchMovieDetails",
    ).mockReturnValue({
      data: null,
      error: null,
      isLoading: true,
      isNotFoundError: false,
    } as any);

    render(<MoviePage />);
    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
    expect(screen.getByText("Loading movie details...")).toBeInTheDocument();
  });

  it("displays not found error alert when movie is not found", () => {
    vi.spyOn(
      useFetchMovieDetailsModule,
      "useFetchMovieDetails",
    ).mockReturnValue({
      data: null,
      error: new Error("Not found"),
      isLoading: false,
      isNotFoundError: true,
    } as any);

    render(<MoviePage />);
    expect(screen.getByTestId("alert")).toBeInTheDocument();
    expect(screen.getByTestId("alert")).toHaveAttribute(
      "data-variant",
      "destructive",
    );
    expect(screen.getByTestId("alert-title")).toHaveTextContent(
      "Movie not found",
    );
    expect(screen.getByTestId("alert-description")).toHaveTextContent(
      "The movie you are looking for does not exist or has been removed",
    );
  });

  it("displays generic error alert when there is an error that is not 404", () => {
    vi.spyOn(
      useFetchMovieDetailsModule,
      "useFetchMovieDetails",
    ).mockReturnValue({
      data: null,
      error: new Error("Server error"),
      isLoading: false,
      isNotFoundError: false,
    } as any);

    render(<MoviePage />);
    expect(screen.getByTestId("alert")).toBeInTheDocument();
    expect(screen.getByTestId("alert-title")).toHaveTextContent(
      "Error loading movie details",
    );
    expect(screen.getByTestId("alert-description")).toHaveTextContent(
      "An unexpected error occurred while fetching movie details",
    );
  });

  it("does not display generic error alert when isNotFoundError is true", () => {
    vi.spyOn(
      useFetchMovieDetailsModule,
      "useFetchMovieDetails",
    ).mockReturnValue({
      data: null,
      error: new Error("Not found"),
      isLoading: false,
      isNotFoundError: true,
    } as any);

    render(<MoviePage />);
    expect(screen.getByTestId("alert-title")).toHaveTextContent(
      "Movie not found",
    );
    expect(screen.getByTestId("alert-title")).not.toHaveTextContent(
      "Error loading movie details",
    );
  });

  it("renders movie title in card header when data is available", () => {
    vi.spyOn(
      useFetchMovieDetailsModule,
      "useFetchMovieDetails",
    ).mockReturnValue({
      data: mockMovieDetails,
      error: null,
      isLoading: false,
      isNotFoundError: false,
    } as any);

    render(<MoviePage />);
    expect(screen.getByTestId("card-header")).toBeInTheDocument();
    expect(screen.getByTestId("card-title")).toHaveTextContent("Inception");
  });

  it("renders movie poster when poster_path is available", () => {
    vi.spyOn(
      useFetchMovieDetailsModule,
      "useFetchMovieDetails",
    ).mockReturnValue({
      data: mockMovieDetails,
      error: null,
      isLoading: false,
      isNotFoundError: false,
    } as any);

    render(<MoviePage />);
    const poster = screen.getByAltText("Inception poster");
    expect(poster).toBeInTheDocument();
    expect(poster).toHaveAttribute(
      "src",
      "https://image.tmdb.org/t/p/w500/inception-poster.jpg",
    );
  });

  it("does not render poster when poster_path is null", () => {
    const movieWithoutPoster = { ...mockMovieDetails, poster_path: null };
    vi.spyOn(
      useFetchMovieDetailsModule,
      "useFetchMovieDetails",
    ).mockReturnValue({
      data: movieWithoutPoster,
      error: null,
      isLoading: false,
      isNotFoundError: false,
    } as any);

    render(<MoviePage />);
    expect(screen.queryByAltText("Inception poster")).not.toBeInTheDocument();
  });

  it("renders release date", () => {
    vi.spyOn(
      useFetchMovieDetailsModule,
      "useFetchMovieDetails",
    ).mockReturnValue({
      data: mockMovieDetails,
      error: null,
      isLoading: false,
      isNotFoundError: false,
    } as any);

    render(<MoviePage />);
    expect(
      screen.getByText("Release date:", { exact: false }),
    ).toBeInTheDocument();
    expect(screen.getByText(/2010-07-16/)).toBeInTheDocument();
  });

  it("renders overview", () => {
    vi.spyOn(
      useFetchMovieDetailsModule,
      "useFetchMovieDetails",
    ).mockReturnValue({
      data: mockMovieDetails,
      error: null,
      isLoading: false,
      isNotFoundError: false,
    } as any);

    render(<MoviePage />);
    expect(screen.getByText("Overview:", { exact: false })).toBeInTheDocument();
    expect(
      screen.getByText(/A mind-bending thriller about dreams within dreams/),
    ).toBeInTheDocument();
  });

  it("renders genres correctly formatted", () => {
    vi.spyOn(
      useFetchMovieDetailsModule,
      "useFetchMovieDetails",
    ).mockReturnValue({
      data: mockMovieDetails,
      error: null,
      isLoading: false,
      isNotFoundError: false,
    } as any);

    render(<MoviePage />);
    expect(screen.getByText("Genre:", { exact: false })).toBeInTheDocument();
    expect(
      screen.getByText(/Action, Science Fiction, Thriller/),
    ).toBeInTheDocument();
  });

  it("renders rating with vote count", () => {
    vi.spyOn(
      useFetchMovieDetailsModule,
      "useFetchMovieDetails",
    ).mockReturnValue({
      data: mockMovieDetails,
      error: null,
      isLoading: false,
      isNotFoundError: false,
    } as any);

    render(<MoviePage />);
    expect(screen.getByText("Rating:", { exact: false })).toBeInTheDocument();
    expect(screen.getByText(/8.8 \/ 10 from 35000 votes/)).toBeInTheDocument();
  });

  it("renders runtime formatted as hours and minutes", () => {
    vi.spyOn(
      useFetchMovieDetailsModule,
      "useFetchMovieDetails",
    ).mockReturnValue({
      data: mockMovieDetails,
      error: null,
      isLoading: false,
      isNotFoundError: false,
    } as any);

    render(<MoviePage />);
    expect(screen.getByText("Runtime:", { exact: false })).toBeInTheDocument();
    expect(screen.getByText(/2h 28m/)).toBeInTheDocument();
    expect(fromMinutesToHoursAndMinutes).toHaveBeenCalledWith(148);
  });

  it("renders spoken languages correctly formatted", () => {
    vi.spyOn(
      useFetchMovieDetailsModule,
      "useFetchMovieDetails",
    ).mockReturnValue({
      data: mockMovieDetails,
      error: null,
      isLoading: false,
      isNotFoundError: false,
    } as any);

    render(<MoviePage />);
    expect(
      screen.getByText("Languages:", { exact: false }),
    ).toBeInTheDocument();
    expect(screen.getByText(/English, French/)).toBeInTheDocument();
  });

  it("uses movieId from params to fetch movie details", () => {
    mockUseParams.mockReturnValue({ movieId: "12345" });

    const mockUseFetchMovieDetails = vi
      .spyOn(useFetchMovieDetailsModule, "useFetchMovieDetails")
      .mockReturnValue({
        data: null,
        error: null,
        isLoading: false,
        isNotFoundError: false,
      } as any);

    render(<MoviePage />);
    expect(mockUseFetchMovieDetails).toHaveBeenCalledWith("12345");
  });

  it("does not render movie details when data is null", () => {
    vi.spyOn(
      useFetchMovieDetailsModule,
      "useFetchMovieDetails",
    ).mockReturnValue({
      data: null,
      error: null,
      isLoading: false,
      isNotFoundError: false,
    } as any);

    render(<MoviePage />);
    expect(screen.queryByTestId("card-header")).not.toBeInTheDocument();
    expect(
      screen.queryByText("Release date:", { exact: false }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText("Overview:", { exact: false }),
    ).not.toBeInTheDocument();
  });

  it("does not display error or loading states when data is loaded successfully", () => {
    vi.spyOn(
      useFetchMovieDetailsModule,
      "useFetchMovieDetails",
    ).mockReturnValue({
      data: mockMovieDetails,
      error: null,
      isLoading: false,
      isNotFoundError: false,
    } as any);

    render(<MoviePage />);
    expect(screen.queryByTestId("alert")).not.toBeInTheDocument();
    expect(screen.queryByTestId("loading-spinner")).not.toBeInTheDocument();
  });

  it("renders all movie details in correct container with max-width", () => {
    vi.spyOn(
      useFetchMovieDetailsModule,
      "useFetchMovieDetails",
    ).mockReturnValue({
      data: mockMovieDetails,
      error: null,
      isLoading: false,
      isNotFoundError: false,
    } as any);

    const { container } = render(<MoviePage />);
    const detailsContainer = container.querySelector(".max-w-3xl");
    expect(detailsContainer).toBeInTheDocument();
  });
});
