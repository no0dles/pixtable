FROM node:6.2.0

WORKDIR app

RUN npm install -g angular-cli@"1.0.0-beta.22-1"

ADD package.json .
RUN npm install

ADD . /app

EXPOSE 4200

CMD [ "ng", "serve", "--host", "0.0.0.0" ]
