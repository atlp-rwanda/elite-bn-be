import 'dotenv/config'
import express from 'express';
import morgan from 'morgan'
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import Router from './routers/index';
import errorHandler from './controllers/errors';

const app = express();
dotenv.config();
app.use(cookieParser());
app.use(express.json());
app.use(morgan('dev'))
app.use(cors());
app.use(Router);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(errorHandler);

export default app;