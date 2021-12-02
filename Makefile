restart: down up
up:
	cd backend && docker-compose up -d
down:
	cd backend && docker-compose down --remove-orphans
down-clear:
	(cd backend && docker-compose down -v --remove-orphans) && \
	(cd backend/files && sudo rm -vrf ./*) && \
	(cd backend/runtime && sudo rm -vrf ./*)
status:
	cd backend && docker-compose ps -a
bash:
	cd backend && docker-compose exec php bash
install-dependencies:
	cd backend && docker-compose exec php composer install
update-dependencies:
	cd backend && docker-compose exec php composer update
migrate:
	cd backend && docker-compose exec php php yii migrate --interactive=0
#www-data:
#	chown $(USER):www-data backend backend/vendor