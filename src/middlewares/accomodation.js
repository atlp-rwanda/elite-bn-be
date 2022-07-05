import accomodation from '../validations/accomodationValidation';
class AccommodationMiddleware {
  static validateNewAccommodation = async (req, res, next) => {
    const newAccommodation = accomodation.validate(req.body);
    if (!newAccommodation) {
      return res.status(422).json({
        error: error.details[0].message.replace(/["'`]+/g, ''),
      });
    }
    next();
  };
  static validateAccommodationUpdate = (req, res, next) => {
    const updateAccomodation = accomodation.validate(req.body);
    if (!updateAccomodation) {
      return res.status(422).json({
        error: error.details[0].message.replace(/["'`]+/g, ''),
      });
    }
    next();
  };
}

export default AccommodationMiddleware;
