FROM node:14 as start
RUN npm install -g @angular/cli
WORKDIR /usr/local/app
COPY . /usr/local/app/
RUN npm install
EXPOSE 4200
CMD ng serve --host 0.0.0.0 