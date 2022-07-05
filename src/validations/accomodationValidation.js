import Joi from 'joi';

const accommodation = Joi.object({
  accomodationName: Joi.string().empty().min(3).max(20).messages({
    'any.required': '{{#label}} field is required',
    'string.base': '{{#label}} must be of type string',
    'string.empty': '{{#label}} can not be empty',
  }),
  type: Joi.string().empty().required(),
  accomodationDescription: Joi.string().empty().min(3).messages({
    'any.required': '{{#label}} field is required',
    'string.base': '{{#label}} must be of type string',
    'string.empty': '{{#label}} can not be empty',
  }),
  locationId: Joi.number().integer(),
  accomodationImage: Joi.string(),
  amenities: Joi.array().items(
    Joi.string().label('Amenities should be an array').empty().min(4).messages({
      'any.required': '{{#label}} field is required',
      'string.base': '{{#label}} must be of type string',
      'string.empty': '{{#label}} can not be empty',
    })
  ),
  latitude: Joi.string().required().label('Latitude is required'),
  longitude: Joi.string().required().label('Longitude name is required'),
});
export default accommodation;
