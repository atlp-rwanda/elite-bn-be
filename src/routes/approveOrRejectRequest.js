import express from 'express';
import approveOrRejectController from '../controllers/approveOrRejectRequest';
import verifyManager from '../middlewares/managerAuth';
import checkAuth from '../middlewares/checkAuth';
const router = express.Router();

router.patch(
  '/request/approve/:id',verifyManager,checkAuth,
  approveOrRejectController.approveTripRequest
);

router.patch(
  '/request/reject/:id',verifyManager,checkAuth,
  approveOrRejectController.rejectTripRequest
);

export default router;
