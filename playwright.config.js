import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  timeout: 30000,
  retries: 1,
  reporter: process.env.CI ? 'github' : 'list',

  use: {
    baseURL: 'http://localhost:3000',
    headless: true,
    screenshot: 'only-on-failure',
    video: 'off',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  // Serve the Vite-built www/ output.
  // Uses npx so the vite binary is always found regardless of PATH in CI.
  webServer: {
    command: 'npx vite preview --port 3000',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120000,  // 2 minutes — CI runners can be slow to start
    stdout: 'pipe',
    stderr: 'pipe',
  },
});
