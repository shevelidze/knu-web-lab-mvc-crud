FROM node:20-alpine

WORKDIR /app

COPY package*.json .
RUN npm install --production=false

COPY . .

CMD npm run start
