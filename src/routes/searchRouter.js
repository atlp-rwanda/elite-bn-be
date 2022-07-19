import express from 'express';
import * as tripSearch from '../controllers/tripRequestsSearchController';
import checkAuth from '../middlewares/checkAuth';
import verifyTravelAdmin from '../middlewares/travelAdminAuth';

const tripSearchRouter = express.Router();
tripSearchRouter.get(
  '/trip/search/byKey',
  checkAuth,
  verifyTravelAdmin,
  tripSearch.tripRequestSearch
);

export default tripSearchRouter;
