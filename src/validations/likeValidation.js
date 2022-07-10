import Joi from 'joi';

const like = Joi.object({
  accomodationId: Joi.number().integer().required(),
  userId: Joi.string().required(),
  bedType: Joi.string().required().label('bed type  is required'),
  likeStatus: Joi.boolean().required(),
});
export default like;
