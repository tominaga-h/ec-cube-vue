up:
	docker compose -f docker-compose.yml -f docker-compose.dev.yml -f docker-compose.mysql.yml -f docker-compose.adminer.yml -f docker-compose.nodejs.yml up -d
down:
	docker compose down --remove-orphans
shell:
	docker compose exec -u www-data ec-cube bash
cc:
	docker compose exec ec-cube php bin/console cache:clear --no-warmup
logs:
	docker compose logs -f
