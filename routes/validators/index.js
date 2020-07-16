

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
module.exports.updateUser = Joi.object({
    first_name: Joi.string(),
    last_name: Joi.string(),
    password: Joi.string(),
    username: Joi.string(),
});
module.exports.addLead = Joi.object({
    name: Joi.string().required(),
    phone: Joi.string().required(),
    email: Joi.string().required().email(),
});
module.exports.updateLead = Joi.object({
    name: Joi.string(),
    phone: Joi.string(),
    email: Joi.string().email(),
});





// timezone: Joi.string().required().regex(/^([+|-][0-9]{2}):([0-9]{2})$/),
