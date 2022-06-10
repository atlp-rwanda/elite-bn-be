import Joi from 'joi';

export const chatValidator = (req, res, next) => {
  const messageValidation = Joi.object({
    message: Joi.string().required().label('message is required'),
  });
  const text = messageValidation.validate(req.body);
  if (text.error) return res.status(400).json({ Message: text.error.details[0].message });
  next();
};
