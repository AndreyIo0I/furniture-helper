systemctl stop FHFront

cp FHFront.service /etc/systemd/system/FHFront.service

cd ..

yarn install
yarn build

cp -rf .next/static .next/standalone/.next/static
cp -rf public .next/standalone/public
cp -rf .next/standalone /root/srv/FHFront

systemctl daemon-reload
systemctl start FHFront
systemctl status FHFront
