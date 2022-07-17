import express from 'express';
import * as tripSearch from '../controllers/tripRequestsSearchController';
import { search } from '../middlewares/searchValidate';
import checkAuth from '../middlewares/checkAuth';
import verifyTravelAdmin from '../middlewares/travelAdminAuth';

const tripSearchRouter = express.Router();
tripSearchRouter.get(
  '/trip/search/byKey',
  checkAuth,
  verifyTravelAdmin,
  search,
  tripSearch.tripRequestSearch
);

export default tripSearchRouter;
