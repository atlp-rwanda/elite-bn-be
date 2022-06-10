import Joi from 'joi';

const rateValidator = (req, res, next) => {
  const ratingValidation = Joi.object({
    tripRequestId: Joi.number(),
    serviceRating: Joi.number().integer().min(0).max(5),
  });
  const done = ratingValidation.validate(req.body);
  if (done.error) return res.status(400).json({ Message: done.error.details[0].message });
  next();
};

export default rateValidator;
