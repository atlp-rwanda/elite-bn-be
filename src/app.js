import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import Router from './routes/index';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import errorHandler from './utils/errors/errorHandle';

const app = express();
app.use('/chats',express.static(path.join(__dirname,'../public/chat')));
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(Router);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(errorHandler);

export default app;
