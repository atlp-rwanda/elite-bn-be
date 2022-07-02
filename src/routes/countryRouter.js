import express from 'express';
import CountryCountroller from '../controllers/country';
import countryMiddleware from '../middlewares/country';
import checkAuth from '../middlewares/checkAuth';
import verifyTravelAdmin from '../middlewares/travelAdminAuth';

const countryRouter = express.Router();
const { validateNewCountry } = countryMiddleware;
countryRouter.post(
  '/v1/country/create',
  checkAuth,
  verifyTravelAdmin,
  validateNewCountry,
  CountryCountroller.addCountry
);
countryRouter.get('/v1/country/', CountryCountroller.getAllCountries);

export default countryRouter;
