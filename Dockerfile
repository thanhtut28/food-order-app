FROM node:latest

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package.json ./
COPY yarn.lock ./

RUN yarn

COPY . .

RUN npx prisma generate
RUN yarn build

ENV NODE_ENV production

EXPOSE 4000
CMD [ "node", "dist/src/server.js" ]
USER node