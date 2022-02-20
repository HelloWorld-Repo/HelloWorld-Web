start:
	docker-compose up -d

start-dev:
	docker-compose up

start-dev-build:
	docker-compose up --build

stop:
	docker-compose stop

list:
	docker-compose ps

npm:
	docker-compose exec app npm install $(pacote)

npm-dev:
	docker-compose exec app npm install -D $(pacote)

build:
	docker-compose exec app npm run build

exec:
	docker-compose exec app $(comando)