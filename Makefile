#############################
# Docker Teritory
#############################
DOCKER := docker
COMPOSE := docker-compose

dk-build:
	${DOCKER} build --tag node-todo:latest --compress .
	${DOCKER} tag node-todo:latest 705471/node-todo:latest

dk-deploy:
	${DOCKER} push 705471/node-todo:latest

dk-run:
	${DOCKER} run --name node-todo -p 3030:3030 --restart always --env-file .env -d 705471/node-todo:latest

dk-test:
	${DOCKER} run -e API_URL=https://ae14-2001-448a-2082-2e1a-bb2d-c09-bd52-ec05.ap.ngrok.io monsterup/devcode-unit-test-1

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