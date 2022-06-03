FROM node:14-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV PATH ./node_modules/.bin:$PATH

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}


RUN npm run build

CMD ["npm", "run", "start:prod"]
