import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const routes = [
  "/",
  "/platform",
  "/technology",
  "/company",
  "/leadership",
  "/achievements",
  "/contact",
  "/design-guide",
];

for (const route of routes) {
  test(`${route} has a stable semantic shell`, async ({ page }) => {
    await page.goto(route);
    await expect(page.locator("main")).toHaveCount(1);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      "content",
      /.+/,
    );
    const overflow = await page.evaluate(
      () =>
        document.documentElement.scrollWidth >
        document.documentElement.clientWidth + 1,
    );
    expect(overflow).toBe(false);
  });
}

// The homepage renders a continuous WebGL field on the main thread, which starves
// an axe scan and pushes these tests to the edge of the Playwright timeout. Reduced
// motion is a real supported mode: ShaderMetal paints one frame and schedules no
// further animation, so the scanned DOM is identical and the scan is not competing
// for frames. Keep this emulation; do not raise the timeout instead.
test.describe("accessibility", () => {
  test.use({ reducedMotion: "reduce" });

  for (const route of routes) {
    test(`@a11y ${route} has no serious accessibility violations`, async ({
      page,
    }) => {
      await page.goto(route);
      const results = await new AxeBuilder({ page })
        .disableRules(["color-contrast"])
        .analyze();
      expect(
        results.violations.filter(({ impact }) =>
          ["critical", "serious"].includes(impact),
        ),
      ).toEqual([]);
    });
  }
});

test("homepage hero shader initialises when motion is allowed", async ({
  page,
}) => {
  await page.goto("/");
  const canvas = page.locator(".hero-metal canvas");
  await expect(canvas).toHaveCount(1);
  await expect(canvas).not.toHaveAttribute("data-webgl-unavailable", "true");
});

// The menu label cross-fade is a CSS transition. Under full motion the home
// page shader competes for the main thread and the transition can still be
// mid-flight when the assertion runs. This test is about focus containment and
// labelling, not motion, so emulate reduced motion rather than raise timeouts.
test.describe("navigation", () => {
  test.use({ reducedMotion: "reduce" });

  test("navigation contains keyboard focus and restores it", async ({
    page,
  }) => {
    await page.goto("/");
    const trigger = page.locator(".menu-button");
    await expect(trigger).toHaveAccessibleName("Menu");
    const triggerBox = await trigger.boundingBox();
    expect(triggerBox?.width ?? 0).toBeGreaterThanOrEqual(44);
    expect(triggerBox?.height ?? 0).toBeGreaterThanOrEqual(44);
    const menuLabel = trigger.locator(".menu-label--closed");
    const closeLabel = trigger.locator(".menu-label--open");
    await expect(menuLabel).toHaveCSS("opacity", "1");
    await expect(closeLabel).toHaveCSS("opacity", "0");
    await trigger.focus();
    await trigger.click();
    await expect(trigger).toHaveAccessibleName("Close");
    await expect(menuLabel).toHaveCSS("opacity", "0");
    await expect(closeLabel).toHaveCSS("opacity", "1");
    await expect(page.locator("main")).toHaveAttribute("inert", "");
    await expect(
      page.getByRole("navigation", { name: "Primary navigation" }),
    ).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(trigger).toBeFocused();
    await expect(trigger).toHaveAccessibleName("Menu");
    await expect(menuLabel).toHaveCSS("opacity", "1");
    await expect(closeLabel).toHaveCSS("opacity", "0");
  });
});

test("unknown routes show a not-found page", async ({ page }) => {
  await page.goto("/not-a-real-page");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Page not found",
  );
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    "content",
    "noindex, follow",
  );
});

test("design guide renders the canonical visual system", async ({ page }) => {
  await page.goto("/design-guide");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "TGC design guide.",
  );
  await expect(
    page.getByRole("navigation", { name: "Design guide sections" }),
  ).toBeVisible();
  await expect(page.locator(".dg-color")).toHaveCount(18);
  await expect(page.getByText("The Live Dispatch Network")).toBeVisible();
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    "content",
    "noindex, follow",
  );
});

test("platform journey diagram keeps every node on one unframed track", async ({
  page,
}) => {
  await page.goto("/platform#journey");
  const map = page.locator(".journey-map");
  await expect(map).toBeVisible();

  const geometry = await page.evaluate(() => {
    const mapElement = document.querySelector(".journey-map");
    const route = document.querySelector(".journey-route");
    const nodes = [...document.querySelectorAll(".journey-node i")];
    const active = document.querySelector(".journey-node.active i");
    const inactive = document.querySelector(".journey-node:not(.active) i");
    const style = getComputedStyle(mapElement);
    return {
      border: [
        style.borderTopWidth,
        style.borderRightWidth,
        style.borderBottomWidth,
        style.borderLeftWidth,
      ],
      dividerContent: getComputedStyle(mapElement, "::before").content,
      routeCenter:
        route.getBoundingClientRect().left +
        route.getBoundingClientRect().width / 2,
      nodeCenters: nodes.map(
        (node) =>
          node.getBoundingClientRect().left +
          node.getBoundingClientRect().width / 2,
      ),
      activeSize: active?.getBoundingClientRect().width ?? 0,
      inactiveSize: inactive?.getBoundingClientRect().width ?? 0,
      markerTransition: getComputedStyle(active).transitionProperty,
    };
  });

  expect(geometry.border).toEqual(["0px", "0px", "0px", "0px"]);
  expect(["none", "normal"]).toContain(geometry.dividerContent);
  expect(
    geometry.nodeCenters.every(
      (center) => Math.abs(center - geometry.routeCenter) < 1,
    ),
  ).toBe(true);
  expect(geometry.activeSize).toBeGreaterThan(geometry.inactiveSize);
  expect(geometry.markerTransition).toContain("transform");
  expect(geometry.markerTransition).not.toContain("width");
  expect(geometry.markerTransition).not.toContain("height");
});
