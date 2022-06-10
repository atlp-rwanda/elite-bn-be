;
import express from "express";
import * as userController from '../controllers/userController';
import { login } from '../controllers/userController';
import { logout } from '../controllers/userController';


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

userRouter.post('/logout', logout);

export default userRouter;


