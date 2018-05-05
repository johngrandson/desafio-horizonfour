const Company = require('./company.model');
const Employee = require('../employee/employee.model');
const Boom = require('boom');

module.exports = {

    async create(req, reply) {

        try {
            const newCompany = await Company.create({
                name: req.payload.name,
                cnpj: req.payload.cnpj,
            });

            return reply.response(newCompany);
        }
        catch(err){
            throw Boom.badImplementation('could not create company',err);
        }

    },
    async insertEmployee(req, reply) {
        try {
            const company = await Company.findById(req.params.id);

            const newEmployee = await Employee.create({
                name: req.payload.name,
                age: req.payload.age,
                bornDate: req.payload.bornDate,
                role: req.payload.role,
                user: req.auth.credentials,
            })

            company.employees.push(newEmployee);
            await company.save();
            
            return reply.response(company);
            console.log(company);

            
        } catch (err) {
            throw Boom.badImplementation('could not insert employee',err);
        }
    },
    async removeEmployee(req, reply) {
        try {
            const company = await Company.findById(req.params.id);

            const employee = await Employee.findByIdAndRemove(req.params.employeeId);

            return reply.response(employee)
            console.log(employee);

        } catch (err) {
            throw Boom.badImplementation('could not remove employee',err);
        }
    },
    async find(req, reply) {

        try {
            const companies = await Company.find({})
                .populate('users');

            return reply.response(companies);
        }
        catch(err){
            throw err;
        }
    },
    findOne(req, reply) {
        Company.findById(req.params.id, (err, company) => {

            if (err) {
                return reply(err).code(404);
            }
            return reply.response(company);
            // comment
        })
    },
    findEmployeeByRole(req, reply) {
        Employee.find({role:req.params.role}, (err, employee) => {
            if (err) {
                return reply(err).code(404);
            }
            return reply.response(employee);
        });
    },
    update(req, reply) {
        let attributes = {};

        if (req.payload.name) {
            attributes.name = req.payload.name;
        }
        if (req.payload.cnpj) {
            attributes.cnpj = req.payload.cnpj;
        }
        Company.findByIdAndUpdate(req.params.id, attributes, {new: true}, (err, company) => {
            if (err) {
                return reply(err).code(500);
            }
            return reply.response(company);
        })

    },
    delete(req, reply) {
        Company.findByIdAndRemove(req.params.id, (err, result) => {
            if (err) {
                return reply(err).code(500);
            }
            return reply.response({msg: `company has deleted with id ${req.params.id}`});
        })
    }

};