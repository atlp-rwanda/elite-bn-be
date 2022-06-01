import express from 'express';
import userRouter from './userRouter';
import userRoutes from './userRouter';
import { Router } from 'express';

const router = express.Router()

router.get('/',(req, res) => {
    res.send({ message: 'Welcome Team Elite Barefoot Nomad Team Project'});
});

router.use('/api/v1', userRouter);
router.use('/api/v1/user', userRoutes);
export default router;

