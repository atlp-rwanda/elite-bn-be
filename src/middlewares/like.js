import like from '../validations/likeValidation';
class likeMiddleware {
  static validateNewLike = async (req, res, next) => {
    const newLike = like.validate(req.body);
    if (!newLike) {
      return res.status(422).json({
        error: error.details[0].message.replace(/["'`]+/g, ''),
      });
    }
    next();
  };

  static validateDislike = (req, res, next) => {
    const dislike = like.validate(req.body);
    if (!dislike) {
      return res.status(422).json({
        error: error.details[0].message.replace(/["'`]+/g, ''),
      });
    }
    next();
  };
}

export default likeMiddleware;
