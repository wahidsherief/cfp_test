# Use Node.js as a base image
FROM node:alpine

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of your app's source code
COPY . .

# Build the application
RUN npm run build

# Install serve to serve the build folder
RUN npm install -g serve

# Expose the port the app runs on
EXPOSE 3000

# Run the application
CMD ["serve", "-s", "build"]
