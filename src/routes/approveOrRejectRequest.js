import express from 'express';
import approveOrRejectController from '../controllers/approveOrRejectRequest';
import verifyManager from '../middlewares/managerAuth';
import checkAuth from '../middlewares/checkAuth';
const router = express.Router();

router.patch(
  '/request/approve/:id',checkAuth,verifyManager,
  approveOrRejectController.approveTripRequest
);

router.patch(
  '/request/reject/:id',checkAuth,verifyManager,
  approveOrRejectController.rejectTripRequest
);

export default router;
