import express from 'express';
import userRoutes from './api/userRoute';

const routes = express.Router;

routes.use('/users', userRoutes);