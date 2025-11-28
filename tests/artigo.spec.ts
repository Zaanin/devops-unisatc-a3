// tests/artigo.spec.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { ArtigoPage } from './pages/ArtigoPage';

test.describe('Artigo Tests', () => {
  test('deve criar um novo artigo com sucesso', async ({ page }) => {
    // Arrange
    const loginPage = new LoginPage(page);
    const artigoPage = new ArtigoPage(page);
    const timestamp = Date.now();
    const artigoTitulo = `Artigo Teste ${timestamp}`;
    const artigoDescricao = `Descrição do artigo teste ${timestamp}`;

    // Act - Login
    await loginPage.loginAsAdmin();

    // Act - Criar artigo
    await artigoPage.createArtigo(artigoTitulo, artigoDescricao);

    // Assert - Verificar se foi criado
    await artigoPage.verifyArtigoExists(artigoTitulo);
  });

  test('deve listar artigos existentes', async ({ page }) => {
    // Arrange
    const loginPage = new LoginPage(page);
    const artigoPage = new ArtigoPage(page);

    // Act
    await loginPage.loginAsAdmin();
    await artigoPage.goToList();

    // Assert - Verifica se a página de listagem carregou
    await expect(page).toHaveURL(/.*content-manager.*article/);
  });
});
