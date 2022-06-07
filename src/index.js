import express from 'express';
import babel from "@babel/core";
import swaggerDocs from '../public/api-docs/swagger.js';
import {sequelize} from './database/models';
import errorHandler from './controllers/errors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import routes from './routers/index';


dotenv.config()

const app = express();
const port = process.env.PORT || 3000;
swaggerDocs(app, port);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cookieParser());

sequelize
    .authenticate()
    .then(() => {
        console.log("connected to the db");
    })
    .catch((err) => {
        console.log("Error connecting to the db", err);
    });


app.use('/api/v1', routes)    
app.get('/', (req, res) => res.send('Welcome to Elite Bn Be API'));

app.use(errorHandler);
app.listen(port, () => console.log(`Listening on ${port}`));

