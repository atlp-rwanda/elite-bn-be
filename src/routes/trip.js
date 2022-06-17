import express from 'express';
import {
  makeTrip,
  getRequestedTrips,
  allTrips,
  updateTrip,
  deleteTrip,
  mostTavelledDestinations
} from '../controllers/tripController';
import { makeTripComment, getTripComment, deleteTripComment } from '../controllers/tripComment';
import checkAuth from '../middlewares/checkAuth';
import tripValidator from '../validations/tripValidation';
import tripCommentValidation from '../validations/tripCommentValidation';
import verifyManager from '../middlewares/managerAuth';

const trip = express.Router();

trip.post('/create', checkAuth, tripValidator, makeTrip);
trip.get('/', checkAuth, getRequestedTrips);
trip.get('/allTrips', checkAuth, verifyManager, allTrips);
trip.patch('/update/:tripId', checkAuth, tripValidator, updateTrip);
trip.delete('/delete/:tripId', checkAuth, deleteTrip);
trip.get('/dest', checkAuth, mostTavelledDestinations);

trip.post('/:tripId/comment', checkAuth, tripCommentValidation, makeTripComment);
trip.get('/:tripId/comments', checkAuth, getTripComment);
trip.delete('/comment/:commentId', checkAuth, deleteTripComment);

export default trip;
