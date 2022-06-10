import Joi from 'joi';

const room = Joi.object({
  accomodationId: Joi.number().integer(),
  roomNumber: Joi.string().required().label('room Number  is required'),
  bedType: Joi.string().required().label('bed type  is required'),
  currency: Joi.string().required().label('currency  is required'),
  cost: Joi.number().precision(3).required().label('Money is required'),
});
export default room;
