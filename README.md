# sangam
Sangam Web Site

STEPS to setup development environment in Ubuntu Linux
You may need to change the commands according to the OS

Prerequisits 
GITHub Account (https://github.com)
Node JS (https://nodejs.org)
NPM (https://nodejs.org)

Once you have NPM installed; 
Bower (sudo npm install bower -g)
Gulp (sudo npm install gulp-cli -g)
Once you installed the above, you may need to manually set these installed executable in the system PATH, if yours is not Ubuntu Linux OS.

sundar@devsys:~/WORKSPACE/NodeJS$ git clone https://github.com/pkspandiyan/sangam
Cloning into 'sangam'...
...
sundar@devsys:~/WORKSPACE/NodeJS$ cd sangam/
sundar@devsys:~/WORKSPACE/NodeJS/sangam$ npm install
...
sundar@devsys:~/WORKSPACE/NodeJS/sangam$ bower install
...
sundar@devsys:~/WORKSPACE/NodeJS/sangam$ NODE_ENV=production gulp build
...

Below command will start the server and it listens on port # 3000.
If you need to change the port #; set it in 'process.env.PORT' environment variable or change it in ./bin/www file @ line # 15
sundar@devsys:~/WORKSPACE/NodeJS/sangam$ npm start 
... 
