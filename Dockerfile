FROM node:20-alpine AS dependencies

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev


FROM node:20-alpine AS production

WORKDIR /app

ENV NODE_ENV=production

COPY --from=dependencies /app/node_modules ./node_modules

COPY package*.json ./

COPY src ./src

COPY .env.example ./.env.example

RUN mkdir -p \
    /app/uploads/documents \
    /app/logs \
    && chown -R node:node /app

USER node

EXPOSE 8080

CMD ["node", "src/server.js"]