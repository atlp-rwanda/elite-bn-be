import express from 'express';
import checkAuth from '../middlewares/checkAuth';
import paramsValidate from '../middlewares/paramsValidate';
import { accomodationIdSchema} from '../validations/idValidation';
import validate from '../middlewares/validate';
import { ratingSchema } from '../validations/ratingValidation';
import {
  addRating,
  allRatings,
  getRatings
} from '../controllers/rating';

const ratingRouter = express.Router();
ratingRouter.post(
  '/v1/accomodation/:accommodationId/rates',
  checkAuth,
  paramsValidate(accomodationIdSchema),
  validate(ratingSchema),
  addRating
);

ratingRouter.get(
  '/v1/accomodation/:accommodationId/rates',
  checkAuth,
  paramsValidate(accomodationIdSchema),
  allRatings
);

ratingRouter.get(
  '/v1/accomodation/:accommodationId/getrates',
  checkAuth,
  paramsValidate(accomodationIdSchema),
  getRatings
);

export default ratingRouter;
