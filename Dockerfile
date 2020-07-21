FROM node:latest as build-stage
WORKDIR /apps/pasqooda-front
COPY package*.json ./
RUN npm install
COPY ./ .
RUN npm run build

FROM nginx as production-stage
RUN mkdir /apps
RUN mkdir /apps/pasqooda-front
RUN mkdir /apps/pasqooda-front/public
COPY --from=build-stage /apps/pasqooda-front/dist /apps/pasqooda-front/public
COPY nginx.conf /etc/nginx/nginx.conf

