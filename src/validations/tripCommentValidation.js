import Joi from 'joi';

const tripValidator = (req, res, next) => {
  const tripValidation = Joi.object({
    comment: Joi.string().min(3).max(400).required(),
  });
  const done = tripValidation.validate(req.body);
  if (done.error) return res.status(400).json({ Message: done.error.details[0].message });
  next();
};

export default tripValidator;
