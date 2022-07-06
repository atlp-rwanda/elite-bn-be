/* eslint-disable  */
import { AuthorizationError, notFoundError, internalServerError} from '../utils/errors/applicatioErrors';
import { createRate, getAllRates, isAccomodated} from '../services/ratingService';
import { classRating, getRateArray } from '../utils/helpers/ratingHelper';
import { AccommodationService } from '../services/accomodationService';
import { validResponse, feedbackResponse } from '../utils/response';
import { avg } from '../utils/helpers/count';


  
  const addRate = async (req, res) => {
    
    try {
      const { id: userId } = req.user;
      const { accomodation_id: accomodationId } = req.params;
      const accomodation = await AccommodationService.getOneAccommodation(accommodationId);
      if (!accomodation) {
        return notFoundError('That accomodation does not exist', res);
      }
      const accomodated = await isAccomodated(userId, accomodationId);
      if (!accomodated) {
        return AuthorizationError(
          'You had not been to this accomodation. You can not rate it',
          res
        );
      }
      const { serviceRating } = req.body;
  
      const created = await createRate(userId, accomodationId, serviceRating);
      if (created) {
        return feedbackResponse(
          res,
          `You have rated accomodation with id ${accomodationId} with ${serviceRating} stars`
        );
      }
  
      return validResponse(
        res,
        200,
        `You have updated ratings of accomodation with id ${accomodationId} to ${serviceRating} stars`
      );
    } catch (error) {
      return internalServerError(`${error}`, res);
    }
  };
  const getAllRates = async (req, res) => {
  
    try {
      const { accomodation_id: accomodationId } = req.params;
      const accomodation = await AccommodationService.getOneAccommodation(accommodationId);
      if (!accomodation) {
        return notFoundError('That accomodation does not exist', res);
      }
      const ratingsResponse = await getAllRates(accomodationId); // retrieve all ratings of an accomodation from db
      const ratings = getRateArray(ratingsResponse);
      if (!ratings.length) {
        return validResponse(res, 200, 'No ratings for this accomodation');
      }
  
      return validResponse(
        res,
        200,
        `Ratings of accomodation ${accomodationId}`,
        { rating: avg(ratings) }
      );
    } catch (error) {
      return internalServerError('Error in the server', res);
    }
  };
  const getRate = async (req, res) => {
    // This controller to get classification of ratings for an  accomodation ex:{"1": 4, "5":8}
    try {
      const { accomodation_id: accomodationId } = req.params;
      const accomodation = await AccommodationService(accomodationId);
      if (!accomodation) {
        return notFoundError('That accomodation does not exist', res);
      }
      const ratings = await getAllRates(accomodationId);
      if (!ratings.length) {
        return validResponse(res, 200, 'No ratings for this accomodation');
      }
  
      return validResponse(
        res,
        200,
        `Ratings of accomodation ${accomodationId}`,
        { rating: classRating(ratings) }
      );
    } catch (error) {
      return internalServerError('Error in the server', res);
    }
  };
  
  export { addRate, getAllRates, getRate };