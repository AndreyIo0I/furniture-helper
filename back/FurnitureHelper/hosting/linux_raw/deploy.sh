# stop if any fails
set -e

# stop application
systemctl stop FHExtranetAPI

# publish application
cd /root/src/app/furniture-helper/back/FurnitureHelper
dotnet publish -c Release --runtime ubuntu.22.04-x64 -o /root/srv/FurnitureHelper --self-contained false /p:EnvironmentName=prod

# apply database migrations
cd /root/srv/FurnitureHelper
dotnet /root/srv/FurnitureHelper/Infastructure.Migrations.dll

# copy unit info for running app as systemd service
cd /root/src/app/furniture-helper/back/FurnitureHelper/hosting/linux_raw
cp FHExtranetAPI.service /etc/systemd/system/FHExtranetAPI.service

# run
systemctl daemon-reload
systemctl start FHExtranetAPI
systemctl status FHExtranetAPI