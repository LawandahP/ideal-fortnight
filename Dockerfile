# FROM node:14.17.5

# WORKDIR /usr/src/react

# COPY . .
# # COPY package.json ./

# # RUN yarn install --production
# RUN yarn build


# docker_tutorial/frontend/Dockerfile

FROM node:14-alpine AS builder

WORKDIR /opt/web
COPY . ./
RUN yarn install

ENV PATH="./node_modules/.bin:$PATH"

RUN yarn build

FROM nginx:1.20.1-alpine
RUN apk --no-cache add curl
RUN curl -L https://github.com/a8m/envsubst/releases/download/v1.1.0/envsubst-`uname -s`-`uname -m` -o envsubst && \
    chmod +x envsubst && \
    mv envsubst /usr/local/bin
COPY ./nginx.config /etc/nginx/nginx.template
CMD ["/bin/sh", "-c", "envsubst < /etc/nginx/nginx.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]
COPY --from=builder /opt/web/build /usr/share/nginx/html