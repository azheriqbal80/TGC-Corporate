import { describe, expect, it } from "vitest";
import { getRouteMeta, normalizePath, ROUTES } from "../src/siteMeta";

describe("route metadata", () => {
  it("normalizes route paths", () => {
    expect(normalizePath("/platform/")).toBe("/platform");
    expect(normalizePath("/")).toBe("/");
  });

  it("defines unique metadata for every public route", () => {
    const titles = Object.values(ROUTES).map(({ title }) => title);
    const descriptions = Object.values(ROUTES).map(
      ({ description }) => description,
    );
    expect(new Set(titles).size).toBe(titles.length);
    expect(descriptions.every((description) => description.length >= 50)).toBe(
      true,
    );
  });

  it("marks unknown routes as not found", () => {
    expect(getRouteMeta("/missing").found).toBe(false);
    expect(getRouteMeta("/platform").found).toBe(true);
  });

  it("keeps the internal design guide out of search indexes", () => {
    expect(getRouteMeta("/design-guide")).toMatchObject({
      found: true,
      robots: "noindex, follow",
    });
  });
});
