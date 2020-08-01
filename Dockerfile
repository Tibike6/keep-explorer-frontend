FROM node:12.18
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install -g @angular/cli @angular-devkit/build-angular && npm install
COPY . .
EXPOSE 8080
CMD npm run start
