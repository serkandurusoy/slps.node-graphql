To begin development, copy `docker/env/mysql/.env.example` and create a file named `.env` making sure you have
filled in all the mysql db environment variables to match your development environment.

The actual `.env` file is not committed to git. It should be secret and private to you. It contains
things like mysql db configurations and passwords.

Staging/development versions of these should be kept secret, too! Perhaps provided by the deployment
environment and injected into the deployment target.

Required environment variables are can be found in `docker/env/mysql/.env.example`/

.nev should be created in the same dir (`docker/env/`).

To connect locally to the dbs:

mysql >>
- user: `what you put in the .env file`
- password: `what you put in the .env file`
- db_name: `what you put in the .env file`
- connection_port: `3306`
- host: `mysql.dev`


redis >>
- connection_port: `6379`
- host: `redis.dev`

mongo >>
- connection_port: `27017`
- host: `mongo.dev`

