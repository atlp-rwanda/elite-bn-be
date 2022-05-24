FROM node:16 

WORKDIR /src/app

COPY package*.json .

RUN npm ci

COPY ./ ./ 

EXPOSE ${PORT}

CMD ["npm", "start"]
