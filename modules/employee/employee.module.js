const employeeRoutes = require('./employee.routes');
const EmployeeModule = {
    register: (server, options, next) => {

        server.route(employeeRoutes);
        next();
    }
};

EmployeeModule.register.attributes = {
    name: 'EmployeeModule',
    pkg: require('../../package.json')
};


module.exports = EmployeeModule;