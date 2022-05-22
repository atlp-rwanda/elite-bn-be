import express from 'express'
import passport from 'passport'
import * as babel from "@babel/core";
import db from "./database/models/index.js"

let app=express()
import 'dotenv/config'

const port = process.env.PORT || 3000;

db.sequelize
    .authenticate()
    .then(() => {
        console.log("connected to the db");
    })
    .catch((err) => {
        console.log("Error connecting to the db", err);
    });

app.listen(port, () => console.log(`Listening on ${port}`));
