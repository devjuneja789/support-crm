FROM node:18-alpine

WORKDIR /app

# Install dependencies (production only)
COPY package*.json ./
RUN npm ci --only=production

# Copy application code
COPY . .

# Expose backend port
EXPOSE 5000

ENV NODE_ENV=production

CMD ["node", "server.js"]