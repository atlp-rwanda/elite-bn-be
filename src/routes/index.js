import express from 'express';
import userRouter from './userRouter';

const router = express.Router()

router.get('/',(req, res) => {
    res.send({ message: 'Welcome Team Elite Barefoot Nomad Team Project'});
});

router.use('/api/v1', userRouter);
export default router;



