FROM node:14

RUN mkdir -p /server

WORKDIR /server

ADD ./ /server

RUN npm install; \
    npm run build

EXPOSE 3000

CMD [ "npm", "run", "on" ]