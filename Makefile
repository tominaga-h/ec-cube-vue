up:
	docker compose -f docker-compose.yml -f docker-compose.dev.yml -f docker-compose.mysql.yml -f docker-compose.adminer.yml up -d
down:
	docker compose down --remove-orphans
