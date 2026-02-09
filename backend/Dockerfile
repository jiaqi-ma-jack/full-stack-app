## Build Stage
# Use the latest LTS version of Node.js
FROM node:latest AS build
 
# Set the working directory inside the container
WORKDIR /app
 
# Copy package.json
COPY package.json /app
 
# Install dependencies
RUN npm install
 
# Copy the rest of files
COPY . /app
 
# Build
CMD ["node", "./dist/index.js"]

## Production Stage
FROM node:22-alpine AS production
WORKDIR /app
COPY --from=build /app/package*.json ./
RUN npm install --only=production
COPY --from=build /app/dist ./dist
EXPOSE 8080
CMD ["node", "dist/index.js"]