# 
# Base Image
# 
FROM node:16.14-alpine as base
# RUN ["yarn", "global", "add", "@nestjs/cli"]
WORKDIR /usr/app
# Take advantange of docker caching
COPY ["package.json", "yarn.lock", "./"]
COPY tsconfig.json ./
COPY tsconfig.build.json ./
COPY prisma ./prisma/
RUN ["yarn", "install", "--pure-lockfile"]
# Copy source files
COPY . .

# 
# Development Image
# 
FROM base as development
WORKDIR /usr/app
# Launch the application in watch mode (live reload)
CMD ["yarn", "run", "start:dev"]

# 
# Build Image (for production only)
# 
FROM base as build
WORKDIR /usr/app
# Deletes the dist folder
RUN ["yarn", "run", "prebuild"]
# Build the application
RUN ["yarn", "run", "build"]

# 
# Production Image
# 
FROM node:16.14 as production
WORKDIR /usr/app
# Take advantange of docker caching
COPY ["package.json", "yarn.lock", "./"]
# Install production dependencies only
RUN ["yarn", "install", "--prod"]
# Copy dist folder from the build image
COPY --from=build /usr/app/dist ./dist
# Launch the application
CMD ["node", "dist/main"]
