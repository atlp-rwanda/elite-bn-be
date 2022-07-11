import express from "express";
import { getFeedback, sendFeedback } from '../controllers/feedbackController'
import checkAuth from '../middlewares/checkAuth';

const feedbackRouter = express.Router();

feedbackRouter.get('/all',
    checkAuth,
    getFeedback)
feedbackRouter.post('/create',
    checkAuth,
    sendFeedback)

export default feedbackRouter;




