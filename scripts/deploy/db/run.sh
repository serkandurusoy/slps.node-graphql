#!/bin/bash

################ INPUT VARS ##############
# Staging or Production
TARGET=$1
# If getting 'Too many authentication failures' pass both ssh user and key. These two are optional
USER=$2
KEY=$3
##########################################


############# CHECKING INPUT PARAMS #####
SSH_USER=root
SSH_KEY=
if [ -z "$TARGET" ]; then
  echo 'Missing deployment target. Possible values: staging, production'
  exit 0
elif [ -z "$USER" ]; then
  echo 'Missing ssh user. Possible values: either root or anything else | It is the user you got on Google Cloud'
elif [ -z "$KEY" ]; then
  echo 'Missing ssh private key. Possible values: ~.ssh/id_rsa'
fi

if [ "$USER" ]; then
  SSH_USER="$USER"
fi

if [ "$KEY" ]; then
  SSH_KEY="-i $KEY"
fi

#########################################

################ CONFIG VARS #############
APP_NAME=sloops
APP_DIR="$(dirname "$(pwd)")"
echo $APP_DIR
SRC_DIR=sloops/scripts/deploy/db
DOCKER_TOOLBOX=toolbox
TMP_DIR=/tmp
SERVER_TMP_DIR=/tmp
TMP_BUNDLE=bundle
COUNTER=0
# TODO: COUNT HOW MANY STEPS EXACTLY
TOTAL_ECHOS=11
#########################################

############## STAGING VARS #############
STAGING_REMOTE_SERVER=35.197.233.165
#As GCE may alter, add, or remove nodes at any time, it's not providing a fixed set of static IP addresses for single instances
#We use instance groups (because of scaling) so cannot assign a static ip either
#NAMESPACE=slps-stg-backend-main
#PROJECT_ID=$NAMESPACE
#STAGING_REMOTE_SERVER=$(gcloud compute instances list --project $PROJECT_ID | awk '/main/ {print $5}')
#echo STAGING_SERVER_IP: $STAGING_REMOTE_SERVER
#if [ -z "$STAGING_REMOTE_SERVER" ]; then
#  echo 'Error retrieving SERVER IP'
#  exit 0
#fi
STAGING_SSH_USER=$SSH_USER
STAGING_SCP_CONN_OPTIONS="$SSH_KEY"
STAGING_SSH_CONN_OPTIONS="$SSH_KEY"
STAGING_SSH_CONN="$STAGING_SSH_CONN_OPTIONS $STAGING_SSH_USER@$STAGING_REMOTE_SERVER"
STAGING_SCP_CONN=$STAGING_SSH_USER@$STAGING_REMOTE_SERVER
#########################################

# TODO: Production is incomplete
############## PRODUCTIONS VARS #########
#########################################



case "$TARGET" in
  'staging' | 'production')
    if [ "$TARGET" = 'staging' ]; then
      SSH_CONN=$STAGING_SSH_CONN
      REMOTE_SERVER=$STAGING_REMOTE_SERVER
      SSH_CONN=$STAGING_SSH_CONN
      SCP_CONN_OPTIONS=$STAGING_SCP_CONN_OPTIONS
      SCP_CONN=$STAGING_SCP_CONN
    elif [ "$TARGET" = 'production' ]; then
      echo "PRODUCTION SCRIPT NOT ACTIVE YET. PLEASE CONTACT PROJECT ADMIN"
      exit 0
    fi
    echo "[$TARGET vars configured]"
    echo ""
    ;;
  *)
    echo 'Invalid deployment target. Possible values: staging, production'
    exit 0
    ;;
esac

################## BUILDING ####################
echo "=> $((COUNTER = $COUNTER + 1))/$TOTAL_ECHOS Removing $TMP_DIR/$APP_NAME"
rm -R $TMP_DIR/$APP_NAME

echo "=> $((COUNTER = $COUNTER + 1))/$TOTAL_ECHOS Create $TMP_DIR/$APP_NAME"
mkdir $TMP_DIR/$APP_NAME
mkdir $TMP_DIR/$APP_NAME/$TMP_BUNDLE

echo "=> $((COUNTER = $COUNTER + 1))/$TOTAL_ECHOS Copying $SRC_DIR to $TMP_DIR/$APP_NAME/$TMP_BUNDLE"
cp -Rv $APP_DIR/$SRC_DIR/$DOCKER_TOOLBOX/** $TMP_DIR/$APP_NAME/$TMP_BUNDLE
cp -v $APP_DIR/$SRC_DIR/$DOCKER_TOOLBOX/.env $TMP_DIR/$APP_NAME/$TMP_BUNDLE

echo "=> $((COUNTER = $COUNTER + 1))/$TOTAL_ECHOS Moving to $TMP_DIR/$APP_NAME/$TMP_BUNDLE"
cd /$TMP_DIR/$APP_NAME/$TMP_BUNDLE


echo "=> $((COUNTER = $COUNTER + 1))/$TOTAL_ECHOS Creating $APP_NAME.tar.gz ..."
cd ..
tar czvf $APP_NAME.tar.gz bundle

echo "=> $((COUNTER = $COUNTER + 1))/$TOTAL_ECHOS Uploading $APP_NAME.tar to remote server..."
scp $SCP_CONN_OPTIONS $APP_NAME.tar.gz $SCP_CONN:$SERVER_TMP_DIR && \

############### RETRIEVING ENVS FROM THE SERVER (...sadness) ###########
## MYSQL_DATABASE
ssh $SSH_CONN "rm /tmp/MYSQL_DATABASE.env ; curl 'http://metadata/computeMetadata/v1/project/attributes/MYSQL_DATABASE' -H 'Metadata-Flavor: Google' >> /tmp/MYSQL_DATABASE.env"
scp $SCP_CONN_OPTIONS $SCP_CONN:$SERVER_TMP_DIR/MYSQL_DATABASE.env /tmp/ && \
MYSQL_DATABASE="$(cat /tmp/MYSQL_DATABASE.env)"
rm /tmp/MYSQL_DATABASE.env

## MYSQL_USER
ssh $SSH_CONN "rm /tmp/MYSQL_USER.env ; curl 'http://metadata/computeMetadata/v1/project/attributes/MYSQL_USER' -H 'Metadata-Flavor: Google' >> /tmp/MYSQL_USER.env"
scp $SCP_CONN_OPTIONS $SCP_CONN:$SERVER_TMP_DIR/MYSQL_USER.env /tmp/ && \
MYSQL_USER="$(cat /tmp/MYSQL_USER.env)"
rm /tmp/MYSQL_USER.env

## MYSQL_PASSWORD
ssh $SSH_CONN "rm /tmp/MYSQL_PASSWORD.env ; curl 'http://metadata/computeMetadata/v1/project/attributes/MYSQL_PASSWORD' -H 'Metadata-Flavor: Google' >> /tmp/MYSQL_PASSWORD.env"
scp $SCP_CONN_OPTIONS $SCP_CONN:$SERVER_TMP_DIR/MYSQL_PASSWORD.env /tmp/ && \
MYSQL_PASSWORD="$(cat /tmp/MYSQL_PASSWORD.env)"
rm /tmp/MYSQL_PASSWORD.env

## MYSQL_ROOT_PASSWORD
ssh $SSH_CONN "rm /tmp/MYSQL_ROOT_PASSWORD.env ; curl 'http://metadata/computeMetadata/v1/project/attributes/MYSQL_ROOT_PASSWORD' -H 'Metadata-Flavor: Google' >> /tmp/MYSQL_ROOT_PASSWORD.env"
scp $SCP_CONN_OPTIONS $SCP_CONN:$SERVER_TMP_DIR/MYSQL_ROOT_PASSWORD.env /tmp/ && \
MYSQL_ROOT_PASSWORD="$(cat /tmp/MYSQL_ROOT_PASSWORD.env)"
rm /tmp/MYSQL_ROOT_PASSWORD.env

## MYSQL_ALLOW_EMPTY_PASSWORD
ssh $SSH_CONN "rm /tmp/MYSQL_ALLOW_EMPTY_PASSWORD.env ; curl 'http://metadata/computeMetadata/v1/project/attributes/MYSQL_ALLOW_EMPTY_PASSWORD' -H 'Metadata-Flavor: Google' >> /tmp/MYSQL_ALLOW_EMPTY_PASSWORD.env"
scp $SCP_CONN_OPTIONS $SCP_CONN:$SERVER_TMP_DIR/MYSQL_ALLOW_EMPTY_PASSWORD.env /tmp/ && \
MYSQL_ALLOW_EMPTY_PASSWORD="$(cat /tmp/MYSQL_ALLOW_EMPTY_PASSWORD.env)"
rm /tmp/MYSQL_ALLOW_EMPTY_PASSWORD.env
##########################################################################

echo "=> $((COUNTER = $COUNTER + 1))/$TOTAL_ECHOS Unpacking and Deploying ${APP_NAME}.tar.gz from remote server..."
cat << EOF | ssh $SSH_CONN 'cat - > /tmp/bundle/docker-compose.yml'
    version: '2'
    services:
      dns:
        hostname: dns.proxy.server
        image: defreitas/dns-proxy-server:2.1.0
        container_name: dns.proxy.server
        volumes:
          - /tmp/dns-proxy-server/conf:/app/conf
          - /var/run/docker.sock:/var/run/docker.sock
          - /etc/resolv.conf:/etc/resolv.conf
        ports:
          - 5380:5380
      mysql:
        hostname: mysql.dev
        image: mysql:5.7.17
        # env_file: .env
        container_name: mysql.dev
        # command: mysqld --user=root --verbose
        volumes:
          - /var/lib/mysql
        ports:
          - 13306:3306
        depends_on:
          - dns
        environment:
          MYSQL_DATABASE: "$MYSQL_DATABASE"
          MYSQL_USER: "$MYSQL_USER"
          MYSQL_PASSWORD: "$MYSQL_PASSWORD"
          MYSQL_ROOT_PASSWORD: "$MYSQL_ROOT_PASSWORD"
          MYSQL_ALLOW_EMPTY_PASSWORD: "$MYSQL_ALLOW_EMPTY_PASSWORD"
      redis:
        hostname: redis.dev
        image: redis:3.2.9
        container_name: redis.dev
        ports:
          - 16379:6379
        depends_on:
          - dns
      mongo:
        hostname: mongo.dev
        image: mongo:3.2.11
        container_name: mongo.dev
        ports:
          - 7017:27017
        depends_on:
          - dns
EOF
case "$TARGET" in
  'staging' | 'production')
    if [ "$TARGET" = 'staging' ]; then
    DEPLOY="\
                cd $SERVER_TMP_DIR && tar zxvf ${APP_NAME}.tar.gz -C $SERVER_TMP_DIR/ && \
                cd $SERVER_TMP_DIR/$TMP_BUNDLE && \
                echo '=> $((COUNTER = $COUNTER + 1))/$TOTAL_ECHOS Creating docker-compose.yml' && \
                docker run \
                    -v /var/run/docker.sock:/var/run/docker.sock \
                    -v "$SERVER_TMP_DIR/$TMP_BUNDLE:/rootfs$SERVER_TMP_DIR/$TMP_BUNDLE" \
                    -w="/rootfs$SERVER_TMP_DIR/$TMP_BUNDLE" \
                    docker/compose:1.14.0 kill ; \
                docker run \
                    -v /var/run/docker.sock:/var/run/docker.sock \
                    -v "$SERVER_TMP_DIR/$TMP_BUNDLE:/rootfs$SERVER_TMP_DIR/$TMP_BUNDLE" \
                    -w="/rootfs$SERVER_TMP_DIR/$TMP_BUNDLE" \
                    docker/compose:1.14.0 down ; \
                docker run \
                    -v /var/run/docker.sock:/var/run/docker.sock \
                    -v "$SERVER_TMP_DIR/$TMP_BUNDLE:/rootfs$SERVER_TMP_DIR/$TMP_BUNDLE" \
                    -w="/rootfs$SERVER_TMP_DIR/$TMP_BUNDLE" \
                    docker/compose:1.14.0 up -d --build && \
                echo 'DOCKER Cleaner Just STARTED' && \
                bash docker-superclean.sh && \
                echo 'DOCKER Cleaner COMPLETED' \
		rm -R $SERVER_TMP_DIR/$TMP_BUNDLE | rm $SERVER_TMP_DIR/${APP_NAME}.tar.gz ; \
		rm $SERVER_TMP_DIR/MYSQL_DATABASE.env ; \
		rm $SERVER_TMP_DIR/MYSQL_USER.env ; \
		rm $SERVER_TMP_DIR/MYSQL_PASSWORD.env ; \
		rm $SERVER_TMP_DIR/MYSQL_ROOT_PASSWORD.env ; \
		rm $SERVER_TMP_DIR/MYSQL_ALLOW_EMPTY_PASSWORD.env ; \
		"
    elif [ "$TARGET" = 'production' ]; then
     DEPLOY="\
                echo "PRODUCTION NOT READY"
                "
    fi
    echo "[Starting deploy]"
    echo ""
    ;;
  *)
    echo 'Possible error'
    exit 0
    ;;
esac
    ssh $SSH_CONN $DEPLOY
