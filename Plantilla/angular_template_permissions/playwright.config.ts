import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  use: {
    baseURL: "http://localhost:4200",
    channel: process.platform === "win32" ? "chrome" : undefined,
  },
  webServer: {
    command: "npm run serve:local",
    url: "http://localhost:4200",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
