#!/usr/bin/env bash
LOGICAL_DIR=${PWD##*/}
DOCKER_DIR=docker

DOCKER_PATH="${PWD%}/$DOCKER_DIR"

# if backend-main
if [ "$LOGICAL_DIR" == "backend-main" ]; then
DOCKER_PATH="${PWD%/*/*/*}/$DOCKER_DIR"
fi

echo CURRENT DIR: [$LOGICAL_DIR]
echo DOCKER-COMPOSE FILE IN: [$DOCKER_PATH]
docker-compose -f $DOCKER_PATH/docker-compose.yml kill && docker-compose -f $DOCKER_PATH/docker-compose.yml down
