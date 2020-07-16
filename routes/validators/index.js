

const Joi = require('joi')

module.exports.userLogin = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
});

module.exports.addStaff = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
});






// timezone: Joi.string().required().regex(/^([+|-][0-9]{2}):([0-9]{2})$/),
