# Use Node.js 20 slim as our base image for a small footprint
FROM node:20-slim AS base

# Install OpenSSL 1.1.x or 3.0.x which is required by Prisma
RUN apt-get update -y && apt-get install -y openssl

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies
# We use npm ci for a more reliable/reproducible build in CI/CD
RUN npm ci

# Copy the rest of the application code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Final production stage
FROM node:20-slim

RUN apt-get update -y && apt-get install -y openssl

WORKDIR /app

# Only copy necessary files from the base stage
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/package*.json ./
COPY --from=base /app/prisma ./prisma
COPY --from=base /app/src ./src

# Create a simple startup script
RUN echo '#!/bin/sh\nnpx prisma db push\nnpm start' > /app/docker-entrypoint.sh
RUN chmod +x /app/docker-entrypoint.sh

# Environment variables
ENV NODE_ENV=production
ENV PORT=5000

# Expose the application port
EXPOSE 5000

# Start the application using the entrypoint script
ENTRYPOINT ["/app/docker-entrypoint.sh"]
