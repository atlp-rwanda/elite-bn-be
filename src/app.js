import 'dotenv/config'
import express from 'express';
import morgan from 'morgan'
import cors from 'cors';
import Router from './routes/index';
import bodyParser from 'body-parser';
import methodoverride from "method-override";
import path from "path";
import passport from "passport";
import cookieParser from 'cookie-parser';
import googleFacebook from "./routes/api/googleFacebook";
import bodyparser from "body-parser";
import babel from "@babel/core";
import swaggerDocs from '../public/api-docs/swagger.js';
import { sequelize } from "./database/models"
import dotenv from 'dotenv'
import { db } from "./database/models/index.js"

const app = express();
app.use(express.json());
app.use(morgan('dev'))
app.use(cors());
app.use(bodyParser.json());
app.use(Router);
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(bodyparser.json());
app.use(cors());
app.use(morgan("dev"));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(methodoverride());
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const fileStoreOptions = {};

app.use('/api/v1', googleFacebook)


app.use(passport.initialize());
app.use(passport.session());

app.use(session({
    store: new FileStore(fileStoreOptions),
    resave: true,
    saveUninitialized: false,
    secret: 'keyboard cat'
  }));



export default app;

