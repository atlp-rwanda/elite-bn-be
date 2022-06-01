import express from 'express';
import userRouter from './user';

const router = express.Router()

router.get('/',(req, res) => {
    res.send({ message: 'Barefoot Nomad API'});
});

router.use('/api/v1', userRouter);
export default router;