# Фронт

## Развертывание linux
1) Поставить nodejs и yarn (если сразу не поставится)
2) Для линуха запустить [publish.sh](hosting%2Fpublish.sh)

## Настройка окружения
1) nodejs lts https://nodejs.org/en/ (если уже есть, примерно от 14 версии тоже должно работать)
2) yarn classic `npm install --global yarn`
3) docker

## Разработка
1) распаковать [db-dev-data.zip](db-dev-data.zip) в корень проекта
2) docker-compose.dev.yml запустить postgres и back
3) выполнить в папке front
    ```bash
    yarn install
    ```
    ```bash
    yarn dev
    ```
4) вход: gmail@gmail.com 12345Q