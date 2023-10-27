# ==== BUILD =====
# Use NodeJS v18.18.2 with Alpine for a slim image
FROM node:18.18.2-alpine3.18 as build
LABEL authors="theGreyPilgrim42"

EXPOSE 3000

# Set the working directory
WORKDIR /react-docker/

# Copy app files
COPY . .

# Set the working directory to api
WORKDIR /react-docker/api

# Install dependencies from package-lock.json
RUN npm install-clean

# Start the development json server
CMD ["npm", "run", "start:docker"]