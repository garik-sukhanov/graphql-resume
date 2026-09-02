#--- base image
FROM node:22-alpine AS base
WORKDIR /app
COPY package*.json ./

#--- dev 
FROM base AS dev
RUN npm ci
COPY . .
CMD ["npm", "run", "start:dev"]

#--- builder
FROM base AS builder
RUN npm ci
COPY . .
RUN npm run build && npm prune --omit=dev

# --- prod
FROM base AS prod
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/node_modules /node_modules
COPY --from=builder /app/dist /dist
COPY package*.json .
USER node
EXPOSE 3333
ENTRYPOINT [ "node"]
CMD [ "/dist/index.js"]
