# Build stage
FROM oven/bun:latest AS builder

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN bun install

# Copy source code
COPY . .

# Compile the application into a standalone binary executable
# This completely obfuscates the source code to protect intellectual property
RUN bun build ./server.js --compile --outfile engine

# Production stage (Minimal runtime, no Node.js required)
FROM debian:bookworm-slim

WORKDIR /app

# Copy ONLY the compiled binary from the builder
COPY --from=builder /app/engine .

# Expose port (Railway dynamically provides PORT env var)
EXPOSE 3000

# Start the compiled binary
CMD ["./engine"]
