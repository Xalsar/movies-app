import { cleanup, render, screen } from "@testing-library/react";
import { expect, test, describe, vi, afterEach } from "vitest";
import { LoadingSpinner } from "./loading-spinner";

vi.mock("~/components/ui/spinner", () => ({
  Spinner: (props: { className?: string }) => (
    <div data-testid="mock-spinner" className={props.className}>
      Spinner
    </div>
  ),
}));

afterEach(() => {
  cleanup();
});

describe("LoadingSpinner", () => {
  test("should render the spinner without text", () => {
    render(<LoadingSpinner />);

    expect(screen.getByTestId("mock-spinner")).toBeInTheDocument();

    const textElement = screen.getByText((content, element) => {
      return element?.tagName.toLowerCase() === "p" && content === "";
    });
    expect(textElement).toBeInTheDocument();

    expect(screen.getByTestId("mock-spinner")).toHaveClass("size-20");
  });

  test("should render the spinner and the provided children text", () => {
    const loadingMessage = "Please wait...";
    render(<LoadingSpinner>{loadingMessage}</LoadingSpinner>);

    expect(screen.getByTestId("mock-spinner")).toBeInTheDocument();

    expect(screen.getByText(loadingMessage)).toBeInTheDocument();

    expect(screen.getByText(loadingMessage)).toHaveClass("text-2xl");
  });
});
