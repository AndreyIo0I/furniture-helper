cd /root/src

rm -rf furniture-helper

git clone https://github.com/AndreyIo0I/furniture-helper.git

systemctl stop FHExtranetAPI
systemctl stop FHFront

cd /root/src/furniture-helper/back/FurnitureHelper

dotnet publish -c Release --runtime ubuntu.22.04-x64 -o /root/srv/FurnitureHelper --self-contained false /p:EnvironmentName=prod

cd /root/srv/FurnitureHelper
dotnet /root/srv/FurnitureHelper/Infastructure.Migrations.dll

cd /root/src/furniture-helper/front

yarn install
yarn build

cp -rf .next/static .next/standalone/.next/static
cp -rf public .next/standalone/public
cp -rf .next/standalone /root/srv/FHFront

systemctl daemon-reload
systemctl start FHExtranetAPI
systemctl start FHFront