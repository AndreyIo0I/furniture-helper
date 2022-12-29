# Фронт

## Развертывание linux
0) Поставить nodejs и yarn (если сразу не поставится)
1) Для линуха запустить [publish.sh](hosting%2Fpublish.sh)

## Настройка окружения
1) nodejs lts https://nodejs.org/en/ (если уже есть, примерно от 14 версии тоже должно работать)
2) yarn classic `npm install --global yarn`
3) docker

## Разработка
Запускать в папке front
```bash
yarn install
```
```bash
yarn dev
```

### Бек
1) поставить https://dotnet.microsoft.com/en-us/download/dotnet/6.0
2) чтобы поставить dotnet-ef, выполнить:
```bash
dotnet tool install --global dotnet-ef
```
3) запустить postgres из [docker-compose.dev.yml](..%2Fdocker-compose.dev.yml), дождаться его готовности
```bash
docker-compose -f docker-compose.dev.yml up -d postgress
```
4) накатить миграции (из папки front или см скрипт в [package.json](package.json))
```bash
yarn back-migrations
```
5) зайти в контейнер postgres и, чтобы добавить первого пользователя, выполнить
```bash
psql -U postgres furnitureHelper
```
```bash
insert into "user" (email, full_name, password, role) values ('gmail@gmail.com', 'Owner', '12345Q', 1);
```
6) запустить бек из [docker-compose.dev.yml](..%2Fdocker-compose.dev.yml)
```bash
docker-compose -f docker-compose.dev.yml up -d back
```
При последующих запусках, если не чистить папку db-data в корне проекта, миграции и создание пользователя не понадобятся