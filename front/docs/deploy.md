##  Настройка среды

Для работы нам потребуется:
  - Node
  - npm
  - yarn

## Setup Node.js

### Обновляем информацию о доступных пакетах

sudo apt update

### Устанавливаем Node.js

sudo apt install nodejs

### Устанавливаем npm

sudo apt install npm

### curl

sudo apt install curl

### Получаем ключ yarn

curl -sL https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -

### Выдаем доступ

echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list

### Устанавливаем yarn

sudo apt install yarn