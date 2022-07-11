import express from 'express';
import roomController from '../controllers/room';
import roomMiddleware from '../middlewares/room';
import { validate } from '../middlewares';
import checkAuth from '../middlewares/checkAuth';
import verifyTravelAdmin from '../middlewares/travelAdminAuth';
import { bookingSchema, checkInorCheckoutSchema } from '../validations/bookingValidation';

const roomRouter = express.Router();
const { validateNewRoom, validateRoomUpdate } = roomMiddleware;
roomRouter.post(
  '/v1/room/create',
  checkAuth,
  verifyTravelAdmin,
  validateNewRoom,
  roomController.createRoom
);
roomRouter.get('/v1/room', roomController.getAllRooms);
roomRouter.get('/v1/room/:roomId', roomController.getSingleRoom);
roomRouter.patch(
  '/v1/room/update/:roomId',
  checkAuth,
  verifyTravelAdmin,
  validateRoomUpdate,
  roomController.updateRoom
);
roomRouter.delete(
  '/v1/room/delete/:roomId',
  checkAuth,
  verifyTravelAdmin,
  roomController.deleteRoom
);

roomRouter.post(
  '/v1/room/bookings/new',
  checkAuth,
  // validate(bookingSchema),
  roomController.bookRoom
);

roomRouter.get('/v1/rooms/bookings', checkAuth, roomController.getAllBookings);

roomRouter.delete(
  '/v1/rooms/bookings/cancel/:bookingId',
  checkAuth,
  roomController.removeRoomBooking
);

roomRouter.patch(
  '/v1/rooms/bookings/checkInOrCheckOut/:bookingId',
  checkAuth,
  verifyTravelAdmin,
  // validate(checkInorCheckoutSchema),
  roomController.roomCheckInOrCheckOut
);

roomRouter.delete(
  '/v1/rooms/bookings/delete/:bookingId',
  checkAuth,
  verifyTravelAdmin,

  roomController.deleteRoomBooking
);

export default roomRouter;
