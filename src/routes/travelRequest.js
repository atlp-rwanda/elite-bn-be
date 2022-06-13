import express from 'express';
import {travelReqComment, 
    getAllTravelComment, 
    deleteTravelComment, getMe} from '../controllers/travelReqController';

const routes = express.Router();

routes.get('/comment', getMe);
// routes.get('/:tripReqId/comment', getAllTravelComment);
// routes.put('/:tripReqId/comment', travelReqComment);
// routes.delete('/:tripReqId/comment', deleteTravelComment);