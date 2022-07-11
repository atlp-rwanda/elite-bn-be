import models from '../database/models';
// import tripRequest from '../database/models/triprequest'
import roomService from '../services/roomService';
import * as ApplicationError from '../utils/errors/applicatioErrors';
import AccommodationService from '../services/accomodationService';
import {
  notFoundResponse,
  successResponse,
  createdResponse,
  confictResponse,
} from '../utils/response';

class roomController {
  static createRoom = async (req, res) => {
    try {
      const accomodation = await AccommodationService.getOneAccommodation(req.body.accomodationId);
      if (!accomodation) {
        return res.status(404).json({
          message: 'Accommodation not found try again!!!',
        });
      }
      const room = await roomService.createRoom(req.body);
      return res.status(201).json({
        status: 201,
        message: 'Room added successfully',
        payload: room,
      });
    } catch (error) {
      ApplicationError.internalServerError({ message: 'can not create Room try again' }, res);
    }
  };
  static getAllRooms = async (req, res) => {
    try {
      const rooms = await roomService.getAllRoomsOfAccommodation();
      return res.status(200).json({
        status: '200',
        message: 'All rooms in given accommodation',
        payload: rooms,
      });
    } catch (error) {
      ApplicationError.internalServerError({ message: `some${error} occured` }, res);
    }
  };
  static getSingleRoom = async (req, res) => {
    try {
      const room = await roomService.getSingleRoom(req.params.roomId);
      if (!room) {
        return res.status(200).json({
          status: '404',
          message: 'Room not found',
        });
      }
      return res.status(200).json({
        status: '200',
        message: 'Room found',
        payload: room,
      });
    } catch (error) {
      ApplicationError.internalServerError({ message: error }, res);
    }
  };
  static updateRoom = async (req, res) => {
    const roomId = req.params.roomId;
    try {
      const roomUpdate = await roomService.getSingleRoom(roomId);
      if (!roomUpdate) {
        return res.status(404).json({
          status: '404',
          message: 'Room not found',
        });
      }

      req.body = { ...req.body };
      await roomUpdate.update(req.body);

      return res.status(200).json({
        status: '200',
        message: 'Room updated successfully',
        payload: roomUpdate,
      });
    } catch (error) {
      ApplicationError.internalServerError({ message: error }, res);
    }
  };
  static deleteRoom = async (req, res) => {
    try {
      const room = await roomService.getSingleRoom(req.params.roomId);

      if (!room) {
        return res.status(404).json({
          status: '404',
          message: 'Room not found',
        });
      }
      await roomService.deleteRoom(req.params.roomId);

      return res.status(200).json({
        status: '200',
        message: 'Room deleted successfully',
      });
    } catch (error) {
      ApplicationError.internalServerError({ message: error }, res);
    }
  };
  static bookRoom = async (req, res) => {
    const { tripId, roomId } = req.body;
    const trip = await models.tripRequest.findOne({
      where: { id: req.body.tripId },
    });
    console.log(trip.userId);

    if (!trip) {
      return notFoundResponse(res, 'Trip Not Found');
    }
    const { isValidRoom, error } = await roomService.getSingleRoom(req.params.roomId);
    if (!isValidRoom) return notFoundResponse(res, `Room Not Found`, error);
    // const accomodation = await accomService.getById(trip.accomodationId);
    const { accommodationId } = req.params;
    const accomodation = await AccommodationService.getOneAccommodation(accommodationId);
    if (!accomodation) return notFoundResponse(res, `Accomodation Not Found`);
    if (trip.tripStatus === 'approved') {
      if (isValidRoom.accomodationId === accomodation.id) {
        if (isValidRoom.status !== 'available') {
          return confictResponse(
            res,
            409,
            `Can Not Book Room ${isValidRoom.roomNumber}, It is ${isValidRoom.status} Already`,
            [
              `Room Number: ${isValidRoom.roomNumber}`,
              `Room Status: ${isValidRoom.status}`,
              `Accomodation: ${isValidRoom.accomodation.name}`,
            ]
          );
        }
        if (isValidRoom.status === 'available') {
          const period = (trip.dateOfReturn - trip.dateOfTravel) / (1000 * 3600 * 24);
          const booking = {
            tripId,
            accomodationId: trip.accomodationId,
            roomId,
            arrivalDate: trip.dateOfTravel,
            departureDate: trip.dateOfReturn,
            duration: period,
          };
          const UpdateRoom = {
            status: 'booked',
          };
          const { createdBooking, newError } = await roomService.createNewBooking(
            booking,
            UpdateRoom
          );
          if (!newError) {
            return createdResponse(res, 'Room Booked Successfully', createdBooking);
          }
          return confictResponse(res, 400, `Can Not Book Room ${isValidRoom.roomNumber}`, newError);
        }
      } else {
        return confictResponse(
          res,
          409,
          `You Are Not Allowed To Book A Room In Accomodation: ${isValidRoom.accomodation.name}`,
          [
            `Trip To: ${trip.destination} In Accomodation: ${trip.Accomodation.name}`,
            `Room: ${isValidRoom.roomNumber} Is In Accomodation: ${isValidRoom.accomodation.name}`,
          ]
        );
      }
    }
    return confictResponse(
      res,
      409,
      `Can Not Book Room ${isValidRoom.roomNumber}, Trip Status Is: ${trip.status}`,
      [`Room Number: ${isValidRoom.roomNumber}`, `Trip Status: ${trip.status}`]
    );
  };

  static getAllBookings = async (req, res) => {
    // const userRole = await roleService.getUserRole(req.user.id);
    const userRole = await models.Users.findByPk(req.user.id);
    const { bookings, error } = await roomService.getAvailableBookings();
    if (error) return notFoundResponse(res, error);
    if (bookings) {
      return successResponse(
        res,
        200,
        `All Booking In Your Accomodation Retrieved Successfully`,
        bookings
      );
    }
    return ApplicationError.internalServerError(
      `There was a problem Retrieving Available Bookings In The Database`,
      error
    );

    return confictResponse(
      res,
      403,
      `You Are Not Allowed To View Bookings As A ${userRole}`,
      userRole
    );
  };

  static roomCheckInOrCheckOut = async (req, res) => {
    const { bookingId } = req.params;
    const { isValidBooking, validationError } = await roomService.findBookingById(bookingId);
    if (!isValidBooking) {
      return notFoundResponse(res, 'Booking Not Found', validationError);
    }
    const bookingStatus = {
      status: req.body.status,
    };
    if (isValidBooking.status === 'booked' && bookingStatus.status === 'checkedIn') {
      const { updatedBooking, error } = await roomService.checkInBooking(bookingId, bookingStatus);
      if (!error && (updatedBooking || updatedBooking !== 'undefined')) {
        return successResponse(
          res,
          200,
          `Room: ${updatedBooking.room.roomNumber} Of Accomodation: ${updatedBooking.bookedIn.name} Located In: ${updatedBooking.bookedIn.location} Is Checked In Successfully`,
          updatedBooking
        );
      }
      return confictResponse(res, 400, `There Was A Problem Checking In The Booking`, error);
    }

    if (isValidBooking.status === 'checkedIn' && bookingStatus.status === 'checkedOut') {
      const roomStatus = {
        status: 'available',
      };
      const { updatedBooking, error } = await roomService.checkOutBooking(
        bookingId,
        bookingStatus,
        roomStatus,
        isValidBooking.roomId
      );
      if (!error && (updatedBooking || updatedBooking !== 'undefined')) {
        return successResponse(
          res,
          200,
          `Room: ${updatedBooking.room.roomNumber} Of Accomodation: ${updatedBooking.bookedIn.name} Is Checked Out Successfully`,
          updatedBooking
        );
      }
      return confictResponse(res, 400, `There Was A Problem Checking Out The Booking`, error);
    }

    if (
      (isValidBooking.status === 'checkedIn' && bookingStatus.status === 'checkedIn') ||
      (isValidBooking.status === 'checkedOut' && bookingStatus.status === 'checkedOut') ||
      (isValidBooking.status === 'booked' && bookingStatus.status === 'checkedOut') ||
      (isValidBooking.status === 'checkedOut' && bookingStatus.status === 'checkedIn')
    ) {
      return confictResponse(
        res,
        400,
        `Room: ${isValidBooking.room.roomNumber} Of Accomodation: ${isValidBooking.bookedIn.name} Is ${isValidBooking.status} Arleady`,
        [
          `Room Number: ${isValidBooking.room.roomNumber}`,
          `Room Status: ${isValidBooking.status}`,
          `Accomodation: ${isValidBooking.bookedIn.name}`,
        ]
      );
    }
  };

  static removeRoomBooking = async (req, res) => {
    const { bookingId } = req.params;
    const { isValidBooking } = await roomService.findBookingById(bookingId);
    if (!isValidBooking) return notFoundResponse(res, 'Booking Not Found');
    // const { trip } = await tripService.findTripById(isValidBooking.tripId);
    const freshUser = await models.Users.findByPk(req.user.id);
    const { trip } = await models.tripRequest.findAll({
      where: { tripperId: freshUser.id },
      include: [
        { model: models.Users, as: 'requester', attributes: ['firstName', 'lastName', 'email'] },
        { model: models.Location, as: 'destination', attributes: ['locationName'] },
        { model: models.Accomodation, as: 'accommodation', attributes: ['accomodationName'] },
      ],
      attributes: {
        exclude: ['tripperId', 'to', 'accommodationId', 'createdAt', 'updatedAt'],
      },
    });
    if (trip.userId !== req.user.id) {
      return confictResponse(res, 403, `You Are Not Allowed To Remove This Booking`);
    }
    if (isValidBooking.status === 'checkedIn') {
      return confictResponse(
        res,
        400,
        `Room: ${isValidBooking.room.roomNumber} Of Accomodation: ${isValidBooking.bookedIn.name} Is ${isValidBooking.status} Arleady`,
        [
          `Room Number: ${isValidBooking.room.roomNumber}`,
          `Room Status: ${isValidBooking.status}`,
          `Accomodation: ${isValidBooking.bookedIn.name}`,
        ]
      );
    }
    const roomStatus = {
      status: 'available',
    };
    const { clearRoom, error } = await roomService.deleteBooking(
      bookingId,
      roomStatus,
      isValidBooking.roomId
    );
    if (!clearRoom[0] === 1) {
      return ApplicationError.internalServerError(error, res);
    }
    return successResponse(res, 202, 'Booking Deleted Successfully');
  };

  static deleteRoomBooking = async (req, res) => {
    const { bookingId } = req.params;
    const { isValidBooking } = await roomService.findBookingById(bookingId);
    if (!isValidBooking) return notFoundResponse(res, 'Booking Not Found');
    if (isValidBooking.status === 'checkedIn') {
      return confictResponse(
        res,
        400,
        `Room: ${isValidBooking.room.roomNumber} Of Accomodation: ${isValidBooking.bookedIn.name} Is ${isValidBooking.status} Arleady`,
        [
          `Room Number: ${isValidBooking.room.roomNumber}`,
          `Room Status: ${isValidBooking.status}`,
          `Accomodation: ${isValidBooking.bookedIn.name}`,
        ]
      );
    }
    const roomStatus = {
      status: 'available',
    };
    const { clearRoom, error } = await roomService.deleteBooking(
      bookingId,
      roomStatus,
      isValidBooking.roomId
    );
    if (!clearRoom[0] === 1) {
      return ApplicationError.internalServerError(error, res);
    }
    return successResponse(res, 202, 'Booking Deleted Successfully');
  };
}
export default roomController;
