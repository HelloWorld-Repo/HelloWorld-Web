FROM node:13-alpine
WORKDIR /app

ENV NODE_ENV=development

COPY package.json ./
RUN npm install

COPY . .

CMD ["npm", "start"]