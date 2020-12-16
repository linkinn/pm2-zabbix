# development

### Create file pm2-status.conf in /etc/zabbix/zabbix_agentd.conf.d
$ sudo nano /etc/zabbix/zabbix_agentd.conf.d/pm2-status.conf
```
UserParameter=pm2.discovery,/usr/local/bin/node /etc/zabbix/script/pm2-zabbix/pm2.js
UserParameter=pm2.status[*],/usr/local/bin/node /etc/zabbix/script/pm2-zabbix/pm2.js $1
```

### Create folder scripts in /etc/zabbix
$ sudo mkdir /etc/zabbix/script
$ sudo chown zabbix.zabbix -R /etc/zabbix/scripts

### Download git pm2.js in /etc/zabbix/script
$ cd /etc/zabbix/scripts
$ git clone https://github.com/linkinn/pm2-zabbix.git
$ cd pm2-zabbix
$ npm install pm2 --save

### Create folder zabbix in /var/lib
$ sudo mkdir /var/lib/zabbix

### Alter passwd zabbix
$ sudo /etc/passwd
```
zabbix:x:105:115::/var/lib/zabbix:/bin/false
```

### Execute pm2 in bash zabbix
$ sudo su -s /bin/bash zabbix