FROM node:14 as build
WORKDIR /usr/local/app
COPY . /usr/local/app/
RUN npm install
RUN npm run build

FROM nginx:latest
COPY --from=build /usr/local/app/dist/saajuna-frontend /usr/share/nginx/html
EXPOSE 80