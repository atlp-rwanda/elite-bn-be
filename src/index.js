/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import express from 'express'
import babel  from "@babel/core";
import swaggerDocs from './public/api-docs/swagger.js';
import db from "./database/models/index.js"
import dotenv from 'dotenv'

dotenv.config()
 
const app=express()
const port = process.env.PORT || 3000;

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
