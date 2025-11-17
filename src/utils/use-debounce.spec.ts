import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
// Note: We use renderHook from @testing-library/react for modern React Testing Library setups.
import { renderHook, act } from "@testing-library/react";
import { useDebounce } from "./use-debounce";

describe("useDebounce", () => {
  const DEBOUNCE_DELAY = 500;

  // 1. Enable fake timers before each test
  beforeEach(() => {
    vi.useFakeTimers();
  });

  // 2. Restore real timers after each test to avoid side effects
  afterEach(() => {
    vi.useRealTimers();
  });

  it("should return the initial value immediately", () => {
    const initialValue = "initial";
    const { result } = renderHook(() =>
      useDebounce(initialValue, DEBOUNCE_DELAY),
    );

    // The debounced value should match the initial value immediately
    expect(result.current).toBe(initialValue);
  });

  it("should not update the debounced value if time has not elapsed", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: "first", delay: DEBOUNCE_DELAY },
      },
    );

    // Initial check
    expect(result.current).toBe("first");

    // Change value
    rerender({ value: "second", delay: DEBOUNCE_DELAY });

    // Advance time just before the delay
    act(() => {
      vi.advanceTimersByTime(DEBOUNCE_DELAY - 1);
    });

    // Value should still be 'first'
    expect(result.current).toBe("first");
  });

  it("should update the debounced value after the delay has passed", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: "start", delay: DEBOUNCE_DELAY },
      },
    );

    // 1. Change value
    rerender({ value: "updated", delay: DEBOUNCE_DELAY });

    // 2. Advance time exactly by the delay
    act(() => {
      vi.advanceTimersByTime(DEBOUNCE_DELAY);
    });

    // Value should now be 'updated'
    expect(result.current).toBe("updated");
  });

  it("should only update after the last change when multiple changes occur within the delay", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: "v1", delay: DEBOUNCE_DELAY },
      },
    );

    // 1. Change value and advance half the time
    rerender({ value: "v2", delay: DEBOUNCE_DELAY });
    act(() => {
      vi.advanceTimersByTime(DEBOUNCE_DELAY / 2);
    });
    expect(result.current).toBe("v1");

    // 2. Change value again (this resets the debounce timer)
    rerender({ value: "v3", delay: DEBOUNCE_DELAY });
    act(() => {
      vi.advanceTimersByTime(DEBOUNCE_DELAY / 2);
    });
    expect(result.current).toBe("v1"); // Still 'v1' because the new timer hasn't completed

    // 3. Advance the remaining time for the *new* timer
    act(() => {
      vi.advanceTimersByTime(DEBOUNCE_DELAY / 2);
    });

    // Value should be the *last* value set ('v3')
    expect(result.current).toBe("v3");
  });
});
