import Joi from 'joi';


export const roleValidator = (req, res, next) => {
    const roleValidation = Joi.object({
        userEmail: Joi.string().min(4).required().email()
        .trim(),
        userRole: Joi.string().valid('super_admin', 'travel_admin', 'manager', 'requester')
        .trim()
    });
    const done = roleValidation.validate(req.body);
    if(done.error) return res.status(400).json({ Message: done.error.details[0].message });
    next();
}

export default roleValidator;

