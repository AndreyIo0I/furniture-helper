systemctl stop FHFront

cp FHFront.service /etc/systemd/system/FHFront.service

cd ..

yarn install
yarn build

cp -r .next/static .next/standalone/.next/static
cp -r public .next/standalone/public
cp -r .next/standalone /root/srv/FHFront

systemctl daemon-reload
systemctl start FHFront
systemctl status FHFront
