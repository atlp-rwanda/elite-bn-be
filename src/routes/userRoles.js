import express from 'express';
import {allUser, rolesController} from '../controllers/rolesController';
import checkAuth from '../middlewares/checkAuth';
import verifySuperAdmin from '../middlewares/superAdminAuth';
import roleValidator from '../validations/roleValidation';

const routes = express.Router();

routes.get('/allUser', checkAuth, verifySuperAdmin, allUser)
routes.patch('/role', checkAuth, verifySuperAdmin, roleValidator, rolesController);


export default routes
