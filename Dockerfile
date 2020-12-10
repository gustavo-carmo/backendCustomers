FROM node:12.18.1
WORKDIR /var/app
COPY . .
RUN npm install
COPY . /var/app


RUN npm build
CMD ["npm", "run-script", "typeorm", "migration:run"]
CMD ["npm", "run-script", "build"]
CMD ["node", "dist/shared/infra/http/server.js"]
