FROM node:16 

WORKDIR /src/app

COPY package*.json .

COPY ./ ./ 

EXPOSE ${PORT}

CMD ["npm", "start"]



