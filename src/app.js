import 'dotenv/config'
import express from 'express';
import cors from 'cors';
import Router from './routes';
const app = express();
app.use(express.json());
app.use(cors());
app.use('/', Router);

export default app;