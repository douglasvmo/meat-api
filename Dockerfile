FROM node:alpine

WORKDIR /usr/app

COPY package*.json ./
RUN npm i

COPY . .

RUN npx tsc
