import * as searching from '../validations/tripSearch';
import * as AppError from '../utils/errors/AppError';

const search = (req, res, next) => {
  const validateSearchValue = searching.tripSearch.validate(req.query);
  if (!validateSearchValue.error) {
    next();
  } else {
    AppError.validationError(
      {
        data: { message: validateSearchValue.error.details[0].context.label },
      },
      res
    );
  }
};
export { search };
