# ==== BUILD =====
# Use NodeJS v18.x.x with Alpine for a slim image
FROM node:18-alpine AS build
LABEL authors="SmashGrade"

EXPOSE 9000

# Set the working directory
WORKDIR /json-server/

# Copy app files
COPY . .

# Install dependencies from package-lock.json
RUN npm install-clean

# Build typescript to javascript
RUN npm run build

# Start the development json server
CMD ["npm", "run", "start"]