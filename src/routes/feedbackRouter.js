import express from "express";
import feedbackController from '../controllers/feedbackController'

const feedbackRouter = express.Router();

feedbackRouter.get('/', feedbackController.getFeedback)
feedbackRouter.post('/create', feedbackController.sendFeedback)

export default feedbackRouter;




