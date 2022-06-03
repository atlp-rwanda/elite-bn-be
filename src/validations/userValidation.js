import Joi from 'joi'

export const signupAuthSchema = Joi.object({

    firstName: Joi.string()
        .alphanum()
        .required()
        .label('Firstname is required'),

    lastName: Joi.string()
        .alphanum()
        .required()
        .label('Lastname is required'),

    username: Joi.string()
        .alphanum()
        .required()
        .label('username is required'),

    email: Joi.string().lowercase()
           .email().required().label('Email is required,lowercase and valid'),

    password: Joi.string()
        .min(8)
        .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
        .required()
        .label('Password:eight characters, at least one letter, one number and one special character'),



})

