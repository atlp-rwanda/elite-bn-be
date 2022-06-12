import express from 'express';
import {getMe} from '../controllers/rolesController';
import rolesSettingsRoute from '../controllers/rolesController';
import roleValidation from '../validations/roleValidation';
import isSuperAdmin from '../middlewares/superAdminAuth';

const routes = express.Router();


routes.get('/role', getMe);

routes.patch('/role', isSuperAdmin.verifyAdmin, roleValidation, rolesSettingsRoute.roleController);


export default routes
