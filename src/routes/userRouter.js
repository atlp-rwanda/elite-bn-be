import express from 'express';
import * as userController from '../controllers/userController';
import { login, logout, getProfile, updateProfile } from '../controllers/userController';
import { createMessage, getAllMessages } from '../controllers/chatsController';
import { chatValidator } from '../validations/chatValidation';
import checkAuth from '../middlewares/checkAuth';

const userRouter = express.Router();

userRouter.post('/register', (req, res, next) => {
  try {
    userController.default.registerNew(req.body, res, next);
  } catch (error) {
    res
      .status(500)
      .json({ 'Error Message:': 'An Error has occured, Something went wrong!', Error: error });
    next(error);
  }
});

userRouter.post('/login', login);
userRouter.post('/message', checkAuth, chatValidator, createMessage);
userRouter.get('/messages', checkAuth, getAllMessages);
userRouter.get('/profile', checkAuth, getProfile);
userRouter.patch('/profile', checkAuth, updateProfile);
userRouter.get('/logout', logout);

userRouter.get('/verify/:id', (req, res, next) => {
  try {
    userController.default.userVerfication(req, res, next);
  } catch (error) {
    res
      .status(500)
      .json({ 'Error Message:': 'An Error has occured, Something went wrong!', Error: error });
    next(error);
  }
});

userRouter.post('/forgotPassword', userController.forgotPassword);
userRouter.put('/resetPassword/:id/:passwordResetToken', userController.resetPassword);

export default userRouter;
