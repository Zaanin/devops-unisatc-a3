import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CategoriaPage extends BasePage {
  private readonly collectionType = 'api::category.category';

  constructor(page: Page) {
    super(page);
  }

  /**
   * Navega para a listagem de categorias
   */
  async goToList() {
    await this.goToCollectionList(this.collectionType);
  }

  /**
   * Navega para a página de criação de categoria
   */
  async goToCreate() {
    await this.goToCreatePage(this.collectionType);
  }

  /**
   * Cria uma nova categoria através da navegação pelo menu
   */
  async createViaMenu() {
    // Clica no Content Manager no menu lateral
    await this.page.getByRole('link', { name: /content manager/i }).click();
    await this.page.waitForLoadState('networkidle');
    
    // Clica em Categoria no submenu
    await this.page.getByRole('link', { name: /categoria/i }).click();
    await this.page.waitForLoadState('networkidle');
    
    // Clica em Create new entry
    await this.clickCreateButton();
  }

  /**
   * Preenche o formulário de categoria
   */
  async fillForm(name: string) {
    // Aguarda o formulário carregar
    await this.page.waitForSelector('input[name="name"], input[type="text"]', { timeout: 10000 });
    
    // No Strapi, categorias geralmente têm um campo "name"
    // Vamos tentar por label primeiro, depois por name attribute
    const nameInput = this.page.locator('input[name="name"]').first();
    
    if (await nameInput.isVisible()) {
      await nameInput.fill(name);
    } else {
      // Fallback: pega o primeiro textbox
      await this.page.getByRole('textbox').first().fill(name);
    }
  }

  /**
   * Salva a categoria
   */
  async save() {
    await this.clickSaveButton();
  }

  /**
   * Cria uma categoria completa (formulário + save)
   */
  async createCategoria(name: string) {
    await this.goToCreate();
    await this.fillForm(name);
    await this.save();
    
    // Aguarda feedback
    await this.page.waitForTimeout(2000);
  }

  /**
   * Verifica se a categoria existe na listagem
   */
  async verifyCategoriaExists(name: string) {
    await this.goToList();
    await this.expectTextVisible(name);
  }

  /**
   * Procura por uma categoria específica na listagem
   */
  async searchCategoria(name: string) {
    await this.goToList();
    
    // Tenta usar o campo de busca se existir
    const searchInput = this.page.getByPlaceholder(/search/i);
    if (await searchInput.isVisible({ timeout: 2000 }).catch(() => false)) {
      await searchInput.fill(name);
      await this.page.waitForTimeout(1000);
    }
  }
}
