/* eslint-disable  */

import { updateOrCreate } from './userService';
import { Rates, Trips } from '../database/models';

const createRate = async (userId, accomodationId, serviceRating) => {
  const { created } = await updateOrCreate(
    Rates,
    { userId, accomodationId },
    { userId, accomodationId, serviceRating }
  );
  return created;
};
// const isAccomodated = async (userId, accomodationId) => {
//   const hasAccomodated = await Trips.findOne({
//     where: { userId, accomodationId, status: 'approved' }
//   });
//   const userAccomodated = !!hasAccomodated; 
//   return userAccomodated;
// };

const getAllRates = async (id) => {
  const ratings = await Rates.findAll({
    where: { accomodationId: id },
    attributes: {
      exclude: ['id', 'accomodationId', 'userId', 'createdAt', 'updatedAt']
    }
  });
  return ratings;
};
export { createRate, getAllRates, isAccomodated };