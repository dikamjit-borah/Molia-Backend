# Use the official Node.js Alpine base image
FROM node:20-alpine

# Create a service user in the container
RUN addgroup -S molia_users && adduser -S molia_user -G molia_users

WORKDIR /usr/src/app

# Change ownership of the app files to the service user
RUN chown -R molia_user:molia_users /usr/src/app

# Switch to the service user
USER molia_user

COPY --chown=molia_user:molia_users package*.json ./

RUN npm install

# Copy the rest of the app files with non-root permissions
COPY --chown=molia_user:molia_users . .

EXPOSE 3000

# Command to run the app in production mode using the "prod" script
CMD ["npm", "run", "prod"]

