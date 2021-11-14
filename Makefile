build:
	docker-compose up --build

start:
	docker-compose up -d

start-dev:
	docker-compose up

stop:
	docker-compose stop

list:
	docker-compose ps

npm:
	docker-compose exec app npm install $(pacote)

npm-dev:
	docker-compose exec app npm install -D $(pacote)