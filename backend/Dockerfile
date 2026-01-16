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
FROM node:latest AS production
ENV NODE_ENV=production
COPY --from=build /app/dist ./dist/
EXPOSE 8080
CMD ["node", "./dist/index.js"]