FROM node:alpine

WORKDIR /usr/app

COPY . .
RUN npm i && npm run build