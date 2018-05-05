const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const CompanySchema = new Schema({
    name: {
        required: true,
        type: String,
        unique: false
    },
    cnpj: Number,
    employees: [
        {
            type: Schema.Types.Mixed,
            ref: 'Employee',
            required: true,
        }
    ]
});

module.exports = mongoose.model('Company', CompanySchema);