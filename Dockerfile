FROM node:20-alpine

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./
COPY prisma ./prisma/

RUN npm install -g pnpm

# Instalar dependencias
RUN pnpm install

# Copiar el resto del código
COPY . .

# Generar Prisma Client
RUN npx prisma generate

# Construir la aplicación
RUN pnpm run build

# Exponer el puerto
EXPOSE 10000

# Health check
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:10000/health || exit 1

# Comando para ejecutar la aplicación
CMD ["pnpm", "run", "start:prod"] 