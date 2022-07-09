import express from 'express';
import accomodationController from '../controllers/accomodation';
import upload from '../utils/helpers/fileUploads/multer';
import AccommodationMiddleware from '../middlewares/accomodation';
import checkAuth from '../middlewares/checkAuth';
import verifyTravelAdmin from '../middlewares/travelAdminAuth';
import  RatingValidation  from '../validations/ratingValidation';

const accomodationRouter = express.Router();
const { validateNewAccommodation, validateAccommodationUpdate } = AccommodationMiddleware;

accomodationRouter.post(
  '/v1/accomodation/create',
  upload.array('accomodationImage', 5),
  checkAuth,
  verifyTravelAdmin,
  validateNewAccommodation,
  accomodationController.createAccommodation

);

accomodationRouter.get('/v1/accomodation', accomodationController.getAllAccommodations);
accomodationRouter.get('/v1/accomodation/:accommodationId',accomodationController.getOneAccommodation);

accomodationRouter.patch(
  '/v1/accomodation/update/:accommodationId',
  upload.array('accomodationImage', 5),
  checkAuth,
  verifyTravelAdmin,
  validateAccommodationUpdate,
  accomodationController.updateAccommodation
);
accomodationRouter.delete(
  '/v1/accomodation/delete/:accommodationId',
  checkAuth,
  verifyTravelAdmin,
  accomodationController.deleteAccommodation
);
accomodationRouter.post(
  '/v1/accomodation/:accommodationId/rates',
  checkAuth,
   RatingValidation.validateRate,
  accomodationController.addRate
);

accomodationRouter.get('/v1/accomodation/:accommodationId/rates',accomodationController.getRates);

export default accomodationRouter;
