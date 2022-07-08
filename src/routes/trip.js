import express from 'express';
import {
  makeTrip,
  getRequestedTrips,
  allTrips,
  updateTrip,
  deleteTrip,
} from '../controllers/tripController';
import checkAuth from '../middlewares/checkAuth';
import tripValidator from '../validations/tripValidation';
import verifyManager from '../middlewares/managerAuth';

const trip = express.Router();

trip.post('/create', checkAuth, tripValidator, makeTrip);
trip.get('/', checkAuth, getRequestedTrips);
trip.get('/allTrips', checkAuth, verifyManager, allTrips);
trip.patch('/update/:tripId', checkAuth, tripValidator, updateTrip);
trip.delete('/delete/:tripId', checkAuth, deleteTrip);

export default trip;
