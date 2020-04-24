# apps/backend-main

Refer to library readmes about setting up local npm module linking.

To begin development, copy `.env.example` and create a file named `.env` making sure you have
filled in all the environment variables to match your development environment.

The actual `.env` file is not committed to git. It should be secret and private to you. It contains
things like secrets, keys, service url's etc.

Staging/development versions of these should be kept secret, too! Perhaps provided by the deployment
environment and injected into the deployment target.

Required environment variables are:

* JWT_SECRET: random long string: 394yhue&fjg2383+!j.*efgrlkjkj873u-4h334g

For production, this file or equivalent environment variables must be provided to the host before
invoking the `yarn run serve-*` command.
