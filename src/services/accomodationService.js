import { Accomodation, Room } from '../database/models';

class AccommodationService {
  static createAccommodation = async (data) => {
    return Accomodation.create(data);
  };

  static getOneAccommodation = async (id) => {
    const oneAccommodation = await Accomodation.findOne({
      where: { id },
      include: [
        {
          model: Room,
          attributes: { exclude: ['createdAt', 'updatedAt'] },
        },
      ],
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });
    return oneAccommodation;
  };

  static getAccommodationsByLocation = async (locationId) => {
    const accommodations = await Accomodation.findAll({
      where: { locationId },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });
    return accommodations;
  };

  static updateAccommodation = async (id, updates) => {
    const updatedAccommodation = await Accomodation.update(updates, {
      where: { id },
      returning: true,
      raw: true,
    });
    return updatedAccommodation;
  };

  static getAllAccommodations = async () => {
    return Accomodation.findAll({});
  };

  static deleteAccommodation = async (id) => {
    return Accomodation.destroy({
      where: { id },
    });
  };

  static findAccommodation = async (searchParams) => {
    return Accomodation.findOne({ where: searchParams });
  };
}

export default AccommodationService;
