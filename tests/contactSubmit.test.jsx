import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
} from "@testing-library/react";

vi.mock("../src/motion/usePageMotion", () => ({
  usePageMotion: vi.fn(),
}));

import { ContactPage } from "../src/pages/contact/ContactPage";

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

function fillValidForm(container) {
  fireEvent.change(container.querySelector('input[name="name"]'), {
    target: { name: "name", value: "Tariq Al Mansoor" },
  });
  fireEvent.change(container.querySelector('input[name="email"]'), {
    target: { name: "email", value: "tariq@example.com" },
  });
  fireEvent.change(container.querySelector('input[name="organisation"]'), {
    target: { name: "organisation", value: "TGC Partner Studio" },
  });
  fireEvent.change(container.querySelector('select[name="topic"]'), {
    target: { name: "topic", value: "Platform enquiry" },
  });
  fireEvent.change(container.querySelector('textarea[name="message"]'), {
    target: {
      name: "message",
      value: "Interested in discussing regional cloud infrastructure testing.",
    },
  });
  fireEvent.click(container.querySelector('input[name="consent"]'));
}

describe("contact form submission animation", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    setReducedMotion(false);
  });

  afterEach(() => {
    cleanup();
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it("stays idle on invalid submission", () => {
    const { container } = render(<ContactPage />);
    const submitButton = container.querySelector(".contact-submit");
    expect(submitButton).toHaveAttribute("data-submit-state", "idle");

    fireEvent.click(submitButton);
    expect(submitButton).toHaveAttribute("data-submit-state", "idle");
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("steps frame-by-frame through dispatching into success and resets on edit", () => {
    const { container } = render(<ContactPage />);
    fillValidForm(container);

    const submitButton = container.querySelector(".contact-submit");
    fireEvent.click(submitButton);

    expect(submitButton).toHaveAttribute("data-submit-state", "dispatching");
    expect(submitButton).toHaveAttribute("aria-busy", "true");
    expect(
      container.querySelectorAll(".contact-submit-frames i.is-active"),
    ).toHaveLength(1);

    act(() => {
      vi.advanceTimersByTime(75);
    });
    expect(
      container.querySelectorAll(".contact-submit-frames i.is-active"),
    ).toHaveLength(2);

    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(submitButton).toHaveAttribute("data-submit-state", "success");
    expect(submitButton).toHaveTextContent("Enquiry validated");
    expect(
      container.querySelector(".contact-submit-check"),
    ).toBeInTheDocument();
    expect(screen.getByRole("status")).toBeInTheDocument();

    fireEvent.change(container.querySelector('input[name="name"]'), {
      target: { name: "name", value: "Tariq A." },
    });
    expect(submitButton).toHaveAttribute("data-submit-state", "idle");
    expect(submitButton).toHaveTextContent("Send enquiry");
  });

  it("transitions immediately to success when reduced motion is preferred", () => {
    setReducedMotion(true);
    const { container } = render(<ContactPage />);
    fillValidForm(container);

    const submitButton = container.querySelector(".contact-submit");
    fireEvent.click(submitButton);

    expect(submitButton).toHaveAttribute("data-submit-state", "success");
    expect(submitButton).toHaveTextContent("Enquiry validated");
  });
});
