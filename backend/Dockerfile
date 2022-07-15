FROM node:18-alpine3.15
WORKDIR /usr/app
RUN apk update && apk add bash
COPY . .
RUN npm install nodemon -g
EXPOSE 3001
