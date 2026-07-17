# Production Dockerfile for Digital Suite Templates
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .

# Production stage
FROM node:20-alpine

WORKDIR /app

# Copy built node_modules and source code from builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app .

# Expose port (Railway dynamically provides PORT env var)
EXPOSE 3000

# Start the server
CMD ["npm", "start"]
