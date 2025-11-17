import { fromMinutesToHoursAndMinutes } from "./from-minutes-to-hours-and-minutes";
import { expect, test, describe } from "vitest";

describe("fromMinutesToHoursAndMinutes", () => {
  test("should correctly convert 75 minutes to 1h 15m", () => {
    const totalMinutes = 75;

    const result = fromMinutesToHoursAndMinutes(totalMinutes);

    expect(result).toBe("1h 15m");
  });

  test("should correctly handle a whole number of hours (120 minutes)", () => {
    const totalMinutes = 120;

    const result = fromMinutesToHoursAndMinutes(totalMinutes);

    expect(result).toBe("2h 0m");
  });

  test("should correctly handle minutes less than 60 (30 minutes)", () => {
    const totalMinutes = 30;

    const result = fromMinutesToHoursAndMinutes(totalMinutes);

    expect(result).toBe("0h 30m");
  });

  test("should return 0h 0m for an input of 0", () => {
    const totalMinutes = 0;

    const result = fromMinutesToHoursAndMinutes(totalMinutes);

    expect(result).toBe("0h 0m");
  });

  test("should correctly convert a large number of minutes (367 minutes)", () => {
    const totalMinutes = 367; // 6 hours and 7 minutes (360 + 7)

    const result = fromMinutesToHoursAndMinutes(totalMinutes);

    expect(result).toBe("6h 7m");
  });
});
