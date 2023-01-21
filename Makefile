include .env

SEED := $(shell perl -e "print int(rand(1000000))")

.PHONY: docker-push
docker-push:
	docker build . --tag video-vue:${VERSION}-${SEED} -f ./Dockerfile
	docker tag video-vue:${VERSION}-${SEED} ${ADDR}:${VERSION}-${SEED}
	echo ${PASSWORD}  |  docker login --username=${USERNAME} registry.cn-hangzhou.aliyuncs.com --password-stdin
	docker push ${ADDR}:${VERSION}-${SEED}
