FROM node:18-alpine

# Building client
WORKDIR /app/client
COPY client .
RUN yarn install
RUN yarn build

# Building admin
WORKDIR /app/admin
COPY admin .
RUN yarn install
RUN yarn build

# Copying server
WORKDIR /app
COPY server .

# Moving client, admin and removing sources
RUN mv ./client/build/* ./public && rm -r ./client
RUN mv ./admin/build ./public/admin && rm -r ./admin

# Final preparing
ENV NODE_ENV=production
RUN yarn install --production
EXPOSE 80
CMD ["yarn", "start:prod"]
