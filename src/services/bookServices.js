import models from '../database/models';
import { compareBookingDuration } from '../utils/helpers/bookingDuration';

export class BookingService {
  static roomExist = async (roomId) => {
    return await models.Room.findOne({ where: { id: roomId } });
  };

  static checkRoomAvailability = (roomObj) => {
    if (roomObj.isBooked === true) {
      return false;
    }
    return true;
  };

  static tripApproved = async (tripId) => {
    const myTrip = await models.tripRequest.findOne({ where: { id: tripId } });
    if (myTrip.tripStatus === 'approved') {
      return true;
    }
    return false;
  };

  static bookRoom = async (room, user, from, to) => {
    if (compareBookingDuration(from, to)) {
      return await models.BookingRoom.create({
        roomId: room.id,
        userId: user.id,
        from,
        to,
      });
    }
    return null;
  };
  static checkBooked = async (id) => {
    return await models.BookingRoom.findOne({ where: { roomId: id } });
  };

  static deleteBooked = async (id) => {
    return await models.BookingRoom.destroy({ where: { roomId: id } });
  };
}
