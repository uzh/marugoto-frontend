# Marugoto Frontend
[![Build Status](https://travis-ci.org/uzh/marugoto-frontend.svg?branch=master)](https://travis-ci.org/uzh/marugoto-frontend)

Frontend for the [Marugoto](https://github.com/uzh/marugoto) middleware (E-Learning Application for Story Telling).

### Project setup
```
npm install (please use node version 10)
```

##### Compiles and hot-reloads for development
```
npm run serve
```

##### Builds the application for production
```
npm run build
```

##### Runs lint and checks if there are some errors
```
npm run lint
```


## Docker
Using Makefile `make build` allow to build a custom image
using a local env file, forn instance `.env.production.local`

```
BUILD_IMAGE=<your namespace>/marugoto-frontend \
NODE_ENV=test \
ENV_FILE=.env.production.local \
make build
```

Docker can also be used for development purposes (using .env file only)
```
BUILD_IMAGE=my-marugo-development make run-dev
```
