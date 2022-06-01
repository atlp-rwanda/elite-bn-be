import Joi from 'joi';

const registerSchema=Joi.object().keys({
    firstName:Joi.string().required().label('FirstName is required'),
    lastName:Joi.string().required().label('LastName is required'),
    email:Joi.string().email().lowercase().required().label('Email is required,lowercase and valid'),
    password:Joi.string()
                .min(8)
                .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
                .required()
                .label('Password:eight characters, at least one letter, one number and one special character'),
})
export {registerSchema}