# 🚀 DevOps UNISATC A3 - Strapi CMS

Projeto completo de CI/CD com Strapi CMS, incluindo testes automatizados, Docker e deploy em cloud.

## 📋 Trabalho A3 - DevOps

Este projeto implementa um pipeline completo de CI/CD com:

- ✅ **Testes E2E** com Playwright (Pattern Page Objects)
- ✅ **GitHub Actions** para CI/CD
- ✅ **Docker** para containerização
- ✅ **Terraform** para Infrastructure as Code
- ✅ **Deploy** em AWS ECS Fargate

## 🏗️ Estrutura do Projeto

```
devops-unisatc-a3/
├── .github/workflows/        # GitHub Actions
│   ├── test-e2e.yml         # Testes em PR
│   └── docker-build.yml     # Build e push da imagem
├── tests/                    # Testes E2E
│   ├── pages/               # Page Objects
│   ├── autor.spec.ts        # Testes de Autor
│   ├── categoria.spec.ts    # Testes de Categoria
│   └── artigo.spec.ts       # Testes de Artigo
├── terraform/                # Infrastructure as Code
│   ├── main.tf              # Recursos AWS
│   ├── variables.tf         # Variáveis
│   └── outputs.tf           # Outputs
├── config/                   # Configurações do Strapi
├── src/                      # Código fonte do Strapi
├── Dockerfile               # Container image
├── docker-compose.yml       # Desenvolvimento local
└── playwright.config.ts     # Configuração dos testes
```

## 🔑 Credenciais de Acesso

O Strapi vem pré-configurado com usuários para teste:

**Super Admin:**
- Email: `admin@satc.edu.br`
- Senha: `welcomeToStrapi123`

**Editor:**
- Email: `editor@satc.edu.br`
- Senha: `welcomeToStrapi123`

**Author:**
- Email: `author@satc.edu.br`
- Senha: `welcomeToStrapi123`

## 📦 Instalação

### Pré-requisitos

- Node.js 18+ ou 20+
- pnpm (gerenciador de pacotes)

```powershell
# Instalar pnpm globalmente
npm install -g pnpm@latest-10
```

### Setup do Projeto

```powershell
# 1. Clone o repositório
git clone https://github.com/seu-usuario/devops-unisatc-a3.git
cd devops-unisatc-a3

# 2. Instale as dependências
pnpm install

# 3. Inicie o Strapi em modo desenvolvimento
pnpm dev
```

Acesse: http://localhost:1337/admin

## 🧪 Testes E2E

### Configurar Permissões (OBRIGATÓRIO)

Antes de executar os testes:

1. Acesse: http://localhost:1337/admin
2. Login com: admin@satc.edu.br
3. Vá em **Settings > Roles > Super Admin**
4. Marque **TODAS** as permissões para Category, Author e Article
5. Clique em **Save**

📖 **Guia completo**: Veja `SETUP_TESTES.md`

### Executar Testes

```powershell
# Terminal 1 - Strapi deve estar rodando
pnpm dev

# Terminal 2 - Execute os testes
pnpm test:e2e

# Outros comandos úteis
pnpm test:e2e:ui       # Interface gráfica
pnpm test:e2e:debug    # Modo debug
pnpm test:e2e:report   # Ver relatório HTML
```

### Collections Testadas

- ✅ **Categoria** (Category)
- ✅ **Autor** (Author)
- ✅ **Artigo** (Article)

## 🐳 Docker

### Build Local

```powershell
# Build da imagem
docker build -t strapi-cms:latest .

# Executar container
docker run -p 1337:1337 strapi-cms:latest

# Com docker-compose
docker-compose up
```

### Push para Docker Hub

```powershell
# Tag da imagem
docker tag strapi-cms:latest seu-usuario/devops-unisatc-a3:latest

# Push
docker push seu-usuario/devops-unisatc-a3:latest
```

## ☁️ Deploy com Terraform

### Pré-requisitos

- Terraform instalado
- AWS CLI configurado
- Credenciais AWS

### Deploy

```powershell
cd terraform

# Inicialize
terraform init

# Planeje
terraform plan

# Aplique
terraform apply
```

📖 **Guia completo**: Veja `terraform/README.md`

## 🔄 CI/CD Pipeline

### GitHub Actions Workflows

1. **test-e2e.yml** - Executa em todo PR
   - Instala dependências
   - Roda testes E2E
   - Gera relatórios

2. **docker-build.yml** - Executa em tags
   - Build da imagem Docker
   - Push para Docker Hub

### Criar Pull Requests (Requisito do Trabalho)

**PR com ERRO (para demonstração):**
```powershell
git checkout -b test/pr-com-erro
# Edite tests/exemplo-falha.spec.ts e remova .skip
git add .
git commit -m "test: adiciona teste que falha"
git push origin test/pr-com-erro
# Crie PR - Pipeline vai falhar ❌
```

**PR com SUCESSO:**
```powershell
git checkout -b feat/testes-completos
git add .
git commit -m "feat: adiciona pipeline completa"
git push origin feat/testes-completos
# Crie PR - Pipeline vai passar ✅
```

## 📚 Documentação

- 📖 [SETUP_TESTES.md](SETUP_TESTES.md) - Guia de configuração dos testes
- 📖 [GUIA_CICD.md](GUIA_CICD.md) - Guia completo de CI/CD
- 📖 [CHANGELOG_TESTES.md](CHANGELOG_TESTES.md) - Resumo das alterações
- 📖 [tests/README.md](tests/README.md) - Documentação dos testes
- 📖 [terraform/README.md](terraform/README.md) - Documentação do Terraform

## 🛠️ Scripts Disponíveis

```json
{
  "dev": "Inicia Strapi em modo desenvolvimento",
  "start": "Inicia Strapi em modo produção",
  "build": "Build do Strapi",
  "test:e2e": "Executa testes E2E",
  "test:e2e:ui": "Testes com interface gráfica",
  "test:e2e:debug": "Testes em modo debug",
  "test:e2e:report": "Exibe relatório HTML",
  "test:categoria": "Testes de categoria apenas",
  "test:autor": "Testes de autor apenas"
}
```

## ✅ Checklist do Trabalho A3

### Requisitos Obrigatórios

- [x] **Testes E2E com Playwright**
  - [x] Pelo menos 2 collections testadas (3 implementadas!)
  - [x] Pattern Page Object Model
- [x] **GitHub Actions**
  - [x] Action para rodar testes em PR
  - [ ] Criar 2 PRs (1 com erro, 1 passando)
- [x] **Docker**
  - [x] Dockerfile criado
  - [x] Imagem funcional
  - [ ] Push para repositório (Docker Hub/ECR)
- [x] **Terraform**
  - [x] Arquivos de infraestrutura
  - [x] Deploy configurado para AWS ECS
  - [ ] Executar deploy

### Entrega Final

Data limite: **28/11/2025**

**Entregáveis:**
- ✅ Código no GitHub (fork do repositório original)
- ✅ Pipeline CI/CD funcional
- ✅ Testes automatizados
- ✅ Imagem Docker
- ✅ Infraestrutura como código
- 🔄 Serviço rodando em cloud

## 👥 Equipe

Máximo de 3 participantes por grupo.

## 📞 Suporte

Para dúvidas:
1. Consulte a documentação nos arquivos MD
2. Revise os exemplos em `tests/`
3. Verifique os logs das GitHub Actions
4. Consulte o professor

## 🎓 Recursos de Aprendizado

- [Strapi Documentation](https://docs.strapi.io)
- [Playwright Documentation](https://playwright.dev)
- [Docker Documentation](https://docs.docker.com)
- [Terraform AWS Provider](https://registry.terraform.io/providers/hashicorp/aws/latest/docs)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

## 📝 Licença

Este projeto é para fins educacionais - UNISATC DevOps A3.

---

**Boa sorte com o trabalho! 🚀**

<sub>🤫 Psst! [Strapi is hiring](https://strapi.io/careers).</sub>

