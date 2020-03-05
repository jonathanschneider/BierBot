#!/bin/bash

if [ "$EUID" -ne 0 ]
  then echo "bierbot-setup must be run as root (prefix with sudo)"
  exit
fi

echo upgrading operating system...
sudo apt-get update -y
sudo apt-get dist-upgrade -y

echo installing mongodb...
sudo apt-get install mongodb-server -y

echo starting mongodb service...
sudo service mongodb start

echo installing NodeJS...
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
sudo apt-get install -y nodejs

echo installing git...
sudo apt-get install git -y

echo cloning repo into /home/pi/BierBot
cd ~
git clone https://github.com/BernhardSchlegel/BierBot.git

echo installing bower...
sudo npm install -g bower

echo installing gpio interface...
sudo apt-get install pigpio

echo chmodding rights of wireless tools and BierBot directory
sudo chmod -R u+x /home/pi/BierBot/sys
sudo chown -R 1000:0 /home/pi/BierBot/
sudo chmod -R u+w /home/pi/BierBot/

echo setting up users in mongodb
mongo < ~/BierBot/setup/bierbot-setup-mongo.js

echo creating autostart...
sudo cp ~/BierBot/sys/bierbot.service /etc/systemd/system/bierbot.service
sudo systemctl enable bierbot.service

echo modifying network settings to enable wifi
sudo tee /etc/network/interfaces < ~/BierBot/sys/interfaces

echo installing dependencies for backend...
cd ~/BierBot/server
sudo npm install

echo patching dependencies..
cd ~/BierBot/server
node setup.js

echo installing dependencies for frontend...
cd ~/BierBot/client
bower install

echo ALL DONE - gut Sud!
