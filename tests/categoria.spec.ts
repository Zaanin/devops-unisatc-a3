// tests/categoria.spec.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { CategoriaPage } from './pages/CategoriaPage';

test.describe('Categoria Tests', () => {
  test('deve criar uma nova categoria com sucesso', async ({ page }) => {
    // Arrange
    const loginPage = new LoginPage(page);
    const categoriaPage = new CategoriaPage(page);
    const categoriaNome = `Categoria Teste ${Date.now()}`;

    // Act - Login
    await loginPage.loginAsAdmin();

    // Act - Criar categoria
    await categoriaPage.createCategoria(categoriaNome);

    // Assert - Verificar se foi criada
    await categoriaPage.verifyCategoriaExists(categoriaNome);
  });

  test('deve listar categorias existentes', async ({ page }) => {
    // Arrange
    const loginPage = new LoginPage(page);
    const categoriaPage = new CategoriaPage(page);

    // Act
    await loginPage.loginAsAdmin();
    await categoriaPage.goToList();

    // Assert - Verifica se a página de listagem carregou
    await expect(page).toHaveURL(/.*content-manager.*category/);
  });
});
