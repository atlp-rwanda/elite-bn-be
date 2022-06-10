import 'dotenv/config'
import express from 'express';
import morgan from 'morgan'
import cors from 'cors';
import Router from './routes/index';
import bodyParser from 'body-parser'
const app = express();
app.use(express.json());
app.use(morgan('dev'))
app.use(cors());
app.use(bodyParser.json());
app.use(Router);
app.use(bodyParser.urlencoded({ extended: false }));
export default app;

