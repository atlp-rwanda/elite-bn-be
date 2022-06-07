import express from 'express';
import userRoutes from './api/userRoute';

import { Router } from 'express';

const router = Router();

router.use('/users', userRoutes);


export default router;
