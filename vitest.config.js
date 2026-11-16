import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: ["./tests/setup.js"],
    include: ["tests/**/*.test.{js,jsx}"],
    exclude: ["tests/e2e/**"],
    coverage: { reporter: ["text", "html"] },
  },
});
