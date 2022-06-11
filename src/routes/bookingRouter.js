// import express from 'express';
// import {
//   newBooking,
//   getAllBookings,
//   getSpecificBooking,
//   confirmBooking,
//   deleteBooking,
// } from '../controllers/booking.controller';
// import { verifyToken } from '../middlewares/auth';
// import { travelAdmin } from '../middlewares/travel-admin';

// const router = express.Router();

// /**
//  * @description To submit a new booking
//  * @api api/v1/bookings
//  * @access Private
//  * @type POST
//  */
// router.post('/', newBooking);

// /**
//  * @description To get a list of all roles
//  * @api api/v1/bookings
//  * @access Public
//  * @type GET
//  */
// router.get('/', [verifyToken, travelAdmin], getAllBookings);

// /**
//  * @description To get a specific booking
//  * @api api/v1/bookings/:id
//  * @access Public
//  * @type GET
//  */
// router.get('/:id', verifyToken, getSpecificBooking);

// /**
//  * @description To assign a confirm a specific accomodation booking
//  * @api api/v1/bookings/confirm/:bookingId
//  * @access Public
//  * @type PATCH
//  */
// router.patch('/confirm/:id', [verifyToken, travelAdmin], confirmBooking);

// /**
//  * @description To delete a specific booking
//  * @api api/roles/:roleId
//  * @access Public
//  * @type DELETE
//  */
// router.delete('/:id', verifyToken, deleteBooking);

// export default router;