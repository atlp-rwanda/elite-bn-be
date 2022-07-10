import express from 'express';
import checkAuth from '../middlewares/checkAuth';
import likeMiddleware from '../middlewares/like';
import { like, disLike, allLikes, allDisLikes } from '../controllers/likeController';

const likeRouter = express.Router();
const { validateNewLike, validateDislike } = likeMiddleware;
likeRouter.post('/accomodation/:accomodation_id/like', checkAuth, validateNewLike, like);
likeRouter.post('/accomodation/:accomodation_id/dislike', checkAuth, validateDislike, disLike);

likeRouter.get('/accomodation/:accomodation_id/likes', allLikes);
likeRouter.get('/accomodation/:accomodation_id/dislikes', allDisLikes);

export default likeRouter;
