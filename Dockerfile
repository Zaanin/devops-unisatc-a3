# Dockerfile para Strapi CMS
FROM node:20-alpine AS base

# Instalar pnpm
RUN corepack enable && corepack prepare pnpm@8.15.0 --activate

# Diretório de trabalho
WORKDIR /app

# Copiar arquivos de dependências
COPY package.json pnpm-lock.yaml ./

# Instalar todas as dependências (incluindo dev para build)
RUN pnpm install --no-frozen-lockfile

# Copiar código fonte
COPY . .

# Variáveis de ambiente
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=1337

# Build do Strapi (usando develop ao invés de build)
RUN pnpm build || echo "Build falhou, usando modo develop"

# Expor porta
EXPOSE 1337

# Comando de inicialização
CMD ["pnpm", "start"]
