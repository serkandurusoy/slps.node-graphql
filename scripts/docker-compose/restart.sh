#!/usr/bin/env bash
MAIN_DIR=${PWD##*/}
SCRIPT_PATH="$(dirname "$(pwd)")/$MAIN_DIR/scripts/docker-compose/run.sh"
if
 [ "$MAIN_DIR" = 'backend-main' ]; then
   SCRIPT_PATH="$(dirname "$(dirname "$(dirname $PWD)")")/scripts/docker-compose/run.sh"
fi
echo ">> USING $SCRIPT_PATH <<"
docker stop mysql.dev
docker rm -f mysql.dev
docker stop mongo.dev
docker rm -f mongo.dev
docker stop redis.dev
docker rm -f redis.dev
. "$SCRIPT_PATH"
