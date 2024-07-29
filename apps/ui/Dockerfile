# Stage 1: Build
FROM bun:latest AS builder

WORKDIR /app

# Copy the monorepo root files
COPY ./bunfig.toml ./

# Copy the UI application files
COPY ./apps/ui ./

# Install dependencies and build the project
RUN bun install
RUN bun build

EXPOSE 3000

# Stage 2: Production
FROM bun:1-slim AS production

WORKDIR /app

COPY --from=builder ./app/dist ./
EXPOSE 3000


# Command to run the app
CMD ["bun", "run", "start"]
