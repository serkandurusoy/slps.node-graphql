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

RESTART_EXEC=restart-dev-db
echo ">> IF ERRORS OR CONFLICTS EXECUTE FIRST 'yarn run $RESTART_EXEC' <<"
docker-compose -f $DOCKER_PATH/docker-compose.yml up -d
