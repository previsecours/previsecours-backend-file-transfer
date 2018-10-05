##############################################
# WARNING : THIS FILE SHOULDN'T BE TOUCHED   #
#    FOR ENVIRONNEMENT CONFIGURATION         #
# CONFIGURABLE VARIABLES SHOULD BE OVERRIDED #
# IN THE 'artifacts' FILE, AS NOT COMMITTED  #
##############################################


export PORT=8081
export APP=previsecours
export COMPOSE_PROJECT_NAME=${APP}
export APP_PATH := $(shell pwd)
export BACKEND=${APP_PATH}/backend
export BACKEND_UPLOAD_FOLDER=/upload
export DC_DIR=${APP_PATH}
export DC_PREFIX=${DC_DIR}/docker-compose
export debugMode=false

date                := $(shell date -I)
id                  := $(shell cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w 8 | head -n 1)

dummy               := $(shell touch artifacts)
include ./artifacts

DC := 'docker-compose'

docker-clean: stop
	docker container rm ${APP}-build-front

network-stop:
	@echo cleaning ${APP} docker network
	docker network rm ${APP}

network:
	@docker network create ${APP} 2> /dev/null; true

backend-stop:
	${DC} -f ${DC_PREFIX}-backend.yml down

backend: network
	${DC} -f ${DC_PREFIX}-backend.yml up --build -d

backend-log:
	${DC} -f ${DC_PREFIX}-backend.yml logs --build -d

dev-log:
	${DC} -f ${DC_PREFIX}-backend.yml logs

dev: network backend

stop: backend-stop network-stop

restart: backend-stop network-stop network backend
