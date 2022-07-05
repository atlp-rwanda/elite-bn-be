import express from 'express';
import locationController from '../controllers/location';
import locationMiddleware from '../middlewares/location';
import checkAuth from '../middlewares/checkAuth';
import verifyTravelAdmin from '../middlewares/travelAdminAuth';

const routerLocation = express.Router();
const { validateNewLocation, validateLocationUpdate } = locationMiddleware;
routerLocation.post(
  '/v1/location/create',
  checkAuth,
  verifyTravelAdmin,
  validateNewLocation,
  locationController.createLocation
);
routerLocation.get('/v1/location/:locationId', locationController.getSingleLocation);
routerLocation.patch(
  '/v1/location/update/:locationId',
  checkAuth,
  verifyTravelAdmin,
  validateLocationUpdate,
  locationController.updateLocation
);
routerLocation.get('/v1/location/accomodation/:locationId/', locationController.getAccommodations);
routerLocation.delete(
  '/v1/location/delete/:locationId',
  checkAuth,
  verifyTravelAdmin,
  locationController.deleteLocation
);

export default routerLocation;
