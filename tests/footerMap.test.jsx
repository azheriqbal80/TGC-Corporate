import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { SiteFooter } from "../src/components/layout/SiteFooter";

describe("SiteFooter editorial closure", () => {
  afterEach(() => {
    cleanup();
  });

  it("preserves the contentinfo landmark and footer links without a map section", () => {
    const { container } = render(<SiteFooter tone="dark" />);

    const footer = screen.getByRole("contentinfo");
    expect(footer).toHaveClass("site-footer--dark");
    expect(screen.getByText(/© \d{4} The Game Company/i)).toBeInTheDocument();
    expect(screen.getByText(/Dubai · UAE/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Back to top/i })).toHaveAttribute(
      "href",
      "#top",
    );
    expect(container.querySelector(".footer-map-band")).not.toBeInTheDocument();
  });
});
