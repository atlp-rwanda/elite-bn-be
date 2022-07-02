import { Room } from '../database/models';
import roomService from '../services/roomService';
import * as ApplicationError from '../utils/errors/applicatioErrors';
import AccommodationService from '../services/accomodationService';
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
      console.log(error);
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
      console.log(error);
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
}
export default roomController;
