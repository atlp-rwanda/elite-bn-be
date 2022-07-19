import { Op } from 'sequelize';
import models from '../database/models';

const { tripRequest, Users } = models;

export const countTrips = async (userId, start, end, userRole) => {
  try {
    if (userRole.role === 'requester') {
      const trips = await tripRequest.findAndCountAll({
        where: {
          [Op.and]: [
            { id: userId },
            { createdAt: { [Op.between]: [start, end] } },
            { tripStatus: 'approved' },
          ],
        },
      });
      return trips;
    }
    if (userRole.role === 'manager') {
      const accomodations = await models.Accomodation.findAll({});
      const ids = accomodations.map((accom) => accom.id);
      if (!ids.length) {
        return { count: 0 };
      }
      const trips = await tripRequest.findAndCountAll({
        where: {
          accommodationId: {
            [Op.or]: ids,
          },
          createdAt: { [Op.between]: [start, end] },
          tripStatus: 'approved',
        },
      });
      return trips;
    }
  } catch (error) {
    return { error };
  }
};
export const getUserRole = async (role) => {
  const user = await Users.findOne({
    where: {
      role: role,
    },
  });
};
