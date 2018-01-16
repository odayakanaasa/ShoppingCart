FROM node:9.3.0

WORKDIR /

COPY package*.json ./

RUN npm install

COPY ./bin/www ./

EXPOSE 8080

CMD node node ./bin/www