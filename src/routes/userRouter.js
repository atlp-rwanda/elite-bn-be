import express from "express";
import * as userController from '../controllers/userController'

const userRouter = express.Router();

userRouter.post('/user/register', (req, res, next ) => {
    try{
        userController.default.registerNew(req.body, res,next);
    }
    catch (error) {
        res.status(500).json({'Error Message:': 'An Error has occured, Something went wrong!' , Error: error});
        next(error);
    }
});
export default userRouter;

