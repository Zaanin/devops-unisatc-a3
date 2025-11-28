# 🚀 QUICK START - Trabalho A3

## ⚡ Início Rápido (5 minutos)

### 1️⃣ Setup Inicial

```powershell
# Clone o repositório
git clone https://github.com/seu-usuario/devops-unisatc-a3.git
cd devops-unisatc-a3

# Instale dependências
pnpm install

# Inicie o Strapi
pnpm dev
```

Aguarde até ver: `Server started on http://0.0.0.0:1337`

### 2️⃣ Configure Permissões (OBRIGATÓRIO)

1. Acesse: http://localhost:1337/admin
2. Login: `admin@satc.edu.br` / `welcomeToStrapi123`
3. **Settings** → **Roles** → **Super Admin**
4. Marque **TODAS** permissões de: Category, Author, Article
5. **Save**

### 3️⃣ Execute os Testes

```powershell
# Em OUTRO terminal
pnpm test:e2e
```

✅ Se tudo passou, você está pronto!

---

## 🔥 Comandos Essenciais

### Desenvolvimento
```powershell
pnpm dev              # Inicia Strapi
pnpm build            # Build produção
```

### Testes
```powershell
pnpm test:e2e         # Roda testes
pnpm test:e2e:ui      # Interface gráfica
pnpm test:e2e:debug   # Modo debug
```

### Docker
```powershell
docker build -t strapi .
docker run -p 1337:1337 strapi
```

### Terraform
```powershell
cd terraform
terraform init
terraform plan
terraform apply
```

---

## 📁 Estrutura Importante

```
📦 devops-unisatc-a3
├── 📂 tests/                 # Testes E2E
│   ├── 📂 pages/            # Page Objects
│   ├── autor.spec.ts
│   ├── categoria.spec.ts
│   └── artigo.spec.ts
├── 📂 .github/workflows/    # GitHub Actions
│   ├── test-e2e.yml
│   └── docker-build.yml
├── 📂 terraform/            # Infrastructure
│   ├── main.tf
│   └── variables.tf
├── Dockerfile               # Container
└── 📚 DOCUMENTAÇÃO/
    ├── README.md
    ├── SETUP_TESTES.md
    ├── GUIA_CICD.md
    └── RESUMO_EXECUTIVO.md
```

---

## 🎯 Checklist A3

### Fase 1: Testes ✅
- [x] Testes E2E (2+ collections)
- [x] Page Object Model
- [x] Testes rodando

### Fase 2: CI/CD 🔄
- [ ] Configurar secrets GitHub
- [ ] Criar PR com erro
- [ ] Criar PR com sucesso

### Fase 3: Docker 🐳
- [x] Dockerfile criado
- [ ] Push para registry

### Fase 4: Cloud ☁️
- [x] Terraform configurado
- [ ] Deploy AWS/Azure

---

## 🆘 Problemas Comuns

### Testes falhando?
```powershell
# 1. Verifique se o Strapi está rodando
curl http://localhost:1337/admin

# 2. Configure as permissões (passo 2 acima)

# 3. Execute novamente
pnpm test:e2e
```

### Port 1337 em uso?
```powershell
# Windows
netstat -ano | findstr :1337
taskkill /PID <PID> /F

# Ou use outra porta
$env:PORT=1338; pnpm dev
```

### Docker build falhando?
```powershell
# Limpe o cache
docker system prune -a
docker build --no-cache -t strapi .
```

---

## 📚 Documentação Completa

- 📖 **README.md** - Visão geral do projeto
- 📖 **SETUP_TESTES.md** - Configuração detalhada
- 📖 **GUIA_CICD.md** - Pipeline CI/CD completo
- 📖 **RESUMO_EXECUTIVO.md** - Status do projeto

---

## 💡 Dicas

1. **Sempre configure permissões antes dos testes**
2. **Use `pnpm test:e2e:ui` para debugar visualmente**
3. **Destrua recursos AWS com `terraform destroy`**
4. **Commit frequente: `git add . && git commit -m "..."`**
5. **Leia os logs em caso de erro**

---

## 🎓 Próximos Passos

### Para completar o trabalho:

1. **Configurar GitHub Secrets** (5 min)
   ```
   Settings > Secrets > Actions
   - DOCKER_USERNAME
   - DOCKER_PASSWORD
   ```

2. **Criar os 2 PRs** (15 min)
   - Um com erro (teste falhando)
   - Um com sucesso

3. **Deploy Docker** (10 min)
   ```powershell
   docker push seu-usuario/devops-unisatc-a3
   ```

4. **Deploy Cloud** (20 min)
   ```powershell
   cd terraform
   terraform apply
   ```

**Tempo total: ~50 minutos**

---

## ✅ Verificação Rápida

Execute estes comandos para verificar se está tudo ok:

```powershell
# 1. Strapi rodando?
curl http://localhost:1337

# 2. Testes passando?
pnpm test:e2e

# 3. Docker build ok?
docker build -t test .

# 4. Terraform válido?
cd terraform; terraform validate
```

Se todos passarem: **Você está pronto! 🎉**

---

## 🚀 Let's Go!

Escolha seu caminho:

- 🧪 **Testar agora**: Vá para o passo 1
- 📚 **Ler mais**: Abra SETUP_TESTES.md
- 🔍 **Entender tudo**: Abra GUIA_CICD.md
- 📊 **Ver status**: Abra RESUMO_EXECUTIVO.md

**Boa sorte! 🍀**
