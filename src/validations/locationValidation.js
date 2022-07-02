import Joi from 'joi';

const location = Joi.object({
  locationName: Joi.string().empty().min(3).max(20).messages({
    'any.required': '{{#label}} field is required',
    'string.base': '{{#label}} must be of type string',
    'string.empty': '{{#label}} can not be empty',
  }),
  type: Joi.string().empty().required(),
  locationDescription: Joi.string().empty().min(3).messages({
    'any.required': '{{#label}} field is required',
    'string.base': '{{#label}} must be of type string',
    'string.empty': '{{#label}} can not be empty',
  }),
  countryId: Joi.number().integer(),
  currency: Joi.string().required().label('currency is required'),
  link: Joi.string(),
});
export default location;
