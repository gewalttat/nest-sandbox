FROM node:12.13-alpine

WORKDIR /app

COPY package.json ./package-lock.json

RUN yarn install

COPY . .

COPY ./dist ./dist

CMD ["yarn", "run", "start:dev"]