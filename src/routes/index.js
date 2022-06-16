import express from 'express';
import userRouter from './userRouter';
import userRoutes from './userRouter';
import { Router } from 'express';
import userRoles from './userRoles';

const router = express.Router()

router.get('/', (req, res) => {
    res.send({ message: 'Welcome Team Elite Barefoot Nomad Team Project'});
});

router.use('/api/v1/user', userRouter);
router.use('/api/v1/user', userRoles);

export default router;
