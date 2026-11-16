import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";

vi.mock("../src/motion/usePageMotion", () => ({
  usePageMotion: vi.fn(),
}));

vi.mock("../src/pages/home/HomePage", () => ({
  HomePage: () => (
    <main>
      <h1>Home route</h1>
      <a href="/technology">Go to technology</a>
      <a href="https://example.com" target="_blank" rel="noreferrer">
        External link
      </a>
    </main>
  ),
}));

vi.mock("../src/pages/technology/TechnologyPage", () => ({
  TechnologyPage: () => (
    <main>
      <h1>Technology route</h1>
    </main>
  ),
}));

import App from "../src/App";

function setReducedMotion(matches) {
  window.matchMedia = vi.fn().mockImplementation((query) => ({
    matches: query === "(prefers-reduced-motion: reduce)" ? matches : false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
}

describe("seamless loading-screen-free page navigation", () => {
  beforeEach(() => {
    setReducedMotion(false);
    window.history.replaceState(null, "", "/");
    window.scrollTo = vi.fn();
    delete document.startViewTransition;
  });

  afterEach(() => {
    cleanup();
    delete document.startViewTransition;
    vi.restoreAllMocks();
  });

  it("renders initial route directly without a full-screen loading curtain", async () => {
    const { container } = render(<App />);

    expect(
      await screen.findByRole("heading", { level: 1, name: "Home route" }),
    ).toBeInTheDocument();
    expect(container.querySelector(".page-curtain")).not.toBeInTheDocument();
    expect(container.querySelector(".route-stage")).toBeInTheDocument();
  });

  it("swaps routes smoothly without showing a loading screen", async () => {
    const { container } = render(<App />);
    await screen.findByRole("heading", { level: 1, name: "Home route" });

    fireEvent.click(screen.getByRole("link", { name: "Go to technology" }));

    expect(
      await screen.findByRole("heading", {
        level: 1,
        name: "Technology route",
      }),
    ).toBeInTheDocument();
    expect(window.location.pathname).toBe("/technology");
    expect(container.querySelector(".page-curtain")).not.toBeInTheDocument();
  });

  it("uses document.startViewTransition when available and motion is allowed", async () => {
    document.startViewTransition = vi.fn((callback) => {
      callback();
      return { finished: Promise.resolve() };
    });

    const { container } = render(<App />);
    await screen.findByRole("heading", { level: 1, name: "Home route" });

    fireEvent.click(screen.getByRole("link", { name: "Go to technology" }));

    expect(
      await screen.findByRole("heading", {
        level: 1,
        name: "Technology route",
      }),
    ).toBeInTheDocument();
    expect(document.startViewTransition).toHaveBeenCalledTimes(1);
    expect(container.querySelector(".route-stage")).toHaveClass(
      "route-stage--vt",
    );
  });

  it("does not intercept external links", async () => {
    render(<App />);
    await screen.findByRole("heading", { level: 1, name: "Home route" });

    fireEvent.click(screen.getByRole("link", { name: "External link" }));
    expect(window.location.pathname).toBe("/");
  });
});
