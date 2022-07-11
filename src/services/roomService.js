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

  static findBookingById = async (bookingId) => {
    try {
      const isValidBooking = await Bookings.findOne({
        where: { id: bookingId },
        include: [
          {
            model: Accomodation,
            as: 'bookedIn',
            attributes: ['name'],
          },
          {
            model: Room,
            as: 'room',
            attributes: ['roomNumber'],
          },
        ],
        attributes: { exclude: ['createdAt', 'updatedAt'] },
      });
      return { isValidBooking };
    } catch (error) {
      const validationError = error;
      return { validationError };
    }
  };

  static createNewBooking = async (booking, UpdateRoom) => {
    try {
      await Bookings.create(booking);
      await Room.update(UpdateRoom, {
        where: {
          id: booking.roomId,
        },
      });
      const createdBooking = await Bookings.findOne({
        where: {
          accomodationId: booking.accomodationId,
          tripId: booking.tripId,
        },
        attributes: { exclude: ['createdAt', 'updatedAt'] },
      });
      return { createdBooking };
    } catch (error) {
      const newError = error;
      return { newError };
    }
  };

  static getAvailableBookings = async () => {
    const bookings = await Bookings.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });
    if (bookings.length === 0) {
      const error = 'No Available Bookings In Your Accomodation';
      return { error };
    }
    return { bookings };
  };

  static checkInBooking = async (bookingId, bookingStatus) => {
    try {
      await Bookings.update(bookingStatus, {
        where: {
          id: bookingId,
        },
      });
      const updatedBooking = await Bookings.findOne({
        where: { id: bookingId },
        include: [
          {
            model: Accomodation,
            as: 'bookedIn',
            attributes: ['name', 'location'],
          },
          {
            model: Room,
            as: 'room',
            attributes: ['roomNumber'],
          },
        ],
        attributes: { exclude: ['createdAt', 'updatedAt'] },
      });
      return { updatedBooking };
    } catch (error) {
      return { error };
    }
  };

  static checkOutBooking = async (bookingId, bookingStatus, roomStatus, roomId) => {
    await Bookings.update(bookingStatus, {
      where: {
        id: bookingId,
      },
    });
    await Room.update(roomStatus, {
      where: {
        id: roomId,
      },
    });
    const updatedBooking = await Bookings.findOne({
      where: { id: bookingId },
      include: [
        {
          model: Accomodation,
          as: 'bookedIn',
          attributes: ['name', 'location'],
        },
        {
          model: Room,
          as: 'room',
          attributes: ['roomNumber'],
        },
      ],
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });
    return { updatedBooking };
  };

  static deleteBooking = async (bookingId, roomStatus, roomId) => {
    try {
      await Bookings.destroy({
        where: { id: bookingId },
      });
      const clearRoom = await Room.update(roomStatus, {
        where: {
          id: roomId,
        },
      });
      return { clearRoom };
    } catch (error) {
      return { error };
    }
  };
}

export default RoomServices;
