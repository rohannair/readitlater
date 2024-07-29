# Stage 1: Build
FROM bun:1-slim AS production

WORKDIR /app

# Copy the monorepo root files
COPY ./bunfig.toml ./

# Copy the UI application files
COPY ./apps/ui ./

# Install dependencies and build the project
RUN bun install

EXPOSE 3000

# Command to run the app
CMD ["bun", "run", "start"]
