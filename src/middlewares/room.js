import room from '../validations/roomValidation';
class roomMiddleware {
  static validateNewRoom = async (req, res, next) => {
    const newRoom = room.validate(req.body);
    if (!newRoom) {
      return res.status(422).json({
        error: error.details[0].message.replace(/["'`]+/g, ''),
      });
    }
    next();
  };

  static validateRoomUpdate = (req, res, next) => {
    const updateRoom = room.validate(req.body);
    if (!updateRoom) {
      return res.status(422).json({
        error: error.details[0].message.replace(/["'`]+/g, ''),
      });
    }
    next();
  };
}

export default roomMiddleware;
