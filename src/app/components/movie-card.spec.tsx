import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, test, vi } from "vitest";

import { MovieCard } from "./movie-card";

vi.mock("next/link", () => ({
  default: vi.fn(({ children, href }) => (
    <a href={href}>{children}</a> // Use a regular anchor tag for testing
  )),
}));

vi.mock("~/components/ui/card", () => ({
  Card: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className: string;
  }) => (
    <div data-testid="card-mock" className={className}>
      {children}
    </div>
  ),
  CardContent: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className: string;
  }) => (
    <div data-testid="card-content-mock" className={className}>
      {children}
    </div>
  ),
  CardTitle: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className: string;
  }) => (
    <h2 data-testid="card-title-mock" className={className}>
      {children}
    </h2>
  ),
}));

vi.mock("lucide-react", () => ({
  Star: ({ size, className }: { size: number; className?: string }) => (
    <svg
      data-testid="star-icon-mock"
      className={className}
      width={size}
      height={size}
    >
      <polygon points="10,1 12,7 18,7 13,11 15,17 10,13 5,17 7,11 2,7 8,7" />
    </svg>
  ),
}));

const mockProps = {
  href: "/movie/123",
  imageUrl: "https://example.com/poster.jpg",
  title: "Example Movie",
  releaseDate: "2023-10-27",
  rating: "8.5/10",
};

afterEach(() => {
  cleanup();
});

test("renders all movie information and the link", () => {
  render(<MovieCard {...mockProps} />);

  expect(
    screen.getByRole("heading", { name: /Example Movie/i }),
  ).toBeInTheDocument();

  expect(screen.getByText("2023-10-27")).toBeInTheDocument();
  expect(screen.getByText("8.5/10")).toBeInTheDocument();

  const image = screen.getByRole("img", { name: /Example Movie poster/i });
  expect(image).toBeInTheDocument();
  expect(image).toHaveAttribute("src", mockProps.imageUrl);

  const link = screen.getByRole("link");
  expect(link).toBeInTheDocument();
  expect(link).toHaveAttribute("href", mockProps.href);
});

test("renders correctly when imageUrl is null (no image)", () => {
  const propsWithoutImage = { ...mockProps, imageUrl: null };
  render(<MovieCard {...propsWithoutImage} />);

  expect(
    screen.getByRole("heading", { name: /Example Movie/i }),
  ).toBeInTheDocument();

  expect(
    screen.queryByRole("img", { name: /Example Movie poster/i }),
  ).not.toBeInTheDocument();

  expect(screen.getByRole("link")).toBeInTheDocument();
});
