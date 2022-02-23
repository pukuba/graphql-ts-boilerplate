FROM node:14

RUN mkdir -p /server

WORKDIR /server

ADD ./ /server

RUN yarn install --production

EXPOSE 3000

CMD [ "yarn", "on" ]