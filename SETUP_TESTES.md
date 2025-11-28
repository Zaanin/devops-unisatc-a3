# 🧪 Guia de Configuração dos Testes E2E

## ⚠️ IMPORTANTE: Configurar Permissões no Strapi

Antes de executar os testes, você **DEVE** configurar as permissões no Strapi Admin.

### Passo a Passo:

1. **Inicie o Strapi**
   ```powershell
   pnpm dev
   ```

2. **Acesse o Admin Panel**
   - URL: http://localhost:1337/admin
   - Login: admin@satc.edu.br
   - Senha: welcomeToStrapi123

3. **Configure as Permissões**
   
   a) No menu lateral, vá em **Settings** (Configurações)
   
   b) Clique em **Roles** (Papéis) na seção "USERS & PERMISSIONS PLUGIN"
   
   c) Clique em **Super Admin**
   
   d) Para cada Collection Type (Category, Author, Article):
      - ✅ Marque **TODAS** as permissões:
        - [x] find (Buscar)
        - [x] findOne (Buscar Um)
        - [x] create (Criar)
        - [x] update (Atualizar)
        - [x] delete (Deletar)
   
   e) Clique em **Save** (Salvar)

4. **Teste as Permissões**
   - Faça logout e login novamente
   - Tente criar uma categoria manualmente
   - Se conseguir, as permissões estão corretas!

## 🔧 Verificação Rápida

Execute este comando para verificar se o Strapi está acessível:

```powershell
curl http://localhost:1337/admin
```

Você deve receber uma resposta HTML.

## 🚀 Executar os Testes

Após configurar as permissões:

```powershell
# Terminal 1 - Strapi rodando
pnpm dev

# Terminal 2 - Executar testes
pnpm test:e2e
```

## ❌ Solução de Problemas Comuns

### Erro: "You don't have the permissions to access that content"

**Solução**: Você não configurou as permissões corretamente. Volte ao passo 3 acima.

### Erro: "Timeout waiting for..."

**Soluções**:
- O Strapi pode estar lento. Reinicie: `pnpm dev`
- Aumente o timeout no `playwright.config.ts`
- Verifique se há outros processos na porta 1337

### Erro: "ECONNREFUSED localhost:1337"

**Solução**: O Strapi não está rodando. Execute `pnpm dev` primeiro.

### Testes passam mas não vejo os registros criados

**Solução**: Os registros são criados! Verifique:
1. Acesse http://localhost:1337/admin
2. Vá em Content Manager
3. Clique em Categoria ou Autor
4. Você verá os registros com nome "Teste {timestamp}"

## 🎯 Estrutura dos Testes

```
tests/
├── pages/                    # Page Objects (Padrão POM)
│   ├── BasePage.ts          # Métodos compartilhados
│   ├── LoginPage.ts         # Login no Strapi
│   ├── CategoriaPage.ts     # Operações de Categoria
│   └── AutorPage.ts         # Operações de Autor
├── autor.spec.ts            # ✅ Testes de Autor
├── categoria.spec.ts        # ✅ Testes de Categoria
└── README.md                # Documentação completa
```

## 📋 Checklist Antes de Rodar

- [ ] Strapi está rodando em http://localhost:1337
- [ ] Consegue fazer login com admin@satc.edu.br
- [ ] Permissões do Super Admin estão configuradas
- [ ] Consegue criar categoria/autor manualmente
- [ ] Playwright está instalado (`pnpm install`)

## 🎓 Para o Trabalho A3

### Requisitos Atendidos:

✅ **Testes E2E com Playwright**
- 2 collections testadas (Categoria e Autor)
- Padrão Page Object Model
- Testes de criação e listagem

### Próximos Passos:

1. **GitHub Actions**
   - Criar workflow para rodar testes em PR
   - Criar 2 PRs (um com erro forçado, um passando)

2. **Docker**
   - Criar Dockerfile
   - Build da imagem
   - Push para Docker Hub/ECR

3. **Terraform**
   - Deploy no cloud provider
   - Configurar infraestrutura como código

### Dica para Forçar Erro no PR:

Crie um teste que falha intencionalmente:

```typescript
test('deve falhar intencionalmente', async ({ page }) => {
  expect(true).toBe(false); // Erro forçado para o PR
});
```

## 📞 Ajuda Adicional

Se os testes ainda não funcionarem:

1. Delete a pasta `.tmp/` e reinicie o Strapi
2. Limpe o cache do Playwright: `pnpm playwright install --force`
3. Execute em modo debug: `pnpm playwright test --debug`
4. Verifique os logs no terminal do Strapi

---

**Boa sorte com o trabalho! 🚀**
