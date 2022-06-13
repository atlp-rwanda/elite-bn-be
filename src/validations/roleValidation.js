import Joi from 'joi';


 const roleValidator = (req, res, next) => {
    const roleValidation = Joi.object({
        userEmail: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required(),
        userRole: Joi.string().valid('super admin', 'travel admin', 'manager', 'requester', 'accommodation supplier')
        .trim()
    });
    const done = roleValidation.validate(req.body);
    if(done.error) return res.status(400).json({ Message: done.error.details[0].message });
    next();
}

export default roleValidator;

