import express from 'express';
import {getOne, updateProfile} from '../controllers/userController';
import {userAuth} from '../middleware/userAuth';

const routes = express.Router();

routes.get('/:id', userAuth, getOne);

routes.patch('/:id', userAuth, updateProfile);


export default routes
