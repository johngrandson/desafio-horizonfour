const jwt = require('jsonwebtoken');
const User = require('../modules/user/user.model');

module.exports = {

    issue(options) {

        let {payload, expiresIn} = options;
        return jwt.sign(payload, process.env.secret, {
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