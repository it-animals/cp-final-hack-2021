init: down-clear build yarn-build up install-dependencies migrate create-admin set-permissions
restart: down up
build:
	(cd backend && docker-compose build) && \
	(cd frontend && docker-compose build)
up:
	(cd backend && docker-compose up -d) && \
	(cd frontend && docker-compose up -d)
down:
	(cd backend && docker-compose down --remove-orphans) && \
	(cd frontend && docker-compose down --remove-orphans)
down-clear:
	(cd backend && docker-compose down -v --remove-orphans) && \
	(cd frontend && docker-compose down -v --remove-orphans) && \
	(cd backend/files && sudo rm -vrf ./*) && \
	(cd backend/runtime && sudo rm -vrf ./*)
status:
	(cd backend && docker-compose ps -a) && \
	(cd frontend && docker-compose ps -a)
bash:
	(cd backend && docker-compose exec php bash)
install-dependencies:
	(cd backend && docker-compose exec php composer install)
update-dependencies:
	(cd backend && docker-compose exec php composer update)
migrate:
	(cd backend && docker-compose exec php php yii migrate --interactive=0)
create-admin:
	(cd backend && docker-compose exec php php yii tool/create-admin test@test.org test123)
set-permissions:
	(cd backend && chmod 0775 files yii && chmod 0777 runtime web/assets && sudo chown $(USER):www-data files)
git-pull:
	git pull
deploy: git-pull install-dependencies migrate
yarn-build:
	(cd frontend && docker-compose run --rm node yarn install) && \
	(cd frontend && docker-compose run --rm node yarn build)