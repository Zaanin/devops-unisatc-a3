// tests/exemplo-falha.spec.ts
// Este teste FALHA INTENCIONALMENTE para demonstrar CI/CD com erro
// Use este arquivo para criar um PR que deve falhar nos testes

import { test, expect } from '@playwright/test';

test.describe('Testes que Falham Intencionalmente', () => {
  test.skip('exemplo de teste que falha - descomente para testar PR com erro', async ({ page }) => {
    // Este teste sempre vai falhar
    expect(true).toBe(false);
  });

  test.skip('exemplo de timeout intencional', async ({ page }) => {
    // Este teste vai dar timeout
    await page.goto('http://localhost:9999/pagina-que-nao-existe');
    await page.waitForSelector('.elemento-que-nunca-vai-existir', { timeout: 5000 });
  });

  test.skip('exemplo de assertion incorreta', async ({ page }) => {
    await page.goto('http://localhost:1337');
    // Esta assertion está errada de propósito
    await expect(page).toHaveTitle('Título que não existetese');
  });
});

// INSTRUÇÕES PARA CRIAR PR COM ERRO:
// 
// 1. Crie uma branch: git checkout -b test/pr-com-erro
// 2. Descomente um dos testes acima removendo o .skip
// 3. Commit: git add . && git commit -m "test: adiciona teste que falha"
// 4. Push: git push origin test/pr-com-erro
// 5. Crie o PR no GitHub
// 6. A pipeline vai falhar ❌
