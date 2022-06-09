import express from "express";
import bodyparser from "body-parser";
import babel from "@babel/core";
import swaggerDocs from '../public/api-docs/swagger.js';
import { sequelize } from "./database/models"
import dotenv from 'dotenv'
import app from './app'
import { db } from "./database/models/index.js"
import methodoverride from "method-override";
import cors from "cors";
import path from "path";
import passport from "passport";
import morgan from "morgan";
import cookieParser from 'cookie-parser';
import googleFacebook from "./routes/api/googleFacebook";

require("./config/passport").default(passport);

dotenv.config();

const __dirname = path.resolve();


// app.use(cookieParser());
// app.use(bodyparser.json());
// app.use(cors());
// app.use(morgan("dev"));
// app.use(bodyparser.urlencoded({ extended: false }));
// app.use(methodoverride());
// const session = require('express-session');
// const FileStore = require('session-file-store')(session);
// const fileStoreOptions = {};

// app.use('/api/v1', googleFacebook)


// app.use(passport.initialize());
// app.use(passport.session());


 const port =  3000;
 swaggerDocs(app, port);
 app.emit('appStarted \n');

    sequelize
      .authenticate()
      .then(() => {
        console.log('\nBarefoot Nomad Database Connected!');
      }).catch((err) => {
        console.log('\n!!! Barefoot Nomad Database Not Connected !!! \n');
        console.log({ Error_Message: err });
      });
     
     
    
app.listen(port, () => console.log(`\nBarefoot Nomad Server Started & Listening on PORT: ${port}\n`));
 

// app.use(session({
//   store: new FileStore(fileStoreOptions),
//   resave: true,
//   saveUninitialized: false,
//   secret: 'keyboard cat'
// }));


app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});


 app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    errors: {
      message: err.message,
      error: {},
    },
  });
}); 


