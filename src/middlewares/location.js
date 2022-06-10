import location from '../validations/locationValidation';
class locationMiddleware {
  static validateNewLocation = async (req, res, next) => {
    const newLocation = location.validate(req.body);
    if (!newLocation) {
      return res.status(422).json({
        error: error.details[0].message.replace(/["'`]+/g, ''),
      });
    }
    next();
  };

  static validateLocationUpdate = (req, res, next) => {
    const updateLocation = location.validate(req.body);
    if (!updateLocation) {
      return res.status(422).json({
        error: error.details[0].message.replace(/["'`]+/g, ''),
      });
    }
    next();
  };
}

export default locationMiddleware;
