/* eslint-disable  */

import Joi from 'joi';

export const ratingSchema = Joi.object().keys({
  serviceRating: Joi.number()
    .integer()
    .min(1)
    .max(5)
    .required()
    .label('service rate must be an integer between 1 and 5.')
});