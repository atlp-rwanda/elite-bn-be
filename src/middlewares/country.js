import countrySchema from '../validations/countryValidation';
class countryMiddleware {
  static validateNewCountry = async (req, res, next) => {
    const newCountry = countrySchema.validate(req.body);
    if (!newCountry) {
      return res.status(422).json({
        error: error.details[0].message.replace(/["'`]+/g, ''),
      });
    }
    next();
  };
}

export default countryMiddleware;
