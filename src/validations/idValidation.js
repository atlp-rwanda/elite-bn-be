/* eslint-disable import/prefer-default-export */
import Joi from 'joi';

const accomodationIdSchema = Joi.object().keys({
  accommodationId: Joi.number()
    .integer()
    .min(1)
    .required()
    .label('Accomodation id should be valid.')
});
export { accomodationIdSchema };