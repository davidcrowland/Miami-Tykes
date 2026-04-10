FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install all dependencies
RUN npm install

# Copy source files
COPY . .

# Build the React frontend
RUN npm run build

# Expose port
EXPOSE 3000

# Start the server
CMD ["node", "server.js"]
