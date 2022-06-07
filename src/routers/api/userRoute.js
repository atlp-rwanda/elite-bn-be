import express from 'express';
import {updateProfile, getAlluser, getOne} from '../../controllers/userController';
import {userAuth} from '../../middleware/userAuth';

const routes = express.Router();


routes.get('/getAlluser', getAlluser);

routes.get('/:id', userAuth, getOne);

routes.patch('/:id', userAuth, updateProfile);


export default routes
