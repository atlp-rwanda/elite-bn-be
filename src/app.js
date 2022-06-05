import express from 'express';
import bodyParser from 'body-parser';
import userRouter from"./routes/userRoutes"
import cors from 'cors';
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api/v1/users',userRouter)
export default app;