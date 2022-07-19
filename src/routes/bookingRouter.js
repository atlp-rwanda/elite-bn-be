import express from 'express';
import checkAuth from '../middlewares/checkAuth';
import { BookingRoomControllers } from '../controllers/bookingController';

const bookingRouter = express.Router();

bookingRouter.post('/:roomId', checkAuth, BookingRoomControllers.bookARoom);

bookingRouter.post('/freeRoom/:roomId', checkAuth, BookingRoomControllers.freeRoom);
export default bookingRouter;
