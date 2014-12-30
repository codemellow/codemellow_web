apt-get update
apt-get install -y gcc
apt-get install -y g++
apt-get install -y make
wget http://nodejs.org/dist/v0.10.33/node-v0.10.33.tar.gz
tar xvzf node-v0.10.33.tar.gz
cd node-v0.10.33
make
make install
apt-get install -y npm
apt-get install -y git
apt-get install -y mysql-client
cd -
git clone git@git.codemellow.net:codemellowrepo.git ./webserver
cd webserver
npm install -g express
npm install -g forever
export NODE_ENV='pro'