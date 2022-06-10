import { Op } from 'sequelize';
import models from '../database/models';

export class AccommodationRatingService {
  static async create(data) {
    return await models.AccommodationRating.create(data);
  }

  static async update(data) {
    data.update();
    data.save();
    return data;
  }

  static async findOne(userId, accommodationId) {
    return await models.AccommodationRating.findOne({
      where: {
        [Op.and]: [{ userId }, { accommodationId }],
      },
    });
  }

  static async findAllByAccommodation(id) {
    return await models.AccommodationRating.findAndCountAll({
      where: { accommodationId: id },
    });
  }

  static async findAllTripsByUser(userId) {
    return await models.tripRequest.findAll({
      where: { userId },
    });
  }
}
