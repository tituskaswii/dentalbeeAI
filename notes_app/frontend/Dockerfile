# Use an official Node.js image as the base image
FROM node:16-alpine AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
#RUN npm install
RUN npm install --legacy-peer-deps
#RUN npm install --legacy-peer-deps || npm install --force || npm install -g npm@latest
# RUN echo "Running npm install --legacy-peer-deps" && npm install --legacy-peer-deps || \
#     echo "First command failed, trying npm install --force" && npm install --force || \
#     echo "Both previous attempts failed, upgrading npm to the latest version" && npm install -g npm@latest || \
#     echo "Both previous attempts failed, upgrading npm to the latest version" && npm audit fix

# Copy the rest of the application files
COPY . .

RUN npm set fetch-timeout 60000000
RUN npm set fetch-retries 5
RUN npm set fetch-retry-mintimeout 10000

# Build the React app for production
RUN npm cache clean --force
RUN npm run build

# Use Nginx to serve the static files
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html

# Copy a default Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
