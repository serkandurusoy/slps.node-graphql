#!/bin/bash

################ INPUT VARS ##############
APP=$1
##########################################

############# CONFIG VARS #####
NAMESPACE=slps-stg-
DIST_DIR=dist
PROJECT_ID=$NAMESPACE$APP
#########################################

if
 [ "$APP" = 'ui-components' ]; then
   DIST_DIR=dist-storybook
fi

SOURCE_PATH="$(dirname "$(pwd)")/$APP/$DIST_DIR"

cat > "$(dirname "$(pwd)")/$APP/firebase.json" <<EOF
{
  "hosting": {
    "public": "$DIST_DIR",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
EOF

firebase use $PROJECT_ID
firebase deploy
