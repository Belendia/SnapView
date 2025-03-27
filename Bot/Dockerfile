# Dockerfile

# Use lightweight Node base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy app files
COPY . .

# Install dependencies
RUN pnpm install

# Build TypeScript (optional — if using ts-node in dev, you can skip this)
RUN pnpm run build

# Use the compiled code in production (assuming build outputs to dist/)
CMD ["pnpm", "start"]

# Dev
# CMD ["pnpm", "run", "dev"]
