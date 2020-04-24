# DEPLOY STATIC SITES USING FIREBASE

## INSTALL FIREBASE CLI
1. Install firebase tools

`npm install -g firebase-tools`

2. Login

`firebase login`

It should be that after you configure your credentials once firebase tools requires no further intervention

LINK:
- https://www.npmjs.com/package/firebase-tools
- https://firebase.google.com/docs/cli/ 

## Run the deploy script
After that you can deploy executing in the specific app directory (i.e. ui-admin):
`npm run deploy-staging`

## Check the deployment
You may check the SPA running at*:

https://<namespace><app_dir_name>.firebaseapp.com

Ex.: https://slps-stg-ui-components.firebaseapp.com

\* To be changed with final domain name to `components.sloops.waat.eu` once certificates are ready.
