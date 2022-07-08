# build stage
FROM node:8.15-alpine as build-stage

ARG NODE_ENV
ARG BUILD_IMAGE
ARG GIT_TAG
ARG GIT_BRANCH
ARG GIT_REVISION

# fix build problem
RUN npm config set unsafe-perm true

# install simple http server for serving static content
RUN npm install -g http-server

# make the 'app' folder the current working directory
WORKDIR /src

# copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json ./

# install project dependencies
RUN npm install

# copy project files and folders to the current working directory (i.e. 'src' folder)
COPY src ./src
COPY coverage ./coverage
COPY public ./public

COPY vue.config.js ./
COPY .env .env.${NODE_ENV} ./

ENV NODE_ENV=${NODE_ENV}
ENV BUILD_IMAGE=${BUILD_IMAGE}
ENV GIT_TAG=${GIT_TAG}
ENV GIT_BRANCH=${GIT_BRANCH}
ENV GIT_REVISION=${GIT_REVISION}

# build app for production with minification
RUN npm run build

# release build
FROM nginx:1.13.12-alpine as production-stage

# continued
COPY --from=build-stage /src/dist /usr/share/nginx/html

COPY default.conf /etc/nginx/conf.d/default.conf

# open port
EXPOSE 80

# entrypoint
CMD ["nginx", "-g", "daemon off;"]
