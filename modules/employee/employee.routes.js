const EmployeeController = require('./employee.controller');
const Joi = require('joi');
module.exports = [
    {
        path: '/employees',
        method: 'GET',
        config: {
            handler: EmployeeController.find,
            tags: ['api','Employees'],
            description: 'Find all Employees',
            notes: 'Returns all Employees',
            validate:{
                headers:Joi.object({
                    'authorization' : Joi.string().required()
                }).unknown()
            }
        }
    },
    {
        path: '/employees',
        method: 'POST',
        config: {
            handler: EmployeeController.create,
            validate: {
                payload: Joi.object().keys({
                    name: Joi.string().required(),
                    age: Joi.number().required(),
                    bornDate: Joi.date().required(),
                    role: Joi.string().required(),
                }),
                headers:Joi.object({
                    'authorization' : Joi.string().required()
                }).unknown()
            },
            tags: ['api','Employee'],
            description:'Create new Employee',
            notes: 'Returns newly created Employee'

        }
    },
    {
        path: '/employees/{id}',
        method: 'GET',
        config: {
            handler: EmployeeController.findOne,
            validate: {
                params: Joi.object().keys({
                    id: Joi.string().required()
                }),
                headers:Joi.object({
                    'authorization' : Joi.string().required()
                }).unknown()
            },
            tags: ['api','Employee'],
            description:'Find a employee by id',
            notes: 'Returns employee requested by id'

        }
    },
];