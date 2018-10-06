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
# please note that you must absolutely change this token for security reasons. Overload this value in the 'artifacts' file
export accessToken=Y0Umust4bsolut3lyCh4NGM3

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


status:
	curl -s --noproxy "*" -XGET http://localhost:${PORT}/api/status | jq '.'
sleep:
	@sleep 1

test:
	@echo "testing api" | tee test.txt
	@curl -v -s --noproxy "*" -XPOST \
  		http://localhost:${PORT}/api/uploadFile/interventions/91 \
  		-H 'Cache-Control: no-cache' \
  		-H 'x-access-token: ${accessToken}' \
  		-F file=@`pwd`/test.txt --progress-bar | jq '.'
	@diff test.txt backend/upload/interventions_91_update_`date +%d-%m-%Y`.txt && echo "upload api is successfull"
	@rm -f test.txt backend/upload/interventions_91_update_`date +%d-%m-%Y`.txt
up: network backend

down: backend-stop network-stop

restart: backend-stop network-stop network backend sleep status
