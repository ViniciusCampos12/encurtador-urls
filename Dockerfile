FROM node:20-alpine

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

RUN npm install

RUN chown -R node:node /usr/src/app

COPY --chown=node:node . .

USER node

EXPOSE 3333