import express from "express";
import * as userController from '../controllers/resetpassword'

const router = express.Router();
router.post('/forgotpassword',UserController.forgetPassword);
router.put('/:newToken',UserController.resetPassword);
export default router;