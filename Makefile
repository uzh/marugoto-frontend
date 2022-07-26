BUILD_TAG ?= latest
BUILD_IMAGE ?= uzhlit/marugoto-frontend
NODE_ENV ?= production
ENV_FILE ?= test

run-dev:
	BUILD_IMAGE=${BUILD_IMAGE} \
	GIT_TAG=$(shell git describe --tags --abbrev=0 HEAD) \
	GIT_BRANCH=$(shell git rev-parse --abbrev-ref HEAD) \
	GIT_REVISION=$(shell git rev-parse --short HEAD) \
	PUBLIC_PATH=/ \
	docker-compose -f docker-compose-dev.yml up --build

run-down:
	docker-compose -f docker-compose-dev.yml down --remove-orphans

build:
	docker build \
	-f Dockerfile \
	-t ${BUILD_IMAGE}:${BUILD_TAG} \
	--build-arg NODE_ENV=${NODE_ENV} \
	--build-arg ENV_FILE=${ENV_FILE} \
	--build-arg BUILD_IMAGE=${BUILD_IMAGE}:${BUILD_TAG} \
	--build-arg GIT_TAG=$(shell git describe --tags --abbrev=0 HEAD) \
	--build-arg GIT_BRANCH=$(shell git rev-parse --abbrev-ref HEAD) \
	--build-arg GIT_REVISION=$(shell git rev-parse --short HEAD) .
