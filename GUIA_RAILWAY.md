# 🚂 GUIA DEPLOY RAILWAY - 5 MINUTOS

Railway é **MUITO mais fácil** que AWS! Veja como é simples:

## ⚡ PASSO 1: Criar Conta Railway (2 minutos)

1. Acesse: https://railway.app/
2. Clique em **Start a New Project**
3. Login com GitHub (autoriza acesso)
4. **$5 crédito grátis por mês** (suficiente para o projeto)

## 🔗 PASSO 2: Conectar Repositório (1 minuto)

### Opção A: Deploy Direto (Recomendado - Sem Workflow)

1. No Railway dashboard: **+ New Project**
2. Selecione **Deploy from GitHub repo**
3. Escolha: `Zaanin/devops-unisatc-a3`
4. Railway detecta automaticamente o Dockerfile
5. Clique em **Deploy**
6. **PRONTO!** 🎉

### Opção B: Via GitHub Actions (Com Workflow)

1. No Railway: **Settings → Tokens**
2. **Generate Token** → Copie o token
3. GitHub: https://github.com/Zaanin/devops-unisatc-a3/settings/secrets/actions
4. Adicione secret:
   - Name: `RAILWAY_TOKEN`
   - Value: `cole o token`

## 🌐 PASSO 3: Configurar Variáveis (1 minuto)

No Railway, vá em **Variables** e adicione:

```env
NODE_ENV=production
HOST=0.0.0.0
PORT=1337
APP_KEYS=ImJMpHjnCdJw4ii7jZzCXQ==,Jg239VoMach6Fh2LAH6ydA==,LAdmPTwE8oqyVjAV4pCkBQ==,f1gPGngKmE5xhyDktSpCVw==
API_TOKEN_SALT=X2d0C6rgXwWgwEZCslZN0A==
ADMIN_JWT_SECRET=deEi8rGl7WB43uXiaYPaOg==
TRANSFER_TOKEN_SALT=vhsZEWfU3anLONbLZXZfqg==
JWT_SECRET=U2Nh9O8oDdw6gzXqWbg5Eg==
DATABASE_CLIENT=sqlite
DATABASE_FILENAME=.tmp/data.db
```

## 🎯 PASSO 4: Acessar Aplicação (1 minuto)

1. No Railway: **Settings → Generate Domain**
2. Vai gerar algo como: `strapi-cms-production.up.railway.app`
3. Acesse: `https://seu-dominio.up.railway.app/admin`

**PRONTO! Seu Strapi está no ar! 🚀**

---

## ⚙️ Para usar o Workflow GitHub Actions

Se configurou o token:

```powershell
git add .
git commit -m "adiciona: deploy Railway via GitHub Actions"
git push origin master
git tag deploy-railway-v1
git push origin deploy-railway-v1
```

---

## 📊 RAILWAY vs AWS

| Recurso | Railway | AWS ECS |
|---------|---------|---------|
| Setup | 5 min | 30 min |
| Config | Zero | VPC, Subnets, IAM |
| URL Pública | Automático | Manual |
| Free Tier | $5/mês | Complexo |
| Logs | Tempo real | CloudWatch |
| Deploy | 1 clique | Terraform |

## 💰 CUSTOS

- **$5 grátis/mês** = ~500 horas de uptime
- Suficiente para testes e apresentação
- Sem cartão de crédito necessário inicialmente

## 🎓 PARA O PROFESSOR

Railway conta como **serviço cloud** e atende os requisitos:
- ✅ Deploy automatizado via GitHub Actions
- ✅ Container Docker rodando em cloud
- ✅ Pipeline CI/CD completa
- ✅ Muito mais simples que AWS
- ✅ URL pública funcionando

---

## 🚀 DEPLOY INSTANTÂNEO (Sem Workflow)

**Jeito mais rápido:**

1. https://railway.app/ → Login com GitHub
2. New Project → Deploy from GitHub
3. Seleciona `devops-unisatc-a3`
4. Adiciona variáveis de ambiente
5. Generate Domain
6. **DONE!** App no ar em 3 minutos

Você ainda tem a **pipeline completa**:
- PR → Testes E2E → Docker Build → Deploy Railway

---

## ⚠️ IMPORTANTE

Railway faz deploy automático a cada push no GitHub!

Para evitar deploys desnecessários:
1. Railway → Settings → **Disable automatic deploys**
2. Deploy só via workflow (tag `deploy-*`)

Ou deixe automático mesmo! Toda vez que fizer push, sobe pro ar automaticamente 🚀
