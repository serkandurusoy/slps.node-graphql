# DOCKER COMPOSE

## INSTALLATION
Open your terminal
curl -L https://github.com/docker/compose/releases/download/1.14.0/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
docker-compose --version

For further reference take a look here:
https://docs.docker.com/compose/install/

## SET UP
Clone the repo to your local drive
N.B.: "/" is our project root, thus all paths are relative to project root.

## FIRST RUN
open your terminal
go to `/docker/docker-compose.yml`
execute `docker-compose up`

## FIRST RUN STOP
Ctrl + C

## AFTER FIRST RUN
go to `/docker/docker-compose.yml`
execute `docker-compose start`
// if you need live logs use `docker-compose up`

## AFTER FIRST RUN STOP
go to `/docker/docker-compose.yml`
execute `docker-compose stop`

## LOGS
go to `/docker/docker-compose.yml`
execute `docker-compose logs`

You may also access each container logs separately exectuing `docker logs <containter_name or container_id>` from any directory you are in

## PAUSE/UNPAUSE
go to `/docker/docker-compose.yml`
execute `docker-compose pause`

go to `/docker/docker-compose.yml`
execute `docker-compose unpause`

## PERMISSIONS
Got a “Permission denied” error?

If you get a “Permission denied” error using either of the above methods, you probably do not have the proper permissions use docker / docker-compose. Prepend `sudo` to either of the above commands and run again.

## TESTED CONNECTIONS

### MONGODB
- Credentails: none

- Client Used: Mongo Client v1.5.0 [https://nosqlclient.com/docs/start.html]

- Connects to mongodb.dev

- Local port: 27017
- Remote port (Staging): 7017

### MYSQL
- Credentials: root/root | sloops/sloops

- Client Used: Workbench 6.3 [https://dev.mysql.com/downloads/workbench/]

- Connects to mysql.dev

- Local port: 3306
- Remote port (Staging): 13306


### REDIS
- Credentials: none

- Client Used: FastoRedis 1.5.1.0 [http://fastoredis.com/download.html]

- Connects to redis.dev

- Local port: 6379
- Remote port (Staging): 16379
