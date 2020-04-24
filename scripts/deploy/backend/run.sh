#!/bin/bash

################ INPUT VARS ##############
# Staging or Production
APP=$1
TARGET=$2
# If getting 'Too many authentication failures' pass both ssh user and key. These two are optional
USER=$3
KEY=$4
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
APP_NAME=$APP
APP_DIR="$(dirname "$(pwd)")/$APP_NAME"
echo $APP_DIR
DIST_DIR=dist
TMP_DIR=/tmp
SERVER_TMP_DIR=/tmp
TMP_BUNDLE=bundle
DOCKER_TOOLBOX=${PWD%/*/*/*}/scripts/deploy/db/toolbox
COUNTER=0
# TODO: COUNT HOW MANY STEPS EXACTLY
TOTAL_ECHOS=11
#########################################

############## STAGING VARS #############
STAGING_REMOTE_SERVER=35.195.57.180
#As GCE may alter, add, or remove nodes at any time, it's not providing a fixed set of static IP addresses for single instances
#We use instance groups (because of scaling) so cannot assign a static ip either
#NAMESPACE=slps-stg-
#PROJECT_ID=$NAMESPACE$APP
#STAGING_REMOTE_SERVER=$(gcloud compute instances list --project $PROJECT_ID | awk '/graphql/ {print $5}')
#echo STAGING_SERVER_IP: $STAGING_REMOTE_SERVER
if [ -z "$STAGING_REMOTE_SERVER" ]; then
  echo 'Error retrieving SERVER IP'
  exit 0
fi
STAGING_SSH_USER=$SSH_USER
STAGING_APOLLO_PORT=80
STAGING_APOLLO_DOCKER_PORT=80
STAGING_APOLLO_DOCKER_NAME=$APP_NAME
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
      APOLLO_PORT=$STAGING_APOLLO_PORT
      APOLLO_DOCKER_PORT=$STAGING_APOLLO_DOCKER_PORT
      APOLLO_DOCKER_NAME=$STAGING_APOLLO_DOCKER_NAME
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
mkdir $TMP_DIR/$APP_NAME/$TMP_BUNDLE/$DIST_DIR

echo "=> $((COUNTER = $COUNTER + 1))/$TOTAL_ECHOS Copying $DIST_DIR to $TMP_DIR/$APP_NAME/$TMP_BUNDLE"
cp -Rv $APP_DIR/$DIST_DIR/** $TMP_DIR/$APP_NAME/$TMP_BUNDLE/$DIST_DIR
cp -v $APP_DIR/package.json $TMP_DIR/$APP_NAME/$TMP_BUNDLE/package.json
cp -Rv $DOCKER_TOOLBOX/** $TMP_DIR/$APP_NAME/$TMP_BUNDLE

mv $TMP_DIR/$APP_NAME/$TMP_BUNDLE $TMP_DIR/$APP_NAME/$TMP_BUNDLE/$APP_NAME

echo "=> $((COUNTER = $COUNTER + 1))/$TOTAL_ECHOS Moving to $TMP_DIR/$APP_NAME/$TMP_BUNDLE"
cd $TMP_DIR/$APP_NAME/$TMP_BUNDLE


echo "=> $((COUNTER = $COUNTER + 1))/$TOTAL_ECHOS Creating $APP_NAME.tar.gz ..."
cd ..
tar czvf $APP_NAME.tar.gz bundle

echo "=> $((COUNTER = $COUNTER + 1))/$TOTAL_ECHOS Uploading $APP_NAME.tar to remote server..."
scp $SCP_CONN_OPTIONS $APP_NAME.tar.gz $SCP_CONN:$SERVER_TMP_DIR && \

ssh $SSH_CONN "cd $SERVER_TMP_DIR && tar zxvf ${APP_NAME}.tar.gz -C $SERVER_TMP_DIR"

############### RETRIEVING ENVS FROM THE SERVER (...insane) ###########
## JWT_SECRET
ssh $SSH_CONN "rm /tmp/JWT_SECRET.env ; curl 'http://metadata/computeMetadata/v1/project/attributes/JWT_SECRET' -H 'Metadata-Flavor: Google' >> /tmp/JWT_SECRET.env"
scp $SCP_CONN_OPTIONS $SCP_CONN:$SERVER_TMP_DIR/JWT_SECRET.env /tmp/ && \
JWT_SECRET="$(cat /tmp/JWT_SECRET.env)"
rm /tmp/JWT_SECRET.env

## HTTP_BASIC_PASSWORD
ssh $SSH_CONN "rm /tmp/HTTP_BASIC_PASSWORD.env ; curl 'http://metadata/computeMetadata/v1/project/attributes/HTTP_BASIC_PASSWORD' -H 'Metadata-Flavor: Google' >> /tmp/HTTP_BASIC_PASSWORD.env"
scp $SCP_CONN_OPTIONS $SCP_CONN:$SERVER_TMP_DIR/HTTP_BASIC_PASSWORD.env /tmp/ && \
HTTP_BASIC_PASSWORD="$(cat /tmp/HTTP_BASIC_PASSWORD.env)"
rm /tmp/HTTP_BASIC_PASSWORD.env

## MYSQL_HOST
ssh $SSH_CONN "rm /tmp/MYSQL_HOST.env ; curl 'http://metadata/computeMetadata/v1/project/attributes/MYSQL_HOST' -H 'Metadata-Flavor: Google' >> /tmp/MYSQL_HOST.env"
scp $SCP_CONN_OPTIONS $SCP_CONN:$SERVER_TMP_DIR/MYSQL_HOST.env /tmp/ && \
MYSQL_HOST="$(cat /tmp/MYSQL_HOST.env)"
rm /tmp/MYSQL_HOST.env

## MYSQL_PORT
ssh $SSH_CONN "rm /tmp/MYSQL_PORT.env ; curl 'http://metadata/computeMetadata/v1/project/attributes/MYSQL_PORT' -H 'Metadata-Flavor: Google' >> /tmp/MYSQL_PORT.env"
scp $SCP_CONN_OPTIONS $SCP_CONN:$SERVER_TMP_DIR/MYSQL_PORT.env /tmp/ && \
MYSQL_PORT="$(cat /tmp/MYSQL_PORT.env)"
rm /tmp/MYSQL_PORT.env

## MYSQL_USER
ssh $SSH_CONN "rm /tmp/MYSQL_USER.env ; curl 'http://metadata/computeMetadata/v1/project/attributes/MYSQL_USER' -H 'Metadata-Flavor: Google' >> /tmp/MYSQL_USER.env"
scp $SCP_CONN_OPTIONS $SCP_CONN:$SERVER_TMP_DIR/MYSQL_USER.env /tmp/ && \
MYSQL_USER="$(cat /tmp/MYSQL_USER.env)"
rm /tmp/MYSQL_USER.env

## MYSQL_DATABASE
ssh $SSH_CONN "rm /tmp/MYSQL_DATABASE.env ; curl 'http://metadata/computeMetadata/v1/project/attributes/MYSQL_DATABASE' -H 'Metadata-Flavor: Google' >> /tmp/MYSQL_DATABASE.env"
scp $SCP_CONN_OPTIONS $SCP_CONN:$SERVER_TMP_DIR/MYSQL_DATABASE.env /tmp/ && \
MYSQL_DATABASE="$(cat /tmp/MYSQL_DATABASE.env)"
rm /tmp/MYSQL_DATABASE.env

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

## REDIS_URL
ssh $SSH_CONN "rm /tmp/REDIS_URL.env ; curl 'http://metadata/computeMetadata/v1/project/attributes/REDIS_URL' -H 'Metadata-Flavor: Google' >> /tmp/REDIS_URL.env"
scp $SCP_CONN_OPTIONS $SCP_CONN:$SERVER_TMP_DIR/REDIS_URL.env /tmp/ && \
REDIS_URL="$(cat /tmp/REDIS_URL.env)"
rm /tmp/REDIS_URL.env

## MONGO_URL
ssh $SSH_CONN "rm /tmp/MONGO_URL.env ; curl 'http://metadata/computeMetadata/v1/project/attributes/MONGO_URL' -H 'Metadata-Flavor: Google' >> /tmp/MONGO_URL.env"
scp $SCP_CONN_OPTIONS $SCP_CONN:$SERVER_TMP_DIR/MONGO_URL.env /tmp/ && \
MONGO_URL="$(cat /tmp/MONGO_URL.env)"
rm /tmp/MONGO_URL.env

## SENDGRID_API_KEY_NAME
ssh $SSH_CONN "rm /tmp/SENDGRID_API_KEY_NAME.env ; curl 'http://metadata/computeMetadata/v1/project/attributes/SENDGRID_API_KEY_NAME' -H 'Metadata-Flavor: Google' >> /tmp/SENDGRID_API_KEY_NAME.env"
scp $SCP_CONN_OPTIONS $SCP_CONN:$SERVER_TMP_DIR/SENDGRID_API_KEY_NAME.env /tmp/ && \
SENDGRID_API_KEY_NAME="$(cat /tmp/SENDGRID_API_KEY_NAME.env)"
rm /tmp/SENDGRID_API_KEY_NAME.env

## SENDGRID_API_SECRET
ssh $SSH_CONN "rm /tmp/SENDGRID_API_SECRET.env ; curl 'http://metadata/computeMetadata/v1/project/attributes/SENDGRID_API_SECRET' -H 'Metadata-Flavor: Google' >> /tmp/SENDGRID_API_SECRET.env"
scp $SCP_CONN_OPTIONS $SCP_CONN:$SERVER_TMP_DIR/SENDGRID_API_SECRET.env /tmp/ && \
SENDGRID_API_SECRET="$(cat /tmp/SENDGRID_API_SECRET.env)"
rm /tmp/SENDGRID_API_SECRET.env

## GOOGLE_CLOUD_STORAGE_BUCKET_NAME
ssh $SSH_CONN "rm /tmp/GOOGLE_CLOUD_STORAGE_BUCKET_NAME.env ; curl 'http://metadata/computeMetadata/v1/project/attributes/GOOGLE_CLOUD_STORAGE_BUCKET_NAME' -H 'Metadata-Flavor: Google' >> /tmp/GOOGLE_CLOUD_STORAGE_BUCKET_NAME.env"
scp $SCP_CONN_OPTIONS $SCP_CONN:$SERVER_TMP_DIR/GOOGLE_CLOUD_STORAGE_BUCKET_NAME.env /tmp/ && \
GOOGLE_CLOUD_STORAGE_BUCKET_NAME="$(cat /tmp/GOOGLE_CLOUD_STORAGE_BUCKET_NAME.env)"
rm /tmp/GOOGLE_CLOUD_STORAGE_BUCKET_NAME.env

## GOOGLE_CLOUD_STORAGE_DOMAIN
ssh $SSH_CONN "rm /tmp/GOOGLE_CLOUD_STORAGE_DOMAIN.env ; curl 'http://metadata/computeMetadata/v1/project/attributes/GOOGLE_CLOUD_STORAGE_DOMAIN' -H 'Metadata-Flavor: Google' >> /tmp/GOOGLE_CLOUD_STORAGE_DOMAIN.env"
scp $SCP_CONN_OPTIONS $SCP_CONN:$SERVER_TMP_DIR/GOOGLE_CLOUD_STORAGE_DOMAIN.env /tmp/ && \
GOOGLE_CLOUD_STORAGE_DOMAIN="$(cat /tmp/GOOGLE_CLOUD_STORAGE_DOMAIN.env)"
rm /tmp/GOOGLE_CLOUD_STORAGE_DOMAIN.env
##########################################################################

echo "=> $((COUNTER = $COUNTER + 1))/$TOTAL_ECHOS Unpacking and Deploying ${APP_NAME}.tar.gz from remote server..."
#cat > $TMP_DIR/$APP_NAME/$TMP_BUNDLE/Dockerfile.apollo <<EOF
cat << EOF | ssh $SSH_CONN 'cat - > /tmp/bundle/Dockerfile.apollo'
# Pull base image.
FROM node:8.9.1-slim

# Global install yarn package manager
RUN apt-get update && apt-get install -y curl apt-transport-https && \
    curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
    echo 'deb https://dl.yarnpkg.com/debian/ stable main' | tee /etc/apt/sources.list.d/yarn.list && \
    apt-get update && apt-get install -y yarn

ENV JWT_SECRET=$JWT_SECRET
ENV HTTP_BASIC_PASSWORD=$HTTP_BASIC_PASSWORD

ENV MYSQL_HOST=$MYSQL_HOST
ENV MYSQL_PORT=$MYSQL_PORT
ENV MYSQL_USER=$MYSQL_USER
ENV MYSQL_DATABASE=$MYSQL_DATABASE
ENV MYSQL_PASSWORD=$MYSQL_PASSWORD
ENV MYSQL_ROOT_PASSWORD=$MYSQL_ROOT_PASSWORD

ENV REDIS_URL=$REDIS_URL

ENV MONGO_URL=$MONGO_URL

ENV SENDGRID_API_KEY_NAME=$SENDGRID_API_KEY_NAME
ENV SENDGRID_API_SECRET=$SENDGRID_API_SECRET

ENV GOOGLE_CLOUD_STORAGE_BUCKET_NAME=$GOOGLE_CLOUD_STORAGE_BUCKET_NAME
ENV GOOGLE_CLOUD_STORAGE_DOMAIN=$GOOGLE_CLOUD_STORAGE_DOMAIN
ENV NODE_ENV_TARGET=staging
ENV NODE_ENV=production
ENV TZ=Etc/UTC


# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Bundle app source
COPY ./ /usr/src/app

# Install dependencies
RUN yarn install --production

EXPOSE $APOLLO_DOCKER_PORT

CMD [ "yarn", "serve-staging" ]
EOF
case "$TARGET" in
  'staging' | 'production')
    if [ "$TARGET" = 'staging' ]; then
    DEPLOY="\
    cd $SERVER_TMP_DIR/$TMP_BUNDLE && \
    docker build -f Dockerfile.apollo -t $APOLLO_DOCKER_NAME . && \
    docker stop $APOLLO_DOCKER_NAME ; docker rm -f $APOLLO_DOCKER_NAME ; \
    docker run --name $APOLLO_DOCKER_NAME -d -p $APOLLO_PORT:$APOLLO_DOCKER_PORT $APOLLO_DOCKER_NAME && \
    echo 'DOCKER Cleaner Just STARTED' && \
    bash docker-superclean.sh && \
    echo 'DOCKER Cleaner COMPLETED' && \
    rm -rf $SERVER_TMP_DIR/$TMP_BUNDLE ; rm $SERVER_TMP_DIR/${APP_NAME}.tar.gz ; \
    rm $SERVER_TMP_DIR/HTTP_BASIC_PASSWORD.env ; \
    rm $SERVER_TMP_DIR/JWT_SECRET.env ; \
    rm $SERVER_TMP_DIR/MYSQL_HOST.env ; \
    rm $SERVER_TMP_DIR/MYSQL_PORT.env ; \
    rm $SERVER_TMP_DIR/MYSQL_USER.env ; \
    rm $SERVER_TMP_DIR/MYSQL_DATABASE.env ; \
    rm $SERVER_TMP_DIR/MYSQL_PASSWORD.env ; \
    rm $SERVER_TMP_DIR/MYSQL_ROOT_PASSWORD.env ; \
    rm $SERVER_TMP_DIR/REDIS_URL.env ; \
    rm $SERVER_TMP_DIR/MONGO_URL.env ; \
    rm $SERVER_TMP_DIR/SENDGRID_API_KEY_NAME.env ; \
    rm $SERVER_TMP_DIR/SENDGRID_API_SECRET.env ; \
    rm $SERVER_TMP_DIR/GOOGLE_CLOUD_STORAGE_BUCKET_NAME.env ; \
    rm $SERVER_TMP_DIR/GOOGLE_CLOUD_STORAGE_DOMAIN.env ; \
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
