# DOCKER COMPOSE

## INSTALLATION
First, make sure you have docker installed for your environment.

Then for docker-compose installation, open your terminal
```sh
sudo -i
curl -L https://github.com/docker/compose/releases/download/1.14.0/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
exit
docker-compose --version
```

For further reference take a look at https://docs.docker.com/compose/install/

## SET UP
Clone the repo to your local drive
N.B.: "/" is our project root, thus all paths are relative to project root.

## FIRST RUN
open your terminal
go to `/`
execute `docker-compose up`

## FIRST RUN STOP
Ctrl + C

## AFTER FIRST RUN
go to `/`
execute `docker-compose start`
// if you need live logs use `docker-compose up`

## AFTER FIRST RUN STOP
go to `/`
execute `docker-compose stop`

## LOGS
go to `/`
execute `docker-compose logs`

You may also access each container logs separately exectuing `docker logs <containter_name or container_id>` from any directory you are in

## PAUSE/UNPAUSE
go to `/`
execute `docker-compose pause`

go to `/`
execute `docker-compose unpause`


## TESTED CONNECTIONS

### MONGODB
- Credentails: none
- Host: mongodb.dev or localhost
- Port: 7017
- Client Used: [Mongo Client v1.5.0](https://nosqlclient.com/docs/start.html) (for a quick check)
- Client Used: [Studio 3T](https://studio3t.com/download/) (for a development. this is a commercial tool!)

### MYSQL
- Credentials: root/root | sloops/sloops
- Host: mysql.dev or localhost
- Port: 13306
- Client Used: [Workbench 6.3](https://dev.mysql.com/downloads/workbench/)


### REDIS
- Credentials: none
- Host: redis.dev or localhost
- Port: 16379
- Client Used: [FastoRedis 1.5.1.0](http://fastoredis.com/download.html) (for a quick check)
- Client Used: [Redis Desktop Manager](https://redisdesktop.com/) (for a development. this is either commercial, or requires building from source!)
