# Testes E2E - Strapi CMS

Este projeto contém testes end-to-end para o Strapi CMS usando Playwright.

## 📁 Estrutura de Testes

```
tests/
├── pages/              # Page Objects
│   ├── BasePage.ts    # Classe base com métodos comuns
│   ├── LoginPage.ts   # Página de login
│   ├── CategoriaPage.ts  # Página de Categorias
│   └── AutorPage.ts   # Página de Autores
├── utils/             # Utilitários
│   └── login.ts       # (deprecated - usar LoginPage)
├── autor.spec.ts      # Testes de Autor
└── categoria.spec.ts  # Testes de Categoria
```

## 🚀 Como Executar

### 1. Iniciar o Strapi

Primeiro, certifique-se de que o Strapi está rodando:

```powershell
pnpm dev
```

O Strapi deve estar disponível em `http://localhost:1337`

### 2. Executar os Testes

Em outro terminal, execute:

```powershell
# Executar todos os testes
pnpm test:e2e

# Executar com interface gráfica
pnpm playwright test --ui

# Executar teste específico
pnpm playwright test categoria

# Executar em modo debug
pnpm playwright test --debug

# Ver relatório HTML
pnpm playwright show-report
```

## 🔑 Credenciais de Teste

O Strapi vem com usuários pré-configurados:

```
Super Admin:
- Email: admin@satc.edu.br
- Senha: welcomeToStrapi123

Editor:
- Email: editor@satc.edu.br
- Senha: welcomeToStrapi123

Author:
- Email: author@satc.edu.br
- Senha: welcomeToStrapi123
```

## 📝 Collections Testadas

- ✅ **Categoria** (Category)
- ✅ **Autor** (Author)
- 🔲 **Artigo** (Article) - TODO

## 🏗️ Padrão Page Object

Todos os testes usam o padrão **Page Object Model (POM)** para:

1. **Reutilização de código**: Métodos podem ser usados em múltiplos testes
2. **Manutenibilidade**: Mudanças na UI requerem alterações apenas nas Pages
3. **Legibilidade**: Testes ficam mais limpos e expressivos

### Exemplo de uso:

```typescript
test('deve criar categoria', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const categoriaPage = new CategoriaPage(page);
  
  await loginPage.loginAsAdmin();
  await categoriaPage.createCategoria('Minha Categoria');
  await categoriaPage.verifyCategoriaExists('Minha Categoria');
});
```

## 🐛 Troubleshooting

### Testes falhando com "You don't have the permissions"

Se você ver este erro, verifique:

1. O usuário tem permissões corretas no Strapi Admin
2. Vá em **Settings > Roles > Super Admin > Permissions**
3. Certifique-se que todas as permissões estão habilitadas para as collections

### Timeout errors

Se os testes estão demorando muito:

1. Aumente o timeout no `playwright.config.ts`
2. Verifique se o Strapi está rodando corretamente
3. Use `await page.pause()` para debugar interativamente

### Servidor não está respondendo

```powershell
# Verifique se o Strapi está rodando
curl http://localhost:1337/admin

# Reinicie o Strapi
pnpm dev
```

## 📊 Relatórios

Os testes geram relatórios automaticamente:

- **HTML Report**: `pnpm playwright show-report`
- **Screenshots**: Salvos em `test-results/` quando falham
- **Videos**: Salvos em `test-results/` quando falham
- **Traces**: Para debug detalhado com `pnpm playwright show-trace`

## 🔄 CI/CD

Os testes estão configurados para rodar no GitHub Actions. Veja `.github/workflows/` para detalhes.

### Configurações importantes no CI:

- Retries: 2 tentativas em caso de falha
- Workers: 1 (evita race conditions)
- Screenshots/Videos salvos em caso de falha

## 📚 Recursos

- [Playwright Documentation](https://playwright.dev)
- [Strapi Documentation](https://docs.strapi.io)
- [Page Object Model Pattern](https://playwright.dev/docs/pom)
