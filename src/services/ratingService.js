import { updateOrCreate } from './userServices';
import { Rates, tripRequest } from '../database/models';

const createRating = async (tripperId, accommodationId, serviceRating) => {
  const { created } = await updateOrCreate(
    Rates,
    { tripperId, accommodationId },
    { tripperId, accommodationId, serviceRating }
  );
  return created;
};
const isAccomodated = async (accommodationId) => {
  const hasAccomodated = await tripRequest.findOne({
    where: { accommodationId }
  });
  const userAccomodated = !!hasAccomodated; 
 
  return userAccomodated;
};
const getAllRatings = async (id) => {
  const ratings = await Rates.findAll({
    where: { accommodationId: id },
    attributes: {
      exclude: ['id', 'accommodationId', 'tripperId', 'createdAt', 'updatedAt']
    }
  });
  return ratings;
};
export { createRating, getAllRatings, isAccomodated };