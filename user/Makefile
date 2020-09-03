define GetFromPkg
$(shell node -p "require('./package.json').$(1)")
endef
DOCKER_TAG:=$(call GetFromPkg,name)
DOCKER_VERSION:=dev
CURRENT_PATH:=$(shell pwd)
HOST_IP:=$(shell ipconfig getifaddr en0)

run:
	npm run dev

stack: 	
	export DOCKER_TAG=${DOCKER_TAG} && \
	export DOCKER_VERSION=${DOCKER_VERSION} && \
	export CURRENT_PATH="${CURRENT_PATH}" && \
	export HOST_IP=${HOST_IP} && \
	docker stack deploy -c stack.dev.yml midas

run-in-docker: 	
	docker build -t ${DOCKER_TAG}:${DOCKER_VERSION} . && \
	docker run -it --entrypoint '/bin/sh' \
	-v "${CURRENT_PATH}/src:/home/app/src" \
	-p 8082:8082 \
	--env-file ./.env \
	-e QUEUE_CONNECTIONSTRING=nats://${HOST_IP}:4223 \
	--rm ${DOCKER_TAG}:${DOCKER_VERSION} -c 'npm run dev'
	 
