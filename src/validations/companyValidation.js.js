const Joi = require('joi');

exports.validateCompanyRegistration = (body) => {
  const bookingSchema = Joi.object({
    name: Joi.string().min(3).max(160).required(),
    email: Joi.string().min(3).max(320).required(),
    locationId: Joi.string().min(10).max(100).required(),
    managerId: Joi.string().min(10).max(100).required(),
  });
  return bookingSchema.validate(body);
};
