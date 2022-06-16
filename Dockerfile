FROM node:16 

WORKDIR /src/index

COPY package*.json .

COPY ./ ./ 

EXPOSE ${PORT}

CMD ["npm", "start"]



