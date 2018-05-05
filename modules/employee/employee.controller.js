const Employee = require('./employee.model');
const Company = require('../company/company.model');
const Boom = require('boom');

module.exports = {

    async find(req, reply) {
        try {
            const employees = await Employee.find({})
                .populate('users');
            reply.response(employees);
        } catch (err) {
            throw err;
        }
    },
    findOne(req, reply) {
        try {
            Employee.findById(req.params.id, (err, employee) => {

                if (err) {
                    return reply(err).code(404);
                }
                return reply.response(employee);
    
            });

        } catch (err) {
            throw err;
        }
    },
    findEmployeeByRole(req, reply) {
        Employee.find({role:req.params.role}, (err, employee) => {
            if (err)
                return reply(err).code(500);

            return reply.response(employee)
        })
    },
    async create(req, reply) {

        try {
            const employee = await Employee.create({
                name: req.payload.name,
                age: req.payload.age,
                bornDate: req.payload.bornDate,
                role: req.payload.role,
                user: req.auth.credentials,
            });

            return reply.response(employee);
        }
        catch (err) {
            throw err;
        }
    },
};