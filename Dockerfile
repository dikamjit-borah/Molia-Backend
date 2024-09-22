# Use the official Node.js Alpine base image
FROM node:20-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install

# Copy the rest of the app files
COPY . .
EXPOSE 3000

# Command to run the app in production mode using the "prod" script
CMD ["npm", "run", "prod"]

