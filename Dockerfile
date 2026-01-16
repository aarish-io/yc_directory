# Use Node.js 18 LTS Alpine for smaller image size
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install dependencies first (for better caching)
COPY package*.json ./
RUN npm ci

# Install Sanity CLI globally
RUN npm install -g @sanity/cli

# Copy source code
COPY . .

# Generate Sanity types
RUN npm run typegen || echo "Typegen failed, continuing..."

# Expose port 3000
EXPOSE 3000

# Start the development server
CMD ["npm", "run", "dev"]