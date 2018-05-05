const hapi = require('hapi');
const server = new hapi.Server();
const plugins = require('./config/plugins');
const JwtService = require('./services/jwt.service');
const { config } = require('dotenv');

if(process.env.NODE_ENV === 'production')
  config({ path: 'config/.env.prod'})
else
  config({ path: 'config/.env.dev'})

server.connection({host: process.env.host, port: process.env.port});


server.register(plugins, (err) => {

    if (err) {
        throw err;
    }
    server.start(err => {
        if (err) {
            throw err;
        }

        server.auth.strategy('jwt','jwt',{
           key: config.secret,
           verifyOptions:{
               algorithm: ['HS256']
           },
           validateFunc: JwtService.validate
        });

        server.auth.default('jwt');

        console.log(`Server running in ${process.env.NODE_ENV || 'development'} on port ${process.env.port}...`);
    });
});