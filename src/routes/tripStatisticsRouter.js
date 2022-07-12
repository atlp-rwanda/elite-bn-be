import express from 'express';
import {
  tripStatistics,
  recentTripStatistic,
} from '../controllers/tripStatistics';
import checkAuth from '../middlewares/checkAuth';

const router = express.Router();

router.get(
  '/trip/statistics',checkAuth,
  tripStatistics
);
router.get(
  '/trip/statistics/recent',checkAuth,
  recentTripStatistic
);

export default router;
