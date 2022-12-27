cp FHFront.service /etc/systemd/system/FHFront.service;\
cd .. ;\
yarn install;\
yarn build;\
systemctl stop FHFront;\
cp -r .next/static .next/standalone/.next/static;\
cp -r .next/standalone /root/srv/FHFront;\
systemctl daemon-reload;\
systemctl start FHFront;\
systemctl status FHFront;
