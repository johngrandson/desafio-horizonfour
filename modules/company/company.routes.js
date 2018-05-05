const CompanyController = require('./company.controller');
const Joi = require('joi');

const schema = Joi.object().keys({
    name: Joi.string().required(),
    cnpj: Joi.number().optional()
});

module.exports = [
    {
        path: '/companies',
        method: 'POST',
        config: {
            validate: {
                payload: schema,
                headers:Joi.object({
                    'authorization' : Joi.string().required()
                }).unknown()
            },
            handler: CompanyController.create,
            description: 'Create new Company',
            tags: ['api','Companies'],
            notes: 'Returns newly created Company'
        }
    },
    {
        path: '/companies/{id}/employee',
        method: 'POST',
        config: {
            validate: {
                params: Joi.object().keys({
                    id: Joi.string().required(),
                }),
                payload:Joi.object().keys({
                    name: Joi.string().required(),
                    age: Joi.number().required(),
                    bornDate: Joi.date().required(),
                    role: Joi.string().required(),
                }),
                headers:Joi.object({
                    'authorization' : Joi.string().required()
                }).unknown()
            },
            handler: CompanyController.insertEmployee,
            tags: ['api','Companies'],
            description: 'Insert a employee in a especific company',
            notes: 'Returns newly employee inserted in a company',
        }
    },
    {
        path: '/companies',
        method: 'GET',
        config: {
            handler: CompanyController.find,
            tags: ['api','Companies'],
            description: 'Find all the Companies',
            notes: 'Returns all the Companies',
            validate:{
                headers:Joi.object({
                    'authorization' : Joi.string().required()
                }).unknown()
            }
        }
    },
    {
        path: '/companies/{id}',
        method: 'GET',
        config: {
            validate: {
                params: Joi.object().keys({
                    id: Joi.string().required()
                }),
                headers:Joi.object({
                    'authorization' : Joi.string().required()
                }).unknown()
            },
            handler: CompanyController.findOne,
            tags: ['api','Companies'],
            description: 'Find Company By Id',
            notes: 'Returns a single Company',
        }
    },
    {
        path: '/companies/{id}/{role}',
        method: 'GET',
        config: {
            validate: {
                params: Joi.object().keys({
                    id: Joi.string().required(),
                    role: Joi.string().required()
                }),
                headers:Joi.object({
                    'authorization' : Joi.string().required()
                }).unknown()
            },
            handler: CompanyController.findEmployeeByRole,
            tags: ['api','Companies'],
            description: 'Find Company By Id',
            notes: 'Returns a single Company',
        }
    },
    {
        path: '/companies/{id}',
        method: 'DELETE',
        config: {
            validate: {
                params: Joi.object().keys({
                    id: Joi.string().required()
                }),
                headers:Joi.object({
                    'authorization' : Joi.string().required()
                }).unknown()
            },
            handler: CompanyController.delete,
            tags: ['api','Companies'],
            description: 'Delete Company By Id',
            notes: 'Returns a deleted message'
        }
    },
    {
        path: '/companies/{id}/employee/{employeeId}',
        method: 'DELETE',
        config: {
            validate: {
                params: Joi.object().keys({
                    id: Joi.string().required(),
                    employeeId: Joi.string().required()
                }),
                headers:Joi.object({
                    'authorization' : Joi.string().required()
                }).unknown()
            },
            handler: CompanyController.removeEmployee,
            tags: ['api','Companies'],
            description: 'Delete a employee in a especific company',
            notes: 'Returns newly employee removed in a company',
        }
    },
    {
        path: '/companies/{id}',
        method: 'PUT',
        config: {
            validate: {
                params: Joi.object().keys({
                    id: Joi.string().required()
                }),
                payload:Joi.object().keys({
                    name: Joi.string().required(),
                    cnpj: Joi.number().required(),
                }),
                headers:Joi.object({
                    'authorization' : Joi.string().required()
                }).unknown()
            },
            handler: CompanyController.update,
            tags: ['api','Companies'],
            description: 'Update Company By Id',
            notes: 'Returns a updated Company'

        }
    }
];