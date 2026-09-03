# --- base
FROM node:22-alpine AS base
RUN apk add --no-cache openssl
WORKDIR /app
COPY package*.json ./

# --- deps
FROM base AS deps
RUN npm ci

# --- dev
FROM deps AS dev
COPY . .
RUN npx prisma generate
CMD ["npm", "run", "start:dev"]

# --- builder
FROM deps AS builder
COPY . .
RUN npx prisma generate
RUN npm run build

# --- migrator
FROM builder AS migrator
CMD ["npx", "prisma", "migrate", "deploy"]

# --- pruned
FROM builder AS pruned
RUN npm prune --omit=dev

# --- prod
FROM base AS prod
ENV NODE_ENV=production
COPY --from=pruned --chown=node:node /app/node_modules ./node_modules
COPY --from=pruned --chown=node:node /app/dist ./dist
COPY --from=pruned --chown=node:node /app/prisma ./prisma
USER node
EXPOSE 3333
CMD ["node", "dist/main.js"]