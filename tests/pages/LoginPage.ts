import { Page } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  async login(email: string, password: string) {
    await this.page.goto('/admin/auth/login');
    
    // Aguarda a página de login carregar
    await this.page.waitForLoadState('domcontentloaded');
    
    // Aguarda os campos estarem visíveis
    await this.page.waitForSelector('input[type="email"], input[placeholder*="kai"]', { timeout: 10000 });
    
    // Preenche credenciais usando seletores mais específicos
    const emailInput = this.page.locator('input[type="email"], input[placeholder*="kai"]').first();
    await emailInput.fill(email);
    
    const passwordInput = this.page.locator('input[type="password"]').first();
    await passwordInput.fill(password);
    
    // Aguarda um pouco para garantir que os campos foram preenchidos
    await this.page.waitForTimeout(500);
    
    // Clica no botão de login
    await this.page.getByRole('button', { name: /login/i }).click();
    
    // Aguarda redirecionamento para o admin (aumentei o timeout)
    await this.page.waitForURL('**/admin/**', { timeout: 30000 });
    
    // Aguarda o dashboard carregar completamente
    await this.page.waitForLoadState('networkidle', { timeout: 30000 });
    
    // Aguarda um pouco mais para garantir que está tudo carregado
    await this.page.waitForTimeout(2000);
  }

  async loginAsAdmin() {
    await this.login('admin@satc.edu.br', 'welcomeToStrapi123');
  }

  async loginAsEditor() {
    await this.login('editor@satc.edu.br', 'welcomeToStrapi123');
  }

  async loginAsAuthor() {
    await this.login('author@satc.edu.br', 'welcomeToStrapi123');
  }
}
