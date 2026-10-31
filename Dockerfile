FROM nginxinc/nginx-unprivileged:alpine

USER root
RUN apk upgrade --no-cache

USER nginx

COPY . /usr/share/nginx/html

EXPOSE 8080
