import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class ArtigoPage extends BasePage {
  private readonly collectionType = 'api::article.article';

  constructor(page: Page) {
    super(page);
  }

  /**
   * Navega para a listagem de artigos
   */
  async goToList() {
    await this.goToCollectionList(this.collectionType);
  }

  /**
   * Navega para a página de criação de artigo
   */
  async goToCreate() {
    await this.goToCreatePage(this.collectionType);
  }

  /**
   * Preenche o formulário de artigo
   */
  async fillForm(title: string, description: string) {
    // Aguarda o formulário carregar
    await this.page.waitForTimeout(3000);
    
    // Aguarda qualquer input estar visível
    await this.page.waitForSelector('input', { timeout: 15000 });
    
    // Preenche título - procura especificamente por campos de texto visíveis
    const allInputs = await this.page.locator('input[type="text"]').all();
    if (allInputs.length > 0) {
      await allInputs[0].fill(title);
    }
    
    // Aguarda um pouco antes de preencher a descrição
    await this.page.waitForTimeout(1000);
    
    // Preenche descrição - procura por textarea
    const textareas = await this.page.locator('textarea').all();
    if (textareas.length > 0) {
      await textareas[0].fill(description);
    }
    
    // Aguarda para garantir que os campos foram preenchidos
    await this.page.waitForTimeout(1000);
  }

  /**
   * Salva o artigo
   */
  async save() {
    await this.clickSaveButton();
  }

  /**
   * Cria um artigo completo
   */
  async createArtigo(title: string, description: string) {
    await this.goToCreate();
    await this.fillForm(title, description);
    await this.save();
    
    // Aguarda feedback
    await this.page.waitForTimeout(2000);
  }

  /**
   * Verifica se o artigo existe na listagem
   */
  async verifyArtigoExists(title: string) {
    await this.goToList();
    await this.expectTextVisible(title);
  }
}
