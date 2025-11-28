import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class AutorPage extends BasePage {
  private readonly collectionType = 'api::author.author';

  constructor(page: Page) {
    super(page);
  }

  /**
   * Navega para a listagem de autores
   */
  async goToList() {
    await this.goToCollectionList(this.collectionType);
  }

  /**
   * Navega para a página de criação de autor
   */
  async goToCreate() {
    await this.goToCreatePage(this.collectionType);
  }

  /**
   * Cria um novo autor através da navegação pelo menu
   */
  async createViaMenu() {
    // Clica no Content Manager no menu lateral
    await this.page.getByRole('link', { name: /content manager/i }).click();
    await this.page.waitForLoadState('networkidle');
    
    // Clica em Autor no submenu
    await this.page.getByRole('link', { name: /autor/i }).click();
    await this.page.waitForLoadState('networkidle');
    
    // Clica em Create new entry
    await this.clickCreateButton();
  }

  /**
   * Preenche o formulário de autor
   */
  async fillForm(name: string, email: string) {
    // Aguarda o formulário carregar
    await this.page.waitForTimeout(2000);
    
    // Aguarda qualquer input estar visível
    await this.page.waitForSelector('input', { timeout: 10000 });
    
    // Pega todos os inputs do tipo text
    const textInputs = this.page.locator('input[type="text"], input:not([type="password"]):not([type="email"]):not([type="checkbox"])').first();
    await textInputs.fill(name);
    
    // Pega o input de email
    const emailInputs = this.page.locator('input[type="email"], input[name*="email"]').first();
    await emailInputs.fill(email);
  }

  /**
   * Salva o autor
   */
  async save() {
    await this.clickSaveButton();
  }

  /**
   * Cria um autor completo (formulário + save)
   */
  async createAutor(name: string, email: string) {
    await this.goToCreate();
    await this.fillForm(name, email);
    await this.save();
    
    // Aguarda feedback
    await this.page.waitForTimeout(2000);
  }

  /**
   * Verifica se o autor existe na listagem
   */
  async verifyAutorExists(name: string) {
    await this.goToList();
    await this.expectTextVisible(name);
  }

  /**
   * Procura por um autor específico na listagem
   */
  async searchAutor(name: string) {
    await this.goToList();
    
    // Tenta usar o campo de busca se existir
    const searchInput = this.page.getByPlaceholder(/search/i);
    if (await searchInput.isVisible({ timeout: 2000 }).catch(() => false)) {
      await searchInput.fill(name);
      await this.page.waitForTimeout(1000);
    }
  }
}
