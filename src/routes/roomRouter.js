import express from 'express';
import roomController from '../controllers/room';
import roomMiddleware from '../middlewares/room';
import checkAuth from '../middlewares/checkAuth';
import verifyTravelAdmin from '../middlewares/travelAdminAuth';

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

export default roomRouter;
