import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { TechnicalFaq } from "../src/components/faq/TechnicalFaq";
import { technologyFaqs } from "../src/content/technology";

describe("TechnicalFaq", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders all technical entries with only the first entry expanded initially", () => {
    render(<TechnicalFaq />);

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /questions on architecture, capacity, and delivery/i,
      }),
    ).toBeInTheDocument();

    const firstTrigger = screen.getByRole("button", {
      name: new RegExp(technologyFaqs[0].question, "i"),
    });
    const secondTrigger = screen.getByRole("button", {
      name: new RegExp(technologyFaqs[1].question, "i"),
    });

    expect(firstTrigger).toHaveAttribute("aria-expanded", "true");
    expect(secondTrigger).toHaveAttribute("aria-expanded", "false");
    expect(screen.getByText("06 entries")).toBeInTheDocument();
  });

  it("toggles individual entries open and closed reversibly", () => {
    render(<TechnicalFaq />);

    const firstTrigger = screen.getByRole("button", {
      name: new RegExp(technologyFaqs[0].question, "i"),
    });
    const secondTrigger = screen.getByRole("button", {
      name: new RegExp(technologyFaqs[1].question, "i"),
    });

    fireEvent.click(firstTrigger);
    expect(firstTrigger).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(secondTrigger);
    expect(secondTrigger).toHaveAttribute("aria-expanded", "true");

    const panel = document.getElementById(
      secondTrigger.getAttribute("aria-controls"),
    );
    expect(panel).toHaveAttribute("data-open", "true");
    expect(panel).toHaveAttribute("aria-hidden", "false");
  });

  it("filters entries by category and updates counts", () => {
    render(<TechnicalFaq />);

    const cloudFilter = screen.getByRole("button", {
      name: "Cloud & Routing",
    });
    fireEvent.click(cloudFilter);

    expect(cloudFilter).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByText("02 of 06 entries")).toBeInTheDocument();
    expect(
      screen.queryByRole("button", {
        name: new RegExp(technologyFaqs[1].question, "i"),
      }),
    ).not.toBeInTheDocument();

    const visibleCloudTrigger = screen.getByRole("button", {
      name: new RegExp(technologyFaqs[0].question, "i"),
    });
    expect(visibleCloudTrigger).toHaveAttribute("aria-expanded", "true");
  });

  it("supports expanding and collapsing all visible entries", () => {
    render(<TechnicalFaq />);

    const toggleAll = screen.getByRole("button", { name: "Expand all" });
    fireEvent.click(toggleAll);

    for (const faq of technologyFaqs) {
      const trigger = screen.getByRole("button", {
        name: new RegExp(faq.question, "i"),
      });
      expect(trigger).toHaveAttribute("aria-expanded", "true");
    }

    const collapseAll = screen.getByRole("button", { name: "Collapse all" });
    fireEvent.click(collapseAll);

    for (const faq of technologyFaqs) {
      const trigger = screen.getByRole("button", {
        name: new RegExp(faq.question, "i"),
      });
      expect(trigger).toHaveAttribute("aria-expanded", "false");
    }
  });
});
