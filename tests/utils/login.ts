// tests/utils/login.ts
import { Page } from '@playwright/test';

export async function loginAsAdmin(page: Page) {
  // Abre a tela de login
  await page.goto('/admin');

  // Campo de e-mail (label = "Email*")
  await page.getByLabel(/Email/i).fill('admin@satc.edu.br');

  // Campo de senha (label = "Password*" - padrão do Strapi)
  await page.getByLabel(/Password/i).fill('welcomeToStrapi123');

  // Botão de Login
  await page.getByRole('button', { name: "Login" }).click();

  // Aguarda o dashboard/admin carregar
  await page.waitForURL('**/admin/**');
}
