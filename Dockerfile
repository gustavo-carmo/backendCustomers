FROM node:12.18.1
WORKDIR /var/app
COPY . .
RUN npm install
COPY . /var/app

# CMD ["chmod", "+x", "onStartup.sh"]
# CMD ["./onStartup.sh"]
