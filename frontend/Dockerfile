## Build Stage
# Use the latest LTS version of Node.js
FROM node:latest AS build
 
# Set the working directory inside the container
WORKDIR /app
 
# Copy package.json
COPY package.json ./
 
# Install dependencies
RUN npm install
 
# Copy the rest of files
COPY . .
 
# Build
RUN npm run build

## Production Stage
# nginx runs on port 80 by default
# EXPOSE: serves for documentation purpose only
FROM nginx:stable-alpine AS production 
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]