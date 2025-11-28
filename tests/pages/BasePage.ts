import { Page, expect } from '@playwright/test';

export class BasePage {
  constructor(protected page: Page) {}

  /**
   * Navega para a listagem de uma collection
   */
  async goToCollectionList(collectionType: string) {
    await this.page.goto(`/admin/content-manager/collection-types/${collectionType}`);
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Navega para a página de criação de uma collection
   */
  async goToCreatePage(collectionType: string) {
    await this.page.goto(`/admin/content-manager/collection-types/${collectionType}/create`);
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Clica no botão de criar novo item (na listagem)
   */
  async clickCreateButton() {
    await this.page.getByRole('link', { name: /create new entry|criar/i }).click();
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Clica no botão de salvar
   */
  async clickSaveButton() {
    const saveButton = this.page.getByRole('button', { name: /save|salvar/i });
    await saveButton.click();
    
    // Aguarda notificação de sucesso ou navegação
    await this.page.waitForTimeout(3000);
  }

  /**
   * Clica no botão de publicar (se houver draft & publish)
   */
  async clickPublishButton() {
    const publishButton = this.page.getByRole('button', { name: /publish|publicar/i });
    await publishButton.click();
    await this.page.waitForTimeout(1000);
  }

  /**
   * Verifica se há mensagem de sucesso
   */
  async expectSuccessMessage() {
    const successMessage = this.page.locator('[role="status"], .notification-success, [data-testid="success-notification"]');
    await expect(successMessage).toBeVisible({ timeout: 5000 });
  }

  /**
   * Preenche um campo de texto pelo label
   */
  async fillFieldByLabel(label: string, value: string) {
    await this.page.getByLabel(new RegExp(label, 'i')).fill(value);
  }

  /**
   * Verifica se um texto está visível na página
   */
  async expectTextVisible(text: string) {
    await expect(this.page.getByText(text)).toBeVisible({ timeout: 5000 });
  }
}
