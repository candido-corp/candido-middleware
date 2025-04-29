# STAGE 1 - Build
FROM node:20.15-alpine AS builder
WORKDIR /app

# Install deps
COPY package*.json ./
RUN npm install

# Copy source and build
COPY . .
RUN npm run build

# STAGE 2 - Runtime
FROM node:20.15-alpine
WORKDIR /app

# Copy built files and install only runtime deps
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
RUN npm install --omit=dev

EXPOSE 3001
CMD ["node", "dist/app.js"]
