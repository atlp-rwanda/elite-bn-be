import { Accomodation, Location, Country } from '../database/models';

class locationServices {
  static create = async (location) => {
    return Location.create(location);
  };

  static getSingleLocation = async (id) => {
    return Location.findOne({
      where: { id },
      include: [
        {
          model: Accomodation,
          as: 'Accomodations',
          attributes: { exclude: ['createdAt', 'updatedAt'] },
        },
      ],
    });
  };

  static updateLocation = async (id, locationUpdate) => {
    return Location.update(locationUpdate, {
      where: { id },
      returning: true,
      raw: true,
    });
  };

  static deleteLocation = async (id) => {
    return Location.destroy({
      where: { id },
    });
  };
}

export default locationServices;
