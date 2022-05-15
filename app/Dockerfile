FROM node:15.11.0-alpine3.10

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 4200

CMD [ "npm", "run", "start-dev"]

