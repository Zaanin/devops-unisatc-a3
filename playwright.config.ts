// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 60 * 1000, // 60 segundos por teste
  expect: {
    timeout: 10000, // 10 segundos para assertions
  },
  fullyParallel: false, // Executa testes em sequência para evitar conflitos no Strapi
  forbidOnly: !!process.env.CI, // Falha no CI se houver .only
  retries: process.env.CI ? 2 : 0, // Retry no CI
  workers: 1, // Um worker por vez para evitar race conditions
  reporter: [
    ['html'],
    ['list'],
  ],
  use: {
    baseURL: 'http://localhost:1337',
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
    actionTimeout: 15000, // 15 segundos para ações
    navigationTimeout: 30000, // 30 segundos para navegação
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  // Configuração do servidor de desenvolvimento (opcional)
  // webServer: {
  //   command: 'pnpm dev',
  //   url: 'http://localhost:1337',
  //   reuseExistingServer: !process.env.CI,
  //   timeout: 120 * 1000,
  // },
});
