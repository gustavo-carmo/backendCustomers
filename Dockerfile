FROM node:12.18.1
WORKDIR /var/app
COPY . .
RUN npm install
RUN npm build
COPY . /var/app

CMD ["npm", "run-script", "typeorm", "migration:run"]
CMD ["node", "dist/shared/infra/http/server.js"]
