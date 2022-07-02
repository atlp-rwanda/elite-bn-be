import Joi from 'joi';

const countrySchema = Joi.object({
  name: Joi.string().required().label('country name  is required'),
});
export default countrySchema;
