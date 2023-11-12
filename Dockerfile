# ==== BUILD =====
# Use NodeJS v18.18.2 with Alpine for a slim image
FROM node:18-alpine as build
LABEL authors="theGreyPilgrim42"

# Set the working directory
WORKDIR /react-docker/

# Set environment variables
ENV VITE_BACKEND_API_URL=http://localhost:3000

# Copy app files
COPY . .

# Install dependencies from package-lock.json
RUN npm install-clean

# Build the app
RUN npm run build

# ==== RUN =====
# Use stable Nginx version with Alpine for a slim image
FROM nginx:stable-alpine-slim

# Delete the default nginx.conf
RUN rm /etc/nginx/conf.d/default.conf  # <= This line solved my issue

COPY src/config/nginx.conf /etc/nginx/conf.d

# Copy the build files to the nginx html directory
COPY --from=build /react-docker/dist /usr/share/nginx/html

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]