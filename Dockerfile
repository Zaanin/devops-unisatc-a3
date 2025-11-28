# Dockerfile para Strapi CMS
FROM node:20-alpine AS base

# Instalar pnpm
RUN corepack enable && corepack prepare pnpm@8.15.0 --activate

# Diretório de trabalho
WORKDIR /app

# Copiar arquivos de dependências
COPY package.json pnpm-lock.yaml ./

# Instalar dependências
RUN pnpm install --no-frozen-lockfile --prod

# Copiar código fonte
COPY . .

# Variáveis de ambiente para build
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=1337
ENV APP_KEYS=ImJMpHjnCdJw4ii7jZzCXQ==,Jg239VoMach6Fh2LAH6ydA==,LAdmPTwE8oqyVjAV4pCkBQ==,f1gPGngKmE5xhyDktSpCVw==
ENV API_TOKEN_SALT=X2d0C6rgXwWgwEZCslZN0A==
ENV ADMIN_JWT_SECRET=deEi8rGl7WB43uXiaYPaOg==
ENV TRANSFER_TOKEN_SALT=vhsZEWfU3anLONbLZXZfqg==
ENV JWT_SECRET=U2Nh9O8oDdw6gzXqWbg5Eg==
ENV DATABASE_CLIENT=sqlite
ENV DATABASE_FILENAME=.tmp/data.db

# Build do Strapi
RUN pnpm build

# Expor porta
EXPOSE 1337

# Comando de inicialização
CMD ["pnpm", "start"]
