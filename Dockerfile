# --- Stage 1: Build & Transpile ---
FROM node:20-alpine AS builder

WORKDIR /usr/src/app

# Copy package metadata
COPY package*.json ./

# Install all dependencies (including devDependencies for testing & transpiling)
RUN npm ci

# Copy the rest of the source code
COPY . .

# Run Babel to compile ES6 modules to CommonJS inside dist/
RUN npm run build

# --- Stage 2: Final Production Runtime ---
FROM node:20-alpine AS runner

WORKDIR /usr/src/app

# Set Node environment to production
ENV NODE_ENV=production
ENV PORT=3000

# Copy package metadata
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production

# Copy built artifacts from the builder stage
COPY --from=builder /usr/src/app/dist ./dist

# Expose target port
EXPOSE 3000

# Run the transpiled app
CMD ["node", "dist/server.js"]
