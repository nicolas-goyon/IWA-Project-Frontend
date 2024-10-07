# Dockerfile to build and run a react native redux and expo app
# Usage: docker build -t react-native-redux-expo .
#        docker run -it -p 8081:8081 react-native-redux-expo

# Base image
FROM node:latest

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Install watchman
RUN apt-get update && apt-get install -y watchman

# Copy the rest of the files
COPY . .

# Expose the ports
EXPOSE 8081

# Start the app
CMD ["npm", "run", "start"]