import express from "express";
import * as userController from '../controllers/userController';
import { login, logout, getProfile, updateProfile } from '../controllers/userController';
import checkAuth from "../middlewares/checkAuth";

const userRouter = express.Router();
const routes = express.Router();

userRouter.post('/register', (req, res, next ) => {
    try{
        userController.default.registerNew(req.body, res,next);
    }
    catch (error) {
        res.status(500).json({'Error Message:': 'An Error has occured, Something went wrong!' , Error: error});
        next(error);
    }
});

userRouter.post('/login', login);
userRouter.get('/profile', checkAuth, getProfile);
userRouter.patch('/profile', checkAuth, updateProfile);
userRouter.post('/logout', logout);

userRouter.get('/verify/:id', (req, res, next) => {
    try {
        userController.default.userVerfication(req, res, next);
    }
    catch (error) {
        res.status(500).json({ 'Error Message:': 'An Error has occured, Something went wrong!', Error: error });
        next(error);
    }
});
export default userRouter;


