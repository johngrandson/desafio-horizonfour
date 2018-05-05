const jwt = require('jsonwebtoken');
const User = require('../modules/user/user.model');
const config = require('../config/development');

module.exports = {

    issue(options) {

        let {payload, expiresIn} = options;
        return jwt.sign(payload, config.secret, {
            expiresIn: expiresIn
        })

    },
    validate(decodedToken, request, callback) {

        User.findOne({
            _id: decodedToken.id,
            email: decodedToken.email
        }, (err, _user) => {
            if (err || !_user) {
                return callback(null,false);
            }
            return callback(null, true)
        })

    }
};