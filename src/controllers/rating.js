/* eslint-disable  */
import {
    notFoundError,
    internalServerError,
    AuthorizationError
  } from '../utils/errors/applicatioErrors';
  import {
    createRating,
    getAllRatings,
    isAccomodated
  } from '../services/ratingService';
  import { classifyRating, getRatingArray } from '../utils/helpers/ratingHelper';
  import { average } from '../utils/helpers/mathHelper';
  import AccommodationService from '../services/accomodationService';
  import { successResponse, createdResponse } from '../utils/responses/responseHandler';
  
  export const addRating = async (req, res) => {
     try {
     

       const { accommodationId } = req.params; 

       const accommodation = await AccommodationService.getOneAccommodation(accommodationId);

        if (!accommodation) {
          return notFoundError('That accommodation does not exist', res);
        }
  
       const accomodated = await isAccomodated(accommodationId);
       if (!accomodated) {
         return AuthorizationError(
           'You had not been to this accommodation. You can not rate it',
           res
         );
       }
       const { serviceRating } = req.body;
       
       const created = await createRating(accommodationId, serviceRating);
       if (created) {
         return createdResponse(
           res,
           `You have rated accommodation with id ${accommodationId} with ${serviceRating} stars`
         );
       }
  
       return successResponse(
         res,
         200,
         `You have updated ratings of accommodation with id ${accommodationId} to ${serviceRating} stars`
       );
     } catch (error) {
      console.log(error,'-=-=-=-=-')
       return internalServerError(`${error}`, res);
     }
   };

   
   export const allRatings = async (req, res) => {
      
     try {
       const { accomodation_id: accommodationId } = req.params;
      const accommodation = await AccommodationService.getOneAccommodation(accommodationId);

        if (!accommodation) {
          return notFoundError('That accommodation does not exist', res);
        }
  
       const ratingsResponse = await getAllRatings(accommodationId);  
       const ratings = getRatingArray(ratingsResponse);
       if (!ratings.length) {
         return successResponse(res, 200, 'No ratings for this accomodation');
       }
  
       return successResponse(
         res,
         200,
         `Ratings of accomodation ${accommodationId}`,
         { rating: average(ratings) }
       );
     } catch (error) {
       return internalServerError('Error in the server', res);
     }
   };

   export const getRatings = async (req, res) => {
     try {
       const { accomodation_id: accommodationId } = req.params;
       const accommodation = await AccommodationService.getOneAccommodation(accommodationId);
       if (!accommodation) {
         return notFoundError('That accomodation does not exist', res);
       }
       const ratings = await getAllRatings(accommodationId);
       if (!ratings.length) {
         return successResponse(res, 200, 'No ratings for this accomodation');
       }
  
       return successResponse(
         res,
         200,
         `Ratings of accomodation ${accommodationId}`,
         { rating: classifyRating(ratings) }
       );
     } catch (error) {
       return internalServerError('Error in the server', res);
     }
   };
  
 