/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

import babel from "@babel/core";
import swaggerDocs from './public/api-docs/swagger.js';
import db from '../database/models'
import app from './app';
import dotenv from 'dotenv'


dotenv.config()



swaggerDocs(app, port);


db.sequelize
    .authenticate()
    .then(() => {
        console.log("connected to the db");
    })
    .catch((err) => {
        console.log("Error connecting to the db", err);
    });

app.listen(port, () => console.log(`Listening on ${port}`));

