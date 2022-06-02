import express from 'express';
import bodyParser from 'body-parser';
import resetPasswordRoute from './routes/resetpassword';
import cors from 'cors';
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(resetPasswordRoute)
export default app;