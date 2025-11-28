// tests/autor.spec.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { AutorPage } from './pages/AutorPage';

test.describe('Autor Tests', () => {
  test('deve criar um novo autor com sucesso', async ({ page }) => {
    // Arrange
    const loginPage = new LoginPage(page);
    const autorPage = new AutorPage(page);
    const timestamp = Date.now();
    const autorNome = `Autor Teste ${timestamp}`;
    const autorEmail = `autor${timestamp}@teste.com`;

    // Act - Login
    await loginPage.loginAsAdmin();

    // Act - Criar autor
    await autorPage.createAutor(autorNome, autorEmail);

    // Assert - Verificar se foi criado
    await autorPage.verifyAutorExists(autorNome);
  });

  test('deve listar autores existentes', async ({ page }) => {
    // Arrange
    const loginPage = new LoginPage(page);
    const autorPage = new AutorPage(page);

    // Act
    await loginPage.loginAsAdmin();
    await autorPage.goToList();

    // Assert - Verifica se a página de listagem carregou
    await expect(page).toHaveURL(/.*content-manager.*author/);
  });
});
