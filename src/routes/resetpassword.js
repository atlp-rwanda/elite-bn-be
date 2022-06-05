import express from "express";
import * as userController from '../controllers/resetpassword'
const app = express();

const router = express.Router();
router.post('/forgotpassword',UserController.forgetPassword);
router.post('/:newToken',userController.resetPassword);
export default router;