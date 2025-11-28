# 🚀 Guia de Configuração CI/CD - Trabalho A3

## 📋 Checklist Completo do Trabalho

### ✅ Fase 1: Testes Automatizados (CONCLUÍDO)
- [x] Testes E2E com Playwright
- [x] Pelo menos 2 collections testadas (3 implementadas!)
- [x] Padrão Page Object Model
- [x] Testes funcionando localmente

### 🔄 Fase 2: GitHub Actions (TODO)
- [ ] Action para rodar testes em PRs
- [ ] Criar 2 Pull Requests
  - [ ] PR #1 com erro (teste falhando)
  - [ ] PR #2 passando (testes ok)

### 🐳 Fase 3: Docker (TODO)
- [ ] Dockerfile criado
- [ ] Imagem funcional
- [ ] Push para Docker Hub ou AWS ECR

### ☁️ Fase 4: Terraform + Deploy (TODO)
- [ ] Infraestrutura como código
- [ ] Deploy automatizado
- [ ] Serviço rodando no cloud

---

## 🔧 Configuração Passo a Passo

### 1️⃣ Configurar Secrets no GitHub

Para as GitHub Actions funcionarem, você precisa configurar secrets:

#### a) Acesse seu repositório no GitHub
```
https://github.com/seu-usuario/devops-unisatc-a3
```

#### b) Vá em Settings > Secrets and variables > Actions

#### c) Adicione os seguintes secrets:

**Para Docker Hub:**
- `DOCKER_USERNAME` - Seu usuário do Docker Hub
- `DOCKER_PASSWORD` - Sua senha ou token do Docker Hub

**Para AWS (se usar ECR):**
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_REGION`

**Para Azure (se usar ACI):**
- `AZURE_CREDENTIALS`

---

### 2️⃣ Criar Pull Request com ERRO (Obrigatório)

```powershell
# 1. Crie uma branch
git checkout -b test/pr-com-erro

# 2. Edite o arquivo de teste para falhar
# Abra: tests/exemplo-falha.spec.ts
# Remova o .skip de um dos testes

# 3. Commit e push
git add .
git commit -m "test: adiciona teste que falha intencionalmente"
git push origin test/pr-com-erro

# 4. Crie PR no GitHub
# A action vai rodar e FALHAR ❌
```

---

### 3️⃣ Criar Pull Request com SUCESSO (Obrigatório)

```powershell
# 1. Volte para main
git checkout main

# 2. Crie nova branch
git checkout -b feat/testes-completos

# 3. Adicione todos os arquivos novos
git add .
git commit -m "feat: adiciona testes E2E completos com Page Objects"
git push origin feat/testes-completos

# 4. Crie PR no GitHub
# A action vai rodar e PASSAR ✅
```

---

### 4️⃣ Configurar Docker Hub

#### a) Crie conta no Docker Hub
```
https://hub.docker.com/signup
```

#### b) Crie um repositório
```
Nome: devops-unisatc-a3
Visibilidade: Public
```

#### c) Gere um Access Token
```
Account Settings > Security > Access Tokens > New Access Token
```

#### d) Adicione ao GitHub Secrets
```
DOCKER_USERNAME: seu-usuario
DOCKER_PASSWORD: seu-token-gerado
```

---

### 5️⃣ Testar Docker Localmente

```powershell
# 1. Build da imagem
docker build -t strapi-cms:latest .

# 2. Executar container
docker run -p 1337:1337 strapi-cms:latest

# 3. Acessar
# http://localhost:1337/admin

# 4. Parar container
docker ps
docker stop <container-id>
```

---

### 6️⃣ Trigger do Docker Build

A action `docker-build.yml` é disparada quando você:

#### Opção 1: Push de Tag (Recomendado)
```powershell
git tag v1.0.0
git push origin v1.0.0
```

#### Opção 2: Manual
```
GitHub > Actions > Docker Build & Push > Run workflow
```

---

### 7️⃣ Configurar Terraform (AWS ECS exemplo)

#### a) Crie estrutura
```powershell
mkdir terraform
cd terraform
```

#### b) Crie arquivo `main.tf`
```hcl
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "us-east-1"
}

# ECS Cluster
resource "aws_ecs_cluster" "strapi" {
  name = "strapi-cluster"
}

# Task Definition
resource "aws_ecs_task_definition" "strapi" {
  family                   = "strapi"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = "256"
  memory                   = "512"

  container_definitions = jsonencode([{
    name      = "strapi"
    image     = "seu-usuario/devops-unisatc-a3:latest"
    essential = true
    portMappings = [{
      containerPort = 1337
      hostPort      = 1337
      protocol      = "tcp"
    }]
  }])
}
```

#### c) Initialize Terraform
```powershell
terraform init
terraform plan
terraform apply
```

---

### 8️⃣ Criar Action de Deploy

Crie `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Cloud

on:
  workflow_run:
    workflows: ["Docker Build & Push"]
    types:
      - completed

jobs:
  deploy:
    runs-on: ubuntu-latest
    if: ${{ github.event.workflow_run.conclusion == 'success' }}
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Terraform
        uses: hashicorp/setup-terraform@v3

      - name: Configure AWS Credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: us-east-1

      - name: Terraform Init
        run: terraform init
        working-directory: ./terraform

      - name: Terraform Apply
        run: terraform apply -auto-approve
        working-directory: ./terraform
```

---

## 🎯 Fluxo Completo da Pipeline

```
1. Developer faz push/PR
   ↓
2. GitHub Action: test-e2e.yml
   - Instala dependências
   - Roda testes E2E
   - ✅ Passa ou ❌ Falha
   ↓
3. (Se passou) GitHub Action: docker-build.yml
   - Build da imagem Docker
   - Push para Docker Hub/ECR
   ↓
4. GitHub Action: deploy.yml
   - Executa Terraform
   - Deploy no AWS/Azure
   - Serviço disponível! 🎉
```

---

## 📊 Estrutura Final do Projeto

```
devops-unisatc-a3/
├── .github/
│   └── workflows/
│       ├── test-e2e.yml       # ✅ Testes em PR
│       ├── docker-build.yml   # ✅ Build imagem
│       └── deploy.yml         # 🔜 Deploy cloud
├── terraform/
│   ├── main.tf               # 🔜 Infraestrutura
│   ├── variables.tf
│   └── outputs.tf
├── tests/
│   ├── pages/                # ✅ Page Objects
│   ├── autor.spec.ts         # ✅ Testes
│   ├── categoria.spec.ts     # ✅ Testes
│   └── artigo.spec.ts        # ✅ Testes
├── Dockerfile                # ✅ Criado
├── docker-compose.yml        # ✅ Criado
├── playwright.config.ts      # ✅ Configurado
└── package.json              # ✅ Scripts adicionados
```

---

## 🐛 Troubleshooting

### Action falhando: "Unable to locate executable file: pnpm"
```yaml
# Adicione no workflow:
- name: Setup pnpm
  uses: pnpm/action-setup@v4
  with:
    version: 8
```

### Docker build falhando: "ENOENT"
```dockerfile
# Verifique o .dockerignore
# Certifique-se que package.json não está ignorado
```

### Terraform: "Authentication failed"
```
# Verifique se os secrets estão corretos no GitHub
# Settings > Secrets and variables > Actions
```

---

## ✅ Checklist Final do Trabalho

- [ ] Testes E2E funcionando (2+ collections)
- [ ] Action rodando testes em PR
- [ ] PR #1 criado (com erro)
- [ ] PR #2 criado (passando)
- [ ] Dockerfile funcional
- [ ] Imagem no Docker Hub/ECR
- [ ] Terraform configurado
- [ ] Deploy funcionando no cloud
- [ ] Serviço acessível via URL

---

## 🎓 Dicas para Apresentação

1. **Demonstre o fluxo completo**
   - Crie um PR
   - Mostre a action rodando
   - Mostre a imagem no Docker Hub
   - Mostre o serviço no ar

2. **Explique as decisões técnicas**
   - Por que Page Objects?
   - Por que SQLite?
   - Escolha de cloud provider

3. **Mostre os artefatos**
   - Screenshots dos testes
   - Logs das actions
   - Terraform plan output

---

## 📚 Recursos Úteis

- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [Docker Docs](https://docs.docker.com/)
- [Terraform AWS Provider](https://registry.terraform.io/providers/hashicorp/aws/latest/docs)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)

---

**Boa sorte com o trabalho! 🚀**

Se tiver dúvidas, consulte a documentação ou os arquivos README criados.
