import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, cleanup, render, screen, waitFor } from "@testing-library/react";

vi.mock("../src/motion/usePageMotion", () => ({
  usePageMotion: vi.fn(),
}));

import { AchievementsPage } from "../src/pages/achievements/AchievementsPage";

describe("AchievementsPage scroll progress bar", () => {
  beforeEach(() => {
    Object.defineProperty(document.documentElement, "scrollHeight", {
      configurable: true,
      value: 2000,
    });
    Object.defineProperty(window, "innerHeight", {
      configurable: true,
      value: 1000,
    });
    Object.defineProperty(window, "scrollY", {
      configurable: true,
      writable: true,
      value: 0,
    });
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it("tracks reading progress via transform scaleX and aria-valuenow", async () => {
    const { container } = render(<AchievementsPage />);
    const bar = screen.getByRole("progressbar", { name: /reading progress/i });
    const fill = container.querySelector(".achievements-progress-fill");

    expect(bar).toHaveAttribute("aria-valuenow", "0");
    expect(fill.style.transform).toBe("scaleX(0)");

    act(() => {
      window.scrollY = 500;
      window.dispatchEvent(new Event("scroll"));
    });

    await waitFor(() => {
      expect(bar).toHaveAttribute("aria-valuenow", "50");
      expect(fill.style.transform).toBe("scaleX(0.5)");
    });

    act(() => {
      window.scrollY = 1000;
      window.dispatchEvent(new Event("scroll"));
    });

    await waitFor(() => {
      expect(bar).toHaveAttribute("aria-valuenow", "100");
      expect(fill.style.transform).toBe("scaleX(1)");
    });
  });
});
