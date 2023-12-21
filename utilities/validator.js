const Joi = require('joi');

exports.createUserDataValidator = (data)=>
    Joi
       .object()
       .keys({
        name: Joi.string().min(1).max(12),
        email: Joi.string()
        .email({ minDomainSegments: 2}),
        phone: Joi.string().length(10).pattern(/^[0-9]+$/)
       })
       .validate(data)

