const companyRoutes = require('./company.routes');

const CompanyModule = {
    register: function (server, options, next) {

        server.route(companyRoutes);
        next();
    }
};

CompanyModule.register.attributes = {
    name: 'CompanyModule',
    pkg: require('../../package.json')
};

module.exports = CompanyModule;