FROM node:20-alpine3.18 as build

WORKDIR /app 

ARG VITE_API_URL 
ENV VITE_API_URL=${VITE_API_URL}

COPY package.json pnpm-lock.yaml ./
RUN npm i -g pnpm
RUN pnpm i 
COPY . ./
RUN pnpm build

FROM nginx:1.23.1-alpine

COPY ./default.conf /etc/nginx/conf.d/default.conf

RUN set -x ; \
    addgroup -g 82 -S www-data ; \
    adduser -u 82 -D -S -G www-data www-data && exit 0 ; exit 1


RUN apk update \
    && apk upgrade \
    && apk add --no-cache openssl

RUN openssl req -x509 -nodes -days 365 -subj "/C=CA/ST=QC/O=Company, Inc./CN=mydomain.com" -addext "subjectAltName=DNS:mydomain.com" -newkey rsa:2048 -keyout /etc/ssl/private/nginx-selfsigned.key -out /etc/ssl/certs/nginx-selfsigned.crt;

COPY --from=build --chown=www-data:www-data /app/dist /usr/share/nginx/html

EXPOSE 80 443
