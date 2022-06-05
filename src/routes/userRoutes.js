import express from "express";
import {forgotPassword} from '../controllers/authController'
//import * as controllers from '../controllers/authController'

const app = express();

const router = express.Router();






router.patch('/forgotpassword',forgotPassword);
//router.post('/:newToken',userController.resetPassword);
export default router;