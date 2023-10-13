FROM node:16

WORKDIR /usr/src/app

COPY . .

ENV REACT_APP_BACKEND_URL=http://localhost:3000

EXPOSE 3001

RUN npm install

# Test ENV option and run test
ENV CI=true
RUN npm run test

RUN npm run build

RUN npm install -g serve

CMD ["serve", "build"]