# Dockerfile para Strapi CMS
FROM node:20-alpine AS base

# Instalar pnpm
RUN corepack enable && corepack prepare pnpm@8.15.0 --activate

# Diretório de trabalho
WORKDIR /app

# Copiar arquivos de dependências
COPY package.json pnpm-lock.yaml ./

# Instalar dependências
RUN pnpm install --frozen-lockfile --prod

# Copiar código fonte
COPY . .

# Build do Strapi
RUN pnpm build

# Expor porta
EXPOSE 1337

# Variáveis de ambiente
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=1337

# Comando de inicialização
CMD ["pnpm", "start"]
