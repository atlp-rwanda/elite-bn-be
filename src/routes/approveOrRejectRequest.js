import express from 'express';
import approveOrRejectController from '../controllers/approveOrRejectRequest';

const router = express.Router();

router.patch(
  '/request/approve/:id',
  approveOrRejectController.approveTripRequest
);

router.patch(
  '/request/reject/:id',
  approveOrRejectController.rejectTripRequest
);

export default router;
