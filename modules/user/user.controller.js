const User = require('./user.model');
const UtilService = require('../../services/util.service');
const Boom = require('boom');
const JwtService = require('../../services/jwt.service');

module.exports = {

    async signup(req, reply) {

        try {

            const user = new User({
                email: req.payload.email,
                password: req.payload.password
            });

            user.password = await UtilService.hashPassword(user.password);
            await user.save();

            return reply.response('Signup successful!');

        }
        catch(err){
            throw Boom.badImplementation('Signup Failed',err);
        }
    },
    async login(req, reply){

        try {
            const user = await User.findOne({
                email: req.payload.email
            });
            if (!user) {
                reply(Boom.unauthorized('Invalid credentials provided'));
            }

           const matched = await UtilService.comparePassword(req.payload.password, user.password);
            if(matched){
               const token = JwtService.issue({
                    payload:{
                        id: user._id,
                        email: user.email
                    },
                    expiresIn : '1 day'
                });
                reply.response({token:token});
            }
            else{
                reply(Boom.unauthorized('Invalid credentials provided'));
            }
        }
        catch(err){
            throw Boom.unauthorized('Invalid credentials provided',err);
        }
    }
};