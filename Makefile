#############################
# Docker Teritory
#############################
DOCKER := docker
COMPOSE := docker-compose

dk-build:
	${DOCKER} build --tag node-todo:latest --add-host=host.docker.internal:host-gateway --compress .
	${DOCKER} tag node-todo:latest 705471/node-todo:latest

dk-deploy:
	${DOCKER} push 705471/node-todo:latest

dk-run:
	${DOCKER} run --name node-todo -p 3030:3030 --restart always --env-file .env -d 705471/node-todo:latest

dk-test:
	${DOCKER} run -e API_URL=http://192.168.1.19:3030 monsterup/devcode-unit-test-1

dc-up:
	${COMPOSE} up -d --remove-orphans --build

dc-down:
	${COMPOSE} down

#############################
# Application Teritory
#############################
NPM := npm

dev:
	${NPM} run dev

start:
	${NPM} start

build:
	${NPM} run build

#############################
# Typeorm Database Teritory
#############################

orsrun:
ifdef type
	${NPM} run seed:${type}
endif

orscon:
	${NPM} run seed:config

ormake:
ifdef name
	${NPM} run orm:make ${name}
endif

ormig:
ifdef type
	${NPM} run orm:${type}
endif

orlist:
	${NPM} run orm:list