# Dockerfile for Next frontend
FROM node:20-alpine
WORKDIR /app
# Copy and install dependencies
COPY package.json package-lock.json ./
RUN npm ci
# Copy all source code
COPY . .
# Run dev server
CMD ["npm", "run", "dev"]