import userRoutes from './userRouter';
import { Router } from 'express';

const router = Router();

router.use('/api/v1/user', userRoutes);


export default router;
