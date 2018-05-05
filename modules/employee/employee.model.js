const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = require('../user/user.model');

const EmployeeSchema = new Schema({

    name: {
        type: String,
        required: true,
        unique: false
    },
    age: {
        type: Number,
        required: true
    },
    bornDate: {
        type: Date,
        required: true
    },
    role: {
        type: String,
        enum: ['developer', 'director', 'analyst']
    },
    user: {
        type: Schema.Types.Mixed,
        ref: 'User',
        required: true,

    }
});


module.exports = mongoose.model('Employee', EmployeeSchema);
