cp FHFront.service /etc/system/systemd/FHFront.service;\
cd .. ;\
yarn build;\
systemctl stop FHFront;\
cp .next/standalone /root/srv/FHFront;\
systemctl daemon-reload;\
systemctl start FHFront;\
systemctl status FHFront;
