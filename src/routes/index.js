import express from 'express';
import userRouter from './userRouter';
import userRoutes from './userRouter';
import { Router } from 'express';
import userRoles from './userRoles';
import socialAuthRouter from './googleFacebook';
import accomodationRouter from './accomodationRouter';
import roomRouter from './roomRouter';
import countryRouter from './countryRouter';
import locationRouter from './locationRouter';
import trip from './trip';

const indexRouter = express.Router();

indexRouter.get('/', (req, res) => {
  res.send({ Message: 'Welcome Team Elite Barefoot Nomad Team Project' });
});

indexRouter.use('/api/v1/user', userRouter);
indexRouter.use('/api/v1/user', userRoles);
indexRouter.use('/auth', socialAuthRouter);
indexRouter.use('/api', accomodationRouter);
indexRouter.use('/api', countryRouter);
indexRouter.use('/api', roomRouter);
indexRouter.use('/api', locationRouter);
indexRouter.use('/api/v1/user', userRouter);
indexRouter.use('/api/v1/user', userRoles);
indexRouter.use('/api/v1/trip', trip);

export default indexRouter;
