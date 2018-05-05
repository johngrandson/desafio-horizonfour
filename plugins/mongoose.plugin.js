const mongoose = require('mongoose');
const MongoosePlugin ={

    register: function (server, options, next) {

        mongoose.Promise = require('bluebird');
        mongoose.connect(options.mongoDbUri, {
            useMongoClient: true
        });
        mongoose.connection.on('connected', () => {
            console.log(`app is connected to ${options.mongoDbUri}`);
        });
        mongoose.connection.on('error', err => {
            console.log('error while connecting to mongodb', err);
        });

        next();

    }
};


MongoosePlugin.register.attributes ={
 name: 'MongoosePlugin',
 pkg: require('../package.json')
};


module.exports = MongoosePlugin;