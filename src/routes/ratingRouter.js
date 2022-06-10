import express from 'express';
import { createRate, updateRate } from '../controllers/rateController';
import checkAuth from '../middlewares/checkAuth';
import rateValidator from '../validations/rateAccommValidation';
const rateRouter = express.Router();

rateRouter.post('/rate', checkAuth, rateValidator, createRate);
// rateRouter.patch('/rate/:accommodationId', checkAuth, rateValidator, updateRate);

export default rateRouter;
