import { Room } from '../database/models';
import models from '../database/models';

const { Accomodation, Rooms, Bookings } = models;

class RoomServices {
  static createRoom = async (room) => {
    return Room.create(room);
  };

  static getAllRoomsOfAccommodation = async () => {
    return Room.findAll({});
  };

  static getSingleRoom = async (id) => {
    return Room.findOne({
      where: {
        id,
      },
    });
  };

  static updateRoom = async (id, roomUpdate) => {
    return Room.update(roomUpdate, {
      where: {
        id,
      },
    });
  };

  static deleteRoom = async (id) => {
    return Room.destroy({
      where: {
        id,
      },
    });
  };

}

export default RoomServices;
