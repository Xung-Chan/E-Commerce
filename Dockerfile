# Use official Node.js image as the base
FROM node:20-alpine
RUN apk add --no-cache curl
# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application source code
COPY . .



RUN npm run css-build



# Expose port (change if your app uses a different port)
EXPOSE 8000
