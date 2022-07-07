import Joi from 'joi';

const tripValidator = (req, res, next) => {
  const tripValidation = Joi.object({
    from: Joi.string().min(3).max(74).required(),
    to: Joi.number().integer().required(),
    departDate: Joi.date().iso().required(),
    returnDate: Joi.date().iso().greater(Joi.ref('departDate')).allow(''),
    tripReasons: Joi.string().min(3).max(1014).required(),
    tripType: Joi.string(),
    tripStatus: Joi.string().valid('pending', 'approved', 'denied').trim(),
    accommodationId: Joi.number().integer().required(),
  });
  const done = tripValidation.validate(req.body);
  if (done.error) return res.status(400).json({ Message: done.error.details[0].message });
  next();
};

export default tripValidator;
