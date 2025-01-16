# Step 1: Build the Next.js app
FROM node:18-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the source files and build the app
COPY . ./
RUN npm run build

# Step 2: Set up the production image
FROM node:18-alpine

WORKDIR /app

# Install only production dependencies
COPY --from=builder /app/package.json /app/package-lock.json ./
RUN npm install --production

# Copy the built app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

# Expose the port and run the app in production mode
EXPOSE 3000
CMD ["npm", "run", "dev"]
