FROM node:current-slim

WORKDIR /app

COPY . .

RUN npm ci

EXPOSE 8080

CMD ["npm", "run", "start:dev"]